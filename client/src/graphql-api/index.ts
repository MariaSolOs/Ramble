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

/** Bookings associated to an occurrence. */
export type Booking = {
  _id: Scalars['ID'];
};

/** Experience creators. */
export type Creator = {
  _id: Scalars['ID'];
  user: User;
  bio: Scalars['String'];
  stripeProfile: StripeInfo;
};

/** Experiences */
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

/** Ramble's experience categories. */
export enum ExperienceCategory {
  Taste = 'taste',
  Create = 'create',
  Relax = 'relax',
  Learn = 'learn',
  Move = 'move'
}

export type Mutation = {
  signUpUser: User;
  logInUser: User;
  editUser: User;
  signUpCreator: Creator;
  saveExperience: Experience;
  unsaveExperience: Experience;
  createExperience?: Maybe<Experience>;
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
  rememberUser: Scalars['Boolean'];
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

/**
 * Representation of a single occurrence in time of an
 * experience.
 */
export type Occurrence = {
  _id: Scalars['ID'];
  experience: Experience;
  dateStart: Scalars['String'];
  dateEnd: Scalars['String'];
  spotsLeft: Scalars['Int'];
  creatorProfit: Scalars['Int'];
  bookings?: Maybe<Array<Booking>>;
};

/** Input types */
export type OccurrenceInput = {
  start: Scalars['String'];
  end: Scalars['String'];
};

export type Query = {
  me: User;
  experiences: Array<Experience>;
  experience: Experience;
};


export type QueryExperiencesArgs = {
  location?: Maybe<Scalars['String']>;
  capacity?: Maybe<Scalars['Int']>;
};


export type QueryExperienceArgs = {
  id: Scalars['String'];
};

/** Representation of a creator's Stripe profile. */
export type StripeInfo = {
  onboarded?: Maybe<Scalars['Boolean']>;
  accountId?: Maybe<Scalars['String']>;
};

/** Application's users. */
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

export type CoreProfileFragment = (
  Pick<User, '_id' | 'token'>
  & { savedExperiences: Array<Pick<Experience, '_id'>>, creator?: Maybe<Pick<Creator, '_id'>> }
  & UserAvatarFragment
);

export type GetCoreProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCoreProfileQuery = { me: CoreProfileFragment };

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


export type CreateExperienceMutation = { createExperience?: Maybe<Pick<Experience, '_id' | 'title'>> };

export type GetCreationProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCreationProfileQuery = { me: (
    { creator?: Maybe<(
      { stripeProfile: Pick<StripeInfo, 'onboarded'> }
      & CreatorBioFragment
    )> }
    & UserAvatarFragment
  ) };

export type CreatorBioFragment = Pick<Creator, '_id' | 'bio'>;

export type GetCreatorFormFieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCreatorFormFieldsQuery = { me: (
    Pick<User, '_id' | 'phoneNumber'>
    & UserAvatarFragment
  ) };

export type CardContentFragment = Pick<Experience, '_id' | 'title' | 'images' | 'pricePerPerson' | 'ratingValue' | 'numberOfRatings' | 'location' | 'zoomPMI'>;

export type GetExperienceQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetExperienceQuery = { experience: (
    Pick<Experience, '_id' | 'title' | 'description' | 'images' | 'location' | 'latitude' | 'longitude' | 'categories' | 'ageRestriction' | 'duration' | 'languages' | 'includedItems' | 'toBringItems' | 'capacity' | 'zoomPMI' | 'pricePerPerson'>
    & { creator: (
      { user: UserAvatarFragment }
      & CreatorBioFragment
    ) }
  ) };

export type GetExperiencesQueryVariables = Exact<{
  location: Scalars['String'];
  capacity?: Maybe<Scalars['Int']>;
}>;


export type GetExperiencesQuery = { experiences: Array<CardContentFragment> };

export type GetLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLocationsQuery = { experiences: Array<Pick<Experience, 'location'>> };

export type LogInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  rememberUser: Scalars['Boolean'];
}>;


export type LogInMutation = { logInUser: CoreProfileFragment };

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
}>;


export type UpdateProfileMutation = { editUser: CoreProfileFragment };

export type UserAvatarFragment = Pick<User, 'photo' | 'firstName'>;

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
  savedExperiences {
    _id
  }
  creator {
    _id
  }
  ...UserAvatar
}
    ${UserAvatarFragmentDoc}`;
export const CreatorBioFragmentDoc = gql`
    fragment CreatorBio on Creator {
  _id
  bio
}
    `;
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
export const GetCreationProfileDocument = gql`
    query getCreationProfile {
  me {
    ...UserAvatar
    creator {
      stripeProfile {
        onboarded
      }
      ...CreatorBio
    }
  }
}
    ${UserAvatarFragmentDoc}
${CreatorBioFragmentDoc}`;

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
export const GetExperienceDocument = gql`
    query getExperience($id: String!) {
  experience(id: $id) {
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
      ...CreatorBio
      user {
        ...UserAvatar
      }
    }
  }
}
    ${CreatorBioFragmentDoc}
${UserAvatarFragmentDoc}`;

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
    query getExperiences($location: String!, $capacity: Int) {
  experiences(location: $location, capacity: $capacity) {
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
 *   },
 * });
 */
export function useGetExperiencesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetExperiencesQuery, GetExperiencesQueryVariables>) {
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
    mutation logIn($email: String!, $password: String!, $rememberUser: Boolean!) {
  logInUser(email: $email, password: $password, rememberUser: $rememberUser) {
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
 *      rememberUser: // value for 'rememberUser'
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
    mutation updateProfile($firstName: String, $lastName: String, $birthday: String, $email: String, $password: String, $photo: String, $phoneNumber: String, $city: String) {
  editUser(
    firstName: $firstName
    lastName: $lastName
    birthday: $birthday
    email: $email
    password: $password
    photo: $photo
    phoneNumber: $phoneNumber
    city: $city
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