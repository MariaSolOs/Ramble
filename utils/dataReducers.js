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
    languages: exp.languages,
    includedItems: exp.included,
    toBringItems: exp.toBring,
    capacity: exp.capacity,
    ...exp.zoomInfo && {
        zoomPMI: exp.zoomInfo.PMI,
        zoomPassword: exp.zoomInfo.password
    },
    pricePerPerson: exp.price.perPerson,
    pricePrivate: exp.price.private,
    currency: exp.price.currency,
    ratingValue: exp.rating.value,
    numberOfRatings: exp.rating.numRatings,
    creator: exp.creator
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
    savedExperiences: user.savedExperiences.map(this.experienceReducer),
    bookedExperiences: user.bookedExperiences.map(this.experienceReducer),
    creator: user.creator
});

exports.creatorReducer = creator => ({
    _id: creator._id,
    bio: creator.bio,
    user: this.userReducer(creator.user)
});