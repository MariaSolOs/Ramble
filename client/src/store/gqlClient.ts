import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { getStoredToken } from 'utils/auth';
import { userProfileVar, savedExperiencesVar } from './user-cache';

const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_SERVER_URI}/graphql`
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: getStoredToken()
        }
    }
});

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    userProfile: {
                        read() {
                            return userProfileVar();
                        }
                    },
                    savedExperiences: {
                        read() {
                            return savedExperiencesVar();
                        }
                    }
                }
            },
            User: {
                fields: {
                    creator: {
                        merge: false
                    },
                    savedExperiences: {
                        merge: false
                    }
                }
            }
        }
    })
});

export default apolloClient;