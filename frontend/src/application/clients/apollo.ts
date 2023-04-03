import { ApolloLink, HttpLink } from "@apollo/client/core";
import { ApolloClient, InMemoryCache } from "@merged/solid-apollo";
import jwtManager from "~/application/authentication/jwtManager";

// @todo: use graphql endpoint from env
const httpLink = new HttpLink({ uri: "http://localhost:3000/graphql" });

const authLink = new ApolloLink((operation, forward) => {
  const token = jwtManager.getToken();

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

// @todo: handle token expiration

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
