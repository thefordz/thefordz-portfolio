"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { errorToast } from "@/features/shared/errors/toast.error";
import {
  projectFormSchema,
  ProjectFormValues,
} from "../../lib/project.validation";
import { ProjectImagesField } from "../fields/project-images-fields";
import { updateProject } from "../../server/update-project";
import { toast } from "sonner";
import { createProject } from "../../server/create-project";
import { ProjectTypeField } from "../fields/project-type-field";
import { LiveUrlField } from "../fields/live-url-field";
import { GithubUrlField } from "../fields/github-url-field";
import { IsFeaturedField } from "../fields/is-features-field";
import { TitleField } from "../fields/title-field";
import { SummaryField } from "../fields/summary-field";
import { DescriptionField } from "../fields/description-field";
import { CardWrapper } from "@/features/shared/components/card-wrapper";
import { ProjectSkillsField } from "../fields/project-skills-field";
import { SkillCategoryOption } from "@/features/skill/lib/skill.types";

interface ProjectsFormProps {
  projectId?: string;
  initialValues?: ProjectFormValues;
  categories: SkillCategoryOption[];
  onClose?: () => void;
}

export function ProjectsForm({
  projectId,
  initialValues: project,
  categories,
  onClose,
}: ProjectsFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: project?.title ?? "",
      summary: project?.summary ?? "",
      description: project?.description ?? "",
      images: project?.images ?? [],
      projectType: project?.projectType ?? "OTHER",
      liveUrl: project?.liveUrl ?? "",
      githubUrl: project?.githubUrl ?? "",
      isFeatured: project?.isFeatured ?? false,
      skillIds: project?.skillIds ?? [],
    },
  });

  async function onSubmit(values: ProjectFormValues) {
    startTransition(async () => {
      try {
        if (projectId) {
          await updateProject(projectId, values);
          toast.success("Project updated successfully");
        } else {
          await createProject(values);
          toast.success("Project created successfully");
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="project-form"
        className=" flex flex-col h-full "
      >
        <div className="grid gap-6 h-full grid-cols-1 lg:grid-cols-12   ">
          <div className="lg:col-span-8">
            <CardWrapper title="Basic Information">
              <IsFeaturedField />
              <TitleField />
              <SummaryField />
              <DescriptionField />
              <ProjectSkillsField categories={categories} />
            </CardWrapper>
          </div>

          <div className="space-y-6 lg:col-span-4">
            <CardWrapper title="Project Setting & Source">
              <ProjectTypeField />
              <LiveUrlField />
              <GithubUrlField />
            </CardWrapper>

            <CardWrapper title="Media">
              <ProjectImagesField />
            </CardWrapper>
          </div>
        </div>

        <div className="dialog-footer">
          <Button
            type="button"
            variant="ghost"
            disabled={isPending}
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button size="lg" type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Project"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
