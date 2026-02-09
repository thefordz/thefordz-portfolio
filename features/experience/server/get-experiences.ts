"use server";

import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function getExperiences() {
  return await prisma.experience.findMany({
    orderBy: { order: "asc" },
    include: {
      experienceProjects: {
        include: {
          project: {
            include: {
              skills: {
                include: {
                  skill: {
                    include: {
                      category: {
                        select: {
                          id: true,
                          name: true,
                          order: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
}

export type ExperiencesType = Awaited<ReturnType<typeof getExperiences>>;

export type ExperienceWithProjects = Prisma.ExperienceGetPayload<{
  include: {
    experienceProjects: {
      include: {
        project: {
          include: {
            skills: {
              include: {
                skill: true;
              };
            };
          };
        };
      };
    };
  };
}>;
