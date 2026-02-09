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

export function CompanyField() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="company"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Company</FormLabel>
          <FormControl>
            <Input placeholder="Google" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
