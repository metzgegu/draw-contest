import { createForm, zodForm } from "@modular-forms/solid";
import z from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email.")
    .email("The email address is badly formatted."),
  password: z.string().min(1, "Please enter your password."),
});

export type LoginForm = z.input<typeof loginFormSchema>;

export const loginForm = createForm<LoginForm>({
  validate: zodForm(loginFormSchema),
});
