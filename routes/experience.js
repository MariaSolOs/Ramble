const express = require('express'),
      router  = express.Router();

//Models
const Experience = require('../models/experience'),
      Occurrence = require('../models/occurrence'),
      Booking = require('../models/booking');

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

//Show bookings for a certain date 
router.get('/api/exp/:id/bookings', (req, res) => {
    const requiredFields = 'timeslot bookings spotsLeft';
    const reqDay = new Date(req.query.date);
    const day = (60 * 60 * 24 * 1000) - 1;
    const endDay = new Date(reqDay.getTime() + day);
    Occurrence.find({expId: req.params.id, 
                     date: {$gte: reqDay, $lt: endDay}}, 
    requiredFields).populate('bookings').exec((err, occ) => {
        if(err || !occ) {
            res.status(404).send({err: "Couldn't find bookings."})
        } else {
            res.status(200).send({ occ });
        }
    });
});

module.exports = router;