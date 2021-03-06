const Notification = require('./models/notification');

module.exports = () => {
    console.log('Running maintenance script...');

    Notification.deleteMany({
        expToReview: ''
    }, (err, res) => {
        if (err || !res) {
            throw new Error('Notif deletion failed.');
        } else {
            console.log(`DELETED ${res.deletedCount} NOTIFS`);
        }
    });
}