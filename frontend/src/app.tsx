import { ApolloProvider } from "@merged/solid-apollo";
import { Suspense } from "solid-js";

import { ErrorBoundary, FileRoutes, Routes } from "solid-start";

import { apolloClient } from "./application/clients/apollo";

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Suspense>
        <ErrorBoundary>
          <Routes>
            <FileRoutes />
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </ApolloProvider>
  );
}
