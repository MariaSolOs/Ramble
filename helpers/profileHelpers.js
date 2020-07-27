exports.getUserData = (user, token) => ({
    token,
    fstName: user.fstName,
    lstName: user.lstName,
    photo: user.photo,
    city: user.city,
    email: user.email,
    phoneNumber: user.phoneNumber,
    birthday: user.birthday
});
exports.getUserExps = (user) => ({
    pastExps: user.pastExperiences,
    savedExps: user.savedExperiences
});