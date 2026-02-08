"use server";

import prisma from "@/lib/prisma";

export async function getProjects() {
  return prisma.project.findMany({
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
