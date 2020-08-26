const mongoose = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose'),
      bcrypt = require('bcrypt');

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: /R[0-9]{3}[A-Z]{5}/
    },
    passwordHash: {
        type: String,
        required: true
    },
    permissions: [{
        type: String,
        enum: ['approveExp', 'addAdmin', 'maintenance', 'seeReviews']
    }]
});

//For authenticating the passwords
AdminSchema.methods.validPassword = function(password) {
    return bcrypt.compare(password, this.passwordHash);
};   
AdminSchema.virtual('password').set(function(value) {
    this.passwordHash = bcrypt.hashSync(value, 10);
});

AdminSchema.plugin(passportLocalMongoose, {
    limitAttempts: true,
    maxAttempts: 10
});
  
module.exports = mongoose.model('Admin', AdminSchema);

