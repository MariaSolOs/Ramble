// const Experience = require('../models/experience'),
    //   Ocurrence = require('../models/occurrence'),
    //   Booking = require('../models/booking');

exports.getUserData = (user) => ({
    fstName: user.fstName,
    lstName: user.lstName,
    photo: user.photo,
    city: user.city,
    email: user.email,
    phoneNumber: user.phoneNumber,
    birthday: user.birthday
});

exports.getUserExperiences = async (user) => {
    //We only need this for experience cards
    const expFields = 'title location.displayLocation images price rating';
    const {pastExperiences, savedExperiences} = 
        await user.populate('pastExperiences', expFields)
                  .populate('savedExperiences', expFields)
                  .execPopulate();
    return { pastExperiences, savedExperiences }
}

exports.getCreatorData = async (creator) => {
    if(!creator) {
        return null;
    }
    const {bookingRequests} = await creator.populate({
        path: 'bookingRequests',
        select: 'client experience occurrence',
        populate: [
        { path: 'experience',
          select: 'title images capacity' }, 
        { path: 'occurrence',
          select: 'date timeslot spotsLeft' },
        { path: 'client',
          select: 'fstName city photo' }
        ]
    }).execPopulate();

    return {
        creatorId: creator._id,
        bookingRequests
    }
}