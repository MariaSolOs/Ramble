const cloudinary = require('cloudinary').v2,
      {ErrorHandler} = require('../helpers/errorHandler');

//Models
const Creator = require('../models/creator'),
      Experience = require('../models/experience'),
      Occurrence = require('../models/occurrence'),
      Booking = require('../models/booking'),
      Notification = require('../models/notification');

//Helpers
const getCreatorProfile = (creator) => ({
    id: creator._id,
    stripeId: creator.stripe.accountId,
    bio: creator.bio,
    numBookings: creator.bookingRequests.length
});

//For fetching profile information
exports.getCreatorProfile = (req, res, next) => {
    req.user.populate('creator').execPopulate()
    .then((user, err) => {
        if(err || !user) {
            return next(new ErrorHandler(500, err.message));
        }
        res.status(200).send({ 
            creatorProfile: {...getCreatorProfile(user.creator)}
        })
    });
}
exports.getBookingRequests = async (req, res, next) => {
    try {
        const {bookingRequests} = await Creator.findOne({user: req.userId}).populate({
            path: 'bookingRequests',
            populate: [
            { path: 'experience',
              select: 'title capacity price' }, 
            { path: 'occurrence',
              select: 'dateStart timeslot spotsLeft creatorProfit' },
            { path: 'client',
              select: 'fstName lstName city photo stripe' }
            ]
        });
        res.status(200).send({ bookingRequests });
    } catch(err) {
        next(new ErrorHandler(500, err.message));
    }
}

// For getting upcoming bookings
exports.getUpcomingBookings = async (req, res, next) => {
    try {
        const exps = await Experience.find({ 
            creator: req.user.creator 
        }).distinct('_id');

        // Get bookings for indicated date
        const occs = await Occurrence.find({
            experience: { $in: exps },
            'bookings.0': { $exists: true },
            dateStart: {
                $gte: new Date(new Date(req.params.date).setUTCHours(0, 0, 0)), 
                $lte: new Date(new Date(req.params.date).setUTCHours(23, 59, 59))
            },
        }, 'experience timeslot bookings', 
        { sort: 'dateStart experience.title' }).populate([
            {
                path: 'experience',
                select: 'title'
            },
            {
                path: 'bookings',
                select: 'client numPeople bookType',
                populate: {
                    path: 'client',
                    select: 'fstName lstName photo'
                }
            }
        ]);

        // Use null as title separators
        const filteredOccs = [];
        let currentTitle = '';
        for (const occ of occs) {
            currentTitle = (currentTitle === occ.experience.title)? null : 
                            occ.experience.title;
            filteredOccs.push({
                _id: occ._id,
                experience: currentTitle,
                timeslot: occ.timeslot,
                bookings: occ.bookings
            });
        }

        res.status(200).send({ occs: filteredOccs });
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

//Upgrade an user to a creator
exports.upgradeUserToCreator = async (req, res, next) => {
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
        req.user.creator = creator._id;
        await req.user.save();
        res.status(201).send({
            profile: getCreatorProfile(creator)
        });
    } catch(err) {
        next(new ErrorHandler(409, err.message));
    }
}

exports.editCreatorProfile = async (req, res, next) => {
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
        next(new ErrorHandler(409, err.message));
    }
}

exports.getExpsInfos = async (req, res, next) => {
    try {
        // Find created experiences
        const exps = await Experience.find({ creator: req.user.creator });
        const expIds = exps.map(({ _id }) => _id);
        
        // Find dates of upcoming bookings
        let bookingDates = await Occurrence.find({
            experience: { $in: expIds },
            'bookings.0': { $exists: true }
        }).distinct('dateStart');
        bookingDates = bookingDates.map((date) => date.toISOString().split('T')[0])

        res.status(200).send({ exps, bookingDates });
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

/*To delete a booking where the customer used a saved card
we don't need Stripe */
exports.deleteBookingRequest = async (req, res, next) => {
    try {
        const booking = await Booking.findByIdAndRemove(req.params.bookId, 
                        {select: 'client experience numPeople occurrence'})
                        .populate('experience', 'title');
        //Update occurrence and creator's requests
        const creator = await Creator.findOneAndUpdate({user: req.userId}, 
                        {$pull: {bookingRequests: booking._id}}, {select: 'user'})
                        .populate('user', 'fstName');
        await Occurrence.findByIdAndUpdate(booking.occurrence, {
            $pull: {bookings: booking._id},
            $inc: {spotsLeft: booking.numPeople}
        });
        //Let the user know of the creator's decision
        await Notification.create({
            message: `${creator.user.fstName} had to cancel the booking for "${
            booking.experience.title}".`,
            user: booking.client,
            category: 'User-BookingRejected'
        });

        return res.status(200).send({message: 'Booking deleted'});
    } catch(err) {
        next(new ErrorHandler(409, err.message));
    }
}