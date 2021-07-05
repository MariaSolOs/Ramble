exports.experienceReducer = exp => ({
    _id: exp._id,
    title: exp.title,
    description: exp.description,
    images: exp.images,
    location: exp.location.displayLocation,
    meetingPoint: exp.location.meetPoint,
    ...exp.location.coordinates && {
        latitude: exp.location.coordinates.lat,
        longitude: exp.location.coordinates.long,
    },
    categories: exp.categories,
    ageRestriction: exp.ageRestriction,
    duration: exp.duration,
    languages: exp.languages || [],
    includedItems: exp.included || [],
    toBringItems: exp.toBring || [],
    capacity: exp.capacity,
    ...exp.zoomInfo && {
        zoomPMI: exp.zoomInfo.PMI
    },
    pricePerPerson: exp.price.perPerson,
    privatePrice: exp.price.private,
    currency: exp.price.currency,
    ratingValue: exp.rating.value,
    numberOfRatings: exp.rating.numRatings,
    creator: exp.creator
});

exports.occurrenceReducer = occ => ({
    _id: occ._id,
    experience: occ.experience,
    dateStart: occ.dateStart.toISOString(),
    dateEnd: occ.dateEnd.toISOString(),
    spotsLeft: occ.spotsLeft,
    creatorProfit: occ.creatorProfit,
    bookings: occ.bookings
});

exports.bookingReducer = booking => ({
    _id: booking._id
});

exports.userReducer = user => ({
    _id: user._id,
    firstName: user.fstName,
    lastName: user.lstName,
    birthday: user.birthday,
    email: user.email.address,
    phoneNumber: user.phoneNumber,
    photo: user.photo,
    city: user.city,
    savedExperiences: user.savedExperiences,
    bookedExperiences: user.bookedExperiences,
    creator: user.creator
});

exports.creatorReducer = creator => {
    return creator ? {
        _id: creator._id,
        bio: creator.bio,
        user: creator.user,
        stripeProfile: {
            onboarded: creator.stripe ? creator.stripe.onboarded : false,
            accountId: creator.stripe ? creator.stripe.accountId : ''
        }
    } : { _id: '' };
}