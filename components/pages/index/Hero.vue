<template>
  <div
    class=" container movie-hero-container"
    :style="{ backgroundImage: 'url(' + backgroundImage + ')'}"
  >
    <div class="container movie-hero-items">
      <NuxtImg
        class="  hero-poster-img"
        :src="image.poster"
      />

      <div class="movie-hero-desc">
        blah
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const backgroundImage = 'https://wwwimage-intl.pplusstatic.com/thumbnails/photos/w828-q80/cbs_page_attribute/upsell_gen_agim_hero1_webportrait_1030x1182_032924_0.jpg';
const image = {
//   // src: 'https://wwwimage-intl.pplusstatic.com/thumbnails/photos/w828-q80/cbs_page_attribute/upsell_gen_agim_hero1_webportrait_1030x1182_032924_0.jpg',
  poster: 'https://image.tmdb.org/t/p/w500/i2dF9UxOeb77CAJrOflj0RpqJRF.jpg',
//
};
</script>

<style lang="scss">

.movie-hero-container{
  background-size: cover  ;
  background: no-repeat center;
  height: 100%;


  .movie-hero-items{

    display: flex;


    .hero-poster-img {
      width: 200px;
      object-fit: cover;
      border-radius: 5px;
      overflow: hidden;
      background: green;
    }
    .movie-hero-desc {
      background: red;
    }

  }

}


</style>
