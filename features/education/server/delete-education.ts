"use server";
import { handleActionError } from "@/features/shared/errors/handle-action-error";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteEducation(id: string) {
  try {
    await prisma.education.delete({
      where: { id },
    });

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    handleActionError(error);
  }
}
