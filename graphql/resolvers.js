const { AuthenticationError } = require('apollo-server-express');
const { generateToken } = require('../utils/jwt');
const { 
    experienceReducer, 
    userReducer, 
    creatorReducer, 
    bookingReducer 
} = require('../utils/dataReducers');
const { 
    Experience, 
    Occurrence,
    Booking, 
    User, 
    Creator 
} = require('../models');

module.exports = {
    Experience: {
        creator: exp => Creator.findById(exp.creator).then(creatorReducer)
    },

    Occurrence: {
        experience: occ => Experience.findById(occ.experience).then(experienceReducer),
        bookings: occ => {
            return Booking.find({ _id: { $in: occ.bookings } })
            .then(bookings => bookings.map(bookingReducer));
        }
    },

    User: {
        creator: user => Creator.findById(user.creator).then(creatorReducer),
        savedExperiences: user => {
            return Experience.find({ _id: { $in: user.savedExperiences } })
            .then(exps => exps.map(experienceReducer));
        },
        bookedExperiences: user => {
            return Experience.find({ _id: { $in: user.bookedExperiences } })
            .then(exps => exps.map(experienceReducer));
        }
    },

    Creator: {
        user: creator => User.findById(creator.user).then(userReducer),
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
            // The capacity is just a lower bound
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
                governmentIds,
                stripe: { onboarded: false }
            });

            // Connect user account
            await User.findByIdAndUpdate(userId, {
                creator: creator._id
            });

            return creatorReducer(creator);
        },

        saveExperience: async (_, { experienceId }, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("User isn't logged in.");
            }

            await User.findByIdAndUpdate(userId, { 
                $addToSet: { savedExperiences: experienceId } 
            });

            return Experience.findById(experienceId).then(experienceReducer);
        },

        unsaveExperience: async (_, { experienceId }, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("User isn't logged in.");
            }

            await User.findByIdAndUpdate(userId, { 
                $pull: { savedExperiences: experienceId } 
            });
            return Experience.findById(experienceId).then(experienceReducer);
        },

        createExperience: async (_, args, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("Creator isn't logged in.");
            }

            try {
                // If we have Zoom info, create online experience
                const isOnlineExperience = Boolean(args.zoomPMI);

                // Create the experience
                const experience = await Experience.create({
                    status: 'pending',
                    title: args.title,
                    description: args.description,
                    images: args.images,
                    categories: args.categories,
                    duration: args.duration,
                    languages: args.languages,
                    capacity: args.capacity,
                    included: args.includedItems,
                    toBring: args.toBringItems,
                    creator: userId,
                    price: {
                        perPerson: args.pricePerPerson,
                        currency: args.currency,
                        ...args.privatePrice && {
                            private: args.privatePrice
                        }
                    },
                    ...isOnlineExperience && {
                        zoomInfo: {
                            PMI: args.zoomPMI,
                            password: args.zoomPassword
                        }
                    },
                    location: {
                        displayLocation: args.location,
                        ...!isOnlineExperience && {
                            meetingPoint: args.meetingPoint,
                            latitude: args.latitude,
                            longitude: args.longitude
                        }
                    },
                    ...args.ageRestriction && {
                        ageRestriction: args.ageRestriction
                    }
                });

                // Create the initial occurrences
                for (const occ of args.slots) {
                    await Occurrence.create({
                        experience: experience._id,
                        dateStart: new Date(occ.start),
                        dateEnd: new Date(occ.end),
                        spotsLeft: experience.capacity,
                        creatorProfit: 0
                    });
                }

                return experienceReducer(experience);
            } catch (err) {
                console.error(err);
            }
        }
    }
}