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
  experienceFormSchema,
  ExperienceFormValues,
} from "../lib/experience.validation";

import { createExperience } from "../server/create-experience";
import { updateExperience } from "../server/update-experience";

import { DateRangeField } from "./fields/date-range-field";
import { RoleCompanyField } from "./fields/role-company-field";
import { EmploymentField } from "./fields/employment-field";
import { ResponsibilitiesField } from "./fields/responsibilities-field";
import { TeamField } from "./fields/team-field";
import { AchievementsField } from "./fields/achievement-field";
import { ExperienceProjectsField } from "./fields/experience-projects-field";
import { ProjectOption } from "@/features/projects/lib/project.types";
import { ResponsibilityField } from "./fields/responsibility-field";

interface Props {
  experienceId?: string;
  initialValues?: ExperienceFormValues;
  projectOptions: ProjectOption[];
  onClose?: () => void;
}

export function ExperienceForm({
  experienceId,
  initialValues,
  projectOptions,
  onClose,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      company: initialValues?.company ?? "",
      role: initialValues?.role ?? "",
      employment: initialValues?.employment ?? "FREELANCE",
      responsibilities: initialValues?.responsibilities ?? "",
      achievements: initialValues?.achievements ?? "",
      teamworkType: initialValues?.teamworkType ?? "SOLO",
      teamSize: initialValues?.teamSize ?? undefined,
      responsibility: initialValues?.responsibility ?? "CORE",
      startDate: initialValues?.startDate ?? new Date(),
      endDate: initialValues?.endDate ?? undefined,
      isCurrent: initialValues?.isCurrent ?? false,
      projectIds: initialValues?.projectIds ?? [],
    },
  });

  function onSubmit(values: ExperienceFormValues) {
    startTransition(async () => {
      try {
        if (experienceId) {
          await updateExperience(experienceId, values);
          toast.success("Experience updated");
        } else {
          await createExperience(values);
          toast.success("Experience created");
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
            <CardWrapper title="Role & Employment">
              <div className="space-y-6">
                {/* Name & Role */}
                <RoleCompanyField />
                {/* Employment & Responsibility */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EmploymentField />
                  <ResponsibilityField />
                </div>
                {/* Team Type & Team Size */}
                <TeamField />
              </div>
            </CardWrapper>

            <CardWrapper title="What you Did">
              <div className="space-y-6">
                {/* Details of experience */}
                <ResponsibilitiesField />
                <AchievementsField />
              </div>
            </CardWrapper>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <CardWrapper title="Timeline (optional)">
              <DateRangeField />
            </CardWrapper>
            <CardWrapper title="Related Projects">
              <ExperienceProjectsField projectOptions={projectOptions} />
            </CardWrapper>
          </div>
        </div>

        <div className="dialog-footer">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Experience"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
