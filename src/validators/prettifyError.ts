import { ErrorMessageOptions } from 'zod-error';

export const prettifyZodError = (): ErrorMessageOptions => {
  const options: ErrorMessageOptions = {
    delimiter: {
      error: ' '
    },
    transform: ({ errorMessage, index }) => `Error #${index + 1}: ${errorMessage}`
  };
  return options;
};
