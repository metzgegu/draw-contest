import { ApolloLink, HttpLink, from } from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import { ApolloClient, InMemoryCache } from "@merged/solid-apollo";
import jwtManager from "~/application/authentication/jwtManager";

// @todo: use graphql endpoint from env
const httpLink = new HttpLink({ uri: "http://localhost:3000/graphql" });

const errorLink = (navigate: any) => onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path, extensions }) => { 
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Code :${extensions.code}`
      )
      if (extensions.code === 'UNAUTHENTICATED') {
        navigate('/signupppp')
      }
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

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

export const apolloClient = (navigate: any) => new ApolloClient({
  link: from([errorLink(navigate), authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});
