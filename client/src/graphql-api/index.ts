import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Bookings associated to an occurrence */
export type Booking = {
  _id: Scalars['ID'];
  occurrence: Occurrence;
  bookingType: Reservation;
  numGuests: Scalars['Int'];
  client: User;
  creatorProfit: Scalars['Int'];
  createdAt: Scalars['String'];
  paymentCaptured: Scalars['Boolean'];
};

/** Mutation results */
export type CreateBookingResult = {
  meetingPoint?: Maybe<Scalars['String']>;
  creatorPhone: Scalars['String'];
  cardBrand: Scalars['String'];
  cardLast4: Scalars['String'];
};

/** Experience creators */
export type Creator = {
  _id: Scalars['ID'];
  user: User;
  bio: Scalars['String'];
  stripeProfile: StripeInfo;
  bookingRequests: Array<Booking>;
};

/** Experience */
export type Experience = {
  _id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  images: Array<Scalars['String']>;
  location: Scalars['String'];
  meetingPoint?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  categories: Array<ExperienceCategory>;
  ageRestriction?: Maybe<Scalars['Int']>;
  duration: Scalars['Float'];
  languages: Array<Scalars['String']>;
  includedItems: Array<Scalars['String']>;
  toBringItems: Array<Scalars['String']>;
  capacity: Scalars['Int'];
  zoomPMI?: Maybe<Scalars['String']>;
  pricePerPerson: Scalars['Int'];
  privatePrice?: Maybe<Scalars['Int']>;
  currency: Scalars['String'];
  ratingValue: Scalars['Float'];
  numberOfRatings: Scalars['Int'];
  creator: Creator;
};

/** Ramble's experience categories */
export enum ExperienceCategory {
  Taste = 'taste',
  Create = 'create',
  Relax = 'relax',
  Learn = 'learn',
  Move = 'move'
}

export type Mutation = {
  /** User sign up. */
  signUpUser: User;
  /** User log in. */
  logInUser: User;
  /** Profile editing. */
  editUser: User;
  /** Creator onboarding. */
  signUpCreator: Creator;
  /** For users to save/unsave an experience. */
  saveExperience: Experience;
  unsaveExperience: Experience;
  /** Experience creation. */
  createExperience: Experience;
  /** Booking creation. */
  createBooking: CreateBookingResult;
  /** Creates a new occurrence for the indicated experience. */
  createOccurrence: Occurrence;
  /** Deletes an occurrence. */
  deleteOccurrence: Occurrence;
};


export type MutationSignUpUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};


export type MutationLogInUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationEditUserArgs = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  creatorBio?: Maybe<Scalars['String']>;
};


export type MutationSignUpCreatorArgs = {
  bio: Scalars['String'];
  governmentIds: Array<Scalars['String']>;
};


export type MutationSaveExperienceArgs = {
  experienceId: Scalars['String'];
};


export type MutationUnsaveExperienceArgs = {
  experienceId: Scalars['String'];
};


export type MutationCreateExperienceArgs = {
  title: Scalars['String'];
  description: Scalars['String'];
  images: Array<Scalars['String']>;
  location: Scalars['String'];
  meetingPoint?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  categories: Array<ExperienceCategory>;
  ageRestriction?: Maybe<Scalars['Int']>;
  duration: Scalars['Float'];
  languages: Array<Scalars['String']>;
  includedItems: Array<Scalars['String']>;
  toBringItems: Array<Scalars['String']>;
  capacity: Scalars['Int'];
  zoomPMI?: Maybe<Scalars['String']>;
  zoomPassword?: Maybe<Scalars['String']>;
  pricePerPerson: Scalars['Int'];
  privatePrice?: Maybe<Scalars['Int']>;
  currency: Scalars['String'];
  slots: Array<OccurrenceInput>;
};


export type MutationCreateBookingArgs = {
  occurrenceId: Scalars['ID'];
  bookingType: Reservation;
  numGuests: Scalars['Int'];
  paymentIntentId: Scalars['ID'];
};


export type MutationCreateOccurrenceArgs = {
  experienceId: Scalars['ID'];
  experienceCapacity: Scalars['Int'];
  dates: OccurrenceInput;
};


export type MutationDeleteOccurrenceArgs = {
  occurrenceId: Scalars['ID'];
};

/**
 * Representation of a single occurrence in time of an
 * experience
 */
export type Occurrence = {
  _id: Scalars['ID'];
  experience: Experience;
  dateStart: Scalars['String'];
  dateEnd: Scalars['String'];
  spotsLeft: Scalars['Int'];
  creatorProfit: Scalars['Int'];
  bookings: Array<Booking>;
};

/** Input types */
export type OccurrenceInput = {
  start: Scalars['String'];
  end: Scalars['String'];
};

export type Query = {
  /** The current logged in user. */
  me: User;
  /**
   * Experiences filtered by location and with capacity >= to
   * the indicated capacity, or those created by the specified creator.
   */
  experiences: Array<Experience>;
  /** Get experience by its ID. */
  experience: Experience;
  /** Get the occurrences of the indicated experiences. */
  occurrences: Array<Occurrence>;
};


export type QueryExperiencesArgs = {
  location?: Maybe<Scalars['String']>;
  capacity?: Maybe<Scalars['Int']>;
  creatorId?: Maybe<Scalars['ID']>;
};


