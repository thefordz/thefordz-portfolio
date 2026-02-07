import { ErrorCode } from "./error-code";

export class AppError extends Error {
  public readonly code: ErrorCode;

  constructor(code: ErrorCode) {
    super(code);
    this.name = "AppError";
    this.code = code;
  }
}
