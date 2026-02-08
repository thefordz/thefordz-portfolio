"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function reorderSkillCategory(ids: string[]) {
  await prisma.$transaction(
    ids.map((id, index) =>
      prisma.skillCategory.update({
        where: { id },
        data: { order: index },
      }),
    ),
  );

  revalidatePath("/");
  return { success: true };
}
