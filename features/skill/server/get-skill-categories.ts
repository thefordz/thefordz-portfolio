"use server";

import prisma from "@/lib/prisma";

export async function getSkillCategories() {
  return await prisma.skillCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      skills: {
        orderBy: { order: "asc" },
        select: {
          id: true,
          name: true,
          level: true,
          yearsOfExperience: true,
        },
      },
    },
  });
}

export type SkillCategoriesType = Awaited<
  ReturnType<typeof getSkillCategories>
>;
