<template>
  <div class="movie-hero-container">
    <Swiper
      :slides-per-view="1"
      loop
      :autoplay="{
        disableOnInteraction:true,
        pauseOnMouseEnter:true,
        delay:3000
      }"
      :modules="modules"
      follow-finger
    >
      <SwiperSlide
        v-for="image in images"
        :key="image.id"
      >
        <div class="wrapper-image-hero">
          <NuxtImg
            class="hero-background-img"
            :src="image.background"
          />

          <div class="internal-hero">
            <NuxtImg
              class="hero-poster-img"
              :src="image.poster"
            />

            <div class="hero-text">
              ss
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';
import{Autoplay} from 'swiper/modules';

const modules = [Autoplay];
const images = [
  {
    id:2,
    background:'https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-3-1.png',
    poster:'https://www.fiatre.ir/uploads/episodes/images/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A2%D9%84-%D9%BE%D8%A7%DA%86%DB%8C%D9%86%D9%88/1672820616.2860472-voONxNVIAtfU-1668591177.2610_80EYQ0Z.jpg',
  },
  {
    id:1,
    background:'https://images.unsplash.com/photo-1563286130-945bc9d7803c?q=80&w=2424&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    poster: 'https://www.fiatre.ir/uploads/episodes/images/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/1672820452.7050824-MZywUj2UI0Lm-16685944_3HKC0pK.jpg',

  },
];
</script>

<style lang="scss">
/*rtl:begin:ignore*/
@import "swiper/css";
/*rtl:end:ignore*/

.movie-hero-container {

  .wrapper-image-hero {
    position: relative;

    .hero-background-img{
      width: 100%;
      height: auto;
    }

    > .internal-hero {
      display: flex;
      justify-content: space-between ;
      gap: 5%;
      border: 1px solid red;
      position: absolute;
      width: 90%;
      bottom: 10%;
      right: 5%;
      padding: 1%;
      background-color: rgba(0,0,0,0.4);
      border-radius: 1vw;

      >.hero-text {
        width: 100%;
        text-align: left;
      }

      .hero-poster-img {
        border-radius: 5px;
        aspect-ratio: 2/3;
        width: 10%;
        height: auto;
      }
    }
  }

}



</style>

