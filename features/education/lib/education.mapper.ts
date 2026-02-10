import { EducationType } from "./education.types";
import { EducationFormValues } from "./education.validation";

export function mapEducationToFormSafe(
  education: EducationType | null,
): EducationFormValues {
  return {
    institution: education?.institution ?? "",
    description: education?.description ?? "",
    degree: education?.degree ?? "",
    field: education?.field ?? "",
    startYear: education?.startYear ?? new Date(),
    endYear: education?.endYear ?? undefined,
  };
}
