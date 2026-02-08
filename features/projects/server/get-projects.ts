"use server";

import prisma from "@/lib/prisma";

export async function getProjects() {
  return await prisma.project.findMany({
    orderBy: [
      {
        order: "asc",
      },
      {
        updatedAt: "desc",
      },
    ],
  });
}

export type ProjectsType = Awaited<ReturnType<typeof getProjects>>;

export async function getFeaturedProjects(take: number) {
  return await prisma.project.findMany({
    where: { isFeatured: true },
    orderBy: {
      order: "asc",
    },
    take,
  });
}
