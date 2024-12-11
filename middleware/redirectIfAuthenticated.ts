// middleware/redirectIfAuthenticated.ts
import {jwtDecode} from 'jwt-decode';

export default defineNuxtRouteMiddleware((to, from) => {
    const refreshToken = useCookie('refresh-token').value;

    if (refreshToken) {
      const decodedRefreshToken = jwtDecode(refreshToken as string);
      if (Date.now() < decodedRefreshToken.exp! * 1000) {
        return abortNavigation();
      }
    }
  });
  