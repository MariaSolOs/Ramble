import { AuthenticationError, ApolloError } from 'apollo-server-express';
import { Types } from 'mongoose';
import type { FilterQuery, Document } from 'mongoose';
import Stripe from 'stripe';

import { generateToken } from '../utils/jwt';
import { computeBookingFees } from '../utils/booking';
import { sendBookingNotificationEmail } from '../utils/email';
import { 
    experienceReducer,
    bookingReducer,
    userReducer,
    creatorReducer, 
    occurrenceReducer
} from '../utils/data-reducers';
import { 
    Experience, 
    Occurrence,
    Booking,
    User,
    Creator
} from '../mongodb-models';
import type { Experience as ExperienceType } from '../mongodb-models/experience';
import type { User as UserType } from '../mongodb-models/user';
import type { Creator as CreatorType } from '../mongodb-models/creator';
import type { Resolvers } from './resolvers-types';
import { LEAN_DEFAULTS, STRIPE_API_VERSION } from '../server-types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: STRIPE_API_VERSION
});

export const resolvers: Resolvers = {
    Experience: {
        creator: ({ creator }) => Creator.findById(creator).lean(LEAN_DEFAULTS).then(creatorReducer)
    },

    Occurrence: {
        experience: ({ experience }) => Experience.findById(experience).lean(LEAN_DEFAULTS).then(experienceReducer),
        bookings: async occ => {
            const bookings = await Booking.find({ _id: { $in: occ.bookings }}).lean(LEAN_DEFAULTS);
            return bookings.map(bookingReducer);
        }
    },

    Booking: {
        client: ({ client }) => User.findById(client).lean(LEAN_DEFAULTS).then(userReducer),
        occurrence: ({ occurrence }) => Occurrence.findById(occurrence).lean(LEAN_DEFAULTS).then(occurrenceReducer)
    },

    User: {
        creator: ({ creator }) => Creator.findById(creator).lean(LEAN_DEFAULTS).then(creatorReducer),
        savedExperiences: async user => {
            const exps = await Experience.find({ _id: { $in: user.savedExperiences } }).lean(LEAN_DEFAULTS);
            return exps.map(experienceReducer);
        },
        bookedExperiences: async user => {
            const exps = await Experience.find({ _id: { $in: user.bookedExperiences } }).lean(LEAN_DEFAULTS);
            return exps.map(experienceReducer);
        }
    },

    Creator: {
        user: ({ user }) => User.findById(user).lean(LEAN_DEFAULTS).then(userReducer),
        bookingRequests: async creator => {
            const bookings = await Booking.find({ 
                _id: { $in: creator.bookingRequests }
            }).sort('-createdAt').lean(LEAN_DEFAULTS);
            // Sort bookings by their creation date (most recent first)
            return bookings.map(bookingReducer);
        }
    },

    Query: {
        me: async (_, __, { userId, tokenExpiry }) => {
            if (!userId) {
                throw new AuthenticationError('Invalid user ID');
            }
    
            const user = await User.findById(userId).lean(LEAN_DEFAULTS);
            const userInfo = userReducer(user);
            userInfo.token = generateToken(userId, tokenExpiry);
            
            return userInfo;
        },
    
        experiences: async (_, { location, capacity }) => {
            // Only approved experiences are made public
            const filter: FilterQuery<typeof Experience> = { status: 'approved' }
    
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
    
            const exps = await Experience.find(filter).lean(LEAN_DEFAULTS);
            return exps.map(experienceReducer);
        },
    
        experience: (_, { id }) => Experience.findById(id).lean(LEAN_DEFAULTS).then(experienceReducer),
    
        occurrences: async (_, { experienceId }) => {
            const occs = await Occurrence.find({
                experience: Types.ObjectId(experienceId),
                dateStart: {
                    $gte: new Date(new Date().setUTCHours(0, 0, 0))
                }
            }).lean(LEAN_DEFAULTS);
    
            return occs.map(occurrenceReducer);
        }
    },

    Mutation: {
        signUpUser: async (_, { email, password, firstName, lastName }) => {
            const emailExists = await User.exists({ 'email.address': email });
            if (emailExists) {
                throw new AuthenticationError('Email already in use.');
            }

            const createdUser = await User.create({
                fstName: firstName,
                lstName: lastName,
                email: { address: email },
                passwordHash: User.generatePasswordHash(password),
                lastLogin: new Date()
            });
            const newUser = userReducer(createdUser);
            newUser.token = generateToken(newUser._id.toString(), '1d');

            return newUser;
        },

        logInUser: async (_, { email, password, rememberUser }) => {
            const loggedInUser = await User.findOneAndUpdate({
                'email.address': email
            }, { lastLogin: new Date() });

            if (!loggedInUser) {
                throw new AuthenticationError("There's no account associated to that email.");
            }

            if (!User.isValidPassword(password, loggedInUser.passwordHash)) {
                throw new AuthenticationError('Invalid password.');
            }

            const expireTime = rememberUser ? '30d' : '1d';
            const user = userReducer(loggedInUser);
            user.token = generateToken(user._id.toString(), expireTime);

            return user;
        },

        editUser: async (_, args, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("User isn't logged in.");
            }

            const user = await User.findById(userId);

            for (const [field, value] of Object.entries(args)) {
                (user as any)[field] = value;
            }
            
            await user?.save();

            return userReducer(user);
        },

        signUpCreator: async (_, { bio, governmentIds }, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("User isn't logged in.");
            }

            const creator = await Creator.create({
                user: Types.ObjectId(userId),
                bio,
                verified: false,
                governmentIds,
                stripe: { onboarded: false }
            });

            // Connect user account
            await User.findByIdAndUpdate(userId, {
                creator: Types.ObjectId(creator._id)
            });

            return creatorReducer(creator);
        },

        saveExperience: async (_, { experienceId }, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("User isn't logged in.");
            }

            await User.findByIdAndUpdate(userId, { 
                $addToSet: { savedExperiences: Types.ObjectId(experienceId) } 
            });

            return Experience.findById(experienceId).lean(LEAN_DEFAULTS).then(experienceReducer);
        },

        unsaveExperience: async (_, { experienceId }, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("User isn't logged in.");
            }

            await User.findByIdAndUpdate(userId, { 
                $pull: { savedExperiences: Types.ObjectId(experienceId) } 
            });
            return Experience.findById(experienceId).lean(LEAN_DEFAULTS).then(experienceReducer);
        },

        createExperience: async (_, args, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("Creator isn't logged in.");
            }

            // If we have Zoom info, create online experience
            const isOnlineExperience = Boolean(args.zoomPMI);

            // Get the creator ID
            const creator = await User.findById(userId, 'creator').lean(LEAN_DEFAULTS);
            const creatorId = creator?.creator!;

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
                creator: creatorId,
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

            return experienceReducer(experience);
        },

        createBooking: async (_, { occurrenceId, bookingType, numGuests, paymentIntentId }, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("User isn't logged in.");
            }

            // Find the experience and the occurrence to book
            const occurrence = await Occurrence.findById(
                occurrenceId
            ).populate({
                path: 'experience',
                select: '_id creator price title location',
                populate: {
                    path: 'creator',
                    select: 'user bookingRequests',
                    populate: {
                        path: 'user',
                        select: '_id email phoneNumber'
                    }
                }
            });
            if (!occurrence) {
                throw new ApolloError('Occurrence not found.');
            }

            const experience = occurrence.experience as ExperienceType;
            const creator = experience.creator as CreatorType & Document;

            // Create booking
            const { creatorProfit } = computeBookingFees(
                Boolean(experience.location.meetPoint),
                bookingType,
                numGuests, 
                experience.price.perPerson,
                experience.price.private
            );

            const booking = await Booking.create({
                occurrence: occurrence._id,
                bookingType,
                numGuests,
                client: userId,
                stripe: {
                    paymentIntentId,
                    paymentCaptured: false,
                    creatorProfit
                }
            });

            // Add booking to occurrence and update capacity
            occurrence.spotsLeft = bookingType === 'private' ? 
                0 : occurrence.spotsLeft - numGuests;
            occurrence.bookings.push(booking._id);

            // Add booking to creator's requests
            creator.bookingRequests?.push(booking._id);

            // Get card info to display in the booking submitted page
            const { payment_method } = await stripe.paymentIntents.retrieve(paymentIntentId, {
                expand: ['payment_method']
            });

            // Add experience to user's booked experiences
            const client = await User.findByIdAndUpdate(userId, {
                $addToSet: { bookedExperiences: experience._id }
            }, { lean: true });

            // Save all changes
            await occurrence.save();
            await creator.save();

            // Send email notification to creator
            sendBookingNotificationEmail(
                client?.fstName || '',
                experience.title,
                `${process.env.CLIENT_URL!}/email/creator-requests/${userId}`,
                (creator.user as UserType).email.address
            );

            return {
                creatorPhone: (creator.user as UserType).phoneNumber!,
                meetingPoint: experience.location.meetPoint,
                cardBrand: (payment_method as Stripe.PaymentMethod).card?.brand || '',
                cardLast4: (payment_method as Stripe.PaymentMethod).card?.last4 || ''
            }
        }
    }
}