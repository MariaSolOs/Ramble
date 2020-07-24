const passport = require('passport'),
      FacebookStrategy = require('passport-facebook').Strategy,
      User = require('../../models/user');

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['name', 'email', 'picture.type(large)'],
  },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({membershipProviderId: profile.id}, (err, user) => {
            if(err) { return done(err); }
            if(!user) {
                const newUser = new User({
                    fstName: profile._json.first_name,
                    lstName: profile._json.last_name,
                    email: profile._json.email ? 
                              profile._json.email : profile._json.first_name,
                    photo: profile.photos && profile.photos[0].value,
                    membershipProvider: 'facebook',
                    membershipProviderId: profile.id
                });
                newUser.save((err) => {
                    if (err){ console.log(err); }
                    return done(err, newUser);
                });
            } else { return done(err, user); }
        });
}));