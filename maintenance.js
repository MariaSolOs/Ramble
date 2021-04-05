const Experience = require('./models/experience'),
      Notification = require('./models/notification'),
      Review = require('./models/review');

module.exports = async () => {
    const notifs = await Notification.find({ category: 'User-ExperienceReview' });
    const toDel = [];

    for (notif of notifs) {
        const exists = await Experience.exists({ _id: notif.expToReview });
        if (!exists) {
            toDel.push(notif._id);
        }
    }

    await Notification.deleteMany({ _id: { $in: toDel } });
}