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
    phoneNumber: {
        type: String,
        validate: /\(([0-9]{3})\) ([0-9]{3})-([0-9]{4})/
    },
    passwordHash: String,
    photo: {
        type: String, 
        default: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,q_31,w_503/v1592335146/Ramble/Users/noPicUser.jpg`
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
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Creator'
    },
    membershipProvider: {
        type: String, 
        required: true,
        enum: ['facebook', 'google', 'email']
    },
    membershipProviderId: String,
    stripe: {
        customerId: String
    }
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
