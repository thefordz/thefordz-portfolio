import { ERROR_CODES } from "./error-code";

export const ERROR_MESSAGES: Record<string, string> = {
  // Specific error messages
  [ERROR_CODES.INVALID_INPUT]: "Please check your input.",
  [ERROR_CODES.FORBIDDEN]: "You do not have permission to perform this action.",
  [ERROR_CODES.UNAUTHORIZED]:
    "You need to be logged in to perform this action.",

  //Prisma Error messages
  [ERROR_CODES.SLUG_ALREADY_EXISTS]: "This slug is already used.",
  [ERROR_CODES.FOREIGN_KEY_VIOLATION]: "Related data not missing.",
  [ERROR_CODES.NOT_FOUND]: "Data not found.",

  // General error message
  [ERROR_CODES.UNKNOWN]: "Something went wrong. Please try again later.",
};