export type QueryExperienceArgs = {
  id: Scalars['ID'];
};


export type QueryOccurrencesArgs = {
  experienceIds: Array<Scalars['ID']>;
};

/** Booking types */
export enum Reservation {
  Public = 'public',
  Private = 'private'
}

/** Representation of a creator's Stripe profile */
export type StripeInfo = {
  onboarded?: Maybe<Scalars['Boolean']>;
  accountId?: Maybe<Scalars['ID']>;
};

/** Application's users */
export type User = {
  _id: Scalars['ID'];
  token?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  birthday?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  savedExperiences: Array<Experience>;
  bookedExperiences: Array<Experience>;
  creator?: Maybe<Creator>;
};

export type GetBookingExperienceQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetBookingExperienceQuery = { experience: (
    Pick<Experience, 'privatePrice' | 'currency'>
    & ExperienceViewFragment
  ) };

export type GetBookingRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBookingRequestsQuery = { me: { creator?: Maybe<{ bookingRequests: Array<(
        Pick<Booking, '_id' | 'numGuests' | 'bookingType' | 'createdAt' | 'creatorProfit'>
        & { client: (
          Pick<User, 'city'>
          & UserAvatarFragment
        ), occurrence: (
          Pick<Occurrence, 'dateStart' | 'dateEnd' | 'creatorProfit'>
          & { experience: Pick<Experience, '_id' | 'images' | 'title' | 'capacity'>, bookings: Array<Pick<Booking, 'numGuests' | 'paymentCaptured'>> }
        ) }
      )> }> } };

export type CalendarOccurrenceFragment = (
  Pick<Occurrence, '_id' | 'dateStart' | 'dateEnd'>
  & { experience: Pick<Experience, '_id' | 'title'> }
);

export type CoreProfileFragment = (
  Pick<User, '_id' | 'token' | 'email'>
  & { savedExperiences: Array<Pick<Experience, '_id'>>, creator?: Maybe<Pick<Creator, '_id'>> }
  & UserAvatarFragment
);

export type GetCoreProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCoreProfileQuery = { me: CoreProfileFragment };

export type CreateBookingMutationVariables = Exact<{
  occurrenceId: Scalars['ID'];
  bookingType: Reservation;
  numGuests: Scalars['Int'];
  paymentIntentId: Scalars['ID'];
}>;


export type CreateBookingMutation = { createBooking: Pick<CreateBookingResult, 'meetingPoint' | 'creatorPhone' | 'cardBrand' | 'cardLast4'> };

export type CreateExperienceMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  images: Array<Scalars['String']> | Scalars['String'];
  location: Scalars['String'];
  meetingPoint?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  categories: Array<ExperienceCategory> | ExperienceCategory;
  ageRestriction?: Maybe<Scalars['Int']>;
  duration: Scalars['Float'];
  languages: Array<Scalars['String']> | Scalars['String'];
  includedItems: Array<Scalars['String']> | Scalars['String'];
  toBringItems: Array<Scalars['String']> | Scalars['String'];
  capacity: Scalars['Int'];
  zoomPMI?: Maybe<Scalars['String']>;
  zoomPassword?: Maybe<Scalars['String']>;
  pricePerPerson: Scalars['Int'];
  privatePrice?: Maybe<Scalars['Int']>;
  currency: Scalars['String'];
  slots: Array<OccurrenceInput> | OccurrenceInput;
}>;


export type CreateExperienceMutation = { createExperience: Pick<Experience, '_id' | 'title'> };

export type CreateOccurrenceMutationVariables = Exact<{
  experienceId: Scalars['ID'];
  experienceCapacity: Scalars['Int'];
  dates: OccurrenceInput;
}>;


export type CreateOccurrenceMutation = { createOccurrence: CalendarOccurrenceFragment };

export type GetCreationProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCreationProfileQuery = { me: (
    { creator?: Maybe<(
      Pick<Creator, '_id' | 'bio'>
      & { stripeProfile: Pick<StripeInfo, 'onboarded'> }
    )> }
    & UserAvatarFragment
  ) };

export type GetCreatorFormFieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCreatorFormFieldsQuery = { me: (
    Pick<User, '_id' | 'phoneNumber'>
    & UserAvatarFragment
  ) };

export type DeleteOccurrenceMutationVariables = Exact<{
  occurrenceId: Scalars['ID'];
}>;


export type DeleteOccurrenceMutation = { deleteOccurrence: Pick<Occurrence, 'dateStart' | '_id'> };

export type CardContentFragment = Pick<Experience, '_id' | 'title' | 'images' | 'pricePerPerson' | 'ratingValue' | 'numberOfRatings' | 'location' | 'zoomPMI'>;

export type ExperienceViewFragment = (
  Pick<Experience, '_id' | 'title' | 'description' | 'images' | 'location' | 'latitude' | 'longitude' | 'categories' | 'ageRestriction' | 'duration' | 'languages' | 'includedItems' | 'toBringItems' | 'capacity' | 'zoomPMI' | 'pricePerPerson'>
  & { creator: (
    Pick<Creator, 'bio'>
    & { user: UserAvatarFragment }
  ) }
);

export type GetExperienceQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetExperienceQuery = { experience: ExperienceViewFragment };

