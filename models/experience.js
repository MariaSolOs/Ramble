const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum: ['pending', 'approved', 'rejected']
    },

    zoomInfo: { // For Zoom experiences
        PMI: String,
        password: String
    },

    location: {
        displayLocation: { // Used for autocomplete searchbars
            type: String, 
            required: true
        }, 
        meetPoint: String, 
        coordinates: {
            lat: Number,
            long: Number
        }
    },

    title: {
        type: String,
        required: true
    },

    categories: [{
        type: String,
        enum: ['taste', 'create', 'relax', 'learn', 'move']
    }],

    description: {
        type: String,
        required: true
    },

    ageRestriction: Number,

    duration: { //In hours
        type: Number,
        required: true,
        min: 0.5
    },

    languages: [String],

    capacity: { 
        type: Number,
        required: true,
        min: 1 
    },

    images: [String],

    included: [String],

    toBring: [String],

    price: {
        perPerson: {
            type: Number,
            required: true
        },
        private: Number,
        currency: {
            type: String,
            required: true,
            enum: ['CAD', 'USD']
        }
    },

    rating: {
        value: {
            type: Number,
            min: 1, 
            max: 5,
            default: 5
        },
        numRatings: {
            type: Number,
            default: 0
        }
    },
    
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'Creator'
    }
});

// TODO: Update all experiences with new schema

module.exports = mongoose.model('Experience', ExperienceSchema);