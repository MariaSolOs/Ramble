#!/usr/bin/env node

require('../build/dotenv.config');
require('../build/mongoDB.config');

const {
    Occurrence,
    Booking,
    Creator
} = require('../build/mongodb-models');

const occurrenceCleanup = async () => {
    console.log('JOB STARTS: OCCURRENCE CLEAN UP');
    try {
        const yesterday = new Date();
        yesterday.setDate(new Date().getDate() - 1);
        yesterday.setUTCHours(23, 59, 59);

        // Find all old occurrences
        const occurrences = await Occurrence.find({
            dateEnd: { $lt: yesterday }
        }, 'bookings').lean();

        let bookingsToDelete = [];
        for (const occ of occurrences) {
            for (const bookingId of occ.bookings) {
                // Just to be sure, delete booking from creator's requests
                await Creator.findOneAndUpdate(
                    { bookingRequests: bookingId }, 
                    { $pull: { bookingRequests: bookingId } }
                );
            }
            bookingsToDelete = bookingsToDelete.concat(occ.bookings);
        }

        const bookingCount = await Booking.deleteMany({ _id: { $in: bookingsToDelete }});
        const occurrenceCount = await Occurrence.deleteMany({ 
            dateEnd: { $lt: yesterday 
        }});
        console.log(`JOB SUCCESS: CLEAN OCCURRENCES. DELETED OCC: ${
        occurrenceCount.deletedCount}, DELETED BOOKINGS: ${bookingCount.deletedCount}`);
        
    } catch(err) {
        console.log(`JOB FAILED: OCCURRENCE CLEAN UP - ${err}`);
    }
    process.exit();
}
occurrenceCleanup();

