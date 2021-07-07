import type { Experience } from 'mongodb-models/experience';
import type { Occurrence } from 'mongodb-models/occurrence';
import type { Booking } from 'mongodb-models/booking';
import type { User } from 'mongodb-models/user';
import type { Creator } from 'mongodb-models/creator';

// Note that the _id field is set by the GraphQL resolvers when using lean()

export const experienceReducer = (exp: Experience | null) => ({
    _id: exp?._id || '',
    title: exp?.title || '',
    description: exp?.description || '',
    images: exp?.images || [],
    location: exp?.location.displayLocation || '',
    meetingPoint: exp?.location.meetPoint || null,
    latitude: exp?.location.coordinates ? exp.location.coordinates.lat : null,
    longitude: exp?.location.coordinates ? exp.location.coordinates.long : null,
    categories: exp?.categories || [],
    ageRestriction: exp?.ageRestriction || null,
    duration: exp?.duration || 0,
    languages: exp?.languages || [],
    includedItems: exp?.included || [],
    toBringItems: exp?.toBring || [],
    capacity: exp?.capacity || 0,
    zoomPMI: exp?.zoomInfo ? exp?.zoomInfo.PMI : null,
    pricePerPerson: exp?.price.perPerson || 0,
    privatePrice: exp?.price.private || null,
    currency: exp?.price.currency || 'CAD',
    ratingValue: exp?.rating.value || 5,
    numberOfRatings: exp?.rating.numRatings || 0,
    creator: exp?.creator || ''
});

export const occurrenceReducer = (occ: Occurrence | null) => ({
    _id: occ?._id || '',
    experience: occ?.experience || '',
    dateStart: occ?.dateStart.toISOString() || '',
    dateEnd: occ?.dateEnd.toISOString() || '',
    spotsLeft: occ?.spotsLeft || 0,
    creatorProfit: occ?.creatorProfit || 0,
    bookings: occ?.bookings || []
});

export const bookingReducer = (booking: Booking | null) => ({
    _id: booking?._id || '',
    occurrence: booking?.occurrence || ''
});

export const userReducer = (user: User | null) => ({
    _id: user?._id || '',
    token: '', // The token is generated with JWT
    firstName: user?.fstName || '',
    lastName: user?.lstName || '',
    birthday: user?.birthday || null,
    email: user?.email.address || '',
    phoneNumber: user?.phoneNumber || null,
    photo: user?.photo || null,
    city: user?.city || null,
    savedExperiences: user?.savedExperiences || [],
    bookedExperiences: user?.bookedExperiences || [],
    creator: user?.creator || null
});

export const creatorReducer = (creator: Creator | null) => ({
    _id: creator?._id || '',
    bio: creator?.bio || '',
    user: creator?.user || '',
    verified: creator?.verified || false,
    governmentIds: creator?.governmentIds || [],
    stripeProfile: {
        onboarded: creator?.stripe ? creator.stripe.onboarded : false,
        accountId: creator?.stripe ? creator.stripe.accountId : ''
    }
});