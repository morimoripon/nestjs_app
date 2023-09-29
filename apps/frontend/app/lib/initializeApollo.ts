import { ApolloClient, InMemoryCache } from "@apollo/client";

const initializeApollo = () => {
  return new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  });
}

export default initializeApollo;
