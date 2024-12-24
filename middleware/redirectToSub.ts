import type { Pinia } from 'pinia';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const nuxtApp = useNuxtApp();
    const userStore = useUserStore(nuxtApp.$pinia as Pinia);

    if (!(userStore.isAuthenticated && userStore.user?.is_subscription_active)) {
        return navigateTo('/subscription/plans');
    }
});
