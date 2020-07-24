const express = require('express'),
      stripe = require('stripe')(process.env.STRIPE_SECRET_KEY),
      router  = express.Router();

// //Models
// const Experience = require('../models/experience'),
//       Occurrence = require('../models/occurrence'),
//       Booking = require('../models/booking');

//Fetch cities stored in database
router.get('/api/cities', (req, res) => {
    Experience.distinct('location.displayLocation', (err, cities) => {
        if(err) {
            res.status(409).send({err: "Couldn't fetch cities"});
        } else { res.status(200).send({ cities }); }
    });
});

//Get experiences based on location and number of people
router.get('/api/exps', (req, res) => {
    //We only need this for the gallery card
    const displayFields = 'title location.displayLocation images price rating';
    Experience.find({'location.displayLocation': req.query.location, 
                    capacity: {$gte: req.query.numPeople}},
    displayFields, (err, exps) => {
        if(err) { 
            res.status(404).send({err: "Couldn't fetch experiences."});
        } else { res.status(200).send({ exps }); }
    });
});

//Show experience page
router.get('/api/exp/:id', (req, res) => {
    Experience.findById(req.params.id).populate('creator').exec((err, exp) => {
        if(err || !exp) { 
            res.status(404).send({err: "Couldn't find experience."});
        } else { res.status(200).send({ exp }); }
    });
});

//Show occurrences for a certain date 
router.get('/api/exp/:id/occ', (req, res) => {
    const requiredFields = 'timeslot bookings spotsLeft';
    const reqDay = new Date(req.query.date);
    const day = (60 * 60 * 24 * 1000) - 1;
    const endDay = new Date(reqDay.getTime() + day);
    Occurrence.find({expId: req.params.id, 
                     date: {$gte: reqDay, $lt: endDay}}, 
    requiredFields).populate('bookings').exec((err, occ) => {
        if(err || !occ) {
            res.status(404).send({err: "Couldn't find occurrences."});
        } else {
            res.status(200).send({ occ });
        }
    });
});

//For adding a booking to an occurrence
router.post('/api/exp/:id/occ', async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        const reqDay = new Date(req.body.date);
        const day = (60 * 60 * 24 * 1000) - 1;
        const endDay = new Date(reqDay.getTime() + day);
        let occ = await Occurrence.findOne({
                            expId: req.params.id,
                            date: {$gte: reqDay, $lt: endDay},
                            timeslot: req.body.timeslot
                        });
        if(!occ) {
            occ = new Occurrence({
                expId: req.params.id,
                date: reqDay,
                timeslot: req.body.timeslot,
                spotsLeft: experience.capacity
            });
        }
        const booking = new Booking({
            occId: occ._id,
            numPeople: req.body.numGuests,
            stripe: {
                id: req.body.stripeId,
                status: 'pending' //Will be switched to confirmed in webhook
            }
        });
        await booking.save();
        occ.spotsLeft -= booking.numPeople;
        occ.bookings.push(booking);
        await occ.save();
        await stripe.paymentIntents.capture(req.body.stripeId);
        return res.status(200).send({bookingId: booking._id});
    }
    catch(err) {
        console.log(err, err._message);
        await stripe.paymentIntents.cancel(req.body.stripeId);
        return res.status(500).send({err: err._message});
    }
});

module.exports = router;