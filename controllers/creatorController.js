const cloudinary = require('cloudinary').v2;

//Models
const User = require('../models/user'),
      Booking = require('../models/booking');

//For fetching profile information
exports.getCreatorProfile = (req, res) => {
    res.status(200).send({ 
        profile: {
            id: req.user.creator
        }
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
exports.updateUserToCreator = async (req, res) => {
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
            governmentIds
        });
        await creator.save();
        //Update user's info
        req.user.phoneNumber = req.body.phoneNumber;
        req.creatorId = creator._id;
        req.user.creator = creator._id;
        await req.user.save();
        res.status(201).send({message: 'Creator creation successful.'});
    } catch(err) {
        res.status(409).send({err: "Couldn't update user to creator."});
    }
}