export type GetExperiencesQueryVariables = Exact<{
  location?: Maybe<Scalars['String']>;
  capacity?: Maybe<Scalars['Int']>;
  creatorId?: Maybe<Scalars['ID']>;
}>;


export type GetExperiencesQuery = { experiences: Array<CardContentFragment> };

export type GetLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLocationsQuery = { experiences: Array<Pick<Experience, 'location'>> };

export type LogInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LogInMutation = { logInUser: CoreProfileFragment };

export type GetOccurrencesQueryVariables = Exact<{
  experienceIds: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type GetOccurrencesQuery = { occurrences: Array<Pick<Occurrence, '_id' | 'dateStart' | 'dateEnd' | 'spotsLeft'>> };

export type SaveExperienceMutationVariables = Exact<{
  experienceId: Scalars['String'];
}>;


export type SaveExperienceMutation = { saveExperience: Pick<Experience, '_id'> };

export type SignUpCreatorMutationVariables = Exact<{
  bio: Scalars['String'];
  governmentIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type SignUpCreatorMutation = { signUpCreator: Pick<Creator, '_id'> };

export type SignUpMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type SignUpMutation = { signUpUser: CoreProfileFragment };

export type GetSlotableExperiencesQueryVariables = Exact<{
  creatorId: Scalars['ID'];
}>;


export type GetSlotableExperiencesQuery = { experiences: Array<Pick<Experience, '_id' | 'title' | 'duration' | 'capacity'>> };

export type GetSlotableOccurrencesQueryVariables = Exact<{
  experienceIds: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type GetSlotableOccurrencesQuery = { occurrences: Array<(
    { bookings: Array<(
      Pick<Booking, '_id' | 'numGuests' | 'bookingType'>
      & { client: Pick<User, 'firstName' | 'photo'> }
    )> }
    & CalendarOccurrenceFragment
  )> };

export type UnsaveExperienceMutationVariables = Exact<{
  experienceId: Scalars['String'];
}>;


export type UnsaveExperienceMutation = { unsaveExperience: Pick<Experience, '_id'> };

export type UpdateProfileMutationVariables = Exact<{
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  creatorBio?: Maybe<Scalars['String']>;
}>;


export type UpdateProfileMutation = { editUser: CoreProfileFragment };

export type UserAvatarFragment = Pick<User, 'photo' | 'firstName'>;

export type GetUserExperiencesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserExperiencesQuery = { me: (
    Pick<User, '_id' | 'city'>
    & { savedExperiences: Array<CardContentFragment>, bookedExperiences: Array<CardContentFragment> }
    & UserAvatarFragment
  ) };

export type GetUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProfileQuery = { me: (
    Pick<User, '_id' | 'lastName' | 'city' | 'email' | 'phoneNumber' | 'birthday'>
    & { creator?: Maybe<Pick<Creator, '_id' | 'bio'>> }
    & UserAvatarFragment
  ) };

export const CalendarOccurrenceFragmentDoc = gql`
    fragment CalendarOccurrence on Occurrence {
  _id
  dateStart
  dateEnd
  experience {
    _id
    title
  }
}
    `;
export const UserAvatarFragmentDoc = gql`
    fragment UserAvatar on User {
  photo
  firstName
}
    `;
export const CoreProfileFragmentDoc = gql`
    fragment CoreProfile on User {
  _id
  token
  email
  savedExperiences {
    _id
  }
  creator {
    _id
  }
  ...UserAvatar
}
    ${UserAvatarFragmentDoc}`;
export const CardContentFragmentDoc = gql`
    fragment CardContent on Experience {
  _id
  title
  images
  pricePerPerson
  ratingValue
  numberOfRatings
  location
  zoomPMI
}
    `;
export const ExperienceViewFragmentDoc = gql`
    fragment ExperienceView on Experience {
  _id
  title
  description
  images
  location
  latitude
  longitude
  categories
  ageRestriction
  duration
  languages
  includedItems
  toBringItems
  capacity
  zoomPMI
  pricePerPerson
  creator {
    bio
    user {
      ...UserAvatar
    }
  }
}
    ${UserAvatarFragmentDoc}`;
export const GetBookingExperienceDocument = gql`
    query getBookingExperience($id: ID!) {
  experience(id: $id) {
    ...ExperienceView
    privatePrice
    currency
  }
}
    ${ExperienceViewFragmentDoc}`;

/**
 * __useGetBookingExperienceQuery__
 *
 * To run a query within a React component, call `useGetBookingExperienceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookingExperienceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookingExperienceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBookingExperienceQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetBookingExperienceQuery, GetBookingExperienceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetBookingExperienceQuery, GetBookingExperienceQueryVariables>(GetBookingExperienceDocument, options);
      }
export function useGetBookingExperienceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBookingExperienceQuery, GetBookingExperienceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetBookingExperienceQuery, GetBookingExperienceQueryVariables>(GetBookingExperienceDocument, options);
        }
export type GetBookingExperienceQueryHookResult = ReturnType<typeof useGetBookingExperienceQuery>;
export type GetBookingExperienceLazyQueryHookResult = ReturnType<typeof useGetBookingExperienceLazyQuery>;
export type GetBookingExperienceQueryResult = Apollo.QueryResult<GetBookingExperienceQuery, GetBookingExperienceQueryVariables>;
export const GetBookingRequestsDocument = gql`
    query getBookingRequests {
  me {
    creator {
      bookingRequests {
        _id
        numGuests
        bookingType
        createdAt
        creatorProfit
        client {
          ...UserAvatar
          city
        }
        occurrence {
          dateStart
          dateEnd
          creatorProfit
          experience {
            _id
            images
            title
            capacity
          }
          bookings {
            numGuests
            paymentCaptured
          }
        }
      }
    }
  }
}
    ${UserAvatarFragmentDoc}`;

/**
 * __useGetBookingRequestsQuery__
 *
 * To run a query within a React component, call `useGetBookingRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookingRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookingRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBookingRequestsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetBookingRequestsQuery, GetBookingRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetBookingRequestsQuery, GetBookingRequestsQueryVariables>(GetBookingRequestsDocument, options);
      }
export function useGetBookingRequestsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBookingRequestsQuery, GetBookingRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetBookingRequestsQuery, GetBookingRequestsQueryVariables>(GetBookingRequestsDocument, options);
        }
export type GetBookingRequestsQueryHookResult = ReturnType<typeof useGetBookingRequestsQuery>;
export type GetBookingRequestsLazyQueryHookResult = ReturnType<typeof useGetBookingRequestsLazyQuery>;
export type GetBookingRequestsQueryResult = Apollo.QueryResult<GetBookingRequestsQuery, GetBookingRequestsQueryVariables>;
export const GetCoreProfileDocument = gql`
    query getCoreProfile {
  me {
    ...CoreProfile
  }
}
    ${CoreProfileFragmentDoc}`;

/**
 * __useGetCoreProfileQuery__
 *
 * To run a query within a React component, call `useGetCoreProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoreProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoreProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCoreProfileQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCoreProfileQuery, GetCoreProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCoreProfileQuery, GetCoreProfileQueryVariables>(GetCoreProfileDocument, options);
      }
export function useGetCoreProfileLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCoreProfileQuery, GetCoreProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCoreProfileQuery, GetCoreProfileQueryVariables>(GetCoreProfileDocument, options);
        }
export type GetCoreProfileQueryHookResult = ReturnType<typeof useGetCoreProfileQuery>;
export type GetCoreProfileLazyQueryHookResult = ReturnType<typeof useGetCoreProfileLazyQuery>;
export type GetCoreProfileQueryResult = Apollo.QueryResult<GetCoreProfileQuery, GetCoreProfileQueryVariables>;
export const CreateBookingDocument = gql`
    mutation createBooking($occurrenceId: ID!, $bookingType: Reservation!, $numGuests: Int!, $paymentIntentId: ID!) {
  createBooking(
    occurrenceId: $occurrenceId
    bookingType: $bookingType
    numGuests: $numGuests
    paymentIntentId: $paymentIntentId
  ) {
    meetingPoint
    creatorPhone
    cardBrand
    cardLast4
  }
}
    `;
export type CreateBookingMutationFn = Apollo.MutationFunction<CreateBookingMutation, CreateBookingMutationVariables>;

/**
 * __useCreateBookingMutation__
 *
 * To run a mutation, you first call `useCreateBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookingMutation, { data, loading, error }] = useCreateBookingMutation({
 *   variables: {
 *      occurrenceId: // value for 'occurrenceId'
 *      bookingType: // value for 'bookingType'
 *      numGuests: // value for 'numGuests'
 *      paymentIntentId: // value for 'paymentIntentId'
 *   },
 * });
 */
export function useCreateBookingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateBookingMutation, CreateBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateBookingMutation, CreateBookingMutationVariables>(CreateBookingDocument, options);
      }
export type CreateBookingMutationHookResult = ReturnType<typeof useCreateBookingMutation>;
export type CreateBookingMutationResult = Apollo.MutationResult<CreateBookingMutation>;
export type CreateBookingMutationOptions = Apollo.BaseMutationOptions<CreateBookingMutation, CreateBookingMutationVariables>;
export const CreateExperienceDocument = gql`
    mutation createExperience($title: String!, $description: String!, $images: [String!]!, $location: String!, $meetingPoint: String, $latitude: Float, $longitude: Float, $categories: [ExperienceCategory!]!, $ageRestriction: Int, $duration: Float!, $languages: [String!]!, $includedItems: [String!]!, $toBringItems: [String!]!, $capacity: Int!, $zoomPMI: String, $zoomPassword: String, $pricePerPerson: Int!, $privatePrice: Int, $currency: String!, $slots: [OccurrenceInput!]!) {
  createExperience(
    title: $title
    description: $description
    images: $images
    location: $location
    meetingPoint: $meetingPoint
    latitude: $latitude
    longitude: $longitude
    categories: $categories
    ageRestriction: $ageRestriction
    duration: $duration
    languages: $languages
    includedItems: $includedItems
    toBringItems: $toBringItems
    capacity: $capacity
    zoomPMI: $zoomPMI
    zoomPassword: $zoomPassword
    pricePerPerson: $pricePerPerson
    privatePrice: $privatePrice
    currency: $currency
    slots: $slots
  ) {
    _id
    title
  }
}
    `;
export type CreateExperienceMutationFn = Apollo.MutationFunction<CreateExperienceMutation, CreateExperienceMutationVariables>;

/**
 * __useCreateExperienceMutation__
 *
 * To run a mutation, you first call `useCreateExperienceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExperienceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExperienceMutation, { data, loading, error }] = useCreateExperienceMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      images: // value for 'images'
 *      location: // value for 'location'
 *      meetingPoint: // value for 'meetingPoint'
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *      categories: // value for 'categories'
 *      ageRestriction: // value for 'ageRestriction'
 *      duration: // value for 'duration'
 *      languages: // value for 'languages'
 *      includedItems: // value for 'includedItems'
 *      toBringItems: // value for 'toBringItems'
 *      capacity: // value for 'capacity'
 *      zoomPMI: // value for 'zoomPMI'
 *      zoomPassword: // value for 'zoomPassword'
 *      pricePerPerson: // value for 'pricePerPerson'
 *      privatePrice: // value for 'privatePrice'
 *      currency: // value for 'currency'
 *      slots: // value for 'slots'
 *   },
 * });
 */
export function useCreateExperienceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateExperienceMutation, CreateExperienceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateExperienceMutation, CreateExperienceMutationVariables>(CreateExperienceDocument, options);
      }
export type CreateExperienceMutationHookResult = ReturnType<typeof useCreateExperienceMutation>;
export type CreateExperienceMutationResult = Apollo.MutationResult<CreateExperienceMutation>;
export type CreateExperienceMutationOptions = Apollo.BaseMutationOptions<CreateExperienceMutation, CreateExperienceMutationVariables>;
export const CreateOccurrenceDocument = gql`
    mutation createOccurrence($experienceId: ID!, $experienceCapacity: Int!, $dates: OccurrenceInput!) {
  createOccurrence(
    experienceId: $experienceId
    experienceCapacity: $experienceCapacity
    dates: $dates
  ) {
    ...CalendarOccurrence
  }
}
    ${CalendarOccurrenceFragmentDoc}`;
export type CreateOccurrenceMutationFn = Apollo.MutationFunction<CreateOccurrenceMutation, CreateOccurrenceMutationVariables>;

/**
 * __useCreateOccurrenceMutation__
 *
 * To run a mutation, you first call `useCreateOccurrenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOccurrenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOccurrenceMutation, { data, loading, error }] = useCreateOccurrenceMutation({
 *   variables: {
 *      experienceId: // value for 'experienceId'
 *      experienceCapacity: // value for 'experienceCapacity'
 *      dates: // value for 'dates'
 *   },
 * });
 */
export function useCreateOccurrenceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOccurrenceMutation, CreateOccurrenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateOccurrenceMutation, CreateOccurrenceMutationVariables>(CreateOccurrenceDocument, options);
      }
