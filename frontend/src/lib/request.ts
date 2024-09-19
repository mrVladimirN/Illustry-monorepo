/* eslint-disable no-console */
const makeRequest = <T>(
  request: RequestInfo,
  tags: string[]
): Promise<T> => fetch(request, {
    cache: 'no-store',
    next: {
      tags
    }
  })
    .then((response) => {
      if (!response.ok) {
        console.debug('Request failed');
      }
      return response.json();
    })
    .catch(() => {
      throw new Error('Something went wrong please try again later');
    });

export default makeRequest;
