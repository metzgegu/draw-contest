import { createQuery, gql } from "@merged/solid-apollo";
import Header from "../components/Header";
import { ErrorBoundary } from "solid-js";
import { Navigate } from "@solidjs/router";
import JoinContestButton from "../components/JoinContestButton";
import Status from "../components/Status";
import UserList from "../components/UserList";

const QUERY = gql`
  query Contest($id: String!) {
    contest(id: $id) {
      name
      status
      drawingParticipations {
        userId
        user {
          name
        }
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
  const data = createQuery<{ contest: { name: string, status: string, drawingParticipations: any }}>(QUERY, {
    variables: { id: props.id },
  })

  const getContestName = () => {
    return data()?.contest?.name
  }

  const getUserList = () => {
    const res = data()?.contest?.drawingParticipations.map((drawingParticipation: any) => { return drawingParticipation.user })
    return res
  }

  return (
    <>
      <Header />
      <ErrorBoundary fallback={fallback(props.id)}>
      <div class="flex flex-col">
        <section class="flex gap-4 justify-center">
          <h1 class="text-3xl mb-8">Contest : {getContestName()}</h1>
        </section>
        <section class="flex justify-end ">
          <section class="flex gap-4 flex-col mr-12">
            <Status status={data()?.contest?.status}></Status>
            <UserList userList={getUserList()}></UserList>
          </section>
        </section>
      </div>
      </ErrorBoundary>
    </>
  );
}  