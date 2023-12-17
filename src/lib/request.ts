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
    .catch((err) => {
      console.debug(err.message);
    });

export default makeRequest;
