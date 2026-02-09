"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ExperienceFormValues } from "../../lib/experience.validation";

export function TeamField() {
  const { control, watch } = useFormContext<ExperienceFormValues>();
  const teamworkType = watch("teamworkType");
  const isTeam = teamworkType === "TEAM";

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-4")}>
      <div className={cn("", isTeam ? "md:col-span-8" : "md:col-span-12")}>
        <FormField
          control={control}
          name="teamworkType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select work type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="SOLO">Solo</SelectItem>
                  <SelectItem value="TEAM">Team</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>

      {isTeam && (
        <div className={cn("", isTeam && "md:col-span-4")}>
          <FormField
            control={control}
            name="teamSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Size</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="5"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
}
