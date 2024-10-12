import { type ClassValue, clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import * as z from 'zod';

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// eslint-disable-next-line max-len
const formatDate = (date: Date | string) => `${new Date(date).getUTCFullYear()}/${new Date(date).getUTCMonth() + 1}/${new Date(date).getUTCDate()}`;

const catchError = (err: unknown) => {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => issue.message);
    return toast.error(errors.join('\n'));
  } if (err instanceof Error) {
    return toast.error(err.message);
  }
  return toast.error('Something went wrong, please try again later.');
};

const cloneDeep = <T, >(source: T): T => JSON.parse(JSON.stringify(source));

export {
  cn,
  formatDate,
  catchError,
  cloneDeep
};
