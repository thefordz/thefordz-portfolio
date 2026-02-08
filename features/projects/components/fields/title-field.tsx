"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { ProjectFormValues } from "../../lib/project.validation";

export function TitleField() {
  const form = useFormContext<ProjectFormValues>();

  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Project Title</FormLabel>
          <FormControl>
            <Input placeholder="Todos App" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
