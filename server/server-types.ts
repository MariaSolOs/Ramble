import { 
    experienceReducer,
    userReducer,
    creatorReducer,
    adminReducer,
    reviewReducer
} from './utils/data-reducers';

// Configuration for MongoDB lean()
export const LEAN_DEFAULTS = { defaults: true } as const;

// GraphQL context
export type Context = { adminId: string; }

// Mappers
export type ExperienceType = ReturnType<typeof experienceReducer>;

export type UserType = ReturnType<typeof userReducer>;

export type CreatorType = ReturnType<typeof creatorReducer>;

export type AdminType = ReturnType<typeof adminReducer>;

export type ReviewType = ReturnType<typeof reviewReducer>;