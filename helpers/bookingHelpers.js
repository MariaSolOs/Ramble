const {compile} = require('handlebars'),
       mjml2html = require('mjml'),
       nodemailer = require('nodemailer');

const Experience = require('../models/experience'),
      Booking = require('../models/booking');

exports.calculatePaymentAmount = async (expId, bookType, numGuests) => {
    try {
        const exp = await Experience.findById(expId, 'price');
        let amount;
        if(bookType === 'public') {
            amount = exp.price.perPerson * numGuests * 100;
        } else if(bookType === 'private') {
            amount = exp.price.private * 100;
        } else {
            throw new Error('Invalid booking type.');
        }
        //Price is multiplied by 100 to use cents
        return {
            amount,
            currency: exp.price.currency,
            rambleFee: amount * 0.2
        }
    } catch(err) {
        throw new Error(`Couldn't calculate amount: ${err}`);
    }
}

exports.timeDateConvert = (inputDate, time) => {
    let date = new Date(inputDate);
    let hours;
    if(time.includes('AM')) {
        if(time.startsWith('12')) {
            hours = 0;
            date.setDate(date.getDate() + 1);
        } else {
            hours = +time.slice(0, time.length - 2);
        }
    } else { //PM time
        hours = +time.slice(0, time.length - 2) + 12;
    }

    const minutes = time.includes(':30')? 30 : 0;

    return new Date((date.setUTCHours(hours, minutes, 0)));
}

exports.sendConfirmationEmail = async (bookingId) => {
    //Find booking and populate necessary info
    const booking = await Booking.findById(bookingId).populate({
        populate: [
        { path: 'experience',
          select: 'title images price creator toBring location',
          populate: {
              path: 'creator',
              populate: {
                  path: 'user',
                  select: 'fstName photo phoneNumber'
              }
          }}, 
        { path: 'occurrence',
          select: 'dateStart timeslot spotsLeft creatorProfit' },
        { path: 'client',
          select: 'email' }]
    }).execPopulate();

    //To format dates
    const format = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const bookingDate = new Date(booking.createdAt).toLocaleDateString('en-US', format);
    const occDate = new Date(booking.occurrence.dateStart).toLocaleDateString('en-US', format);

    //Create mjml
    const template = compile(confirmationEmail);
    const mjml = template({
        price: ((booking.stripe.creatorProfit / 80) * 100).toFixed(2),
        currency: exp.price.currency,
        bookingDate,
        images: booking.exp.images,
        expTitle: booking.experience.title,
        occDate,
        timeslot: booking.occurrence.timeslot,
        numGuests: booking.numPeople,
        hostPic: booking.experience.creator.user.photo,
        hostName: booking.experience.creator.user.fstName,
        hostPhone: booking.experience.creator.user.phoneNumber,
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
        //text: `', 
        html: mjml2html(mjml)
    });
    console.log(emailInfo.messageId);
}