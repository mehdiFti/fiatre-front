<template>
  <div>Redirecting...</div>
</template>

<script setup>
import { useRoute, navigateTo } from '#app';
import { onMounted } from 'vue';

onMounted(() => {
  const route = useRoute();

  // Extract query parameters
  const authority = route.query.Authority || '';
  const status = route.query.Status || route.query.status || '';
  const refID = route.query.refID || '';

  // Normalize the status to uppercase for consistent comparison
  const normalizedStatus = status.toUpperCase();

  // Add a small delay to ensure proper redirection
  setTimeout(() => {
    navigateTo({
      path: '/subscription/buys/result',
      query: {
        Authority: authority,
        Status: normalizedStatus,
        refID: refID
      },
    }, { replace: true }); // Use replace to prevent back navigation
  }, 100);
});
</script>
