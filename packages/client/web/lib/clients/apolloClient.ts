import { ApolloClient, createHttpLink, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import { getToken } from '../jwt/jwt';

const httpLink = createHttpLink({
    uri: 'http://localhost:8080/graphql',
    credentials: 'include'
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
    )
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authMiddleware = setContext(async (req, { headers }) => {
    const token = await getToken();

    return {
        headers: {
            ...headers,
            authorization: token ? token : ''
        },
    };
});

export const client = new ApolloClient({
    link: errorLink.concat(authMiddleware.concat(httpLink)),
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
    defaultOptions: {
        mutate: {
            errorPolicy: 'all',
        }
    }
});

export const clientNoAuth = new ApolloClient({
    link: errorLink.concat(httpLink),
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
    defaultOptions: {
        mutate: {
            errorPolicy: 'all',
        }
    }
})