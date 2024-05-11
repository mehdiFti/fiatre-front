<template>
  <div class="movie-card">
    <NuxtLink :to="link" class="movie-card-link">
      <div class="movie-card-image-container">
        <NuxtImg :src="img" class="movie-card-image" />
      </div>

      <p class="movie-card-title"> {{ title }} </p>
    </NuxtLink>
  </div>
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
