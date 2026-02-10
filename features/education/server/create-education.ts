"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { handleActionError } from "@/features/shared/errors/handle-action-error";
import {
  educationFormSchema,
  EducationFormValues,
} from "../lib/education.validation";

export async function createEducation(values: EducationFormValues) {
  try {
    const data = educationFormSchema.parse(values);

    const lastExperience = await prisma.education.findFirst({
      orderBy: [{ order: "desc" }, { updatedAt: "desc" }],
      select: { order: true },
    });

    const nextOrder = (lastExperience?.order ?? 0) + 1;

    await prisma.education.create({
      data: {
        institution: data.institution,
        startYear: data.startYear,
        endYear: data.endYear,
        degree: data.degree,
        field: data.field,
        description: data.description,
        order: nextOrder,
      },
    });

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    handleActionError(error);
  }
}
