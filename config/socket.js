const mongoose = require('mongoose'),
      db = mongoose.connection,
      jwt = require('jsonwebtoken');

//TODO: Add live booking changes
module.exports = (io) => {
    db.on('error', console.error.bind(console, 'Mongoose connection Error: '));

    db.once('open', () => {
        const notifCollection = db.collection('notifications');
        const changeStream = notifCollection.watch();

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
            //Update notifications live
            changeStream.on('change', (change) => {
                if(change.operationType === 'insert') {
                    socket.emit('notifAdded', change.fullDocument);
                } else if(change.operationType === 'delete') {
                    socket.emit('notifDeleted', change.documentKey._id);
                }
            });
        });
    });
}