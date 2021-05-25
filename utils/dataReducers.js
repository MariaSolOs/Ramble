exports.experienceReducer = (exp) => ({
    _id: exp._id,
    status: exp.status.toUpperCase(),
    title: exp.title,
    description: exp.description,
    images: exp.images,
    location: exp.location.displayLocation,
    meetingPoint: exp.location.meetPoint,
    ...exp.location.coordinates && {
        latitude: exp.location.coordinates.lat,
        longitude: exp.location.coordinates.long,
    },
    categories: exp.categories.map(categ => categ.toUpperCase()),
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
    creator: exp.creator,
    availableFromDate: exp.avail.from,
    availableToDate: exp.avail.to,
    availabilitySchedule: Object.entries(exp.avail.schedule).map(([day, slots]) => ({
        day, slots
    }))
});

exports.userReducer = (user) => ({
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