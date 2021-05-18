const Occurrence = require('./models/occurrence');

module.exports = async () => {
    const occs = await Occurrence.find({ experience: '60675544a96a41001792875a' });

    for (occ of occs) {
        if (occ.bookings.length === 0) {
            occ.spotsLeft = 30;
            await occ.save();
        }
    }

    // console.log('Done updating!');
}