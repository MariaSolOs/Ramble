const passport = require('passport'),
      FacebookStrategy = require('passport-facebook').Strategy,
      User = require('../../models/user'),
      {generatePromoCode, verifyUserEmail} = require('../../helpers/profileHelpers');

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/api/auth/facebook/`,
    profileFields: ['name', 'email', 'picture.type(large)']
  }, function(accessToken, refreshToken, profile, done) {
        User.findOne({membershipProviderId: profile.id}, async (err, user) => {
            if(err) { return done(err); }
            if(!user) {
                const newUser = new User({
                    fstName: profile._json.first_name,
                    lstName: profile._json.last_name,
                    email: {
                        address: profile._json.email && profile._json.email,
                        verified: false
                    },
                    photo: profile.photos && profile.photos[0].value,
                    membershipProvider: 'facebook',
                    membershipProviderId: profile.id,
                    promoCode: {
                        code: await generatePromoCode(profile._json.first_name),
                    }
                });
                newUser.save((err) => {
                    if(err){ return done(err); }
                    verifyUserEmail(newUser.email, newUser._id);
                    return done(null, newUser);
                });
            } else { return done(err, user); }
        });
    }
));
