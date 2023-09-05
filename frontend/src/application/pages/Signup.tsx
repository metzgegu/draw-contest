import { createMutation, gql } from "@merged/solid-apollo";
import { Form, Field, setError } from "@modular-forms/solid";
import { A } from "@solidjs/router";
import { useNavigate } from "solid-start";
import { fromZodError } from "zod-validation-error";

import jwtManager from "../authentication/jwtManager";
import { AuthLayout } from "../components/AuthLayout";
import { SignupForm, signupForm, signupFormSchema } from "../forms/signupForm";

const Error = ({ error }: { error: string }) => (
  <div class="text-red-600 text-xs pt-1">{error}</div>
);

const SIGNUP_MUTATION = gql`
  mutation userSignup($name: String!, $password: String!, $email: String!) {
    signup(name: $name, password: $password, email: $email) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export const Signup = () => {
  console.log('SIGNUP')
  const navigate = useNavigate();

  const [signup] = createMutation(SIGNUP_MUTATION);

  const handleSignup = async (formData: SignupForm) => {
    const formCheck = signupFormSchema.safeParse(formData);
    if (!formCheck.success) {
      const validationError = fromZodError(formCheck.error);
      setError(signupForm, "password", validationError.message);
      return;
    }

    try {
      const result = await signup({ variables: formData });

      jwtManager.setToken(result.signup.token);
      localStorage.setItem("user", JSON.stringify(result.signup.user));
      navigate("/");
    } catch (error) {
      setError(signupForm, "name", (error as Error).message);
    }
  };

  return (
    <AuthLayout>
      <Form
        of={signupForm}
        onSubmit={handleSignup}
        class="mt-8 grid grid-cols-6 gap-6"
      >
        <Field of={signupForm} name="name">
          {(field) => (
            <div class="col-span-6">
              <label for="name" class="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                {...field.props}
                required
                type="text"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
              {field.error && <Error error={field.error} />}
            </div>
          )}
        </Field>
        <Field of={signupForm} name="email">
          {(field) => (
            <div class="col-span-6">
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                {...field.props}
                required
                type="email"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
              {field.error && <Error error={field.error} />}
            </div>
          )}
        </Field>
        <Field of={signupForm} name="password">
          {(field) => (
            <div class="col-span-6 sm:col-span-3">
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                {...field.props}
                required
                autocomplete="new-password"
                type="password"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
              {field.error && <Error error={field.error} />}
            </div>
          )}
        </Field>
        <Field of={signupForm} name="passwordConfirmation">
          {(field) => (
            <div class="col-span-6 sm:col-span-3">
              <label
                for="passwordConfirmation"
                class="block text-sm font-medium text-gray-700"
              >
                Password Confirmation
              </label>
              <input
                {...field.props}
                required
                type="password"
                autocomplete="new-password"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
              {field.error && <Error error={field.error} />}
            </div>
          )}
        </Field>
        <div class="col-span-6">
          <p class="text-sm text-gray-500">
            By creating an account, you agree to our&nbsp;
            <a href="#" class="text-gray-700 underline">
              terms and conditions
            </a>
          </p>
        </div>
        <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
            Create an account
          </button>
          <p class="mt-4 text-sm text-gray-500 sm:mt-0">
            Already have an account?&nbsp;
            <A href="/login" class="text-gray-700 underline">
              Log in
            </A>
          </p>
        </div>
      </Form>
    </AuthLayout>
  );
};
