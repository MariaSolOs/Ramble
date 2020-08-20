require('dotenv').config({ path: '../.env' });
require('../config/mongoose');

const fs = require('fs'),
      {compile} = require('handlebars'),
      mjml2html = require('mjml'),
      nodemailer = require('nodemailer');

const Booking = require('../models/booking'),
      Experience = require('../models/experience'),
      Occurrence = require('../models/occurrence'),
      User = require('../models/user'),
      Creator = require('../models/creator');

const sendConfirmationEmail = async (bookingId) => {
    //Find booking and populate necessary info
    const booking = await Booking.findById(bookingId).populate([
        { path: 'experience',
          select: 'title images price creator toBring location',
          populate: {
              path: 'creator',
              select: 'user',
              populate: {
                  path: 'user',
                  select: 'fstName photo phoneNumber'
              }
          }}, 
        { path: 'occurrence',
          select: 'dateStart timeslot spotsLeft creatorProfit' },
        { path: 'client',
          select: 'email' }
    ]);

    //To format dates
    const format = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const bookingDate = new Date(booking.createdAt).toLocaleDateString('en-US', format);
    const occDate = new Date(booking.occurrence.dateStart).toLocaleDateString('en-US', format);

    //Create mjml
    const source = fs.readFileSync('../emailTemplates/bookingConfirmation.mjml',
                   'utf-8');              
    const template = compile(source);
    const mjml = template({
        price: (booking.stripe.creatorProfit / 80).toFixed(2),
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
        showToBring: booking.experience.toBring.length > 0,
        toBringItems: booking.experience.toBring,
        meetPoint: booking.experience.location.meetPoint
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
    const emailInfo = await transporter.sendMail({
        from: {
            name: 'ramble',
            address: process.env.ZOHO_EMAIL
        }, 
        to: 'majosolano99@gmail.com',
        //to: booking.client.email,
        subject: 'Your booking is confirmed', 
        text: `Your booking is confirmed!
               You're all set for your experience "${booking.experience.title}" on ${
               occDate} (${booking.occurrence.timeslot}). The meeting point is ${
               booking.experience.location.meetPoint} and you will need to bring ${
               booking.experience.toBring.length > 0 ?
               booking.experience.toBring.join(', ') : 'a big smile'}.
               Your host is ${booking.experience.creator.user.fstName} (phone number: ${
               booking.experience.creator.user.phoneNumber}).
               Thank you for experiencing with Ramble!`, 
        html: mjml2html(mjml).html
    });
    console.log(emailInfo.messageId);
}

sendConfirmationEmail('5f3c1f0c51dbcb00174a111a');