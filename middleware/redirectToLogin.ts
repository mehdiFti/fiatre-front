
import {jwtDecode} from 'jwt-decode';
import type { Pinia } from 'pinia';

const logout = async (path: string) => {
    // const nuxtApp = useNuxtApp();
    // const userStore = useUserStore(nuxtApp.$pinia as Pinia);
    // await userStore.logout(path);
    return navigateTo( {name: 'login', query: {redirect: encodeURIComponent(path)}});
}

export default defineNuxtRouteMiddleware(async(to, from) => {
    const refreshToken = useCookie('refresh-token').value;

    if (refreshToken) {
      const decodedRefreshToken = jwtDecode(refreshToken as string);
      if (Date.now() >= decodedRefreshToken.exp! * 1000) {
        return await logout(to.fullPath)
      }
    } else {
        console.log('asdasdasd');
        
        return await logout(to.fullPath)
    }
  });
  