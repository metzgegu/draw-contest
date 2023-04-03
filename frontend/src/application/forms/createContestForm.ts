import { createForm, zodForm } from "@modular-forms/solid";
import { z } from "zod";

export const createContestFormSchema = z.object({
  name: z.string().min(1, "Please enter contest name."),
});

export type CreateContestForm = z.input<typeof createContestFormSchema>;

export const createContestForm = createForm<CreateContestForm>({
  validate: zodForm(createContestFormSchema),
});
