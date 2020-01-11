import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = createHttpLink({
    uri: 'http://localhost:9100/graphql',
});

export const client = new ApolloClient({
    cache,
    link,
});
