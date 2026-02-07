import { getServerSession } from "@/features/auth/server/get-server-session";
import { PROFILE_ID } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";

const f = createUploadthing();
const utapi = new UTApi();

export const ourFileRouter = {
  avatarImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    const profile = await prisma.profile.findUnique({
      where: { id: PROFILE_ID },
      select: {
        avatarKey: true,
      },
    });

    if (profile?.avatarKey) {
      await utapi.deleteFiles(profile.avatarKey);
    }
    await prisma.profile.update({
      where: { id: PROFILE_ID },
      data: {
        avatarUrl: file.ufsUrl,
        avatarKey: file.key,
      },
    });
  }),
  resumeUploader: f({
    pdf: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    const profile = await prisma.profile.findUnique({
      where: { id: PROFILE_ID },
      select: {
        resumeKey: true,
      },
    });

    if (profile?.resumeKey) {
      await utapi.deleteFiles(profile.resumeKey);
    }
    await prisma.profile.update({
      where: { id: PROFILE_ID },
      data: {
        resumeUrl: file.ufsUrl,
        resumeKey: file.key,
      },
    });
  }),
  singleImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({}) => {
      const session = await getServerSession();
      const user = session?.user;
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.userId };
    }),

  multiImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 10,
    },
  })
    .middleware(async ({}) => {
      const session = await getServerSession();
      const user = session?.user;
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
