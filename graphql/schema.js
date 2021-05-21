const { gql } = require('apollo-server-express');

module.exports = gql`
    type Query {
        experiences: [Experience!]
    }

    type Experience {
        _id: ID!
        status: ExperienceStatus
        title: String!
        description: String!
        images: [String!]!
        location: String!
        meetingPoint: String!
        latitude: Float!
        longitude: Float!
        categories: [ExperienceCategories!]!
        ageRestriction: Int
        duration: Float!
        languages: [String!]
        includedItems: [String!]
        toBringItems: [String!]
        capacity: Int!
        zoomPMI: String
        zoomPassword: String
        pricePerPerson: Int!
        pricePrivate: Int
        currency: String!
        ratingValue: Float
        numberOfRatings: Int
        creator: Creator!
        availableFromDate: String!
        availableToDate: String!
        availabilitySchedule: [ExperienceScheduleEntry!]!
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
        SEMI_PRIVATE
        PUBLIC
    }

    type ExperienceScheduleEntry {
        day: String!
        slots: [String!]!
    }

    type Creator {
        _id: ID!
    }
`;