export type CreateOccurrenceMutationHookResult = ReturnType<typeof useCreateOccurrenceMutation>;
export type CreateOccurrenceMutationResult = Apollo.MutationResult<CreateOccurrenceMutation>;
export type CreateOccurrenceMutationOptions = Apollo.BaseMutationOptions<CreateOccurrenceMutation, CreateOccurrenceMutationVariables>;
export const GetCreationProfileDocument = gql`
    query getCreationProfile {
  me {
    ...UserAvatar
    creator {
      _id
      bio
      stripeProfile {
        onboarded
      }
    }
  }
}
    ${UserAvatarFragmentDoc}`;

/**
 * __useGetCreationProfileQuery__
 *
 * To run a query within a React component, call `useGetCreationProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCreationProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCreationProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCreationProfileQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCreationProfileQuery, GetCreationProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCreationProfileQuery, GetCreationProfileQueryVariables>(GetCreationProfileDocument, options);
      }
export function useGetCreationProfileLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCreationProfileQuery, GetCreationProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCreationProfileQuery, GetCreationProfileQueryVariables>(GetCreationProfileDocument, options);
        }
export type GetCreationProfileQueryHookResult = ReturnType<typeof useGetCreationProfileQuery>;
export type GetCreationProfileLazyQueryHookResult = ReturnType<typeof useGetCreationProfileLazyQuery>;
export type GetCreationProfileQueryResult = Apollo.QueryResult<GetCreationProfileQuery, GetCreationProfileQueryVariables>;
export const GetCreatorFormFieldsDocument = gql`
    query getCreatorFormFields {
  me {
    _id
    phoneNumber
    ...UserAvatar
  }
}
    ${UserAvatarFragmentDoc}`;

/**
 * __useGetCreatorFormFieldsQuery__
 *
 * To run a query within a React component, call `useGetCreatorFormFieldsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCreatorFormFieldsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCreatorFormFieldsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCreatorFormFieldsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCreatorFormFieldsQuery, GetCreatorFormFieldsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCreatorFormFieldsQuery, GetCreatorFormFieldsQueryVariables>(GetCreatorFormFieldsDocument, options);
      }
export function useGetCreatorFormFieldsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCreatorFormFieldsQuery, GetCreatorFormFieldsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCreatorFormFieldsQuery, GetCreatorFormFieldsQueryVariables>(GetCreatorFormFieldsDocument, options);
        }
export type GetCreatorFormFieldsQueryHookResult = ReturnType<typeof useGetCreatorFormFieldsQuery>;
export type GetCreatorFormFieldsLazyQueryHookResult = ReturnType<typeof useGetCreatorFormFieldsLazyQuery>;
export type GetCreatorFormFieldsQueryResult = Apollo.QueryResult<GetCreatorFormFieldsQuery, GetCreatorFormFieldsQueryVariables>;
export const DeleteOccurrenceDocument = gql`
    mutation deleteOccurrence($occurrenceId: ID!) {
  deleteOccurrence(occurrenceId: $occurrenceId) {
    dateStart
    _id
  }
}
    `;
export type DeleteOccurrenceMutationFn = Apollo.MutationFunction<DeleteOccurrenceMutation, DeleteOccurrenceMutationVariables>;

/**
 * __useDeleteOccurrenceMutation__
 *
 * To run a mutation, you first call `useDeleteOccurrenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOccurrenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOccurrenceMutation, { data, loading, error }] = useDeleteOccurrenceMutation({
 *   variables: {
 *      occurrenceId: // value for 'occurrenceId'
 *   },
 * });
 */
