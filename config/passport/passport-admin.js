const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      Admin = require('../../models/admin');
      
const local = new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      session: false
    }, (username, password, done) => {
        Admin.findOne({username})
        .then(admin => {
            if (!admin || !admin.validPassword(password)) {
                done(null, false);
            } else { done(null, admin); }
        }).catch(e => done(e));
});

passport.use('local-admin', local);