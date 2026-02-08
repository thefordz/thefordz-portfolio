"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { ProjectFormValues } from "../../lib/project.validation";

export function DescriptionField() {
  const form = useFormContext<ProjectFormValues>();

  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              rows={6}
              placeholder="Explain the project in detail. Tech stack, challenges, architecture decisions..."
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
