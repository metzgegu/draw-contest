import Status from "./Status";

export default function ContestList(props: { contests: { id: string, name: string, status: string }[] }) {
  const copyLink = (id: string) => {
    navigator.clipboard.writeText(window.location.origin + "/contest/" + id)
    window.alert("Link copied to clipboard")
  }

  return (
    <div class="flex flex-col justify-center items-center">
        <section class="flex gap-4 justify-center flex-col w-6/12">
        {props.contests.map((contest) => (
          <div class="flex shadow-xl rounded-lg px-4 py-2 my-2">
            <Status status={contest.status}></Status>
            <div class="flex justify-center flex-row pl-4 w-full">
              <a class="flex justify-center flex-col cursor-pointer" href={"/contest/" + contest.id}>{contest.name}</a>
              <button class="btn flex h-min m-auto mr-0" onClick={[copyLink, contest.id]}>Copy link</button>
            </div>
          </div>
          )
        )}
        </section>
    </div>
  )
}
