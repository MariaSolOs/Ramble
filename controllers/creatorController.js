const cloudinary = require('cloudinary').v2;

//Models
const Creator = require('../models/creator'),
      Experience = require('../models/experience'),
      Occurrence = require('../models/occurrence'),
      Notification = require('../models/notification');

//Helpers
const getCreatorProfile = (creator) => ({
    id: creator._id,
    stripeId: creator.stripe.id,
    bio: creator.bio
});
const getExpNotifs = async (creator) => {
    //Ensure this is done just once a day
    const currentReminders = [];
    const otherNotifs = [];
    for(const notif of creator.notifications) {
        if(notif.category === 'Creator-ExperienceDecisionReminder') {
            currentReminders.push(notif);
        } else {
            otherNotifs.push(notif);
        }
    }
    if(currentReminders.length > 0) {
        const currentRemindersDate = currentReminders[0].createdAt;
        if(currentRemindersDate.toISOString().split('T')[0] === 
        new Date().toISOString().split('T')[0]){ return; }
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
                message: `Your experience "${exp.title}" is happening ${when} at ${
                occ.timeslot.split('-')[0]}. Don't forget!`,
                user: creator.user,
                category: 'Creator-ExperienceReminder'
            });
            await notif.save();
            creator.notifications.push(notif);
        }
    }
    await creator.save();
}

//For fetching profile information
exports.getCreatorProfile = (req, res) => {
    req.user.populate({
        path: 'creator',
        populate: {
            path: 'notifications'
        }
    }).execPopulate().then(async user => {
        await getExpNotifs(user.creator);
        res.status(200).send({ 
            profile: getCreatorProfile(user.creator),
            notifications: user.creator.notifications
        });
    })
    .catch(err => {
        res.status(500).send({err: "Couldn't fetch creator profile."});
    });
}
exports.getBookingRequests = async (req, res) => {
    req.user.populate('creator')
    .execPopulate().then(async user => {
        try {
            const {bookingRequests} = await user.creator.populate({
                path: 'bookingRequests',
                populate: [
                { path: 'experience',
                  select: 'title images capacity' }, 
                { path: 'occurrence',
                  select: 'date timeslot spotsLeft creatorProfit' },
                { path: 'client',
                  select: 'fstName city photo' }
                ]
            }).execPopulate();
            return res.status(200).send({ bookingRequests });
        } catch(err) {
            res.status(500).send({err: 'Failed to get booking requests.'});
        }
    }).catch(err => {
        res.status(500).send({err: 'Failed to get booking requests.'});
    });
}

//Upgrade an user to a creator
exports.upgradeUserToCreator = async (req, res) => {
    try {
        //Upload ID to Cloudinary
        const governmentIds = [];
        for(idImg of req.body.id) {
            const upload = await cloudinary.uploader.upload(idImg, {
                folder: 'Ramble/Creators',
                eager: [
                    { format: 'jpeg', height: 300, quality: 30, crop: 'fit' }
                ]
            });
            governmentIds.push(upload.eager[0].secure_url);
        }
        //Make a new creator
        const creator = new Creator({
            user: req.userId,
            bio: req.body.bio,
            verified: false,
            governmentIds,
            stripe: { id: null }
        });
        await creator.save();
        //Update user's info
        req.user.phoneNumber = req.body.phoneNumber;
        req.user.creator = creator._id;
        await req.user.save();
        res.status(201).send({
            profile: getCreatorProfile(creator)
        });
    } catch(err) {
        res.status(409).send({err: "Couldn't update user to creator."});
    }
}

exports.editCreatorProfile = async (req, res) => {
    try {
        const creator = await Creator.findById(req.params.creatorId);
        for(const field in req.body) {
            creator[field] = req.body[field];
        }
        await creator.save();
        res.status(201).send({
            profile: getCreatorProfile(creator)
        });
    } catch(err) {
        res.status(409).send({error: "Couldn't update creator."});
    }
}