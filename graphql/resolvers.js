const { AuthenticationError } = require('apollo-server-express');
const { generateToken } = require('../utils/jwt');
const { experienceReducer, userReducer, creatorReducer } = require('../utils/dataReducers');
const { Experience, User, Creator } = require('../models');

module.exports = {
    Experience: {
        creator: (exp) => {
            return Creator.findById(exp.creator).then(creatorReducer);
        }
    },

    Query: {
        me: async (_, __, { userId, tokenExpiry }) => {
            if (!userId) {
                throw new AuthenticationError("Invalid user ID.");
            }

            let loggedUser = await User.findById(userId);
            loggedUser = userReducer(loggedUser);

            // Renew token
            loggedUser.token = generateToken(userId, tokenExpiry);

            return loggedUser;
        },

        experiences: async (_, { location, capacity }) => {
            // Only approved experiences are made public
            const filter = { status: 'approved' }

            if (location) {
                if (location === 'Online') {
                    filter.zoomInfo = { $exists: true }
                } else {
                    filter['location.displayLocation'] = location;
                }
            }
            if (capacity) {
                filter.capacity = { $gte: capacity }
            }
            
            const exps = await Experience.find(filter);
            return exps.map(experienceReducer);
        },

        experience: async (_, { id }) => {
            const exp = await Experience.findById(id);

            return experienceReducer(exp);
        }
    },

    Mutation: {
        signUpUser: async (_, { email, password, firstName, lastName }) => {
            const emailExists = await User.exists({ 'email.address': email });
            if (emailExists) {
                throw new AuthenticationError('Email already in use.');
            } 

            let newUser = await User.create({
                fstName: firstName,
                lstName: lastName,
                email: { address: email },
                password,
                lastLogin: new Date()
            });
            newUser = userReducer(newUser);
            newUser.token = generateToken(newUser._id, '1d');
            // The user doesn't have a creator account, so creator will be null.
            newUser.creator = { _id: '' }

            return newUser;
        },

        logInUser: async (_, { email, password, rememberUser }) => {
            let user = await User.findOneAndUpdate({
                'email.address': email
            }, { lastLogin: new Date() });

            if (!user) {
                throw new AuthenticationError("There's no account associated to that email.");
            }

            if (!user.validPassword(password)) {
                throw new AuthenticationError('Invalid password.');
            }

            const expireTime = rememberUser ? '30d' : '1d';
            user = userReducer(user);
            user.token = generateToken(user._id, expireTime);
            
            return user;
        },

        editUser: async (_, args, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("User isn't logged in.");
            }

            const user = await User.findById(userId);
        
            for (const [field, value] of Object.entries(args)) {
                user[field] = value;
            }
            await user.save();
            
            return userReducer(user);
        },

        signUpCreator: async (_, { bio, governmentIds }, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("User isn't logged in.");
            }

            const creator = await Creator.create({
                user: userId,
                bio,
                verified: false,
                governmentIds
            });

            await User.findByIdAndUpdate(userId, {
                creator: creator._id
            });

            return creatorReducer(creator);
        },

        saveExperience: async (_, { experienceId }, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("User isn't logged in.");
            }

            try {
                await User.findByIdAndUpdate(
                    userId, 
                    { $addToSet: { savedExperiences: experienceId } }
                );
                return { code: 201, message: 'Experience saved.' }
            } catch (err) {
                return { code: 409, message: "Experience couldn't be saved." }
            }
        },

        unsaveExperience: async (_, { experienceId }, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("User isn't logged in.");
            }

            try {
                await User.findByIdAndUpdate(
                    userId, 
                    { $pull: { savedExperiences: experienceId } }
                );
                return { code: 201, message: 'Experience unsaved.' }
            } catch (err) {
                return { code: 409, message: "Experience couldn't be unsaved." }
            }
        },
    }
}