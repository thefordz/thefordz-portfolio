"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useFormContext } from "react-hook-form";
import {
  ProjectFormValues,
  projectTypeValues,
} from "../../lib/project.validation";

export function ProjectTypeField() {
  const form = useFormContext<ProjectFormValues>();

  return (
    <FormField
      control={form.control}
      name="projectType"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Project Type</FormLabel>
          <FormControl>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full capitalize">
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                {projectTypeValues.map((type) => (
                  <SelectItem key={type} value={type} className="capitalize">
                    {type.toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
