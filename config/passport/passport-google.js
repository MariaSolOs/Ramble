const passport = require('passport'),
      GoogleStrategy = require('passport-google-oauth20').Strategy,
      User = require('../../models/user'),
      {generatePromoCode} = require('../../helpers/profileHelpers');

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
    }, (accessToken, refreshToken, profile, done) => {
            User.findOne({membershipProviderId: profile.id}, async (err, user) => {
                if(err) { return done(err); } 
                if(!user) {
                    const newUser = new User({
                        fstName: profile._json.given_name,
                        lstName: profile._json.family_name,
                        photo: profile._json.picture,
                        email: {
                            address: profile._json.email,
                            verified: false
                        },
                        membershipProvider: 'google',
                        membershipProviderId: profile.id,
                        promoCode: {
                            code: await generatePromoCode(profile._json.given_name),
                        }
                    });
                    newUser.save((err) => {
                        if (err){ console.log(err); }
                        return done(err, newUser);
                    });
                } else { return done(err, user); }
            });
        }
));

