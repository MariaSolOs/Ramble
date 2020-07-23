const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      User = require('../../models/user');
      
const local = new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      session: false
    }, 
    (username, password, done) => {
        User.findOne({email: username})
        .then(user => {
            if (!user || !user.validPassword(password)) {
                done(null, false);
            } else { done(null, user); }
        }).catch(e => done(e));
});

passport.use('local', local);