export function useDeleteOccurrenceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteOccurrenceMutation, DeleteOccurrenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteOccurrenceMutation, DeleteOccurrenceMutationVariables>(DeleteOccurrenceDocument, options);
      }
export type DeleteOccurrenceMutationHookResult = ReturnType<typeof useDeleteOccurrenceMutation>;
export type DeleteOccurrenceMutationResult = Apollo.MutationResult<DeleteOccurrenceMutation>;
export type DeleteOccurrenceMutationOptions = Apollo.BaseMutationOptions<DeleteOccurrenceMutation, DeleteOccurrenceMutationVariables>;
export const GetExperienceDocument = gql`
    query getExperience($id: ID!) {
  experience(id: $id) {
    ...ExperienceView
  }
}
    ${ExperienceViewFragmentDoc}`;

/**
 * __useGetExperienceQuery__
 *
 * To run a query within a React component, call `useGetExperienceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExperienceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExperienceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetExperienceQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetExperienceQuery, GetExperienceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetExperienceQuery, GetExperienceQueryVariables>(GetExperienceDocument, options);
      }
export function useGetExperienceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetExperienceQuery, GetExperienceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetExperienceQuery, GetExperienceQueryVariables>(GetExperienceDocument, options);
        }
export type GetExperienceQueryHookResult = ReturnType<typeof useGetExperienceQuery>;
export type GetExperienceLazyQueryHookResult = ReturnType<typeof useGetExperienceLazyQuery>;
export type GetExperienceQueryResult = Apollo.QueryResult<GetExperienceQuery, GetExperienceQueryVariables>;
export const GetExperiencesDocument = gql`
    query getExperiences($location: String, $capacity: Int, $creatorId: ID) {
  experiences(location: $location, capacity: $capacity, creatorId: $creatorId) {
    ...CardContent
  }
}
    ${CardContentFragmentDoc}`;

/**
 * __useGetExperiencesQuery__
 *
 * To run a query within a React component, call `useGetExperiencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExperiencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExperiencesQuery({
 *   variables: {
 *      location: // value for 'location'
 *      capacity: // value for 'capacity'
 *      creatorId: // value for 'creatorId'
 *   },
 * });
 */
