import { z } from "zod";

export enum PatientStatus {
  INQUIRY = "INQUIRY",
  ONBOARDING = "ONBOARDING",
  ACTIVE = "ACTIVE",
  CHURNED = "CHURNED",
}

export const patientSchema = z.object({
  firstName: z.string().min(1),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date",
  }),
  status: z.nativeEnum(PatientStatus),
  address: z.string().min(1),
});

export type PatientFormData = z.infer<typeof patientSchema>;
