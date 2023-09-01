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
    <>
      <h1>You are not registered yet</h1>
      <button onClick={handleJoinContest}>Join the contest now !</button>
    </>
  )
}