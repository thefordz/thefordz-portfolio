"use server";

import { handleActionError } from "@/features/shared/errors/handle-action-error";
import {
  skillCategoryFormSchema,
  SkillCategoryFormValues,
} from "../lib/skill-category.validation";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSkillCategory(
  skillId: string,
  values: SkillCategoryFormValues,
) {
  try {
    const data = skillCategoryFormSchema.parse(values);

    await prisma.skillCategory.update({
      where: { id: skillId },
      data,
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    handleActionError(error);
  }
}
