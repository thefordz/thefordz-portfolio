"use client";

import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { Check, X, Plus } from "lucide-react";

import {
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { cn } from "@/lib/utils";
import { ProjectOption } from "@/features/projects/lib/project.types";
import { ExperienceFormValues } from "../../lib/experience.validation";

interface Props {
  projectOptions: ProjectOption[];
}

export function ExperienceProjectsField({ projectOptions }: Props) {
  const { control, watch } = useFormContext<ExperienceFormValues>();
  const [open, setOpen] = useState(false);

  const selectedIds = watch("projectIds") ?? [];

  const selectedProjects = projectOptions.filter((project) =>
    selectedIds.includes(project.id),
  );

  return (
    <FormField
      control={control}
      name="projectIds"
      render={({ field }) => {
        const toggleProject = (projectId: string) => {
          const exists = selectedIds.includes(projectId);

          const next = exists
            ? selectedIds.filter((pid) => pid !== projectId)
            : [...selectedIds, projectId];

          field.onChange(next);
        };

        return (
          <FormItem className="space-y-4">
            {/* Selected Projects */}
            <div className="min-h-9">
              {selectedProjects.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  Link projects related to this role
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedProjects.map((project) => (
                    <Badge
                      key={project.id}
                      variant="secondary"
                      className="px-3 py-1 rounded-full text-xs flex items-center gap-1"
                    >
                      {project.title}

                      <button
                        type="button"
                        onClick={() => toggleProject(project.id)}
                        className="opacity-60 hover:opacity-100 transition"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Selector */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full px-3 text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Project
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent
                align="start"
                className="w-72 p-0 rounded-lg shadow-xl"
              >
                <Command>
                  <CommandInput placeholder="Search project..." />
                  <CommandEmpty>No project found.</CommandEmpty>

                  <CommandGroup className="max-h-60 overflow-y-auto">
                    {projectOptions.map((project) => {
                      const isSelected = selectedIds.includes(project.id);

                      return (
                        <CommandItem
                          key={project.id}
                          onSelect={() => toggleProject(project.id)}
                          className="cursor-pointer"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4 transition-opacity",
                              isSelected ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {project.title}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
