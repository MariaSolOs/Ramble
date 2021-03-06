const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum: ['pending', 'approved', 'rejected']
    },

    zoomInfo: { //For Zoom experiences
        PMI: String,
        password: String
    },

    location: {
        city: {
            type: String,
            required: true
        },
        region: {
            type: String,
            required: true
        },
        displayLocation: { //Used for autocomplete searchbars
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

    setting: {
        type: String,
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
        schedule: {
            type: Map, 
            of: {
                type: [String]
            },
            validate: input => {
                const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 
                'Friday', 'Saturday', 'Sunday'];
                const slotReg = /\b((1[0-2]|[1-9])(:30)?([AP][M]))-((1[0-2]|[1-9])(:30)?([AP][M]))/;
                const correctKeys = Array.from(input.keys()).every(key => weekdays.includes(key));
                const correctSlots = Array.from(input.values()).every(val => slotReg.test(val));
                return correctKeys && correctSlots;
            },
            required: true
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

module.exports = mongoose.model('Experience', ExperienceSchema);