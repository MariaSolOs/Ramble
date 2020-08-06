const cloudinary = require('cloudinary').v2;

//Models
const Creator = require('../models/creator');

//Helpers
const getCreatorProfile = (creator) => ({
    id: creator._id,
    stripeId: creator.stripe.id,
    bio: creator.bio
});

//For fetching profile information
exports.getCreatorProfile = (req, res) => {
    req.user.populate('creator')
    .execPopulate().then(user => {
        res.status(200).send({ 
            profile: getCreatorProfile(user.creator)
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
                select: 'client experience createdAt numPeople occurrence stripe',
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
