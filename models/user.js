const mongoose = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose'),
      bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    fstName: {
        type: String,
        required: true
    },
    lstName: String,
    birthday: Date,
    email: String,
    phoneNumber: String,
    passwordHash: String,
    photo: {
        type: String, 
        default: 'https://res.cloudinary.com/dxod7etqu/image/upload/c_scale,q_31,w_503/v1592335146/Ramble/Users/noPicUser.jpg'
    },
    city: String,
    pastExperiences: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience'
    }],
    savedExperiences: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience'
    }],
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Creator'
    },
    membershipProvider: {
        type: String, 
        required: true,
        enum: ['facebook', 'google', 'email']
    },
    membershipProviderId: String
}, {timestamps: true});

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compare(password, this.passwordHash);
};  
  
UserSchema.virtual('password').set(function(value) {
    this.passwordHash = bcrypt.hashSync(value, 10);
});

UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'});
  
module.exports = mongoose.model('User', UserSchema);

//TODO: Write script to delete idle users