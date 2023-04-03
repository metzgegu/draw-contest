import { createForm, zodForm } from "@modular-forms/solid";
import z from "zod";

export const signupFormSchema = z
  .object({
    email: z
      .string()
      .min(1, "Please enter your email.")
      .email("The email address is badly formatted."),
    name: z.string().min(1, "Please enter your name."),
    password: z
      .string()
      .min(1, "Please enter your password.")
      .min(8, "You password must have 8 characters or more."),
    passwordConfirmation: z
      .string()
      .min(1, "Please enter your password confirmation.")
      .min(8, "You password must have 8 characters or more."),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

export type SignupForm = z.input<typeof signupFormSchema>;

export const signupForm = createForm<SignupForm>({
  validate: zodForm(signupFormSchema),
});
