"use server";

import { PROFILE_ID } from "@/lib/constants";
import prisma from "@/lib/prisma";

export async function getProfile() {
  const profile = await ensureProfileExists();

  return prisma.profile.findUnique({
    where: {
      id: profile.id,
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

async function ensureProfileExists() {
  const existing = await prisma.profile.findUnique({
    where: { id: "PROFILE_SINGLETON" },
  });

  if (existing) return existing;

  return prisma.profile.create({
    data: {
      id: "PROFILE_SINGLETON",
      fullName: "Unnamed",
      headline: "",
    },
  });
}
