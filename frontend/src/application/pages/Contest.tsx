import Header from "../components/Header";

export default function Contest(props: { id: string }) {
  return (
    <>
      <Header />
      <section class="flex gap-4">
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
    </>
  );
}  