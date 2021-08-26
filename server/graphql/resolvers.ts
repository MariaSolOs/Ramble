import { AuthenticationError, ApolloError } from 'apollo-server-express';

import { 
    creatorReducer,
    userReducer,
    adminReducer,
    experienceReducer,
    reviewReducer
} from '../utils/data-reducers';
import { generateToken } from '../utils/jwt';
import { deleteExperiencePictures } from '../utils/cloudinary';
import { LEAN_DEFAULTS } from '../server-types';
import { 
    Creator, 
    User, 
    Admin,
    Experience,
    Occurrence,
    Review
} from '../mongodb-models';
import { Decision } from './resolvers-types';
import type { Resolvers } from './resolvers-types';

export const resolvers: Resolvers = {
    Experience: {
        creator: ({ creator }) => Creator.findById(creator).lean(LEAN_DEFAULTS).then(creatorReducer)
    },

    User: {
        creator: ({ creator }) => Creator.findById(creator).lean(LEAN_DEFAULTS).then(creatorReducer)
    },

    Creator: {
        user: ({ user }) => User.findById(user).lean(LEAN_DEFAULTS).then(userReducer)
    },

    Review: {
        experience: ({ experience }) => Experience.findById(experience).lean(LEAN_DEFAULTS).then(experienceReducer),
        writtenBy: ({ writtenBy }) => User.findById(writtenBy).lean(LEAN_DEFAULTS).then(userReducer)
    },

    Query: {
        experiencesByStatus: async (_, { status }) => {
            const exps = await Experience.find({ status: { $in: status } }).lean(LEAN_DEFAULTS);
            return exps.map(experienceReducer);
        },

        experience: async (_, { id }) => {
            const exp = await Experience.findById(id).lean(LEAN_DEFAULTS);
            return experienceReducer(exp);
        },

        unapprovedReviews: async () => {
            const reviews = await Review.find({ approved: false }).lean(LEAN_DEFAULTS);
            return reviews.map(reviewReducer); 
        }
    },

    Mutation: {
        logIn: async (_, { userName, password }) => {
            const loggedInAdmin = await Admin.findOne({ userName }).lean(LEAN_DEFAULTS);
            
            if (!loggedInAdmin) {
                throw new AuthenticationError('Admin account not found.');
            }

            if (!Admin.isValidPassword(password, loggedInAdmin.passwordHash)) {
                throw new AuthenticationError('Invalid credentials.');
            }

            const admin = adminReducer(loggedInAdmin);
            admin.token = generateToken(admin._id.toString());
            
            return admin;
        },

        approveExperience: async (_, { id, decision }) => {
            // Find experience
            const experience = await Experience.findByIdAndUpdate(id, {
                status: decision
            });

            return experienceReducer(experience);
        },

        deleteExperience: async (_, { id }) => {
            // Only delete if there are no occurrences
            const occurrencesExist = await Occurrence.exists({ experience: id });
            if (occurrencesExist) {
                throw new ApolloError('Experience still has existing occurrences.');
            }
            
            // Delete experience
            const exp = await Experience.findByIdAndDelete(id);
            if (!exp) {
                throw new ApolloError('Experience not found');
            }

            // Delete images
            deleteExperiencePictures(exp.images);

            // Delete reviews
            await Review.deleteMany({ experience: exp._id });

            // Remove from users' saved and booked experiences
            await User.updateMany(
                { savedExperiences: exp._id },
                { $pull: { savedExperiences: exp._id } }
            );
            await User.updateMany(
                { bookedExperiences: exp._id },
                { $pull: { bookedExperiences: exp._id } }
            );

            return experienceReducer(exp);
        },

        approveReview: async (_, { id, decision }) => {
            const review = await Review.findByIdAndUpdate(id, {
                approved: decision === Decision.Approved
            });

            return reviewReducer(review);
        }
    }
}