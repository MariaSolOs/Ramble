import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Query {
        """
        The current logged in user.
        """
        me: User!

        """
        Experiences filtered by location and with capacity >= to 
        the indicated capacity.
        """
        experiences(
            location: String
            capacity: Int
        ): [Experience!]!

        """
        Get experience by its ID.
        """
        experience(id: ID!): Experience!

        """
        Get the occurences of the indicated experience.
        """
        occurrences(experienceId: ID!): [Occurrence!]!
    }

    type Mutation {
        """
        User sign up
        """
        signUpUser(
            email: String!, 
            password: String!, 
            firstName: String!, 
            lastName: String!
        ): User!

        """
        User log in
        """
        logInUser(
            email: String!, 
            password: String!, 
            rememberUser: Boolean!
        ): User!

        """
        Profile editing
        """
        editUser(
            firstName: String, 
            lastName: String, 
            birthday: String, 
            email: String, 
            password: String,
            photo: String,
            phoneNumber: String,
            city: String
        ): User!

        """
        Creator onboarding 
        """
        signUpCreator(
            bio: String!,
            governmentIds: [String!]!
        ): Creator!

        """
        For users to save/unsave an experience
        """
        saveExperience(experienceId: String!): Experience!
        unsaveExperience(experienceId: String!): Experience!
        
        """
        Experience creation
        """
        createExperience(
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
            zoomPMI: String
            zoomPassword: String
            pricePerPerson: Int!
            privatePrice: Int
            currency: String!
            slots: [OccurrenceInput!]!
        ): Experience
    }

    """
    Input types
    """
    input OccurrenceInput {
        start: String!
        end: String!
    }

    """
    Experiences
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
        zoomPMI: String
        pricePerPerson: Int!
        privatePrice: Int
        currency: String!
        ratingValue: Float!
        numberOfRatings: Int!
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

    """
    Representation of a single occurrence in time of an
    experience.
    """
    type Occurrence {
        _id: ID!
        experience: Experience!
        dateStart: String!
        dateEnd: String!
        spotsLeft: Int!
        creatorProfit: Int!
        bookings: [Booking!]!
    }

    """
    Bookings associated to an occurrence.
    """
    type Booking {
        _id: ID!
    }

    """
    Application's users.
    """
    type User {
        _id: ID!
        token: String
        firstName: String!
        lastName: String!
        birthday: String
        email: String!
        phoneNumber: String
        photo: String
        city: String
        savedExperiences: [Experience!]!
        bookedExperiences: [Experience!]!
        creator: Creator
    }

    """
    Experience creators.
    """
    type Creator {
        _id: ID!
        user: User!
        bio: String!
        stripeProfile: StripeInfo!
    }

    """
    Representation of a creator's Stripe profile.
    """
    type StripeInfo {
        onboarded: Boolean
        accountId: String
    }
`;