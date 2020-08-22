const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      Admin = require('../../models/admin');
      
const local = new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      session: false
    }, (username, password, done) => {
        Admin.findOne({username}, (err, admin) => {
            if(!err && admin) {
                admin.validPassword(password).then(res => {
                    if(res) { return done(null, admin); }
                    else { done(null, false); }
                });
            } else { done(null, false); }
        });
});

passport.use('local-admin', local);