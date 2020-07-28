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

//Server setup
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
//Stripe webhooks aren't parsed to json
app.use(bodyParser.json({
    verify: function(req, res, buf) {
        if(req.originalUrl.startsWith('/api/stripe/webhook')) {
            req.rawBody = buf.toString();
        }
    }
}));
app.use(bodyParser.urlencoded({extended: true}));
//Set logs to :method :url :status :response-time ms - :res[content-length]
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(compression());

//Passport configuration and routes
const passport = require('passport');
require('./config/passport/passport-facebook');
require('./config/passport/passport-email');
require('./config/passport/passport-google');
require('./config/passport/passport-admin');
app.use(passport.initialize());
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user)
});
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

//Stripe API:
const stripeRoutes = require('./routes/stripe');
app.use('/api/stripe', stripeRoutes);

//Experiences API:
const experienceRoutes = require('./routes/experience');
app.use('/api/exp', experienceRoutes);

//Profile API:
const profileRoutes = require('./routes/profile');
app.use('/api/profile', profileRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Ramble app on port ${PORT}.`);
});

