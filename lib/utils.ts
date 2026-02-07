import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getHashFromUrl = (url: string) => {
  const index = url.indexOf("#");
  return index >= 0 ? url.slice(index) : "";
};
