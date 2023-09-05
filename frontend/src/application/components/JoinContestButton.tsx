import { createMutation, gql } from "@merged/solid-apollo";

const JOIN_CONTEST_MUTATION = gql`
  mutation JoinContest($contestId: ID!) {
    joinContest(contestId: $contestId) {
      id
    }
  }
`;


export default function JoinContestButton(props: { contestId: any }) {
  const [joinContest] = createMutation(JOIN_CONTEST_MUTATION);

  const handleJoinContest = async () => {
    try {
      await joinContest({ variables: { contestId: props.contestId } });

      window.location.reload();
    } catch (error) {
      // @TODO
      return;
    }
  };

  return (
    <div class="flex justify-center">
      <section class="flex flex-col mt-20 bg-gray-100 font-bold py-10 px-10 rounded shadow-xl">
        <h1 class="mb-4">You are not registered yet</h1>
        <button class="btn mt-4" onClick={handleJoinContest}>Join the contest now !</button>
      </section>
    </div>
  )
}