"use server";

import prisma from "@/lib/prisma";

export async function getProject(projectId: string) {
  return prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });
}

export type ProjectType = Awaited<ReturnType<typeof getProject>>;
