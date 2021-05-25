const { AuthenticationError } = require('apollo-server-express');
const { generateToken } = require('../utils/jwt');
const { experienceReducer, userReducer } = require('../utils/dataReducers');
const { Experience, User } = require('../models');

module.exports = {
    Query: {
        experiences: async (_, { location, capacity, status }) => {
            const filter = {}
            if (status) {
                filter.status = status.toLowerCase();
            }
            if (location) {
                if (location === 'Online') {
                    filter.zoomInfo = { $exists: true }
                } else {
                    filter.location.displayLocation = location;
                }
            }
            if (capacity) {
                filter.capacity = { $gte: capacity }
            }
            
            const exps = await Experience.find(filter);
            return exps.map(experienceReducer);
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
            newUser.token = generateToken(newUser._id, '1h');

            return newUser;
        },

        logInUser: async (_, { email, password, rememberUser }, { dataSources }) => {
            let user = await User.findOneAndUpdate({
                'email.address': email
            }, { lastLogin: new Date() });

            if (!user) {
                throw new AuthenticationError("There's no account associated to that email.");
            }

            if (!user.validPassword(password)) {
                throw new AuthenticationError('Invalid password.');
            }
            
            const expireTime = rememberUser ? '30d' : '1h';
            user = userReducer(user);
            user.token = generateToken(user._id, expireTime);
            
            return user;
        }
    }
}