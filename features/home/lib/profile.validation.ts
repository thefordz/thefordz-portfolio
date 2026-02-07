import { z } from "zod";

export const socialLinkSchema = z.object({
  id: z.string().optional(),
  url: z.string().url(),
  label: z.string().max(50).optional(),
  order: z.number().int().min(0).optional(),
  isPrimary: z.boolean().optional(),
});

export const profileFormSchema = z.object({
  fullName: z.string().min(1),
  headline: z.string().min(1),
  bio: z.string().max(800).optional().or(z.literal("")),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  resumeUrl: z.string().url().optional().or(z.literal("")),
  location: z.string().optional().or(z.literal("")),
  availability: z.string().optional().or(z.literal("")),
  socials: z.array(socialLinkSchema),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
