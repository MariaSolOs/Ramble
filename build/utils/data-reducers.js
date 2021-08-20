"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creatorReducer = exports.userReducer = exports.experienceReducer = exports.adminReducer = void 0;
const adminReducer = (admin) => ({
    _id: (admin === null || admin === void 0 ? void 0 : admin._id) || '',
    userName: (admin === null || admin === void 0 ? void 0 : admin.userName) || '',
    token: '' // The token is generated with JWT in the reducers
});
exports.adminReducer = adminReducer;
const experienceReducer = (exp) => {
    var _a;
    return ({
        _id: (exp === null || exp === void 0 ? void 0 : exp._id) || '',
        title: (exp === null || exp === void 0 ? void 0 : exp.title) || '',
        description: (exp === null || exp === void 0 ? void 0 : exp.description) || '',
        images: (exp === null || exp === void 0 ? void 0 : exp.images) || [],
        location: (exp === null || exp === void 0 ? void 0 : exp.location.displayLocation) || '',
        meetingPoint: (exp === null || exp === void 0 ? void 0 : exp.location.meetPoint) || null,
        latitude: (exp === null || exp === void 0 ? void 0 : exp.location.coordinates) ? exp.location.coordinates.lat : null,
        longitude: (exp === null || exp === void 0 ? void 0 : exp.location.coordinates) ? exp.location.coordinates.long : null,
        categories: (exp === null || exp === void 0 ? void 0 : exp.categories) || [],
        ageRestriction: (exp === null || exp === void 0 ? void 0 : exp.ageRestriction) || null,
        duration: (exp === null || exp === void 0 ? void 0 : exp.duration) || 0,
        languages: (exp === null || exp === void 0 ? void 0 : exp.languages) || [],
        includedItems: (exp === null || exp === void 0 ? void 0 : exp.included) || [],
        toBringItems: (exp === null || exp === void 0 ? void 0 : exp.toBring) || [],
        capacity: (exp === null || exp === void 0 ? void 0 : exp.capacity) || 0,
        isOnlineExperience: Boolean((_a = exp === null || exp === void 0 ? void 0 : exp.zoomInfo) === null || _a === void 0 ? void 0 : _a.PMI),
        pricePerPerson: (exp === null || exp === void 0 ? void 0 : exp.price.perPerson) || 0,
        privatePrice: (exp === null || exp === void 0 ? void 0 : exp.price.private) || null,
        currency: (exp === null || exp === void 0 ? void 0 : exp.price.currency) || 'CAD',
        ratingValue: (exp === null || exp === void 0 ? void 0 : exp.rating.value) || 5,
        numberOfRatings: (exp === null || exp === void 0 ? void 0 : exp.rating.numRatings) || 0,
        creator: (exp === null || exp === void 0 ? void 0 : exp.creator) || ''
    });
};
exports.experienceReducer = experienceReducer;
const userReducer = (user) => ({
    _id: (user === null || user === void 0 ? void 0 : user._id) || '',
    firstName: (user === null || user === void 0 ? void 0 : user.fstName) || '',
    lastName: (user === null || user === void 0 ? void 0 : user.lstName) || '',
    email: (user === null || user === void 0 ? void 0 : user.email.address) || '',
    phoneNumber: (user === null || user === void 0 ? void 0 : user.phoneNumber) || null,
    photo: (user === null || user === void 0 ? void 0 : user.photo) || null,
    city: (user === null || user === void 0 ? void 0 : user.city) || null,
    creator: (user === null || user === void 0 ? void 0 : user.creator) || null
});
exports.userReducer = userReducer;
const creatorReducer = (creator) => ({
    _id: (creator === null || creator === void 0 ? void 0 : creator._id) || '',
    bio: (creator === null || creator === void 0 ? void 0 : creator.bio) || '',
    user: (creator === null || creator === void 0 ? void 0 : creator.user) || '',
    governmentIds: (creator === null || creator === void 0 ? void 0 : creator.governmentIds) || [],
    stripeProfile: {
        onboarded: (creator === null || creator === void 0 ? void 0 : creator.stripe) ? creator.stripe.onboarded : false,
        accountId: (creator === null || creator === void 0 ? void 0 : creator.stripe) ? creator.stripe.accountId : ''
    }
});
exports.creatorReducer = creatorReducer;
