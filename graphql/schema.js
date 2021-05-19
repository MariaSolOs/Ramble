const { gql } = require('apollo-server-express');

module.exports = gql`
    type Experience {
        status: ExperienceStatus
        title: String!
        description: String!
        images: [String!]!
        location: String!
        meetingPoint: String!
        coordinates: [Number!]!
        categories: [ExperienceCategories!]!
        ageRestriction: Number
        duration: Number!
        languages: [String!]
        includedItems: [String!]
        toBringItems: [String!]
        capacity: Number!
        zoomPMI: String
        zoomPassword: String
        pricePerPerson: Number!
        pricePrivate: Number
        currency: ExperienceCurrency
        ratingValue: Number 
        numberOfRatings: Number
        creator: Creator!
    }

    enum ExperienceStatus {
        PENDING
        APPROVED
        REJECTED
    }

    enum ExperienceCategories {
        TASTE
        CREATE
        RELAX
        LEARN 
        MOVE
    }

    enum ExperienceSetting {
        PRIVATE
        SEMI-PRIVATE
        PUBLIC
    }

    enum ExperienceCurrency {
        CAD 
        USD
    }

    type Creator {

    }
`;

// avail: {
//     from: {type: Date, required: true},
//     to: {type: Date, required: true},
//     schedule: {
//         type: Map, 
//         of: {
//             type: [String]
//         },
//         validate: input => {
//             const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//             const slotReg = /\b((1[0-2]|[1-9])(:30)?([AP][M]))-((1[0-2]|[1-9])(:30)?([AP][M]))/;
//             const correctKeys = Array.from(input.keys()).every(key => weekdays.includes(key));
//             const correctSlots = Array.from(input.values()).every(val => slotReg.test(val));
//             return correctKeys && correctSlots;
//         },
//         required: true
//     }
// },