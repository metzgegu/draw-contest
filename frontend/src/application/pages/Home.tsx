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

const JOINED_CONTESTS_QUERY = gql`
  query JoinedContestList {
    joinedContestList {
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

  const getAdminContestList = () => {
    return data()?.adminContestList || []
  }
  
  const data2 = createQuery<{ joinedContestList: { id: string, name: string, status: string }[]}>(JOINED_CONTESTS_QUERY)

  const getJoinedContestList = () => {
    return data2()?.joinedContestList || []
  }

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const getUser = () => {
    return JSON.parse(localStorage.getItem('user') || '{}')
  }


  return (
    <>
      <Header />
      <section class="relative overflow-hidden">
        {[...Array(getRandomInt(10, 50)).keys()].map(() => (
          <div class="absolute border-4 border-black z-0" style={{ width: `${getRandomInt(2, 10)}rem`, height: `${getRandomInt(2, 10)}rem`, top: `${getRandomInt(0, 100)}%`, "border-radius": `${getRandomInt(0, 100)}%`, right: `${getRandomInt(0, 100)}%`, "border-color": "#"+((1<<24)*Math.random()|0).toString(16)}}></div>
        ))}

        <div class="relative bg-black/25 p-8 md:p-12 lg:px-16 lg:py-12 z-10">
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
                    class="inline-block btn"
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
      {getAdminContestList()?.length > 0 && (
        <section class="flex gap-4 justify-center">
          <h1 class="text-3xl mb-8 mt-8">My Contests created :</h1>
        </section>
      )}
      <ContestList contests={getAdminContestList()} />
      {getJoinedContestList()?.length > 0 && (
        <section class="flex gap-4 justify-center">
          <h1 class="text-3xl mb-8 mt-8">Contests joined :</h1>
        </section>
      )}
      <ContestList contests={getJoinedContestList()} />
    </>
  );
}
