"use server";

import {
  projectFormSchema,
  ProjectFormValues,
} from "../lib/project.validation";
import prisma from "@/lib/prisma";
import { handleActionError } from "@/features/shared/errors/handle-action-error";
import { revalidatePath } from "next/cache";

export async function createProject(values: ProjectFormValues) {
  try {
    const data = projectFormSchema.parse(values);
    const lastProject = await prisma.project.findFirst({
      orderBy: [{ order: "desc" }, { updatedAt: "desc" }],
      select: { order: true },
    });

    const nextOrder = (lastProject?.order ?? 0) + 1;

    await prisma.project.create({
      data: {
        title: data.title,
        summary: data.summary,
        description: data.description || null,
        projectType: data.projectType,
        images: data.images || [],
        liveUrl: data.liveUrl || null,
        githubUrl: data.githubUrl || null,
        order: nextOrder,
        skills: {
          create:
            data.skillIds && data.skillIds.length > 0
              ? data.skillIds.map((skillId) => ({
                  skill: { connect: { id: skillId } },
                }))
              : [],
        },
      },
    });

    revalidatePath("/");

    revalidatePath("/projects");

    return { success: true };
  } catch (error) {
    console.log("[Create Project]", error);
    throw error;
  }
}
