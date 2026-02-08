"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { handleActionError } from "@/features/shared/errors/handle-action-error";
import { AppError } from "@/features/shared/errors/app-error";

export async function deleteSkill(id: string) {
  try {
    if (!id) {
      throw new AppError("NOT_FOUND");
    }

    await prisma.skill.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    handleActionError(error);
  }
}
