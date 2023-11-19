export const makeRequest = <T>(
  request: RequestInfo,
  tags: string[]
): Promise<T> => {
  return fetch(request, {
    cache: "no-store",
    next: {
      tags: tags,
    },
  })
    .then((response) => {
      if (!response.ok) {
       console.debug("Request failed");
      }
      return response.json();
    })
    .catch((err) => {
      console.debug(err.message);
    });
};
