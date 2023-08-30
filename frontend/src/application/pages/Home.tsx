import { createMutation, createQuery, gql } from "@merged/solid-apollo";
import { Field, Form, setError } from "@modular-forms/solid";
import { createSignal, Show } from "solid-js";
import { fromZodError } from "zod-validation-error";

import Header from "../components/Header";

import {
  CreateContestForm,
  createContestForm,
  createContestFormSchema,
} from "../forms/createContestForm";
import { useNavigate } from "solid-start";
import ContestList from "../components/ContestList";

const CREATE_CONTEST_MUTATION = gql`
  mutation CreateContest($name: String!) {
    createContest(name: $name) {
      id
    }
  }
`;

const ADMIN_CONTESTS_QUERY = gql`
  query AdminContestList {
    adminContestList {
      id
      name
      status
    }
  }
`

const Error = ({ error }: { error: string }) => (
  <div class="text-red-600 text-xs pt-1">{error}</div>
);

const NewContestForm = () => {
  const navigate = useNavigate();

  const [createContest] = createMutation(CREATE_CONTEST_MUTATION);

  const handleCreateContest = async (formData: CreateContestForm) => {
    const formCheck = createContestFormSchema.safeParse(formData);
    if (!formCheck.success) {
      const validationError = fromZodError(formCheck.error);
      setError(createContestForm, "name", validationError.message);
      return;
    }
    try {
      const result = await createContest({ variables: formData });
 
      navigate(`/contest/${result.createContest.id}`);
    } catch (error) {
      setError(createContestForm, "name", (error as Error).message);
      return;
    }
  };

  return (
    <Form
      of={createContestForm}
      onSubmit={handleCreateContest}
      class="mt-8 grid grid-cols-12 gap-6"
    >
      <Field of={createContestForm} name="name">
        {(field) => (
          <div class="inline-block col-span-3">
            <input
              {...field.props}
              type="text"
              autofocus
              placeholder="My Fabulous Contest"
              class="rounded-full bg-white px-12 py-3 text-sm font-medium text-gray-700 transition focus:outline-none focus:ring focus:ring-yellow-400"
            />
            {field.error && <Error error={field.error} />}
          </div>
        )}
      </Field>
      <div class="mx-4">
        <button class="inline-block rounded-full bg-indigo-600  px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400">
          OK
        </button>
      </div>
    </Form>
  );
};

export default function Home() {
  const [showContestForm, setShowContestForm] = createSignal(false);

  const data = createQuery<{ adminContestList: { id: string, name: string, status: string }[]}>(ADMIN_CONTESTS_QUERY)

  const getContestList = () => {
    return data()?.adminContestList || []
  }

  return (
    <>
      <Header />
      <section class="overflow-hidden bg-[url(https://images.unsplash.com/photo-1602810319428-019690571b5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat">
        <div class="bg-black/25 p-8 md:p-12 lg:px-16 lg:py-24">
          <div class="text-center sm:text-left">
            <h2 class="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
              Create a contest
            </h2>
            <p class="hidden max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
              Spark creativity and share your vision with a new contest. Create
              now and engage with a passionate community of creators!
            </p>
            <div class="mt-4 sm:mt-8">
              <Show
                when={showContestForm()}
                fallback={
                  <button
                    onClick={() => setShowContestForm(!showContestForm())}
                    class="inline-block rounded-full bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                  >
                    Create contest
                  </button>
                }
              >
                <NewContestForm />
              </Show>
            </div>
          </div>
        </div>
      </section>
      <ContestList contests={getContestList()} />
    </>
  );
}
