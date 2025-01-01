<template>
    <div>Redirecting...</div>
  </template>
  
  <script setup>
  import { useRoute, navigateTo } from '#app';
  import { onMounted } from 'vue';
  
  onMounted(() => {
    const route = useRoute();
  
    // Extract query parameters
    const authority = route.query.Authority;
    const status = route.query.Status;
    const refID = route.query.refID;
  
    // Redirect to the result page
    navigateTo({
      path: '/subscription/buys/result',
      query: { Authority: authority, Status: status, refID: refID },
    });
  });
  </script>
  