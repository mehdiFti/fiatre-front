<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const nuxtApp = useNuxtApp();

nuxtApp.hook('page:finish', () => {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth',
  });
});
</script>
