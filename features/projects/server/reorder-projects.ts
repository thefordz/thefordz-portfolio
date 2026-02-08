"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function reorderProjects(ids: string[]) {
  await prisma.$transaction(
    ids.map((id, index) =>
      prisma.project.update({
        where: { id },
        data: { order: index },
      }),
    ),
  );

  revalidatePath("/projects");
  return { success: true };
}
