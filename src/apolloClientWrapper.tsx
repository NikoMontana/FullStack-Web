import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";

const GRAPHQL_ENDPOINT_DEVELOPMENT = "http://localhost:4000";
const GRAPHQL_ENDPOINT_PRODUCTION = "YOUR_ENDPOINT";

const GRAPHQL_ENDPOINT =
  process.env.NODE_ENV === "development"
    ? GRAPHQL_ENDPOINT_DEVELOPMENT
    : GRAPHQL_ENDPOINT_PRODUCTION;

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      uri: GRAPHQL_ENDPOINT,
      cache: new InMemoryCache().restore(initialState || {})
    })
);
