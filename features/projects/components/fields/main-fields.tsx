"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { ProjectFormValues } from "../../lib/project.validation";
import { SlugField } from "./slug-field";

export function MainFields() {
  const form = useFormContext<ProjectFormValues>();

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Title</FormLabel>
            <FormControl>
              <Input placeholder="Todos List" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <SlugField />

      <FormField
        control={form.control}
        name="summary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Summary</FormLabel>
            <FormControl>
              <Textarea
                rows={2}
                placeholder="Short 1-2 sentence summary"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                rows={6}
                placeholder="Explain the project in detail..."
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
