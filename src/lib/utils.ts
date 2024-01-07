import { type ClassValue, clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import * as z from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return `${new Date(date).getUTCFullYear()}/${new Date(date).getUTCMonth() + 1}/${new Date(date).getUTCDate()}`;
}

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => issue.message);
    return toast.error(errors.join('\n'));
  } if (err instanceof Error) {
    return toast.error(err.message);
  }
  return toast.error('Something went wrong, please try again later.');
}
export function cloneDeep<T>(source: T): T {
  return JSON.parse(JSON.stringify(source));
}
