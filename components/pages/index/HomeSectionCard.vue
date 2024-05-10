<template>
  <NuxtLink :to="link">
    <NuxtImg :src="img" class="home-section-card" />

    <p class="movie-card-title"> {{ title }} </p>
  </NuxtLink>
</template>

<script setup lang="ts">

defineProps({
  link: {
    type:String,
    required: true,
  },
  img:
      {
        type:String,
        required:true,
      },
  title:
      {
        type:String,
        required:true,
      },
});
</script>

<style lang="scss">
@import 'assets/scss/pages/index/home-section-card'
</style>
