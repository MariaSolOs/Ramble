exports.getUserData = (user) => ({
    fstName: user.fstName,
    lstName: user.lstName,
    photo: user.photo,
    city: user.city,
    email: user.email,
    phoneNumber: user.phoneNumber,
    birthday: user.birthday
});