import { ApolloProvider } from "@merged/solid-apollo";
import { Suspense } from "solid-js";

import { ErrorBoundary, FileRoutes, Routes } from "solid-start";

import { apolloClient } from "./application/clients/apollo";
import { Navigate, Router } from "@solidjs/router";

function fallback(e: Error) {
  if (e.message === 'You are not authenticated') {
    return <Navigate href="/login" />
  }
  return <Navigate href="/" />
}

function InnerApp() {
  return <ApolloProvider client={apolloClient}>
      <Suspense>
        <ErrorBoundary fallback={fallback}>
          <Routes>
            <FileRoutes />
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </ApolloProvider>
} 

export default function App() {
  return (
    <Router>
      <InnerApp />
    </Router>
  );
}
