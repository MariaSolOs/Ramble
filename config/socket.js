const mongoose = require('mongoose'),
      db = mongoose.connection,
      jwt = require('jsonwebtoken');

const Booking = require('../models/booking');

module.exports = (io) => {
    db.on('error', console.error.bind(console, 'Mongoose connection Error: '));

    db.once('open', () => {
        const notifCollection = db.collection('notifications');
        const notifChangeStream = notifCollection.watch();

        const bookingCollection = db.collection('bookings');
        const bookingChangeStream = bookingCollection.watch();

        io.use((socket, next) => {
            if(socket.handshake.query && socket.handshake.query.token) {
                jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, 
                {issuer: 'RAMBLE:API'}, (err, decoded) => {
                    if(err) { next(new Error('Socket authentication error')); }
                    else { next(); }
              });
            }
            else { next(new Error('Socket authentication error')); }    
        }).on('connection', (socket) => {   
            //Notification changes
            notifChangeStream.on('change', (change) => {
                if(change.operationType === 'insert') {
                    socket.emit('notifAdded', change.fullDocument);
                }
                if(change.operationType === 'delete') {
                    socket.emit('notifDeleted', change.documentKey._id);
                }
            });

            bookingChangeStream.on('change', async (change) => {
                if(change.operationType === 'insert') {
                    const newBooking = await Booking.findById(change.documentKey._id, 
                                       'experience').populate('experience', 'creator');
                    socket.emit('bookingAdded', newBooking.experience.creator);
                }
            });
        });
    });
}