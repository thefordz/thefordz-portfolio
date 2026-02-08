"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { ProjectFormValues } from "../../lib/project.validation";

export function GithubUrlField() {
  const form = useFormContext<ProjectFormValues>();
  const value = form.watch("githubUrl");

  return (
    <FormField
      control={form.control}
      name="githubUrl"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>GitHub URL</FormLabel>
          <FormControl>
            <div className="flex gap-2">
              <Input placeholder="https://github.com/..." {...field} />
              {value && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => window.open(value, "_blank")}
                >
                  <Github className="h-4 w-4" />
                </Button>
              )}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
