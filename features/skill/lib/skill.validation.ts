import { z } from "zod";

export const SkillLevelValues = [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
  "EXPERT",
] as const;

export const skillLevelSchema = z.enum(SkillLevelValues);

export const skillFormSchema = z.object({
  name: z.string().trim().min(1, "Skill name is required").max(80),
  yearsOfExperience: z
    .number()
    .positive("Years of experience must be greater than 0")
    .optional(),
  level: skillLevelSchema.optional(),
  categoryId: z.string(),
});

export type SkillFormValues = z.infer<typeof skillFormSchema>;

export type SkillLevel = z.infer<typeof skillLevelSchema>;
