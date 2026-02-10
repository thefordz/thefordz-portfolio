import { z } from "zod";

export const employmentTypeEnum = z.enum([
  "FULL_TIME",
  "PART_TIME",
  "FREELANCE",
  "CONTRACT",
]);

export const teamWorkTypeEnum = z.enum(["SOLO", "TEAM"]);

export const responsibilityLevelEnum = z.enum(["LEAD", "CORE", "SUPPORT"]);

export const experienceFormSchema = z
  .object({
    company: z.string().min(2, "Company name is required").max(100),
    role: z.string().min(2, "Role is required").max(100),
    employment: employmentTypeEnum,
    responsibilities: z.string(),
    achievements: z.string().optional(),
    teamworkType: teamWorkTypeEnum,
    teamSize: z
      .number()
      .int()
      .positive("Team size must be greater than 0")
      .optional(),
    responsibility: responsibilityLevelEnum,
    startDate: z.date({
      error: "Start date is required",
    }),
    endDate: z.date().optional(),
    isCurrent: z.boolean(),
    // logoUrl: z.string().optional(),
    projectIds: z.array(z.string()),
  })
  .superRefine((data, ctx) => {
    // 1️⃣ End date required if not current
    if (!data.isCurrent && !data.endDate) {
      ctx.addIssue({
        code: "custom",
        message: "End date is required if not current",
        path: ["endDate"],
      });
    }

    // 2️⃣ Team size required if teamwork = TEAM
    if (data.teamworkType === "TEAM" && !data.teamSize) {
      ctx.addIssue({
        code: "custom",
        message: "Team size is required when teamwork type is TEAM",
        path: ["teamSize"],
      });
    }

    // 3️⃣ End date must be after start date
    if (data.endDate && data.startDate > data.endDate) {
      ctx.addIssue({
        code: "custom",
        message: "End date must be after start date",
        path: ["endDate"],
      });
    }
  });

export type ExperienceFormValues = z.infer<typeof experienceFormSchema>;
