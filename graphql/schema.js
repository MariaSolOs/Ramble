const { gql } = require('apollo-server-express');

// TODO: Add doc strings
module.exports = gql`
    type Query {
        me: User

        experiences(
            location: String, 
            capacity: Int
        ): [Experience!]

        experience(id: String!): Experience
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

        saveExperience(experienceId: String!): MutationResponse

        unsaveExperience(experienceId: String!): MutationResponse
    }

    type MutationResponse {
        code: Int!
        message: String!
    }

    type Experience {
        _id: ID!
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

    enum ExperienceCategories {
        taste
        create
        relax
        learn
        move
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
        user: User!
        bio: String
    }
`;