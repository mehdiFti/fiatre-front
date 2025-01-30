<template>
  <NuxtLoadingIndicator color="#FE0000" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const userStore = useUserStore();
const router = useRouter();

if (userStore.isAuthenticated) {
  await userStore.profileGetRequest.execute();
}

// Function to handle scrolling
const scrollToTop = () => {
  // Try multiple scroll methods
  window.scrollTo(0, 0);
  document.documentElement.scrollTo(0, 0);
  document.body.scrollTo(0, 0);

  // Fallback smooth scroll
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, 0);
};

// Router navigation handler
router.beforeEach((to, from, next) => {
  next();
  scrollToTop();
});

// Page finish handler
nuxtApp.hook('page:finish', () => {
  scrollToTop();
});

// Component mounted handler
onMounted(() => {
  scrollToTop();
});

// Watch route changes
watch(
  () => router.currentRoute.value.path,
  () => {
    scrollToTop();
  }
);
</script>

<style>
/* / */
</style>