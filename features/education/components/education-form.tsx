"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { toast } from "sonner";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/features/shared/components/card-wrapper";
import { errorToast } from "@/features/shared/errors/toast.error";

import {
  educationFormSchema,
  EducationFormValues,
} from "../lib/education.validation";

import { createEducation } from "../server/create-education";
import { updateEducation } from "../server/update-education";

import { InstitutionField } from "./fields/institution-field";
import { DegreeField } from "./fields/degree-field";
import { DateRangeField } from "./fields/date-range-field";
import { DescriptionField } from "./fields/description-field";

interface Props {
  educationId?: string;
  initialValues?: EducationFormValues;
  onClose?: () => void;
}

export function EducationForm({ educationId, initialValues, onClose }: Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      institution: initialValues?.institution ?? "",
      degree: initialValues?.degree ?? "",
      field: initialValues?.field ?? "",
      startYear: initialValues?.startYear ?? new Date(),
      endYear: initialValues?.endYear ?? undefined,
      description: initialValues?.description ?? "",
      logoUrl: initialValues?.logoUrl ?? "",
    },
  });

  function onSubmit(values: EducationFormValues) {
    startTransition(async () => {
      try {
        if (educationId) {
          await updateEducation(educationId, values);
          toast.success("Education updated");
        } else {
          await createEducation(values);
          toast.success("Education created");
        }

        onClose?.();
      } catch (error) {
        errorToast(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-6">
          <div className="lg:col-span-8 space-y-8">
            <CardWrapper title="Institution">
              <div className="space-y-6">
                <InstitutionField />
                <DegreeField />
              </div>
            </CardWrapper>

            <CardWrapper title="Description (optional)">
              <DescriptionField />
            </CardWrapper>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <CardWrapper title="Timeline">
              <DateRangeField />
            </CardWrapper>
          </div>
        </div>

        <div className="dialog-footer">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Education"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
