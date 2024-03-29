import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Query {
        """
        The current logged in user.
        """
        me: User!

        """
        Experiences filtered by location and with capacity >= to 
        the indicated capacity, or those created by the specified creator.
        """
        experiences(
            location: String
            capacity: Int
            creatorId: ID
        ): [Experience!]!

        """
        Get experience by its ID.
        """
        experience(id: ID!): Experience!

        """
        Get the occurrences of the indicated experiences.
        """
        occurrences(experienceIds: [ID!]!): [Occurrence!]!
    }

    type Mutation {
        """
        User sign up.
        """
        signUpUser(
            email: String!, 
            password: String!, 
            firstName: String!, 
            lastName: String!
        ): User!

        """
        User log in.
        """
        logInUser(
            email: String!, 
            password: String!
        ): User!

        """
        Profile editing.
        """
        editUser(
            firstName: String, 
            lastName: String, 
            birthday: String, 
            email: String, 
            password: String,
            photo: String,
            phoneNumber: String,
            city: String,
            creatorBio: String
        ): User!

        """
        Creator onboarding.
        """
        signUpCreator(
            bio: String!,
            governmentIds: [String!]!
        ): Creator!

        """
        For users to save/unsave an experience.
        """
        saveExperience(experienceId: String!): Experience!
        unsaveExperience(experienceId: String!): Experience!
        
        """
        Experience creation.
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
        ): Experience!

        """
        Booking creation.
        """
        createBooking(
            occurrenceId: ID!
            bookingType: Reservation!
            numGuests: Int!
            paymentIntentId: ID!
        ): CreateBookingResult!

        """
        Creates a new occurrence for the indicated experience.
        """
        createOccurrence(
            experienceId: ID!
            experienceCapacity: Int!
            dates: OccurrenceInput!
        ): Occurrence!

        """
        Deletes an occurrence.
        """
        deleteOccurrence(occurrenceId: ID!): Occurrence!
    }

    """
    Input types
    """
    input OccurrenceInput {
        start: String!
        end: String!
    }

    """
    Mutation results
    """
    type CreateBookingResult {
        meetingPoint: String
        creatorPhone: String!
        cardBrand: String!
        cardLast4: String!
    }

    """
    Ramble's experience categories
    """
    enum ExperienceCategory {
        taste
        create
        relax
        learn
        move
    }

    """
    Booking types
    """
    enum Reservation {
        public
        private
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
        zoomPMI: String
        pricePerPerson: Int!
        privatePrice: Int
        currency: String!
        ratingValue: Float!
        numberOfRatings: Int!
        creator: Creator!
    }

    """
    Representation of a single occurrence in time of an
    experience
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
    Bookings associated to an occurrence
    """
    type Booking {
        _id: ID!
        occurrence: Occurrence!
        bookingType: Reservation!
        numGuests: Int!
        client: User!
        creatorProfit: Int!
        createdAt: String!
        paymentCaptured: Boolean!
    }

    """
    Application's users
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
    Experience creators
    """
    type Creator {
        _id: ID!
        user: User!
        bio: String!
        stripeProfile: StripeInfo!
        bookingRequests: [Booking!]!
    }

    """
    Representation of a creator's Stripe profile
    """
    type StripeInfo {
        onboarded: Boolean
        accountId: ID
    }
`;