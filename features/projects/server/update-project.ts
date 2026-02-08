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

    await prisma.project.update({
      where: { id: projectId },
      data: {
        ...data,
        description: data.description || null,
        liveUrl: data.liveUrl || null,
        githubUrl: data.githubUrl || null,
      },
      select: {
        id: true,
      },
    });

    revalidatePath("/projects");

    return { success: true };
  } catch (error) {
    handleActionError(error);
  }
}
