export const useFetch = () => {
  return async (url: string, options?: RequestInit) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  };
};
