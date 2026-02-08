"use server";

import { handleActionError } from "@/features/shared/errors/handle-action-error";
import { skillFormSchema, SkillFormValues } from "../lib/skill.validation";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSkill(id: string, values: SkillFormValues) {
  try {
    const data = skillFormSchema.parse(values);

    await prisma.skill.update({
      where: { id },
      data,
    });

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    handleActionError(error);
  }
}
