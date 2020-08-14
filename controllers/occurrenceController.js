//Models
const Experience = require('../models/experience'),
      Occurrence = require('../models/occurrence'),
      Booking = require('../models/booking'),
      {calculatePaymentAmount} = require('../helpers/bookingHelpers'),
      {startOfDay, endOfDay} = require('date-fns');

//Show occurrences for a certain experience
exports.getExpOcurrences = (req, res) => {
    Occurrence.find({experience: req.params.expId, 
                     date: {
                        $gte: startOfDay(new Date(req.query.date)), 
                        $lte: endOfDay(new Date(req.query.date))
                    }}, 
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
        const experience = await Experience.findById(req.params.expId, 'capacity creator')
                                 .populate('creator');

        //Find or create the occurrence
        let occ = await Occurrence.findOne({
                            experience: experience._id,
                            date: {
                                $gte: startOfDay(new Date(req.body.date)), 
                                $lte: endOfDay(new Date(req.body.date))
                            },
                            timeslot: req.body.timeslot
                        });
        if(!occ) {
            occ = new Occurrence({
                experience: experience._id,
                date: startOfDay(new Date(req.body.date)),
                timeslot: req.body.timeslot,
                spotsLeft: experience.capacity,
                creatorProfit: 0
            });
        }

        //Create booking
        const {amount} = await calculatePaymentAmount(
                            experience.id, 
                            req.body.bookType, 
                            req.body.numGuests
                        );
        const stripeDetails = {
            paymentIntentId: req.body.payIntentId,
            cardToUse: req.body.cardToUse,
            paymentCaptured: false,
            creatorProfit: amount * 0.85
        }
        const booking = new Booking({
            experience: experience._id,
            occurrence: occ._id,
            client: req.userId,
            numPeople: req.body.numGuests,
            stripe: { ...stripeDetails }
        });

        //Add booking to occurrence and update
        occ.spotsLeft -= booking.numPeople;
        occ.bookings.push(booking);

        //Add booking to creator's requests
        experience.creator.bookingRequests.push(booking);

        await occ.save();
        await booking.save();
        await experience.creator.save();
        res.status(201).send({message: 'Successfully added booking.'});
    }
    catch(err) {
        //If something goes wrong, cancel the intent (if applicable)
        if(req.body.payIntentId) {
            res.redirect(307, '/api/stripe/payment-intent/cancel');
        } else {
            res.status(409).send({err: "Couldn't add booking."});
        }
    }
}