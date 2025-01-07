import type { UseFetchOptions } from '#app';

export const useAuthFetch = <T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>,
  onUnauthorized: boolean = true,
  withoutContentType = false,
) => {
  const headers = {
    'Accept': 'application/json',
  }

  if (!withoutContentType) {
    headers['Content-Type'] = 'application/json';
  }

  return useFetch(url, {
    ...options,
    baseURL: 'https://www.fiatre.ir',
    credentials: 'include',
    headers: {
      ...headers,
      ...options?.headers,
    },
    $fetch: useNuxtApp().$api({ onUnauthorized }),
  });
};

export const useApiFetch = <T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>
) => {
  return useFetch(url, {
    ...options,
    baseURL: 'https://www.fiatre.ir',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
};
