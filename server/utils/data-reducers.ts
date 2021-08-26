import type { Admin } from '../mongodb-models/admin';
import type { Experience } from '../mongodb-models/experience';
import type { User } from '../mongodb-models/user';
import type { Creator } from '../mongodb-models/creator';
import type { Review } from '../mongodb-models/review';

export const adminReducer = (admin: Admin | null) => ({
    _id: admin?._id || '',
    userName: admin?.userName || '',
    token: '' // The token is generated with JWT in the reducers
});

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
    isOnlineExperience: Boolean(exp?.zoomInfo?.PMI),
    pricePerPerson: exp?.price.perPerson || 0,
    privatePrice: exp?.price.private || null,
    currency: exp?.price.currency || 'CAD',
    ratingValue: exp?.rating.value || 5,
    numberOfRatings: exp?.rating.numRatings || 0,
    creator: exp?.creator || ''
});

export const userReducer = (user: User | null) => ({
    _id: user?._id || '',
    firstName: user?.fstName || '',
    lastName: user?.lstName || '',
    email: user?.emailAddress || '',
    phoneNumber: user?.phoneNumber || null,
    photo: user?.photo || null,
    city: user?.city || null,
    creator: user?.creator || null
});

export const creatorReducer = (creator: Creator | null) => ({
    _id: creator?._id || '',
    bio: creator?.bio || '',
    user: creator?.user || '',
    governmentIds: creator?.governmentIds || [],
    stripeProfile: {
        onboarded: creator?.stripe ? creator.stripe.onboarded : false,
        accountId: creator?.stripe ? creator.stripe.accountId : ''
    }
});

export const reviewReducer = (review: Review | null) => ({
    _id: review?._id || '',
    experienceId: review?.experience || '',
    writtenBy: review?.reviewerName || '',
    text: review?.text || '',
    value: review?.value || 5
});