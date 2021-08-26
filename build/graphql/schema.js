"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = apollo_server_express_1.gql `
    """
    Ramble admin
    """
    type Admin {
        _id: ID!
        token: String!
        userName: String!
    }

    """
    Experience
    """
    type Experience {
        _id: ID!
        title: String!
        description: String!
        images: [String!]!
        location: String!
        meetingPoint: String
        latitude: Float
        longitude: Float
        categories: [ExperienceCategory!]!
        ageRestriction: Int
        duration: Float!
        languages: [String!]!
        includedItems: [String!]!
        toBringItems: [String!]!
        capacity: Int!
        isOnlineExperience: Boolean!
        pricePerPerson: Int!
        privatePrice: Int
        currency: String!
        ratingValue: Float
        creator: Creator!
    }

    """
    Ramble's experience categories.
    """
    enum ExperienceCategory {
        taste
        create
        relax
        learn
        move
    }

    enum ExperienceStatus {
        pending
        approved
        rejected
    }

    enum Decision {
        approved
        rejected
    }

    """
    Experience creators.
    """
    type Creator {
        _id: ID!
        user: User!
        bio: String!
        governmentIds: [String!]!
    }

    """
    Application's users.
    """
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        phoneNumber: String
        photo: String
        city: String
        creator: Creator
    }

    """
    Experience reviews
    """
    type Review {
        _id: ID!
        experience: Experience!
        writtenBy: User!
        text: String!
        value: Int!
    }

    type Query {
        """
        Get experiences by their status
        """
        experiencesByStatus(status: [ExperienceStatus!]!): [Experience!]!

        """
        Get the full information of the specified experience
        """
        experience(id: ID!): Experience!

        """
        Get reviews that need approval.
        """
        unapprovedReviews: [Review!]!
    }

    type Mutation {
        """
        Admin authentication
        """
        logIn(userName: String!, password: String!): Admin!

        """
        Approve/reject experience
        """
        approveExperience(id: ID!, decision: Decision!): Experience!

        """
        Delete an experience
        """
        deleteExperience(id: ID!): Experience!

        """
        Approve/reject review
        """
        approveReview(id: ID!, decision: Decision!): Review!
    }
`;
