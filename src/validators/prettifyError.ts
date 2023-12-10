import { ErrorMessageOptions } from 'zod-error';

const prettifyZodError = (): ErrorMessageOptions => {
  const options: ErrorMessageOptions = {
    delimiter: {
      error: ' '
    },
    transform: ({ errorMessage, index }) => `Error #${index + 1}: ${errorMessage}`
  };
  return options;
};

export default prettifyZodError;
