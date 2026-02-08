import z from "zod";

export const skillCategoryFormSchema = z.object({
  name: z.string().trim().min(1, "Category name is required").max(60),
});

export type SkillCategoryFormValues = z.infer<typeof skillCategoryFormSchema>;
