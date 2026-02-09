"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

export function AchievementsField() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="achievements"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Achievements (Optional)</FormLabel>
          <FormControl>
            <Textarea
              rows={3}
              placeholder="Notable accomplishments..."
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
