const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// TODO: Remove unused fields and rename fields      
const UserSchema = new mongoose.Schema({
    fstName: {
        type: String,
        required: true,
        default: ''
    },

    lstName: {
        type: String,
        default: ''
    },

    birthday: Date,

    email: {
        address: {
            type: String,
            default: ''
        }
    },

    phoneNumber: {
        type: String,
        validate: /\(([0-9]{3})\) ([0-9]{3})-([0-9]{4})/
    },

    passwordHash: String,

    photo: String,

    city: String,

    savedExperiences: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience'
    }],

    bookedExperiences: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience'
    }],

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Creator'
    },

    lastLogin: {
        type: Date,
        default: new Date()
    }
});

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.passwordHash);
}
UserSchema.virtual('password').set(function(value) {
    this.passwordHash = bcrypt.hashSync(value, 10);
});
  
module.exports = mongoose.model('User', UserSchema);

//TODO: Write script to delete idle users