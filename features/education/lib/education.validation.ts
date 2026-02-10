import { z } from "zod";

export const educationFormSchema = z
  .object({
    institution: z
      .string()
      .trim()
      .min(1, "Institution is required")
      .max(120, "Institution is too long"),

    degree: z.string().trim().max(120, "Degree is too long").optional(),
    field: z.string().trim().max(120, "Field is too long").optional(),
    startYear: z.date({
      error: "Start date is required",
    }),
    endYear: z.date().optional(),
    description: z
      .string()
      .trim()
      .max(2000, "Description is too long")
      .optional(),

    logoUrl: z.string().trim().optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.endYear && data.startYear > data.endYear) {
      ctx.addIssue({
        code: "custom",
        message: "End year must be greater than or equal to start year",
        path: ["endYear"],
      });
    }
  });

export type EducationFormValues = z.infer<typeof educationFormSchema>;
