const Experience = require('../models/experience');

exports.calculatePaymentAmount = async (expId, bookType, numGuests, promoCode) => {
    try {
        const exp = await Experience.findById(expId, 'price');
        let amount;
        //Prices are multiplied by 100 to use cents
        if(bookType === 'public') {
            amount = exp.price.perPerson * numGuests * 100;
        } else if(bookType === 'private') {
            amount = exp.price.private * 100;
        } else {
            throw new Error('Invalid booking type.');
        }
        let application_fee_amount = amount * 0.2;

        //Apply the discount if applicable
        if(promoCode.length > 0) {
            amount *= 0.8;
            application_fee_amount = undefined;
        }

        return {amount, currency: exp.price.currency, application_fee_amount}
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
            hours = +(time.slice(0, time.length - 2).replace(':30', '.5'));
        }
    } else { //PM time
        hours = +(time.slice(0, time.length - 2).replace(':30', '.5')) + 12;
    }

    const minutes = time.includes(':30')? 30 : 0;

    return new Date((date.setUTCHours(hours, minutes, 0)));
}