export default function (props: { userList: any }) {
  console.log('UserList', props.userList)

  return (
    <div
      class="relative w-screen max-w-sm border bg-gray-100 px-4 py-8 sm:px-6 lg:px-8 rounded-md"
    >
      <div class="space-y-6">
        <ul class="space-y-4">
          {props.userList?.map((user: any) => (
            <li class="flex items-center gap-4">
            <div
              class="h-16 w-16 rounded object-cover flex justify-center items-center bg-white"
            >
              <div class="h-8 w-8 rounded-full mb-4 bg-black"></div>
              <div class="absolute w-12 h-5 mt-11 rounded-t-3xl bg-black"></div>
            </div>

            <div>
              <h3 class="text-sm text-gray-900">{user.name}</h3>
            </div>
          </li>
          )
        )}
        </ul>
      </div>
    </div> 
  )
}