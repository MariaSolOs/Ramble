const { gql } = require('apollo-server-express');

module.exports = gql`
    type Query {
        me: User
        experiences(location: String, capacity: Int, status: ExperienceStatus): [Experience!]
    }

    type Mutation {
        signUpUser(
            email: String!, 
            password: String!, 
            firstName: String!, 
            lastName: String!
        ): User
        logInUser(
            email: String!, 
            password: String!, 
            rememberUser: Boolean!
        ): User
        editUser(
            firstName: String, 
            lastName: String, 
            birthday: String, 
            email: String, 
            password: String,
            phoneNumber: String,
            photo: String,
            city: String
        ): User
    }

    type Experience {
        _id: ID!
        status: ExperienceStatus
        title: String!
        description: String!
        images: [String!]!
        location: String!
        meetingPoint: String
        latitude: Float
        longitude: Float
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

    type User {
        _id: ID!
        token: String!
        firstName: String
        lastName: String
        birthday: String
        email: String!
        phoneNumber: String
        photo: String
        city: String
        savedExperiences: [Experience!]
        bookedExperiences: [Experience!]
        creator: Creator
    }

    type Creator {
        _id: ID!
    }
`;