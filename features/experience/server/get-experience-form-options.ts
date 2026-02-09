"use server";

import prisma from "@/lib/prisma";

export async function getExperienceFormOptions() {
  const [skills, projects] = await Promise.all([
    prisma.skill.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
      },
    }),
    prisma.project.findMany({
      orderBy: { title: "asc" },
      select: {
        id: true,
        title: true,
      },
    }),
  ]);

  return {
    skillOptions: skills,
    projectOptions: projects,
  };
}
