"use server";

import { handleActionError } from "@/features/shared/errors/handle-action-error";
import {
  skillCategoryFormSchema,
  SkillCategoryFormValues,
} from "../lib/skill-category.validation";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSkillCategory(values: SkillCategoryFormValues) {
  try {
    const data = skillCategoryFormSchema.parse(values);

    await prisma.skillCategory.create({
      data,
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    handleActionError(error);
  }
}
