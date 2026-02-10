"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EducationFormValues } from "../../lib/education.validation";

export function InstitutionField() {
  const { control } = useFormContext<EducationFormValues>();

  return (
    <FormField
      control={control}
      name="institution"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Institution</FormLabel>
          <FormControl>
            <Input placeholder="Harvard University" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
