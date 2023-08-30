import { createQuery, gql } from "@merged/solid-apollo";
import Header from "../components/Header";
import { ErrorBoundary } from "solid-js";
import { Navigate } from "@solidjs/router";
import JoinContestButton from "../components/JoinContestButton";

const QUERY = gql`
  query Contest($id: String!) {
    contest(id: $id) {
      name
      status
      drawingParticipations {
        userId
      }
    }
  }
`

const fallback = (id: any) => (e: Error) => {
  switch (e.message) {
    case 'You are not authenticated':
      return <Navigate href={`/login?redirect_url=/contest/${id}`} />
    case 'User not registered in this contest':
      return <JoinContestButton contestId={id}/>
    default:
      return <Navigate href="/" />
  }
}

export default function Contest(props: { id: string }) {
  const data = createQuery<{ contest: { name: string, status: string }}>(QUERY, {
    variables: { id: props.id },
  })

  const getContestName = () => {
    return data()?.contest?.name
  }

  return (
    <>
      <Header />
      <ErrorBoundary fallback={fallback(props.id)}>
      <div class="flex flex-col ">
        <section class="flex gap-4 justify-center">
          <h1 class="text-3xl mb-8">Contest : {getContestName()}</h1>
        </section>
        <section class="flex gap-4 justify-center">
          <div class="flex">
            <label class="p-4 border border-sky-500 rounded-lg h-min	">
              Status : {data()?.contest?.status}
            </label>
          </div>
          <div
            class="relative w-screen max-w-sm border bg-gray-100 px-4 py-8 sm:px-6 lg:px-8 rounded-md"
          >
            <div class="space-y-6">
              <ul class="space-y-4">
                <li class="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
                    alt=""
                    class="h-16 w-16 rounded object-cover"
                  />

                  <div>
                    <h3 class="text-sm text-gray-900">Basic Tee 6-Pack</h3>
                  </div>
                </li>

                <li class="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
                    alt=""
                    class="h-16 w-16 rounded object-cover"
                  />

                  <div>
                    <h3 class="text-sm text-gray-900">Basic Tee 6-Pack</h3>
                  </div>
                </li>

                <li class="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
                    alt=""
                    class="h-16 w-16 rounded object-cover"
                  />

                  <div>
                    <h3 class="text-sm text-gray-900">Basic Tee 6-Pack</h3>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="flex"></div>
        </section>
      </div>
      </ErrorBoundary>
    </>
  );
}  