"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { handleActionError } from "@/features/shared/errors/handle-action-error";
import {
  experienceFormSchema,
  ExperienceFormValues,
} from "../lib/experience.validation";

export async function createExperience(values: ExperienceFormValues) {
  try {
    const data = experienceFormSchema.parse(values);

    const lastExperience = await prisma.experience.findFirst({
      orderBy: [{ order: "desc" }, { updatedAt: "desc" }],
      select: { order: true },
    });

    const nextOrder = (lastExperience?.order ?? 0) + 1;

    await prisma.experience.create({
      data: {
        company: data.company,
        role: data.role,
        employment: data.employment,
        responsibilities: data.responsibilities,
        achievements: data.achievements || null,
        teamworkType: data.teamworkType,
        teamSize: data.teamSize ?? null,
        responsibility: data.responsibility,
        startDate: data.startDate,
        endDate: data.endDate ?? null,
        isCurrent: data.isCurrent,
        order: nextOrder,

        experienceProjects: {
          create:
            data.projectIds?.map((projectId) => ({
              project: {
                connect: { id: projectId },
              },
            })) ?? [],
        },
      },
    });

    revalidatePath("/experience");

    return { success: true };
  } catch (error) {
    handleActionError(error);
  }
}
