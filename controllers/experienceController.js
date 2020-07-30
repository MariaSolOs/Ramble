//Models
const Experience = require('../models/experience'),
      Occurrence = require('../models/occurrence'),
      Booking = require('../models/booking'),
      User = require('../models/user'), 
      Creator = require('../models/creator');

const helpers = require('../helpers/experienceHelpers');

//Fetch cities stored in database
exports.getLocations = (req, res) => {
    Experience.distinct('location.displayLocation', (err, locations) => {
        if(err) {
            res.status(409).send({err: "Couldn't fetch locations."});
        } else { res.status(200).send({ locations }); }
    });
}


//Get experiences based on location and number of people
exports.getExps = (req, res) => {
    //We only need this for the gallery card
    const displayFields = 'title location.displayLocation images price rating';
    Experience.find({ status: 'approved',
                      'location.displayLocation': req.query.location, 
                      capacity: {$gte: req.query.numPeople}},
    displayFields, (err, exps) => {
        if(err) { 
            res.status(404).send({err: "Couldn't fetch experiences."});
        } else { res.status(200).send({ exps }); }
    });
}

//For all the approving/dissapproving drama
exports.getUnapprovedExps = (req, res) => {
    if(!req.isAdmin || !req.user.permissions.includes('approveExp')) { 
        return res.status(401).send({err: 'Unauthorized.'});
    }
    const displayFields = 'title location.displayLocation images price rating';
    Experience.find({ status: 'pending' }, displayFields,
    (err, exps) => {
        if(err) { 
            res.status(404).send({err: "Couldn't fetch experiences."});
        } else { res.status(200).send({ exps }); }
    });
}
exports.approveExp = (req, res) => {
    if(!req.isAdmin || !req.user.permissions.includes('approveExp')) { 
        return res.status(401).send({err: 'Unauthorized.'});
    }
    Experience.findByIdAndUpdate(req.params.id, {status: req.body.decision},
    async (err, exp) => {
        if(err || !exp) {
            res.status(500).send({err: 'Failed to update experience request.'});
        } else {
            const creator = await User.findOne({creator: exp.creator._id}, 'email');
            res.status(200).send({
                message: `Experience successfully ${req.body.decision}.`,
                creatorEmail: creator.email
            });
        }
    });
}

//Show experience page
exports.getExp = (req, res) => {
    const creatorFields = 'name photo bio stripe';
    Experience.findById(req.params.id).populate('creator', creatorFields)
    .exec((err, exp) => {
        if(err || !exp) { 
            res.status(404).send({err: "Couldn't find experience."});
        } else { res.status(200).send({ exp }); }
    });
}

//Show occurrences for a certain experience
exports.getExpOcurrences = (req, res) => {
    const [dayStart, dayEnd] = helpers.extractDayFrame(req.query.date);
    Occurrence.find({experience: req.params.id, 
                     date: {$gte: dayStart, $lt: dayEnd}}, 
    'timeslot spotsLeft', (err, occ) => {
        if(err || !occ) {
            res.status(404).send({err: "Couldn't find occurrences."});
        } else {
            res.status(200).send({ occ });
        }
    });
}

//For adding a booking to an existing/new occurrence
exports.addBookingToOcurrence = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id, 'capacity creator')
                                 .populate('creator');
        const [dayStart, dayEnd] = helpers.extractDayFrame(req.body.date);
        let occ = await Occurrence.findOne({
                            experience: req.params.id,
                            date: {$gte: dayStart, $lt: dayEnd},
                            timeslot: req.body.timeslot
                        });
        //No ocurrence yet, must create one
        if(!occ) {
            occ = new Occurrence({
                experience: req.params.id,
                date: dayStart,
                timeslot: req.body.timeslot,
                spotsLeft: experience.capacity
            });
        }
        await occ.save();
        const booking = new Booking({
            experience: experience._id,
            occurrence: occ._id,
            client: req.userId,
            numPeople: req.body.numGuests,
            stripe: {
                id: req.body.stripeId,
                status: 'pending' //Will be switched to confirmed in webhook
            }
        });
        await booking.save();
        //Once saved to database, capture payment intent
        res.redirect(307, '/api/stripe/payment-intent/capture');
    }
    catch(err) {
        //Cancel the intent
        res.redirect(307, '/api/stripe/payment-intent/cancel');
    }
}