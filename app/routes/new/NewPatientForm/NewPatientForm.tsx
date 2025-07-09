import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmit } from "react-router";
import {
  patientSchema,
  PatientStatus,
  type PatientFormData,
} from "~/lib/schema";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "~/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import css from "./NewPatientForm.module.css";

export function NewPatientForm() {
  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  });
  const submit = useSubmit();

  const handleSubmit = (data: PatientFormData) => {
    // Convert the data to FormData for submission to the action
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("middleName", data.middleName || "");
    formData.append("lastName", data.lastName);
    formData.append("dateOfBirth", data.dateOfBirth);
    formData.append("status", data.status);
    formData.append("address", data.address || "");

    submit(formData, { method: "post" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={css.form}>
        <div className={css.nameGrid}>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            defaultValue={""}
          />
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input placeholder="Middle name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            defaultValue={""}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            defaultValue={""}
          />
        </div>

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          defaultValue={""}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select {...field} onValueChange={field.onChange}>
                <SelectTrigger>{field.value ?? "Select status"}</SelectTrigger>
                <SelectContent>
                  <SelectItem value={PatientStatus.INQUIRY}>Inquiry</SelectItem>
                  <SelectItem value={PatientStatus.ONBOARDING}>
                    Onboarding
                  </SelectItem>
                  <SelectItem value={PatientStatus.ACTIVE}>Active</SelectItem>
                  <SelectItem value={PatientStatus.CHURNED}>Churned</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
          defaultValue={PatientStatus.INQUIRY}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          defaultValue={""}
        />

        <Button type="submit" className={css.submitButton}>
          Save Patient
        </Button>
      </form>
    </Form>
  );
}