export function useGetExperiencesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetExperiencesQuery, GetExperiencesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetExperiencesQuery, GetExperiencesQueryVariables>(GetExperiencesDocument, options);
      }
export function useGetExperiencesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetExperiencesQuery, GetExperiencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetExperiencesQuery, GetExperiencesQueryVariables>(GetExperiencesDocument, options);
        }
export type GetExperiencesQueryHookResult = ReturnType<typeof useGetExperiencesQuery>;
export type GetExperiencesLazyQueryHookResult = ReturnType<typeof useGetExperiencesLazyQuery>;
export type GetExperiencesQueryResult = Apollo.QueryResult<GetExperiencesQuery, GetExperiencesQueryVariables>;
export const GetLocationsDocument = gql`
    query getLocations {
  experiences {
    location
  }
}
    `;

/**
 * __useGetLocationsQuery__
 *
 * To run a query within a React component, call `useGetLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLocationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLocationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetLocationsQuery, GetLocationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetLocationsQuery, GetLocationsQueryVariables>(GetLocationsDocument, options);
      }
export function useGetLocationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetLocationsQuery, GetLocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetLocationsQuery, GetLocationsQueryVariables>(GetLocationsDocument, options);
        }
export type GetLocationsQueryHookResult = ReturnType<typeof useGetLocationsQuery>;
export type GetLocationsLazyQueryHookResult = ReturnType<typeof useGetLocationsLazyQuery>;
export type GetLocationsQueryResult = Apollo.QueryResult<GetLocationsQuery, GetLocationsQueryVariables>;
export const LogInDocument = gql`
    mutation logIn($email: String!, $password: String!) {
  logInUser(email: $email, password: $password) {
    ...CoreProfile
  }
}
    ${CoreProfileFragmentDoc}`;
export type LogInMutationFn = Apollo.MutationFunction<LogInMutation, LogInMutationVariables>;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLogInMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogInMutation, LogInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument, options);
      }
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = Apollo.MutationResult<LogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<LogInMutation, LogInMutationVariables>;
export const GetOccurrencesDocument = gql`
    query getOccurrences($experienceIds: [ID!]!) {
  occurrences(experienceIds: $experienceIds) {
    _id
    dateStart
    dateEnd
    spotsLeft
  }
}
    `;

/**
 * __useGetOccurrencesQuery__
 *
 * To run a query within a React component, call `useGetOccurrencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOccurrencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOccurrencesQuery({
 *   variables: {
 *      experienceIds: // value for 'experienceIds'
 *   },
 * });
 */
