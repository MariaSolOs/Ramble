const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY),
      {calculatePaymentAmount, timeDateConvert} = require('../helpers/experienceHelpers'),
      {ErrorHandler} =  require('../helpers/errorHandler'),
      fs = require('fs'),
      path = require('path'),
      {compile} = require('handlebars'),
      mjml2html = require('mjml'),
      sgMail = require('../config/sendgrid');

//Models
const Experience = require('../models/experience'),
      Occurrence = require('../models/occurrence'),
      Booking = require('../models/booking'),
      User = require('../models/user');

//Show occurrences for a certain experience
exports.getExpOcurrences = (req, res, next) => {
    Occurrence.find({experience: req.params.expId, 
                     dateStart: {
                        $gte: new Date(new Date(req.query.date).setUTCHours(0, 0, 0)), 
                        $lte: new Date(new Date(req.query.date).setUTCHours(23, 59, 59))
    }}, (err, occs) => {
        if(err || !occs) {
            return next(new ErrorHandler(409, "Couldn't find occurrences."));
        } else {
            res.status(200).send({ occs });
        }
    });
}

//For adding a booking to an existing/new occurrence
exports.addBookingToOcurrence = async (req, res, next) => {
    try {
        const experience = await Experience.findById(req.params.expId, 
                           'capacity creator title')
                           .populate({
                                path: 'creator',
                                select: 'bookingRequests user',
                                populate: {
                                    path: 'user',
                                    select: 'email'
                                }
                           });

        //Find the occurrence
        const occ = await Occurrence.findOne({
                        experience: experience._id,
                        dateStart: {
                            $gte: new Date(new Date(req.body.date).setUTCHours(0, 0, 0)), 
                            $lte: new Date(new Date(req.body.date).setUTCHours(23, 59, 59))
                        },
                        timeslot: req.body.timeslot
                    });

        //Create booking
        const {amount, rambleGain, taxGST, taxQST} = 
            await calculatePaymentAmount(
                experience.id, 
                req.body.bookType, 
                req.body.numGuests,
                req.body.promoCode
            );

        const expPrice = amount - taxGST - taxQST;
        //Creator profit depends on if a promo was applied
        const creatorProfit = rambleGain > 0? 0.8 * expPrice : expPrice;

        const booking = new Booking({
            experience: experience._id,
            occurrence: occ._id,
            client: req.userId,
            numPeople: req.body.numGuests,
            bookType: req.body.bookType,
            stripe: { 
                paymentIntentId: req.body.payIntentId,
                cardToUse: req.body.cardToUse,
                paymentCaptured: false,
                creatorProfit,
                promoCode: req.body.promoCode,
                rambleGain: rambleGain,
                taxGST,
                taxQST
            }
        });

        //Add booking to occurrence and update
        occ.spotsLeft -= booking.numPeople;
        occ.bookings.push(booking);

        //Add booking to creator's requests
        experience.creator.bookingRequests.push(booking);

        //Send email notification to creator
        const source = fs.readFileSync(path.resolve(__dirname, 
                       '../emailTemplates/newBooking.mjml'), 'utf-8');              
        const template = compile(source);
        const mjml = template({
            clientName: req.user.fstName,
            expName: experience.title,
            dashboardLink: `${process.env.CLIENT_URL}/api/email/${
                            experience.creator.user._id}/creator-dashboard`
        });

        await sgMail.send({
            from: {
                email: process.env.ZOHO_EMAIL, 
                name: 'ramble'
            },
            to: experience.creator.user.email.address,
            subject: 'You have a new booking request', 
            text: `You have a new booking! ${req.user.fstName} just booked your experience ${
            experience.title}. Log in to your creator dashboard to check their booking request.`, 
            html: mjml2html(mjml).html
        });

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
    } catch(err) {
        //If something goes wrong, cancel the intent (if applicable)
        if(req.body.payIntentId) {
            req.body.stripeId = req.body.payIntentId;
            res.redirect(307, '/api/stripe/payment-intent/cancel');
        } else {
            next(new ErrorHandler(409, err.message));
        }
    }
}

exports.editExpOccs = async (req, res, next) => {
    try {
        //Get necessary info to create occurrences
        const exp = await Experience.findById(req.params.expId, 'capacity');

        let createdCount = 0;
        const deleteIds = [];

        //Add occurrences
        for(const slot of req.body.changes.toAdd) {
            const occExists = await Occurrence.exists({
                experience: exp._id,
                dateStart: {
                    $gte: new Date(new Date(req.body.date).setUTCHours(0, 0, 0)), 
                    $lte: new Date(new Date(req.body.date).setUTCHours(23, 59, 59))
                },
                timeslot: slot
            });
            if(occExists) { continue; }
            else {
                await Occurrence.create({
                    experience: exp._id,
                    dateStart: timeDateConvert(req.body.date, slot.split('-')[0]),
                    dateEnd: timeDateConvert(req.body.date, slot.split('-')[1]),
                    timeslot: slot,
                    spotsLeft: exp.capacity,
                    creatorProfit: 0
                });
                createdCount += 1;
            }
        }

        //Find occurrences that can be deleted
        for(const slot of req.body.changes.toDel) {
            const occ = await Occurrence.findOne({
                experience: exp._id,
                dateStart: {
                    $gte: new Date(new Date(req.body.date).setUTCHours(0, 0, 0)), 
                    $lte: new Date(new Date(req.body.date).setUTCHours(23, 59, 59))
                },
                timeslot: slot
            }, 'bookings');
            if(!occ || 
                occ.bookings.length > 0 || 
                req.body.requestsOccs.includes(occ._id)) { 
                continue; 
            } else { deleteIds.push(occ._id); }
        }

        //Delete occurrences
        const {deletedCount} = await Occurrence.deleteMany({_id: {$in: deleteIds}});

        res.status(200).send({deletedCount, createdCount});
    } catch(err) {
        next(new ErrorHandler(500, err.message));
    }
}