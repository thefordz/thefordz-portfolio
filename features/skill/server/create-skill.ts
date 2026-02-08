"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { skillFormSchema, SkillFormValues } from "../lib/skill.validation";
import { AppError } from "@/features/shared/errors/app-error";
import { handleActionError } from "@/features/shared/errors/handle-action-error";

export async function createSkill(values: SkillFormValues) {
  try {
    const data = skillFormSchema.parse(values);

    const normalizedName = data.name.trim().toLowerCase();

    const exists = await prisma.skill.findFirst({
      where: {
        categoryId: data.categoryId,
        name: {
          equals: normalizedName,
          mode: "insensitive",
        },
      },
    });

    if (exists) {
      throw new AppError("SLUG_ALREADY_EXISTS");
    }

    await prisma.skill.create({
      data: {
        ...data,
      },
    });

    revalidatePath("/");
  } catch (error) {
    handleActionError(error);
  }
}
