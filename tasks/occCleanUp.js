const Occurrence = require('../models/occurrence'),
      Booking = require('../models/booking'),
      User = require('../models/user');

const occCleanUp = async () => {
    console.log('JOB BEGINS: CLEAN OCCURRENCES.');
    try {
        const yesterday = new Date();
        yesterday.setDate(new Date().getDate() - 1);
        const occs = await Occurrence.find({date: {$lte: yesterday}}).populate([
                        { path: 'experience' },
                        { path: 'bookings', select: 'client' }
                    ]);
        for(const occ of occs) {
            for(const booking of occ.bookings) {
                //Update users' past experiences
                await User.findByIdAndUpdate(booking.client, 
                {$addToSet: {pastExperiences: occ.experience._id}});
            }
            //Delete bookings
            const delBookings = occ.bookings.map(booking => booking._id);
            await Booking.deleteMany({_id: {$in: delBookings}});
        }
        await Occurrence.deleteMany({date: {$lte: yesterday}});
        console.log('JOB SUCCESSULLY COMPLETED: CLEAN OCCURRENCES.');
    } catch(err) {
        console.log(`JOB FAILED: CLEAN OCCURRENCES - ${err}`);
    }
}
occCleanUp();

