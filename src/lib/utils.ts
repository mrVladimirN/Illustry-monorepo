import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return `${new Date(date).getUTCFullYear()}/${new Date(date).getUTCMonth()}/${new Date(date).getUTCDate()}`;
}
