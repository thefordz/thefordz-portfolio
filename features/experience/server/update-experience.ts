"use server";
import prisma from "@/lib/prisma";
import {
  experienceFormSchema,
  ExperienceFormValues,
} from "../lib/experience.validation";
import { revalidatePath } from "next/cache";
import { handleActionError } from "@/features/shared/errors/handle-action-error";

export async function updateExperience(
  id: string,
  values: ExperienceFormValues,
) {
  try {
    const data = experienceFormSchema.parse(values);

    await prisma.experience.update({
      where: { id },
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
        experienceProjects: {
          deleteMany: {},
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
