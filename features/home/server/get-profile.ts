"use server";

import { PROFILE_ID } from "@/lib/constants";
import prisma from "@/lib/prisma";

export async function getProfile() {
  return prisma.profile.findUnique({
    where: {
      id: PROFILE_ID,
    },
    include: {
      socials: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
}

export type ProfileType = Awaited<ReturnType<typeof getProfile>>;

export async function getProfileForSidebar() {
  return prisma.profile.findUnique({
    where: {
      id: PROFILE_ID,
    },
    select: {
      fullName: true,
      bio: true,
      availability: true,
      resumeUrl: true,
      socials: {
        orderBy: {
          order: "asc",
        },
        select: {
          id: true,
          url: true,
          label: true,
          isPrimary: true,
        },
      },
    },
  });
}
export type ProfileSidebarType = Awaited<
  ReturnType<typeof getProfileForSidebar>
>;
