"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { ProjectFormValues } from "../../lib/project.validation";

export function LiveUrlField() {
  const form = useFormContext<ProjectFormValues>();
  const value = form.watch("liveUrl");

  return (
    <FormField
      control={form.control}
      name="liveUrl"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Live URL</FormLabel>
          <FormControl>
            <div className="flex gap-2">
              <Input placeholder="https://example.com" {...field} />
              {value && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => window.open(value, "_blank")}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
