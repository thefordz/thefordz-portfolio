"use client";

import { cn } from "@/lib/utils";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { ExperienceFormValues } from "../../lib/experience.validation";

interface ResponsibilityFieldProps {
  className?: string;
}

export function ResponsibilityField({ className }: ResponsibilityFieldProps) {
  const { control } = useFormContext<ExperienceFormValues>();

  return (
    <div className={cn(className)}>
      <FormField
        control={control}
        name="responsibility"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Responsibility Level</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select responsibility level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="LEAD">Lead</SelectItem>
                <SelectItem value="CORE">Core Contributor</SelectItem>
                <SelectItem value="SUPPORT">Support</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
}
