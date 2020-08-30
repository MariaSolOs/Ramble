const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      User = require('../../models/user');
      
const local = new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      session: false
    }, (username, password, done) => {
        User.findOne({'email.address': username}, (err, user) => {
            if(!err && user) {
                user.validPassword(password).then(res => {
                    if(res) { return done(null, user); }
                    else { done(null, false); }
                });
            } else { done(null, false); }
        });
    }
);

passport.use('local', local);