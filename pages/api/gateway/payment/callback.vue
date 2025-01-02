<template>
    <div>Redirecting...</div>
  </template>
  
  <script setup>
  import { useRoute, navigateTo } from '#app';
  import { onMounted } from 'vue';
  
  onMounted(() => {
    const route = useRoute();
  
  
    const authority = route.query.Authority;
    const status = route.query.Status;
    const refID = route.query.refID;
  
    navigateTo({
      path: '/subscription/buys/result',
      query: { Authority: authority, Status: status, refID: refID },
    });
  });
  </script>
  