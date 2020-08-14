const Experience = require('../models/experience');

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
            rambleFee: amount * 0.15
        }
    } catch(err) {
        throw new Error(`Couldn't calculate amount: ${err}`);
    }
}