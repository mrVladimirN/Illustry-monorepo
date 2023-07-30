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
        throw new Error("Request failed");
      }
      return response.json();
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};
