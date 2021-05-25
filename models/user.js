const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

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
        },
        verified: Boolean
    },
    phoneNumber: {
        type: String,
        validate: /\(([0-9]{3})\) ([0-9]{3})-([0-9]{4})/
    },
    passwordHash: String,
    photo: {
        type: String, 
        default: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,q_31,w_503/v1592335146/Ramble/Users/noPicUser.jpg`
    },
    city: {
        type: String,
        default: ''
    },
    savedExperiences: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience',
        autopopulate: true
    }],
    bookedExperiences: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience',
        autopopulate: true
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Creator',
        autopopulate: true
    },
    promoCode: {
        code: {
            type: String, 
            required: true,
            default: function() {
                const codeName = this.fstName ? this.fstName.toUpperCase() : 'RAMBLE';
                const codeNumber = (Date.now() + Math.random()).toString().slice(0, 5);

                return codeName + codeNumber;
            }
        },
        usedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    lastLogin: {
        type: Date,
        default: new Date()
    }
});

UserSchema.plugin(require('mongoose-autopopulate'));

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.passwordHash);
}
UserSchema.virtual('password').set(function(value) {
    this.passwordHash = bcrypt.hashSync(value, 10);
});
  
module.exports = mongoose.model('User', UserSchema);

//TODO: Write script to delete idle users