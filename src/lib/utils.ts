import { type ClassValue, clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import * as z from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return `${new Date(date).getUTCFullYear()}/${new Date(date).getUTCMonth()}/${new Date(date).getUTCDate()}`;
}

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => issue.message);
    return toast(errors.join('\n'));
  } if (err instanceof Error) {
    return toast(err.message);
  }
  return toast('Something went wrong, please try again later.');
}
export function cloneDeep<T>(source: T): T {
  return JSON.parse(JSON.stringify(source));
}
export function isValidHexaCode(str:string) {
  // Regex to check valid
  // hexadecimalColor_code
  const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

  // if str
  // is empty return false
  if (str == null) {
    return 'false';
  }

  // Return true if the str
  // matched the ReGex
  if (regex.test(str) === true) {
    return 'true';
  }

  return 'false';
}
