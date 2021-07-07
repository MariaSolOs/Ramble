import { 
    experienceReducer,
    occurrenceReducer,
    bookingReducer,
    userReducer,
    creatorReducer, 
} from 'utils/data-reducers';

// GraphQL context
export type Context = {
    userId: string;
    tokenExpiry: string;
}

export type ExperienceType = ReturnType<typeof experienceReducer>;

export type OccurrenceType = ReturnType<typeof occurrenceReducer>;

export type BookingType = ReturnType<typeof bookingReducer>;

export type UserType = ReturnType<typeof userReducer>;

export type CreatorType = ReturnType<typeof creatorReducer>;