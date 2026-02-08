"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  projectFormSchema,
  ProjectFormValues,
} from "../lib/project.validation";
import { handleActionError } from "@/features/shared/errors/handle-action-error";

export async function updateProject(
  projectId: string,
  values: ProjectFormValues,
) {
  try {
    const data = projectFormSchema.parse(values);
    console.log(JSON.stringify(values, null, 2));

    await prisma.project.update({
      where: { id: projectId },
      data: {
        title: data.title,
        summary: data.summary,
        description: data.description || null,
        images: data.images,
        projectType: data.projectType,
        liveUrl: data.liveUrl || null,
        githubUrl: data.githubUrl || null,
        isFeatured: data.isFeatured,

        skills: {
          deleteMany: {},
          create: data.skillIds?.map((skillId) => ({
            skill: { connect: { id: skillId } },
          })),
        },
      },
    });

    revalidatePath("/projects");

    return { success: true };
  } catch (error) {
    console.error("[Update Project]", error);
    handleActionError(error);
  }
}
