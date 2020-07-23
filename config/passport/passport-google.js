const passport = require('passport'),
      GoogleStrategy = require('passport-google-oauth20').Strategy,
      User = require('../../models/user');

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    }, (accessToken, refreshToken, profile, done) => {
            User.findOne({membershipProviderId: profile.id}, (err, user) => {
                if(err) { return done(err); } 
                if(!user) {
                    const newUser = new User({
                        fstName: profile._json.given_name,
                        lstName: profile._json.family_name,
                        email: profile._json.email,
                        membershipProvider: 'google',
                        membershipProviderId: profile.id
                    });
                    newUser.save((err) => {
                        if (err){ console.log(err); }
                        return done(err, newUser);
                    });
                } else { return done(err, user); }
            });
        }
));

//TODO: Update user info if different