const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY),
      {calculatePaymentAmount, timeDateConvert} = require('../helpers/experienceHelpers');

//Models
const Experience = require('../models/experience'),
      Occurrence = require('../models/occurrence'),
      Booking = require('../models/booking'),
      User = require('../models/user');

//Show occurrences for a certain experience
exports.getExpOcurrences = (req, res) => {
    Occurrence.find({experience: req.params.expId, 
                     dateStart: {
                        $gte: new Date(new Date(req.query.date).setUTCHours(0, 0, 0)), 
                        $lte: new Date(new Date(req.query.date).setUTCHours(23, 59, 59))
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
        const dateStart = timeDateConvert(req.body.date, req.body.timeslot.split('-')[0]);
        
        const experience = await Experience.findById(req.params.expId, 'capacity creator')
                                 .populate('creator');

        //Find the occurrence
        const occ = await Occurrence.findOne({
                            experience: experience._id,
                            dateStart,
                            timeslot: req.body.timeslot
                        });

        //Create booking
        const {amount, application_fee_amount} = await calculatePaymentAmount(
                            experience.id, 
                            req.body.bookType, 
                            req.body.numGuests,
                            req.body.promoCode
                        );

        const stripeDetails = {
            paymentIntentId: req.body.payIntentId,
            cardToUse: req.body.cardToUse,
            paymentCaptured: false,
            creatorProfit: application_fee_amount? amount * 0.8 : amount,
            promoCode: req.body.promoCode
        }
        const booking = new Booking({
            experience: experience._id,
            occurrence: occ._id,
            client: req.userId,
            numPeople: req.body.numGuests,
            bookType: req.body.bookType,
            stripe: { ...stripeDetails }
        });

        //Add booking to occurrence and update
        occ.spotsLeft -= booking.numPeople;
        occ.bookings.push(booking);

        //Add booking to creator's requests
        experience.creator.bookingRequests.push(booking);

        //Update promo code use (if applicable)
        if(req.body.promoCode.length > 0) {
            await User.findOneAndUpdate({'promoCode.code': req.body.promoCode}, {
                $addToSet: {'promoCode.usedBy': req.userId}
            });
        }

        //Send card info to display in the booking submitted page
        let cardInfo = {};
        if(req.body.payIntentId) {
            const {payment_method} = await stripe.paymentIntents.retrieve(
                req.body.payIntentId, 
                {expand: ['payment_method']}
            );
            cardInfo = {
                brand: payment_method.card.brand,
                last4: payment_method.card.last4
            }
        }

        //Save all changes
        await occ.save();
        await booking.save();
        await experience.creator.save();

        res.status(201).send({
            message: 'Successfully added booking.',
            cardInfo
        });
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