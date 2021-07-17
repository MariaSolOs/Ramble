import { 
    experienceReducer,
    occurrenceReducer,
    bookingReducer,
    userReducer,
    creatorReducer, 
} from './utils/data-reducers';

// Stripe API configuration
export const STRIPE_API_VERSION = '2020-08-27';

// Configuration for MongoDB lean()
export const LEAN_DEFAULTS = { defaults: true } as const;

// GraphQL context
export type Context = {
    userId: string;
    tokenExpiry: string;
}

export type Reservation = 'public' | 'private';

export type Currency = 'CAD' | 'USD';

// Mappers
export type ExperienceType = ReturnType<typeof experienceReducer>;

export type OccurrenceType = ReturnType<typeof occurrenceReducer>;

export type BookingType = ReturnType<typeof bookingReducer>;

export type UserType = ReturnType<typeof userReducer>;

export type CreatorType = ReturnType<typeof creatorReducer>;