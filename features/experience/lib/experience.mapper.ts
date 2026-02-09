import { ExperienceType } from "./experience.types";
import { ExperienceFormValues } from "./experience.validation";

export function mapExperienceToFormSafe(
  experience: ExperienceType | null,
): ExperienceFormValues {
  return {
    company: experience?.company ?? "",
    role: experience?.role ?? "",
    employment: experience?.employment ?? "FULL_TIME",
    responsibilities: experience?.responsibilities ?? "",
    achievements: experience?.achievements ?? "",
    teamworkType: experience?.teamworkType ?? "SOLO",
    teamSize: experience?.teamSize ?? undefined,
    responsibility: experience?.responsibility ?? "CORE",
    startDate: experience?.startDate ?? new Date(),
    endDate: experience?.endDate ?? undefined,
    isCurrent: experience?.isCurrent ?? false,

    projectIds:
      experience?.experienceProjects?.map((p) => p.experienceId) ?? [],
  };
}
