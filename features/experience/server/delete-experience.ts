"use server";
import { handleActionError } from "@/features/shared/errors/handle-action-error";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteExperience(id: string) {
  try {
    await prisma.experience.delete({
      where: { id },
    });

    revalidatePath("/experience");

    return { success: true };
  } catch (error) {
    handleActionError(error);
  }
}
