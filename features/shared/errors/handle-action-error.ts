import { ZodError } from "zod";
import { AppError } from "./app-error";
import { Prisma } from "@/app/generated/prisma/client";

export function handleActionError(error: unknown) {
  if (error instanceof AppError) {
    throw error;
  }

  if (error instanceof ZodError) {
    throw new AppError("INVALID_INPUT");
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      throw new AppError("SLUG_ALREADY_EXISTS");
    }
    if (error.code === "P2003") {
      throw new AppError("FOREIGN_KEY_VIOLATION");
    }
    if (error.code === "P2025") {
      throw new AppError("NOT_FOUND");
    }
  }

  throw new AppError("UNKNOWN");
}
