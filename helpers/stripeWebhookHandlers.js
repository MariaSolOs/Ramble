const fs = require('fs'),
      path = require('path'),
      {compile} = require('handlebars'),
      mjml2html = require('mjml'),
      nodemailer = require('nodemailer');

const Creator = require('../models/creator'),
      Occurrence = require('../models/occurrence'),
      Booking = require('../models/booking'),
      CompanyReceipt = require('../models/companyReceipt');

exports.handleSuccessfulPaymentIntent = async (intent) => {
    try {
        //Find booking
        let booking; 
        if(intent.metadata.bookingId) {
            booking = await Booking.findById(intent.metadata.bookingId)
                      .populate('occurrence');
        } else {
            booking = await Booking.findOne({'stripe.paymentIntentId': intent.id})
                      .populate('occurrence');
        }
        if(!booking) { 
            return 'No booking found with a matching intent ID'; 
        }

        //Make sure we don't go through this twice
        if(booking.stripe.paymentCaptured) {
            return 'Payment intent was already managed.';
        }

        //Update occurrence and creator's requests
        booking.occurrence.creatorProfit += booking.stripe.creatorProfit;
        booking.stripe.paymentCaptured = true;
        await booking.occurrence.save();
        await booking.save();
        await Creator.findByIdAndUpdate(intent.metadata.creatorId, 
              {$pull: {bookingRequests: booking._id}});

        //Create company receipt
        await CompanyReceipt.create({
            booking: booking._id,
            total: intent.amount, 
            creatorProfit: booking.stripe.creatorProfit,
            rambleProfit: booking.stripe.rambleGain,
            taxGST: booking.stripe.taxGST,
            taxQST: booking.stripe.taxQST,
        });

        //Get information for confirmation email
        await booking.populate([
            { path: 'experience',
              select: 'title images price creator toBring location zoomInfo',
              populate: {
                  path: 'creator',
                  select: 'user',
                  populate: {
                      path: 'user',
                      select: 'fstName photo phoneNumber'
                  }
              }}, 
            { path: 'client',
              select: 'email' }
        ]).execPopulate();

        //To format dates
        const format = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        const bookingDate = new Date(booking.createdAt)
                            .toLocaleDateString('en-US', format);
        const occDate = new Date(booking.occurrence.dateStart)
                        .toLocaleDateString('en-US', format);

        //Create mjml
        const source = fs.readFileSync(path.resolve(__dirname, 
                       '../emailTemplates/bookingConfirmation.mjml'), 'utf-8');              
        const template = compile(source);
        const mjml = template({
            price: (intent.amount / 100).toFixed(2),
            currency: booking.experience.price.currency,
            bookingDate,
            images: booking.experience.images,
            expTitle: booking.experience.title,
            occDate,
            timeslot: booking.occurrence.timeslot,
            numGuests: booking.numPeople,
            hostPic: booking.experience.creator.user.photo,
            hostName: booking.experience.creator.user.fstName,
            hostPhone: booking.experience.creator.user.phoneNumber,
            toBringItems: booking.experience.toBring,
            ...(booking.experience.location.meetPoint &&
                {meetPoint: booking.experience.location.meetPoint}
            ),
            ...(booking.experience.zoomInfo &&
                {zoomPMI: booking.experience.zoomInfo.PMI,
                 zoomPassword: booking.experience.zoomInfo.password}
            )
        });

        //Send confirmation email
        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 465,
            secure: true, 
            auth: {
                user: process.env.ZOHO_EMAIL, 
                pass: process.env.ZOHO_PASSWORD
            }
        });
        const meetDetails = booking.experience.zoomInfo?
            `The zoom information is PMI: ${booking.experience.zoomInfo.PMI} and ${
            booking.experience.zoomInfo.password}` : `The meeting point is ${
            booking.experience.location.meetPoint}`;
        await transporter.sendMail({
            from: {
                name: 'ramble',
                address: process.env.ZOHO_EMAIL
            }, 
            to: booking.client.email,
            subject: 'Your booking is confirmed', 
            text: `Your booking is confirmed!
            You're all set for your experience "${booking.experience.title}" on ${
            occDate} (${booking.occurrence.timeslot}). ${
            meetDetails} and you will need to bring ${
            booking.experience.toBring.length > 0 ?
            booking.experience.toBring.join(', ') : 'a big smile'}.
            Your host is ${booking.experience.creator.user.fstName} (phone number: ${
            booking.experience.creator.user.phoneNumber}).
            Thank you for experiencing with Ramble!`, 
            html: mjml2html(mjml).html
        });

        return 'Successfully handled payment intent.';
    } catch(err) {
        return `Failed to handle payment intent: ${err}.`;
    }
}

exports.handleCancelledPaymentIntent = async (intent) => {
    try {
        //Find booking
        const booking = await Booking.findOneAndDelete(
                            {'stripe.paymentIntentId': intent.id}
                        );
        if(!booking) { 
            return 'No booking found with a matching intent ID'; 
        }
        //Update occurrence and creator's requests
        await Creator.findByIdAndUpdate(intent.metadata.creatorId, 
              {$pull: {bookingRequests: booking._id}});
        await Occurrence.findByIdAndUpdate(booking.occurrence, {
            $pull: {bookings: booking._id},
            $inc: {spotsLeft: booking.numPeople}
        });

        return 'Successfully cancelled payment intent.';
    } catch(err) {
        return `Failed to cancel payment intent: ${err}.`;
    }
}