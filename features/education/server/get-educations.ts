"use server";

import prisma from "@/lib/prisma";

export async function getEducations() {
  return await prisma.education.findMany({
    orderBy: { order: "asc" },
  });
}

export type EducationsType = Awaited<ReturnType<typeof getEducations>>;
