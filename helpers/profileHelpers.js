const Experience = require('../models/experience'),
      Ocurrence = require('../models/occurrence');

exports.getUserData = (user) => ({
    fstName: user.fstName,
    lstName: user.lstName,
    photo: user.photo,
    city: user.city,
    email: user.email,
    phoneNumber: user.phoneNumber,
    birthday: user.birthday
});

// exports.getCreatorData = async (user) => {
//     if(!user.creator) {
//         return null;
//     }
//     const createdExps = await Experience.find({creator: user.creator._id})
//                               .distinct('_id');
//     const bookings = [];

//     console.log(bookings)
//     return {
//         createdExps: 
//     }
// }