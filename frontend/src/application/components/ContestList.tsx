export default function ContestList(props: { contests: { id: string, name: string, status: string }[] }) {
  return (
    <div class="flex flex-col ">
      <section class="flex gap-4 justify-center">
        <h1 class="text-3xl mb-8">Contests</h1>
      </section>
      
        <section class="flex gap-4 justify-center">
        {props.contests.map((contest) => (
          <a class="flex" href={"/contest/" + contest.id}>
            <label class="p-4 border border-sky-500 rounded-lg h-min	">
              Status : {contest.status}
            </label>
            <div>
              <p>{contest.name}</p>
              <p>{contest.id}</p>
            </div>
          </a>
          )
        )}
        </section>
    </div>
  )
}
