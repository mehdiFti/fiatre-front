<template>
  <div
    class="container movie-hero-container"
    :style="{ backgroundImage: 'url(' + backgroundImage + ')'}"
  >
    <div class="movie-hero-items">
      <NuxtImg
        class="hero-poster-img"
        :src="image.poster"
      />

      <div class="movie-hero-desc">
        blah
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const backgroundImage = 'https://wallpapers.com/images/high/1920x1080-hd-movie-1920-x-1080-akoziqsx5eznwokk.webp';
const image = {
  poster: 'https://image.tmdb.org/t/p/w500/i2dF9UxOeb77CAJrOflj0RpqJRF.jpg',
};
</script>

<style lang="scss">
//.movie-hero-container {
//  background: no-repeat center;
//  height: 100vh;
//  width: 100%;
//
//  .movie-hero-items {
//    background-color: blue;
//    .hero-poster-img {
//      max-width: 100%;
//      height: auto;
//      border-radius: 5px;
//      overflow: hidden;
//      background: green;
//    }
//    .movie-hero-desc {
//      background: red;
//    }
//  }
//}
</style>
