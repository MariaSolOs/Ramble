//Models
const Experience = require('../models/experience'),
      Occurrence = require('../models/occurrence'),
      Booking = require('../models/booking');

const helpers = require('../helpers/experienceHelpers');
const e = require('express');

//Fetch cities stored in database
exports.getCities = (req, res) => {
    Experience.distinct('location.displayLocation', (err, cities) => {
        if(err) {
            res.status(409).send({err: "Couldn't fetch cities"});
        } else { res.status(200).send({ cities }); }
    });
}

//Get experiences based on location and number of people
exports.getExps = (req, res) => {
    //We only need this for the gallery card
    const displayFields = 'title location.displayLocation images price rating';
    Experience.find({ approved: true,
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
    Experience.find({ approved: false }, displayFields,
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
    Experience.findByIdAndUpdate(req.params.id, {approved: true},
    (err, exp) => {
        if(err || !exp) {
            res.status(500).send({err: 'Failed to update experience.'});
        } else {
            res.status(200).send({message: 'Experience successfully approved'});
        }
    });
}

//Show experience page
exports.getExp = (req, res) => {
    Experience.findById(req.params.id).populate('creator')
    .exec((err, exp) => {
        if(err || !exp) { 
            res.status(404).send({err: "Couldn't find experience."});
        } else { res.status(200).send({ exp }); }
    });
}

//Show occurrences for a certain experience
exports.getExpOcurrences = (req, res) => {
    const [dayStart, dayEnd] = helpers.extractDayFrame(req.query.date);
    const requiredFields = 'timeslot bookings spotsLeft';
    const now = new Date();
    console.log(now, dayStart)
    Occurrence.find({experience: req.params.id, 
                     date: {$gte: dayStart, $lt: dayEnd}}, 
    requiredFields).populate('bookings').exec((err, occ) => {
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
        const experience = await Experience.findById(req.params.id, 'capacity');
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
            occurrence: occ._id,
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
