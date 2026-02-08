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
import { toast } from "sonner";
import {
  skillCategoryFormSchema,
  SkillCategoryFormValues,
} from "../lib/skill-category.validation";
import { updateSkillCategory } from "../server/update-skill-category";
import { createSkillCategory } from "../server/create-skill-category";
import { errorToast } from "@/features/shared/errors/toast.error";
import { DialogFooter } from "@/components/ui/dialog";

interface Props {
  categoryId?: string;
  initialValues?: SkillCategoryFormValues;
  onClose?: () => void;
}

export function SkillCategoryForm({
  categoryId,
  initialValues,
  onClose,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SkillCategoryFormValues>({
    resolver: zodResolver(skillCategoryFormSchema),
    defaultValues: initialValues ?? {
      name: "",
    },
  });

  function onSubmit(values: SkillCategoryFormValues) {
    startTransition(async () => {
      try {
        if (categoryId) {
          await updateSkillCategory(categoryId, values);
          toast.success("Category updated");
        } else {
          await createSkillCategory(values);
          toast.success("Category created");
          form.reset();
        }
        onClose?.();
      } catch (error) {
        errorToast(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Frontend, Backend, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <div className="flex justify-between gap-3 pt-4 w-full">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
}
