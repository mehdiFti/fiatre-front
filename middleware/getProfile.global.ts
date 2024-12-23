export default defineNuxtRouteMiddleware(async (to, from) => {
    const nuxtApp = useNuxtApp();
    const userStore = useUserStore(nuxtApp.$pinia);
    console.log('userStore.isAuthenticated',userStore.isAuthenticated, userStore.user);

    if (userStore.isAuthenticated && !userStore.isProfileFetched) {
      console.log('global middleware if');
      
        await userStore.getMe();
    }
  }
);
  