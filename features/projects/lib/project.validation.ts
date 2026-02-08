import { z } from "zod";

export const projectTypeValues = [
  "WEB",
  "MOBILE",
  "SAAS",
  "GAME",
  "OTHER",
] as const;

export const MAX_PROJECT_IMAGES = 10;

export const projectFormSchema = z.object({
  id: z.string().optional(),

  title: z.string().min(1, "Title is required").max(120),
  summary: z.string().min(1, "Summary is required").max(240),
  description: z.string().max(4000).optional().or(z.literal("")),

  images: z
    .array(z.string())
    .max(MAX_PROJECT_IMAGES, "Can not upload for then 10."),

  projectType: z.enum(projectTypeValues),

  liveUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),

  isFeatured: z.boolean(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
export type ProjectEnumType = z.infer<
  typeof projectFormSchema.shape.projectType
>;
