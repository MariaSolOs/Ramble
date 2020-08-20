const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum: ['pending', 'approved', 'rejected']
    },
    location: {
        city: {
            type: String,
            required: true
        },
        region: {
            type: String,
        },
        displayLocation: { //Used for autocomplete searchbars
            type: String,
            required: true
        }, 
        meetPoint: {
            type: String,
            required: true
        },
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
    setting: {
        type: String,
        required: true,
        enum: ['private', 'semi-private', 'public']
    },
    duration: { //In hours
        type: Number,
        required: true,
        min: 1 
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
    avail: {
        from: {type: Date, required: true},
        to: {type: Date, required: true},
        schedule: {type: Map, required: true}
    },
    rating: {
        type: Number,
        min: 1, 
        max: 5
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'Creator'
    }
});

module.exports = mongoose.model('Experience', ExperienceSchema);