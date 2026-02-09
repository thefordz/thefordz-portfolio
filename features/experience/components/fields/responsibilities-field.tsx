"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

export function ResponsibilitiesField() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="responsibilities"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Responsibilities</FormLabel>
          <FormControl>
            <Textarea
              rows={4}
              placeholder="Describe your main responsibilities..."
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
