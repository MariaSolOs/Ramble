require('dotenv').config({ path: './.env' });
const express = require('express'),
      app = express(),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      path = require('path'),
      compression = require('compression'),
      {handleError} = require('./helpers/errorHandler'),
      seedDB = require('./experienceSeeds');

//Setting environment variables
const PORT = process.env.PORT || 5000;

//Global configurations
require('./config/mongoose');
require('./config/cloudinary');

//Set up the socket for notifications
const server = require('http').createServer(app),
      io = require('socket.io')(server, {path: '/ramble/socket.io'});
require('./config/socket')(io);

//Seed experience database
//seedDB();

//Server setup
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
//Stripe webhooks aren't parsed to json
app.use(bodyParser.json({
    limit: '20mb',
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

//APIs:
const stripeRoutes = require('./routes/stripe');
app.use('/api/stripe', stripeRoutes);

const experienceRoutes = require('./routes/experience');
app.use('/api/exp', experienceRoutes);

const occurrenceRoutes = require('./routes/occurrence');
app.use('/api/occ', occurrenceRoutes);

const profileRoutes = require('./routes/profile');
app.use('/api/profile', profileRoutes);

const creatorRoutes = require('./routes/creator');
app.use('/api/creator', creatorRoutes);

const emailRoutes = require('./routes/email');
app.use('/api/email', emailRoutes);

app.use((err, req, res, next) => {
    handleError(err, req, res);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

server.listen(PORT, () => {
    console.log(`Ramble app on port ${PORT}.`);
});