export function useGetOccurrencesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetOccurrencesQuery, GetOccurrencesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetOccurrencesQuery, GetOccurrencesQueryVariables>(GetOccurrencesDocument, options);
      }
export function useGetOccurrencesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOccurrencesQuery, GetOccurrencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetOccurrencesQuery, GetOccurrencesQueryVariables>(GetOccurrencesDocument, options);
        }
export type GetOccurrencesQueryHookResult = ReturnType<typeof useGetOccurrencesQuery>;
export type GetOccurrencesLazyQueryHookResult = ReturnType<typeof useGetOccurrencesLazyQuery>;
export type GetOccurrencesQueryResult = Apollo.QueryResult<GetOccurrencesQuery, GetOccurrencesQueryVariables>;
export const SaveExperienceDocument = gql`
    mutation saveExperience($experienceId: String!) {
  saveExperience(experienceId: $experienceId) {
    _id
  }
}
    `;
export type SaveExperienceMutationFn = Apollo.MutationFunction<SaveExperienceMutation, SaveExperienceMutationVariables>;

/**
 * __useSaveExperienceMutation__
 *
 * To run a mutation, you first call `useSaveExperienceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveExperienceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveExperienceMutation, { data, loading, error }] = useSaveExperienceMutation({
 *   variables: {
 *      experienceId: // value for 'experienceId'
 *   },
 * });
 */
export function useSaveExperienceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveExperienceMutation, SaveExperienceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SaveExperienceMutation, SaveExperienceMutationVariables>(SaveExperienceDocument, options);
      }
export type SaveExperienceMutationHookResult = ReturnType<typeof useSaveExperienceMutation>;
export type SaveExperienceMutationResult = Apollo.MutationResult<SaveExperienceMutation>;
export type SaveExperienceMutationOptions = Apollo.BaseMutationOptions<SaveExperienceMutation, SaveExperienceMutationVariables>;
export const SignUpCreatorDocument = gql`
    mutation signUpCreator($bio: String!, $governmentIds: [String!]!) {
  signUpCreator(bio: $bio, governmentIds: $governmentIds) {
    _id
  }
}
    `;
export type SignUpCreatorMutationFn = Apollo.MutationFunction<SignUpCreatorMutation, SignUpCreatorMutationVariables>;

/**
 * __useSignUpCreatorMutation__
 *
 * To run a mutation, you first call `useSignUpCreatorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpCreatorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpCreatorMutation, { data, loading, error }] = useSignUpCreatorMutation({
 *   variables: {
 *      bio: // value for 'bio'
 *      governmentIds: // value for 'governmentIds'
 *   },
 * });
 */
export function useSignUpCreatorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpCreatorMutation, SignUpCreatorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SignUpCreatorMutation, SignUpCreatorMutationVariables>(SignUpCreatorDocument, options);
      }
export type SignUpCreatorMutationHookResult = ReturnType<typeof useSignUpCreatorMutation>;
export type SignUpCreatorMutationResult = Apollo.MutationResult<SignUpCreatorMutation>;
export type SignUpCreatorMutationOptions = Apollo.BaseMutationOptions<SignUpCreatorMutation, SignUpCreatorMutationVariables>;
export const SignUpDocument = gql`
    mutation signUp($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
  signUpUser(
    email: $email
    password: $password
    firstName: $firstName
    lastName: $lastName
  ) {
    ...CoreProfile
  }
}
    ${CoreProfileFragmentDoc}`;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const GetSlotableExperiencesDocument = gql`
    query getSlotableExperiences($creatorId: ID!) {
  experiences(creatorId: $creatorId) {
    _id
    title
    duration
    capacity
  }
}
    `;

/**
 * __useGetSlotableExperiencesQuery__
 *
 * To run a query within a React component, call `useGetSlotableExperiencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSlotableExperiencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSlotableExperiencesQuery({
 *   variables: {
 *      creatorId: // value for 'creatorId'
 *   },
 * });
 */
export function useGetSlotableExperiencesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetSlotableExperiencesQuery, GetSlotableExperiencesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetSlotableExperiencesQuery, GetSlotableExperiencesQueryVariables>(GetSlotableExperiencesDocument, options);
      }
export function useGetSlotableExperiencesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSlotableExperiencesQuery, GetSlotableExperiencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetSlotableExperiencesQuery, GetSlotableExperiencesQueryVariables>(GetSlotableExperiencesDocument, options);
        }
export type GetSlotableExperiencesQueryHookResult = ReturnType<typeof useGetSlotableExperiencesQuery>;
export type GetSlotableExperiencesLazyQueryHookResult = ReturnType<typeof useGetSlotableExperiencesLazyQuery>;
export type GetSlotableExperiencesQueryResult = Apollo.QueryResult<GetSlotableExperiencesQuery, GetSlotableExperiencesQueryVariables>;
export const GetSlotableOccurrencesDocument = gql`
    query getSlotableOccurrences($experienceIds: [ID!]!) {
  occurrences(experienceIds: $experienceIds) {
    ...CalendarOccurrence
    bookings {
      _id
      numGuests
      bookingType
      client {
        firstName
        photo
      }
    }
  }
}
    ${CalendarOccurrenceFragmentDoc}`;

