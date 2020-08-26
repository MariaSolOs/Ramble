const cloudinary = require('cloudinary').v2,
      stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//Models
const User = require('../models/user'),
      Experience = require('../models/experience'),
      Booking = require('../models/booking'),
      Notification = require('../models/notification');

//Helpers
const getUserData = (user) => ({
    id: user._id,
    fstName: user.fstName,
    lstName: user.lstName,
    photo: user.photo,
    city: user.city,
    email: user.email,
    phoneNumber: user.phoneNumber,
    birthday: user.birthday,
    promoCode: user.promoCode
});
const changeProfilePhoto = async (oldPhoto, newPhoto) => {
    try {
        if(!oldPhoto.includes('noPicUser') && oldPhoto.includes('Ramble/Users')) {
            const publicId = oldPhoto.split('/').slice(-1)[0].split('.')[0];
            cloudinary.api.delete_resources([`Ramble/Users/${publicId}`]);
        }
        const upload = await cloudinary.uploader.upload(newPhoto, {
            folder: 'Ramble/Users',
            eager: [
                { format: 'jpeg', height: 300, width: 300, 
                  quality: 'auto', crop: 'thumb', gravity: 'face' }
            ]
        });
        return upload.eager[0].secure_url;
    } catch(err) { return null; }
}

//For fetching profile information
exports.getUserProfile = (req, res) => {
    if(req.isAdmin) {
        res.status(200).send({ 
            isAdmin: true,
            token: req.token,
            userData: {
                username: req.user.username,
                permissions: req.user.permissions
            }
        });
    } else {
        Notification.find({user: req.user._id}).sort({createdAt: -1})
        .exec((err, notifs) => {
            if(err) {
                return res.status(500).send({err: "Couldn't fetch notifications."});
            }
            res.status(200).send({
                isAdmin: false,
                isCreator: Boolean(req.user.creator),
                token:  req.token,
                userData: getUserData(req.user),
                notifications: notifs
            });
        });
    }
}
exports.getNotifs = (req, res) => {
    Notification.find({user: req.userId}).sort({createdAt: -1})
    .exec((err, notifs) => {
        if(err) {
            return res.status(500).send({err: "Couldn't fetch notifications."});
        }
        res.status(200).send({notifs});
    });
}

//Editing user info
exports.editProfile = async (req, res) => {
    try {
        for(const field in req.body) {
            if(field === 'photo') {
                const newPhoto = await changeProfilePhoto(
                                    req.user.photo, 
                                    req.body[field]
                                );
                if(!newPhoto){ continue; }
                else { req.user[field] = newPhoto; }
            } else {
                req.user[field] = req.body[field];
            }
        }
        await req.user.save();
        res.status(201).send({ 
            token: req.token,
            isAdmin: false,
            isCreator: Boolean(req.user.creator),
            userData: getUserData(req.user) 
        });
    } catch(err) {
        res.status(409).send({error: "Couldn't update user."});
    }
}

//For getting and saving/unsaving an experience
exports.getUserExperiences = async (req, res) => {
    try {
        //We only need this for experience cards
        const expFields = 'title location.displayLocation images price rating';
        //Saved experiences
        const {savedExperiences} = 
            await req.user.populate('savedExperiences', expFields).execPopulate();
        //Booked experiences
        const bookedExperiences = await Booking.find({client: req.user._id}, 
                                  'experience occurrence').populate([
                                    { path: 'experience',
                                      select: expFields },
                                    { path: 'occurrence',
                                      select: 'dateEnd' }
                                ]);
        res.status(200).send({
            bookedExperiences, 
            savedExperiences
        });
    } catch(err) {
        res.status(500).send({err: "Couldn't fetch user experiences."});
    }
}
exports.saveExperience = async (req, res) => {
    try {
        const savedExp = await Experience.findById(req.body.expId, 
                         'title location.displayLocation images price rating');
        await User.findByIdAndUpdate(req.userId, 
              {$addToSet: { savedExperiences: savedExp._id }});
        res.status(200).send({ 
            token: req.token,
            savedExp 
        });
    } catch(err) {
        res.status(409).send({err: "Couldn't save experience"});
    }
}
exports.unsaveExperience = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.userId, 
              {$pull: {savedExperiences: req.params.expId }});
        res.status(200).send({
            token: req.token,
            message: 'Experience succesfully unsaved.'
        });
    } catch(err) {
        res.status(409).send({err: "Couldn't unsave experience"});
    }
}

//For deleting notifications
exports.deleteNotification = async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.notifId);
        res.status(200).send({
            token: req.token,
            message: 'Notification deleted.'
        });
    } catch(err) {
        res.status(409).send({err: "Couldn't delete notification"});
    }
}

exports.getPaymentMethods = async (req, res) => {
    try {
        const user = await User.findById(req.userId, 'stripe');
        if(!user.stripe.customerId) { //No saved payment methods
            return res.status(200).send({ paymentMethods: [] }); 
        }
        const stripeList = await stripe.paymentMethods.list({
            customer: user.stripe.customerId,
            type: 'card'
        });
        const paymentMethods = [];
        for(const method of stripeList.data) {
            paymentMethods.push({
                id: method.id,
                brand: method.card.brand,
                last4: method.card.last4,
                expireDate: [method.card.exp_month, method.card.exp_year]
            });
        }
        res.status(200).send({ paymentMethods });
    } catch(err) {
        res.status(500).send(err);
    }
}