const cloudinary = require('cloudinary').v2,
      stripe = require('stripe')(process.env.STRIPE_SECRET_KEY),
      {verifyUserEmail} = require('../helpers/profileHelpers'),
      {ErrorHandler} = require('../helpers/errorHandler');

//Models
const User = require('../models/user'),
      Experience = require('../models/experience'),
      Notification = require('../models/notification');

//Helpers
const getUserData = (user) => ({
    id: user._id,
    fstName: user.fstName,
    lstName: user.lstName,
    photo: user.photo,
    city: user.city,
    email: user.email.address,
    emailVerified: user.email.verified,
    phoneNumber: user.phoneNumber,
    birthday: user.birthday,
    promoCode: user.promoCode,
    createdAt: user.createdAt
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
exports.getUserProfile = async (req, res, next) => {
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
            try {
                if(err) {
                    throw new ErrorHandler(500, err.message);
                }
                res.status(200).send({
                    isAdmin: false,
                    isCreator: Boolean(req.user.creator),
                    token:  req.token,
                    userData: getUserData(req.user),
                    notifications: notifs
                });
            } catch(error) {
                next(error);
            }
        });
    }
}

//Editing user info
exports.editProfile = async (req, res, next) => {
    try {
        const newEmail = (req.user.email.address.length === 0) &&
                         (req.body.email && req.body.email.length > 0);

        //Update user info
        for(const field in req.body) {
            if(field === 'photo') {
                const newPhoto = await changeProfilePhoto(
                                    req.user.photo, 
                                    req.body[field]
                                );
                if(!newPhoto){ continue; }
                else { req.user[field] = newPhoto; }
            }
            if(field === 'email') {
                req.user.email.address = req.body[field];
            } else {
                req.user[field] = req.body[field];
            }
        }

        /*If the user had no email before, send verification
        email*/
        if(newEmail) { 
            verifyUserEmail(req.body.email, req.user._id); 
        }

        await req.user.save();
        res.status(201).send({ 
            token: req.token,
            isAdmin: false,
            isCreator: Boolean(req.user.creator),
            userData: getUserData(req.user) 
        });
    } catch(err) {
        next(new ErrorHandler(409, err.message));
    }
}

//For getting and saving/unsaving an experience
exports.getUserExperiences = async (req, res, next) => {
    try {
        //We only need this for experience cards
        const expFields = 'title location.displayLocation images price rating';
        //Saved experiences
        const {savedExperiences, bookedExperiences} = 
               await req.user.populate('savedExperiences bookedExperiences', expFields)
               .execPopulate();
        res.status(200).send({ bookedExperiences, savedExperiences });
    } catch(err) {
        next(new ErrorHandler(500, err.message));
    }
}
exports.saveExperience = async (req, res, next) => {
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
        next(new ErrorHandler(409, err.message));
    }
}
exports.unsaveExperience = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.userId, 
              {$pull: {savedExperiences: req.params.expId }});
        res.status(200).send({
            token: req.token,
            message: 'Experience succesfully unsaved.'
        });
    } catch(err) {
        next(new ErrorHandler(409, err.message));
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
        next(new ErrorHandler(409, err.message));
    }
}

exports.getPaymentMethods = async (req, res, next) => {
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
        next(new ErrorHandler(500, err.message));
    }
}

exports.resetPassword = (req, res, next) => {
    User.findByIdAndUpdate(req.body.userId, {
        password: req.body.password
    }, (err, user) => {
        if (err || !user) {
            return next(new ErrorHandler(409, 'Reset password failed.'));
        }
        res.status(201).send({ message: 'Password reset.' });
    });
}