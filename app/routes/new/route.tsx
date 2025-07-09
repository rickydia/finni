import type { Route } from "./+types/route";
import { redirect, useActionData } from "react-router";
import db from "~/lib/prisma";
import { patientSchema } from "~/lib/schema";
import { NewPatientForm } from "./NewPatientForm";
import css from "./styles.module.css";

// Define the action data type for error responses
type ActionData = {
  errors: Record<string, string[]>;
};

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const result = patientSchema.safeParse(data);
  if (!result.success) {
    return Response.json(
      { errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const patient = await db.patient.create({
    data: {
      ...result.data,
      dateOfBirth: new Date(result.data.dateOfBirth),
    },
  });

  return redirect("/");
}

export default function NewPatientPage() {
  const actionData = useActionData<ActionData>();

  return (
    <div className={css.container}>
      <h1 className={css.title}>New Patient</h1>
      <NewPatientForm />
      {actionData?.errors && (
        <div className={css.error}>Please fix the highlighted fields.</div>
      )}
    </div>
  );
}
