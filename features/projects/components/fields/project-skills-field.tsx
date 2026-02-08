"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SkillCategoryOption } from "@/features/skill/lib/skill.types";

interface Props {
  categories: SkillCategoryOption[];
}

export function ProjectSkillsField({ categories }: Props) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="skillIds"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Technologies Used</FormLabel>

          <ScrollArea className="h-72 mt-3 pr-4 border rounded-md p-4">
            <div className="space-y-6">
              {categories.map((category) => (
                <div key={category.id}>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                    {category.name}
                  </h4>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {category.skills.map((skill) => {
                      const checked = field.value?.includes(skill.id);

                      return (
                        <label
                          key={skill.id}
                          className="flex items-center gap-2 text-sm cursor-pointer rounded-md px-2 py-1 hover:bg-muted/40 transition"
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(value: boolean) => {
                              const isChecked = value === true;

                              field.onChange(
                                isChecked
                                  ? [...(field.value || []), skill.id]
                                  : (field.value || []).filter(
                                      (id: string) => id !== skill.id,
                                    ),
                              );
                            }}
                          />
                          {skill.name}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </FormItem>
      )}
    />
  );
}
