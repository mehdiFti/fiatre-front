import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

export const useUserStore = defineStore('user', () => {
  const phone = ref('');
  const password = ref('');

  const user = ref(null);
  const isProfileFetched = ref(false)
  const refreshToken = useCookie('refresh-token');
  const accessToken = useCookie('access-token');

  const isAuthenticated = computed(() => {
    return !!accessToken.value;
  });

  const computedLoginBodyRequest = computed(() => {
    return {
      phone: phone.value,
      password: password.value,
      remember_me: false,
    };
  });


  const cleanCSRFToken = () => {
    const csrfToken = useCookie('csrftoken');
    const sessionId = useCookie('sessionid');
    csrfToken.value = undefined;
    sessionId.value = undefined;
  }

  const logout = async (to?: RouteLocationRaw) => {
    // Get cookie references using useCookie composable
    const csrfToken = useCookie('csrftoken', { maxAge: 0, path: '/' });
    const sessionId = useCookie('sessionid', { maxAge: 0, path: '/' });
    const refreshTokenCookie = useCookie('refresh-token', { maxAge: 0, path: '/' });
    const accessTokenCookie = useCookie('access-token', { maxAge: 0, path: '/' });

    // Set all cookies to null to remove them
    csrfToken.value = null;
    sessionId.value = null;
    refreshTokenCookie.value = null;
    accessTokenCookie.value = null;

    // Clear store state
    user.value = null;
    isProfileFetched.value = false;

    let fullpath = '';
    if (to) {
      if (typeof to === 'string') {
        fullpath = to;
      } else {
        fullpath = to.fullPath;
      }
    } else {
      fullpath = useRoute().fullPath;
    }

    await navigateTo({
      name: 'login', query: {
        // redirect: encodeURIComponent(fullpath)
      }
    });
  };


  const loginPostRequest = useAuthFetch('/api/auth/login/', {
    immediate: false,
    watch: false,
    method: 'POST',
    body: computedLoginBodyRequest,
  });

  const profileGetRequest = useAuthFetch('/api/auth/profile/', {
    immediate: false,
  });

  const getMe = async () => {
    await profileGetRequest.execute();

    if (profileGetRequest.status.value === 'success') {
      isProfileFetched.value = true;
    }
  }

  const computedRefreshTokenRequestBody = computed(() => ({
    refresh: useCookie('refresh-token').value,
  }));

  const getTokenByRefreshTokenRequest = useAuthFetch(
    '/api/auth/token/refresh/',
    {
      immediate: false,
      watch: false,
      method: 'POST',
      body: computedRefreshTokenRequestBody,
    }
  );

  watch(getTokenByRefreshTokenRequest.data, (newValue) => {
    if (newValue) {
      refreshToken.value = newValue.refresh;
      accessToken.value = newValue.access;
    }
  });

  watch(profileGetRequest.data, (newValue) => {
    if (newValue) {
      user.value = newValue as any;
    }
  });

  watch(loginPostRequest.data, (newValue) => {
    console.log('loginPostRequest', newValue);

    if (newValue) {
      refreshToken.value = newValue.refresh;
      accessToken.value = newValue.access;
      user.value = newValue.user;
      isProfileFetched.value = true;
    }
  });

  const lastPlayDate = ref<string | null>(null);

  const setLastPlayDate = (date: string) => {
    lastPlayDate.value = date;
  };

  const setLoginData = (_refreshToken, _accessToken, _user) => {
    refreshToken.value = _refreshToken;
    accessToken.value = _accessToken;
    user.value = _user;
  };

  const setUser = (userData: any) => {
    user.value = userData;
  };

  return {
    phone,
    password,
    loginPostRequest,
    isAuthenticated,
    profileGetRequest,
    isProfileFetched,
    user,
    refreshToken,
    accessToken,
    getTokenByRefreshTokenRequest,
    lastPlayDate,
    setLastPlayDate,
    logout,
    setLoginData,
    setUser,
    getMe,
    cleanCSRFToken
  };
});
