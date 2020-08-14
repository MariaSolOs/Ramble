const cloudinary = require('cloudinary').v2;

//Models
const Creator = require('../models/creator'),
      Occurrence = require('../models/occurrence'),
      Booking = require('../models/booking');

//Helpers
const getCreatorProfile = (creator) => ({
    id: creator._id,
    stripeId: creator.stripe.accountId,
    bio: creator.bio
});

//For fetching profile information
exports.getCreatorProfile = (req, res) => {
    req.user.populate('creator').execPopulate()
    .then(async user => {
        res.status(200).send({ 
            creatorProfile: getCreatorProfile(user.creator)
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
                  select: 'title images capacity price' }, 
                { path: 'occurrence',
                  select: 'dateStart timeslot spotsLeft creatorProfit' },
                { path: 'client',
                  select: 'fstName city photo stripe' }
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

/*To delete a booking where the customer used a saved card
we don't need Stripe */
exports.deleteBookingRequest = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndRemove(req.params.bookId);
        //Update occurrence and creator's requests
        await Creator.findOneAndUpdate({user: req.userId}, 
              {$pull: {bookingRequests: booking._id}});
        await Occurrence.findByIdAndUpdate(booking.occurrence, {
            $pull: {bookings: booking._id},
            $inc: {spotsLeft: booking.numPeople}
        });

        return res.status(200).send({message: 'Booking deleted'});
    } catch(err) {
        res.status(409).send({err: "Couldn't delete booking."});
    }
}