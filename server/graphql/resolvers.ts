import { AuthenticationError, ApolloError } from 'apollo-server-express';

import { 
    creatorReducer,
    userReducer,
    adminReducer,
    experienceReducer
} from '../utils/data-reducers';
import { generateToken } from '../utils/jwt';
import { LEAN_DEFAULTS } from '../server-types';
import { 
    Creator, 
    User, 
    Admin,
    Experience
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
        unapprovedExperiences: async (_, __, { adminId }) => {
            if (!adminId) {
                throw new AuthenticationError('Admin not logged in.');
            }

            const exps = await Experience.find({ status: 'pending' });
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
        }
    }
}