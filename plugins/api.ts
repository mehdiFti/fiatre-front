import { jwtDecode } from 'jwt-decode';
import type { Pinia } from 'pinia';

interface IApiOptions {
  onUnauthorized?: boolean;
}

export default defineNuxtPlugin((nuxtApp) => {
  const api = (options: IApiOptions) => {
    const refreshToken = computed(() => useCookie('refresh-token').value);
    const accessToken = computed(() => useCookie('access-token').value);

    const headers = {};

    if (accessToken.value) {
      headers.Authorization = `Bearer ${accessToken.value}`;
    }

    return $fetch.create({
      headers,

      async onRequest({ options: _options }) {
        if (options.onUnauthorized && accessToken.value) {
          await nuxtApp.runWithContext(async () => {
            const decodedAccessToken = jwtDecode(accessToken.value as string);

            if (Date.now() >= decodedAccessToken.exp! * 1000) {
              const userStore = useUserStore(nuxtApp.$pinia as Pinia);

              await userStore.getTokenByRefreshTokenRequest.execute();

              if (userStore.getTokenByRefreshTokenRequest.status.value === 'error') {
                return await userStore.logout();
              }

              _options.headers.Authorization = `Bearer ${userStore.getTokenByRefreshTokenRequest.data.value.access}`;
            }
          });
        }
      },
      async onResponse({ request, response, options: _options }) {
        if (response.status === 401) {
          await nuxtApp.runWithContext(async () => {
            const userStore = useUserStore(nuxtApp.$pinia as Pinia);

            await userStore.logout();
          });
        } else if (response.status === 403) {
          await nuxtApp.runWithContext(async () => {
            const userStore = useUserStore(nuxtApp.$pinia as Pinia);

            userStore.cleanCSRFToken();
          });
        }
      },
    });
  };

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
