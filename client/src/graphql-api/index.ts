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

/** Ramble admin */
export type Admin = {
  _id: Scalars['ID'];
  token: Scalars['String'];
  userName: Scalars['String'];
};

/** Experience creators. */
export type Creator = {
  _id: Scalars['ID'];
  user: User;
  bio: Scalars['String'];
  governmentIds: Array<Scalars['String']>;
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
  isOnlineExperience: Scalars['Boolean'];
  pricePerPerson: Scalars['Int'];
  privatePrice?: Maybe<Scalars['Int']>;
  currency: Scalars['String'];
  ratingValue?: Maybe<Scalars['Float']>;
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

export enum ExperienceStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected'
}

export type Mutation = {
  /** Admin authentication */
  logIn: Admin;
  /** Decide/reject experience */
  approveExperience: Experience;
  /** Delete an experience */
  deleteExperience: Experience;
};


export type MutationLogInArgs = {
  userName: Scalars['String'];
  password: Scalars['String'];
};


export type MutationApproveExperienceArgs = {
  id: Scalars['ID'];
  decision: Scalars['String'];
};


export type MutationDeleteExperienceArgs = {
  id: Scalars['ID'];
};

export type Query = {
  /** Get experiences by their status */
  experiencesByStatus: Array<Experience>;
  /** Get the full information of the specified experience */
  experience: Experience;
};


export type QueryExperiencesByStatusArgs = {
  status: Array<ExperienceStatus>;
};


export type QueryExperienceArgs = {
  id: Scalars['ID'];
};

/** Application's users. */
export type User = {
  _id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  creator?: Maybe<Creator>;
};

export type DecideExperienceMutationVariables = Exact<{
  expId: Scalars['ID'];
  decision: Scalars['String'];
}>;


export type DecideExperienceMutation = { approveExperience: Pick<Experience, '_id'> };

export type DeleteExperienceMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteExperienceMutation = { deleteExperience: Pick<Experience, '_id'> };

export type GetExperienceQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetExperienceQuery = { experience: (
    Pick<Experience, '_id' | 'title' | 'description' | 'images' | 'location' | 'latitude' | 'longitude' | 'categories' | 'ageRestriction' | 'duration' | 'languages' | 'includedItems' | 'toBringItems' | 'capacity' | 'isOnlineExperience' | 'pricePerPerson' | 'privatePrice' | 'currency'>
    & { creator: (
      Pick<Creator, '_id' | 'bio' | 'governmentIds'>
      & { user: Pick<User, '_id' | 'firstName' | 'photo' | 'email'> }
    ) }
  ) };

export type GetExperiencesByStatusQueryVariables = Exact<{
  status: Array<ExperienceStatus> | ExperienceStatus;
}>;


export type GetExperiencesByStatusQuery = { experiencesByStatus: Array<Pick<Experience, '_id' | 'title' | 'images'>> };

export type LogInMutationVariables = Exact<{
  userName: Scalars['String'];
  password: Scalars['String'];
}>;


export type LogInMutation = { logIn: Pick<Admin, '_id' | 'token'> };


export const DecideExperienceDocument = gql`
    mutation decideExperience($expId: ID!, $decision: String!) {
  approveExperience(id: $expId, decision: $decision) {
    _id
  }
}
    `;
export type DecideExperienceMutationFn = Apollo.MutationFunction<DecideExperienceMutation, DecideExperienceMutationVariables>;

/**
 * __useDecideExperienceMutation__
 *
 * To run a mutation, you first call `useDecideExperienceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDecideExperienceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [decideExperienceMutation, { data, loading, error }] = useDecideExperienceMutation({
 *   variables: {
 *      expId: // value for 'expId'
 *      decision: // value for 'decision'
 *   },
 * });
 */
export function useDecideExperienceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DecideExperienceMutation, DecideExperienceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DecideExperienceMutation, DecideExperienceMutationVariables>(DecideExperienceDocument, options);
      }
export type DecideExperienceMutationHookResult = ReturnType<typeof useDecideExperienceMutation>;
export type DecideExperienceMutationResult = Apollo.MutationResult<DecideExperienceMutation>;
export type DecideExperienceMutationOptions = Apollo.BaseMutationOptions<DecideExperienceMutation, DecideExperienceMutationVariables>;
export const DeleteExperienceDocument = gql`
    mutation deleteExperience($id: ID!) {
  deleteExperience(id: $id) {
    _id
  }
}
    `;
export type DeleteExperienceMutationFn = Apollo.MutationFunction<DeleteExperienceMutation, DeleteExperienceMutationVariables>;

/**
 * __useDeleteExperienceMutation__
 *
 * To run a mutation, you first call `useDeleteExperienceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExperienceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExperienceMutation, { data, loading, error }] = useDeleteExperienceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteExperienceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteExperienceMutation, DeleteExperienceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteExperienceMutation, DeleteExperienceMutationVariables>(DeleteExperienceDocument, options);
      }
export type DeleteExperienceMutationHookResult = ReturnType<typeof useDeleteExperienceMutation>;
export type DeleteExperienceMutationResult = Apollo.MutationResult<DeleteExperienceMutation>;
export type DeleteExperienceMutationOptions = Apollo.BaseMutationOptions<DeleteExperienceMutation, DeleteExperienceMutationVariables>;
export const GetExperienceDocument = gql`
    query getExperience($id: ID!) {
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
    isOnlineExperience
    pricePerPerson
    privatePrice
    currency
    creator {
      _id
      bio
      governmentIds
      user {
        _id
        firstName
        photo
        email
      }
    }
  }
}
    `;

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
export const GetExperiencesByStatusDocument = gql`
    query getExperiencesByStatus($status: [ExperienceStatus!]!) {
  experiencesByStatus(status: $status) {
    _id
    title
    images
  }
}
    `;

/**
 * __useGetExperiencesByStatusQuery__
 *
 * To run a query within a React component, call `useGetExperiencesByStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExperiencesByStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExperiencesByStatusQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetExperiencesByStatusQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetExperiencesByStatusQuery, GetExperiencesByStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetExperiencesByStatusQuery, GetExperiencesByStatusQueryVariables>(GetExperiencesByStatusDocument, options);
      }
export function useGetExperiencesByStatusLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetExperiencesByStatusQuery, GetExperiencesByStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetExperiencesByStatusQuery, GetExperiencesByStatusQueryVariables>(GetExperiencesByStatusDocument, options);
        }
export type GetExperiencesByStatusQueryHookResult = ReturnType<typeof useGetExperiencesByStatusQuery>;
export type GetExperiencesByStatusLazyQueryHookResult = ReturnType<typeof useGetExperiencesByStatusLazyQuery>;
export type GetExperiencesByStatusQueryResult = Apollo.QueryResult<GetExperiencesByStatusQuery, GetExperiencesByStatusQueryVariables>;
export const LogInDocument = gql`
    mutation logIn($userName: String!, $password: String!) {
  logIn(userName: $userName, password: $password) {
    _id
    token
  }
}
    `;
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
 *      userName: // value for 'userName'
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