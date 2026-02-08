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
import { ProjectFormValues } from "../../lib/project.validation";

export function SummaryField() {
  const form = useFormContext<ProjectFormValues>();

  return (
    <FormField
      control={form.control}
      name="summary"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Summary</FormLabel>
          <FormControl>
            <Textarea
              rows={2}
              placeholder="Short 1–2 sentence summary of this project"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
