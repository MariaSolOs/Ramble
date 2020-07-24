const express = require('express'),
      app = express(),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      path = require('path'),
      compression = require('compression'),
      seedDB = require('./experienceSeeds');
require('dotenv').config();

//Setting environment variables
const PORT = process.env.PORT || 5000;

//Mongoose setup 
require('./config/mongoose');

//Seed experience database
//seedDB();

//Passport configuration
const passport = require('passport');
require('./config/passport/passport-facebook');
require('./config/passport/passport-email');
require('./config/passport/passport-google');

//Server setup
app.use(cors({ origin: true, credentials: true }));
//Stripe webhooks aren't parsed to json
app.use(bodyParser.json({
    verify: function(req, res, buf) {
        if(req.originalUrl.startsWith('/stripe/webhook')) {
            req.rawBody = buf.toString();
        }
    }
}));
app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());
//Set logs to :method :url :status :response-time ms - :res[content-length]
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(compression());

//Passport routes
app.use(passport.initialize());
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user)
});
const passportFacebook = require('./routes/auth/auth-facebook');
const passportEmail = require('./routes/auth/auth-email');
const passportGoogle = require('./routes/auth/auth-google');
app.use(passportFacebook);
app.use(passportEmail);
app.use(passportGoogle);

//Experiences API:
const experienceRoutes = require('./routes/experience');
app.use(experienceRoutes);

//Profile API:
const profileRoutes = require('./routes/profile');
app.use(profileRoutes);

//Stripe API:
const stripeRoutes = require('./routes/stripe');
app.use(stripeRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Ramble app on port ${PORT}.`);
});
