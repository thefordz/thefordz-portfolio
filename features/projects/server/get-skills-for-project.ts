"use server";

import prisma from "@/lib/prisma";

export async function getSkillsForProject() {
  return await prisma.skillCategory.findMany({
    orderBy: [{ order: "asc" }],
    select: {
      id: true,
      name: true,
      skills: {
        orderBy: { order: "asc" },
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

export type SkillsForProjectFieldType = Awaited<
  ReturnType<typeof getSkillsForProject>
>;