/**
 * __useGetSlotableOccurrencesQuery__
 *
 * To run a query within a React component, call `useGetSlotableOccurrencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSlotableOccurrencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSlotableOccurrencesQuery({
 *   variables: {
 *      experienceIds: // value for 'experienceIds'
 *   },
 * });
 */
export function useGetSlotableOccurrencesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetSlotableOccurrencesQuery, GetSlotableOccurrencesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetSlotableOccurrencesQuery, GetSlotableOccurrencesQueryVariables>(GetSlotableOccurrencesDocument, options);
      }
export function useGetSlotableOccurrencesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSlotableOccurrencesQuery, GetSlotableOccurrencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetSlotableOccurrencesQuery, GetSlotableOccurrencesQueryVariables>(GetSlotableOccurrencesDocument, options);
        }
export type GetSlotableOccurrencesQueryHookResult = ReturnType<typeof useGetSlotableOccurrencesQuery>;
export type GetSlotableOccurrencesLazyQueryHookResult = ReturnType<typeof useGetSlotableOccurrencesLazyQuery>;
export type GetSlotableOccurrencesQueryResult = Apollo.QueryResult<GetSlotableOccurrencesQuery, GetSlotableOccurrencesQueryVariables>;
export const UnsaveExperienceDocument = gql`
    mutation unsaveExperience($experienceId: String!) {
  unsaveExperience(experienceId: $experienceId) {
    _id
  }
}
    `;
export type UnsaveExperienceMutationFn = Apollo.MutationFunction<UnsaveExperienceMutation, UnsaveExperienceMutationVariables>;

/**
 * __useUnsaveExperienceMutation__
 *
 * To run a mutation, you first call `useUnsaveExperienceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsaveExperienceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsaveExperienceMutation, { data, loading, error }] = useUnsaveExperienceMutation({
 *   variables: {
 *      experienceId: // value for 'experienceId'
 *   },
 * });
 */
export function useUnsaveExperienceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnsaveExperienceMutation, UnsaveExperienceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UnsaveExperienceMutation, UnsaveExperienceMutationVariables>(UnsaveExperienceDocument, options);
      }
export type UnsaveExperienceMutationHookResult = ReturnType<typeof useUnsaveExperienceMutation>;
export type UnsaveExperienceMutationResult = Apollo.MutationResult<UnsaveExperienceMutation>;
export type UnsaveExperienceMutationOptions = Apollo.BaseMutationOptions<UnsaveExperienceMutation, UnsaveExperienceMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation updateProfile($firstName: String, $lastName: String, $birthday: String, $email: String, $password: String, $photo: String, $phoneNumber: String, $city: String, $creatorBio: String) {
  editUser(
    firstName: $firstName
    lastName: $lastName
    birthday: $birthday
    email: $email
    password: $password
    photo: $photo
    phoneNumber: $phoneNumber
    city: $city
    creatorBio: $creatorBio
  ) {
    ...CoreProfile
  }
}
    ${CoreProfileFragmentDoc}`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      birthday: // value for 'birthday'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      photo: // value for 'photo'
 *      phoneNumber: // value for 'phoneNumber'
 *      city: // value for 'city'
 *      creatorBio: // value for 'creatorBio'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const GetUserExperiencesDocument = gql`
    query getUserExperiences {
  me {
    _id
    city
    savedExperiences {
      ...CardContent
    }
    bookedExperiences {
      ...CardContent
    }
    ...UserAvatar
  }
}
    ${CardContentFragmentDoc}
${UserAvatarFragmentDoc}`;

/**
 * __useGetUserExperiencesQuery__
 *
 * To run a query within a React component, call `useGetUserExperiencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserExperiencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserExperiencesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserExperiencesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserExperiencesQuery, GetUserExperiencesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserExperiencesQuery, GetUserExperiencesQueryVariables>(GetUserExperiencesDocument, options);
      }
export function useGetUserExperiencesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserExperiencesQuery, GetUserExperiencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserExperiencesQuery, GetUserExperiencesQueryVariables>(GetUserExperiencesDocument, options);
        }
export type GetUserExperiencesQueryHookResult = ReturnType<typeof useGetUserExperiencesQuery>;
export type GetUserExperiencesLazyQueryHookResult = ReturnType<typeof useGetUserExperiencesLazyQuery>;
export type GetUserExperiencesQueryResult = Apollo.QueryResult<GetUserExperiencesQuery, GetUserExperiencesQueryVariables>;
export const GetUserProfileDocument = gql`
    query getUserProfile {
  me {
    _id
    lastName
    city
    email
    phoneNumber
    birthday
    creator {
      _id
      bio
    }
    ...UserAvatar
  }
}
    ${UserAvatarFragmentDoc}`;

/**
 * __useGetUserProfileQuery__
 *
 * To run a query within a React component, call `useGetUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserProfileQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
      }
export function useGetUserProfileLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
        }
export type GetUserProfileQueryHookResult = ReturnType<typeof useGetUserProfileQuery>;
export type GetUserProfileLazyQueryHookResult = ReturnType<typeof useGetUserProfileLazyQuery>;
export type GetUserProfileQueryResult = Apollo.QueryResult<GetUserProfileQuery, GetUserProfileQueryVariables>;