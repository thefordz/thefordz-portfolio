import { ProjectType } from "./project.types";
import { ProjectFormValues } from "./project.validation";

export function mapProjectToFormSafe(
  project: ProjectType | null,
): ProjectFormValues {
  return {
    title: project?.title ?? "",
    summary: project?.summary ?? "",
    description: project?.description ?? "",
    images: project?.images ?? [],
    projectType: project?.projectType ?? "WEB",
    liveUrl: project?.liveUrl ?? "",
    githubUrl: project?.githubUrl ?? "",
    isFeatured: project?.isFeatured ?? false,
    skillIds: project?.skills.map((s) => s.skillId) ?? [],
  };
}
