import { ApolloProvider } from "@merged/solid-apollo";
import { Suspense } from "solid-js";

import { ErrorBoundary, FileRoutes, Routes, useNavigate } from "solid-start";

import { apolloClient } from "./application/clients/apollo";
import { Router } from "@solidjs/router";

// function AppErrorBoundary(props: { children: any }) {


//   return (<ErrorBoundary fallback={() => console.log}>
//     {props.children} 
//   </ErrorBoundary>)
// }

function fallback(e: any) {
  console.log('TEST', e)
  return <></>
}

function InnerApp() {
  const navigate = useNavigate();

  return <ApolloProvider client={apolloClient(navigate)}>
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
