<template>
  <NuxtLoadingIndicator color="#FE0000" />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const nuxtApp = useNuxtApp();

const userStore = useUserStore();

if (userStore.isAuthenticated) {
  await userStore.profileGetRequest.execute();
}

nuxtApp.hook('page:finish', () => {
  window.scrollTo({
    behavior: 'smooth',
  });
});
</script>
