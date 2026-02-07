import { toast } from "sonner";
import { ERROR_MESSAGES } from "./error-message";
import { ERROR_CODES } from "./error-code";

export function errorToast(error: unknown, toastId?: string) {
  if (error instanceof Error) {
    const message =
      ERROR_MESSAGES[error.message] ?? ERROR_MESSAGES[ERROR_CODES.UNKNOWN];

    toast.error(message, { id: toastId });
    return;
  }

  toast.error(ERROR_MESSAGES[ERROR_CODES.UNKNOWN], { id: toastId });
}
