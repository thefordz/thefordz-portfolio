"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { toast } from "sonner";
import { skillFormSchema, SkillFormValues } from "../lib/skill.validation";
import { createSkill } from "../server/create-skill";
import { errorToast } from "@/features/shared/errors/toast.error";
import { CardWrapper } from "@/features/shared/components/card-wrapper";

interface Props {
  categoryId?: string;
  onClose?: () => void;
}

export function SkillForm({ categoryId, onClose }: Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      name: "",
      categoryId: categoryId ?? "",
      level: undefined,
      yearsOfExperience: undefined,
    },
  });

  function onSubmit(values: SkillFormValues) {
    startTransition(async () => {
      try {
        await createSkill(values);

        toast.success("Skill created");
        form.reset({
          name: "",
          categoryId: categoryId ?? "",
          level: undefined,
          yearsOfExperience: undefined,
        });

        onClose?.();
      } catch (error) {
        errorToast(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CardWrapper>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skill Name</FormLabel>
                <FormControl>
                  <Input placeholder="React, Prisma, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="">
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value === "NONE" ? undefined : value)
                      }
                      value={field.value ?? "NONE"}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Optional" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="NONE">No level</SelectItem>
                        <SelectItem value="BEGINNER">Beginner</SelectItem>
                        <SelectItem value="INTERMEDIATE">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="ADVANCED">Advanced</SelectItem>
                        <SelectItem value="EXPERT">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="yearsOfExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Years of experience"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                        )
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </CardWrapper>

        <div className="dialog-footer">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Create Skill"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
