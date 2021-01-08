const Experience = require('../models/experience'),
      Occurrence = require('../models/occurrence');

exports.calculatePaymentAmount = async (expId, bookType, numGuests, promoCode) => {
    try {
        const exp = await Experience.findById(expId, 'price');
        let expPrice;
        // Prices are multiplied by 100 to use cents
        if(bookType === 'public') {
            expPrice = exp.price.perPerson * numGuests * 100;
        } else if(bookType === 'private') {
            expPrice = exp.price.private * 100;
        } else {
            throw new Error('Invalid booking type.');
        }

        // Compute taxes
        const taxGST = 0.05 * expPrice;
        const taxQST = 0.09975 * expPrice;

        // We keep the taxes
        const rambleGain = expPrice * 0.2;
        let application_fee_amount = rambleGain + taxGST + taxQST;
        let amount = expPrice + taxGST + taxQST;

        // Apply the discount if applicable
        if(promoCode.length > 0) {
            amount -= rambleGain;
            rambleGain = 0;
            application_fee_amount -= rambleGain;
        }

        return {
            amount,
            currency: exp.price.currency,
            application_fee_amount,
            rambleGain,
            taxGST, 
            taxQST
        }
    } catch(err) {
        throw new Error(`Couldn't calculate payment amount: ${err}`);
    }
}

const timeDateConvert = (inputDate, time) => {
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
        if(time.startsWith('12')) {
            hours = +(time.slice(0, time.length - 2).replace(':30', '.5'));
        } else {
            hours = +(time.slice(0, time.length - 2).replace(':30', '.5')) + 12;
        }
    }

    const minutes = time.includes(':30')? 30 : 0;

    return new Date((date.setUTCHours(hours, minutes, 0)));
}
exports.timeDateConvert = timeDateConvert;

exports.createExpOccurrences = async (exp) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 
                  'Thursday', 'Friday', 'Saturday'];
    
    const endDate = new Date(exp.avail.to);
    for(const date = new Date(Math.max(new Date(exp.avail.from), new Date())); 
        date <= endDate; date.setDate(date.getDate() + 1)) {
        const timeslots = exp.avail.schedule.get(days[date.getDay()]);
        if(timeslots) {
            for(const slot of timeslots) {
                const dateStart = timeDateConvert(date, slot.split('-')[0]);
                const dateEnd = timeDateConvert(date, slot.split('-')[1]);
                await Occurrence.create({
                    experience: exp._id,
                    dateStart,
                    dateEnd,
                    timeslot: slot,
                    spotsLeft: exp.capacity,
                    creatorProfit: 0
                });
            }
        }
    }
}
    