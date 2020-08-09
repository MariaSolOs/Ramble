//Models
const Creator = require('../models/creator'),
      Experience = require('../models/experience'),
      Occurrence = require('../models/occurrence'),
      Notification = require('../models/notification');

const creatorExpReminders = async () => {
    console.log('JOB BEGINS: CREATOR EXPERIENCE REMINDERS.');
    try {
        const allCreators = await Creator.find().populate('notifications');
        for(const creator of allCreators) {
            const otherNotifs = [];
            for(const notif of creator.notifications) {
                if(notif.category !== 'Creator-ExperienceDecisionReminder') {
                    otherNotifs.push(notif);
                }
            }

            //Delete old reminders
            await Notification.deleteMany({
                user: creator.user, 
                category: 'Creator-ExperienceDecisionReminder'
            });

            //Get creator's experiences happening in the next 2 days
            creator.notifications = [...otherNotifs];
            const exps = await Experience.find({creator: creator._id}, 'title');
            for(const exp of exps) {
                const occs = await Occurrence.find({
                    date: {
                        $gte: new Date(), 
                        $lte: new Date().setDate(new Date().getDate() + 2)
                    },
                    experience: exp._id
                }, 'date timeslot');
                for(const occ of occs) {
                    const when = occ.date.getDate() === new Date().getDate()? 
                                'today' : 'tomorrow';
                    const notif = new Notification({
                        message: `Your experience "${exp.title}" is happening ${
                        when} at ${occ.timeslot.split('-')[0]}. Don't forget!`,
                        user: creator.user,
                        category: 'Creator-ExperienceReminder'
                    });
                    await notif.save();
                    creator.notifications.push(notif);
                }
            }
            await creator.save();
        }
        console.log('JOB SUCCESSULLY COMPLETED: CREATOR EXPERIENCE REMINDERS.');
    } catch(err) {
        console.log(`JOB FAILED: CREATOR EXPERIENCE REMINDERS - ${err}`);
    }
}
creatorExpReminders();