import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_SERVER_URI}/graphql`
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('ramble-token') || sessionStorage.getItem('ramble-token') || '';
    return {
        headers: {
            ...headers,
            authorization: token 
        }
    }
});

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export type Client = typeof apolloClient;
export default apolloClient;