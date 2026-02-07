"use server";

import { revalidatePath } from "next/cache";
import { profileFormSchema } from "../lib/profile.validation";
import { PROFILE_ID } from "@/lib/constants";
import { handleActionError } from "@/features/shared/errors/handle-action-error";
import prisma from "@/lib/prisma";

export async function updateProfile(values: unknown) {
  try {
    const data = profileFormSchema.parse(values);

    await prisma.profile.update({
      where: { id: PROFILE_ID },
      data: {
        ...data,
        socials: {
          deleteMany: {},

          create: data.socials.map((s, index) => ({
            url: s.url,
            label: s.label || null,
            isPrimary: Boolean(s.isPrimary),
            order: index,
          })),
        },
      },
    });

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    handleActionError(error);
  }
}
