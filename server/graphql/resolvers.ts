import { AuthenticationError, ApolloError } from 'apollo-server-express';

import { 
    creatorReducer,
    userReducer,
    adminReducer,
    experienceReducer
} from '../utils/data-reducers';
import { generateToken } from '../utils/jwt';
import { deleteExperiencePictures } from '../utils/cloudinary';
import { LEAN_DEFAULTS } from '../server-types';
import { 
    Creator, 
    User, 
    Admin,
    Experience,
    Occurrence
} from '../mongodb-models';
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

    Query: {
        experiencesByStatus: async (_, { status }, { adminId }) => {
            if (!adminId) {
                throw new AuthenticationError('Admin not logged in.');
            }

            const exps = await Experience.find({ status: { $in: status } });
            return exps.map(experienceReducer);
        },

        experience: async (_, { id }, { adminId }) => {
            if (!adminId) {
                throw new AuthenticationError('Admin not logged in.');
            }

            const exp = await Experience.findById(id).lean(LEAN_DEFAULTS);
            return experienceReducer(exp);
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

        approveExperience: async (_, { id, decision }, { adminId }) => {
            if (!adminId) {
                throw new AuthenticationError('Admin not logged in.');
            }

            const experience = await Experience.findById(id);
            if (!experience) {
                throw new ApolloError('Experience not found.');
            }

            if (decision === 'approved' || decision === 'rejected') {
                experience.status = decision;
                await experience.save();
            } else {
                throw new ApolloError('Invalid decision status.');
            }

            return experienceReducer(experience);
        },

        deleteExperience: async (_, { id }, { adminId }) => {
            if (!adminId) {
                throw new AuthenticationError('Admin not logged in.');
            }

            // Only delete if there are no occurrences
            const occurrencesExist = await Occurrence.exists({ experience: id });
            if (occurrencesExist) {
                throw new ApolloError('Experience still has existing occurrences.');
            }
            
            // Delete experience
            const exp = await Experience.findByIdAndDelete(id);

            // Delete images
            if (exp) {
                deleteExperiencePictures(exp.images);
            }

            return experienceReducer(exp);
        }
    }
}