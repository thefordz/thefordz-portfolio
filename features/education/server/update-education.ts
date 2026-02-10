"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { handleActionError } from "@/features/shared/errors/handle-action-error";
import {
  educationFormSchema,
  EducationFormValues,
} from "../lib/education.validation";

export async function updateEducation(
  educationId: string,
  values: EducationFormValues,
) {
  try {
    const data = educationFormSchema.parse(values);

    await prisma.education.update({
      where: {
        id: educationId,
      },
      data: {
        institution: data.institution,
        startYear: data.startYear,
        endYear: data.endYear,
        degree: data.degree,
        field: data.field,
        description: data.description,
      },
    });

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    handleActionError(error);
  }
}
