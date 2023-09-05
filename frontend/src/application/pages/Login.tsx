import { createMutation, gql } from "@merged/solid-apollo";
import { Form, Field, setError } from "@modular-forms/solid";
import { A } from "@solidjs/router";
import { useNavigate } from "solid-start";
import { fromZodError } from "zod-validation-error";

import jwtManager from "../authentication/jwtManager";
import { AuthLayout } from "../components/AuthLayout";
import { loginForm, LoginForm, loginFormSchema } from "../forms/loginForm";

const Error = ({ error }: { error: string }) => (
  <div class="text-red-600 text-xs pt-1">{error}</div>
);

const LOGIN_MUTATION = gql`
  mutation userLogin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export const Login = () => {
  const navigate = useNavigate();

  const [login] = createMutation(LOGIN_MUTATION);

  const handleLogin = async (formData: LoginForm) => {
    const formCheck = loginFormSchema.safeParse(formData);
    if (!formCheck.success) {
      const validationError = fromZodError(formCheck.error);
      setError(loginForm, "email", validationError.message);
      return;
    }

    try {
      const result = await login({ variables: formData });
      jwtManager.setToken(result.login.token);
      localStorage.setItem("user", JSON.stringify(result.login.user));
      navigate("/");
    } catch (error) {
      setError(loginForm, "email", (error as Error).message);
      return;
    }
  };

  return (
    <AuthLayout>
      <Form
        of={loginForm}
        onSubmit={handleLogin}
        class="mt-8 grid grid-cols-12 gap-6"
      >
        <Field of={loginForm} name="email">
          {(field) => (
            <div class="col-span-12">
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
        <Field of={loginForm} name="password">
          {(field) => (
            <div class="col-span-12">
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

        <div class="col-span-12 sm:flex sm:items-center sm:gap-4">
          <button class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
            Log in
          </button>
          <p class="mt-4 text-sm text-gray-500 sm:mt-0">
            Don't have an account yet?&nbsp;
            <A href="/signup" class="text-gray-700 underline">
              Signup
            </A>
          </p>
        </div>
      </Form>
    </AuthLayout>
  );
};
