import { ApolloClient, createHttpLink, InMemoryCache, from, useQuery } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
    uri: 'https://backend.otlivant.com/graphql/',
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    const token = sessionStorage.getItem('token');
    const bearerToken = '8EkfqmCxHIQs1uo0uWPJwX4BAZRItn';
    return {
        headers: {
            ...headers,
            authorization: token ? `JWT ${token}` : `Bearer ${bearerToken}`,
        }
    };
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        for (let err of graphQLErrors) {
            switch (err.extensions.exception.code) {
                case 'ExpiredSignatureError': {
                    console.log(err.extensions.exception.code);
                    localStorage.setItem('needRefresh', 'true');
                }
            }
        }
    }
});

const client = new ApolloClient({
        link: errorLink.concat(authLink.concat(httpLink)),
        cache: new InMemoryCache(),
    },
);

export default client;
