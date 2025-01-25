<template>
  <div>
    <ClientOnly>
      <div class="container movie-hero-container">
        <Swiper class="custom-swiper" :slides-per-view="1" loop :autoplay="{
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
          delay: 5000,
        }" :modules="modules" follow-finger :navigation="true" ref="swiperRef">
          <SwiperSlide v-for="image in imagesHero" :key="image.id">
            <div class="wrapper-image-hero">
              <img class="hero-background-img" :src="`https://www.fiatre.ir${image.background}`" />
              <div class="internal-hero">
                <img class="hero-poster-img" :src="`https://www.fiatre.ir${image.poster}`" :alt="`${image.alt} poster`"
                  v-if="image.poster" />
                <div class="hero-text">
                  <h3 class="hero-title">{{ image.title }}</h3>
                  <p class="hero-description" v-html="image.text" />
                  <!-- {{ image.text }} -->
                  <div class="button-container">
                    <NuxtLink :to="image.links" class="hero-btn-paly">
                      <nuxt-icon class="hero-plays" name="play"></nuxt-icon>
                      پخش آنلاین
                    </NuxtLink>
                  </div>
                </div>

              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// import ButtonPreview from '~/components/core/ButtonPreview.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation } from 'swiper/modules';
import { defineProps } from 'vue';

interface ImagesHero {
  id: number;
  background: string;
  backgroundAlt: string;
  poster: string;
  title: string;
  text: string;
  alt: string;
  links: string;
  font: string
}

const modules = [Autoplay, Navigation];

const props = defineProps<{
  imagesHero: ImagesHero[],
}>();

const swiperRef = ref(null);

const toggleAutoplay = (value: boolean) => {
  console.log(swiperRef.value.autoplay);

  if (swiperRef.value) {
    // if (value) {
    //   swiperRef.value.resume();
    // } else {
    //   swiperRef.value.pause();
    // }
  }
}
</script>

<style lang="scss">
/*rtl:begin:ignore*/
@import "swiper/css";
/*rtl:end:ignore*/

.movie-hero-container {
  border-radius: 5px;

  .custom-swiper {
    .swiper {
      overflow: visible !important;
    }

    --swiper-navigation-size: 10rem;

    .swiper-button-next,
    .swiper-button-prev {
      display: none;
      // transform: scaleX(-1) scale(1.1);
      // color: $dark;
      // border-radius: 50%;
      // height: 30px;
      // width: 30px;
      // background: rgba(255, 255, 255, 0.4);
      // transform: rotate(360deg);

      // &:hover {
      //   transform: scale(1.2);
      //   background: rgba(255, 255, 255, 0.6);
      // }
    }

    // .swiper-button-next {
    //   left: 95%;
    // }

    // .swiper-button-prev {
    //   right: 95%;
    // }
  }

  .wrapper-image-hero {
    position: relative;
    border-radius: 5px;

    .hero-background-img {
      width: 100%;
      height: auto;
      border-radius: 0 0 5px 5px;
      aspect-ratio: 18/9;
      // object-fit: cover;


      @media (max-width: 760px) {
        aspect-ratio: 3/4;
      }
    }

    .internal-hero {
      display: flex;
      align-items: center;
      border-radius: 5px;

      gap: 3%;
      position: absolute;
      bottom: 0%;
      background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
      padding: 2%;

      @media (max-width: 1024px) {
        padding: 4%;
        gap: 5%;
      }


      .hero-text {
        width: 100%;
        color: $white;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-clamp: 2;

        .hero-title {

          color: $white;
          display: flex;
          font-size: 1.1rem;
          font-weight: bold;
          padding-bottom: 10px;

          @media (max-width: 1024px) {
            font-size: 1rem;
          }

          @media (max-width: 760px) {
            font-size: 0.9rem;
          }

          @media (max-width: 400px) {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 460px) {
          .hero-background-img {
            height: 565px;
          }
        }

        .hero-description {
          display: flex;
          font-size: 14px;
          margin-bottom: 10px;
          align-items: flex-start;
          padding-top: 1%;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          line-clamp: 4;
        }

        @media (min-width: 770px) {
          .hero-description {
            width: 80%;
          }
        }

        @media (max-width: 400px) {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .hero-poster-img {
        border-radius: 5px;
        aspect-ratio: 2/3;
        width: 120px;

        @media (max-width: 1024px) {
          width: 15%;
        }

        @media (max-width: 770px) {
          width: 22%;
          max-width: 50%;
        }

      }

      .hero-btn {
        color: $white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
        margin-right: 10px;

        &:hover {
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
        }

        .hero-plays {
          font-size: 1rem;
          margin-right: 5px;
        }

        @media (max-width: 1024px) {
          padding: 5px 14px;
          font-size: 0.9rem;
        }

        @media (max-width: 760px) {
          padding: 6px 12px;
          font-size: 0.8rem;
        }

        .hero-plays {
          @media (max-width: 1024px) {
            font-size: 0.8rem;
          }

          @media (max-width: 760px) {
            font-size: 0.7rem;
          }
        }

        @media (max-width: 391px) {
          padding: 4px 6px;
          font-size: 0.7rem;
        }

        .hero-plays {
          @media (max-width: 391px) {
            font-size: 0.6rem;
          }
        }
      }

      .hero-btn-paly {
        @extend .hero-btn;
        background-color: $third;

        &:hover {
          background-color: darken($third, 5%);
        }

        @media (min-width: 1025px) {
          padding: 4px 12px;
          font-size: 0.8rem;
        }
      }

      .button-container {
        display: flex;
        gap: 10px;
        align-items: center;
      }
    }

    .dynamic-font-wrapper {
      position: absolute; // Make the wrapper absolute
      top: 200px; // Align to the top
      left: 40px; // Align to the right
    }

    .font-dynamic-img {
      position: relative; // Make the image relative
    }
  }
}

@media (max-width: 1024px) {
  .hero-description {
    font-size: 2vh;
  }
}

@media (max-width: 760px) {
  .hero-description {
    font-size: 1.8vh;
  }
}

@media (max-width: 400px) {
  .hero-description {
    font-size: 1.6vh;
  }
}


@media (max-width: 769px) and (max-width: 700px) {
  .hero-poster-img {
    width: 20%;

  }

  .hero-background-img {
    aspect-ratio: 10/10;
  }



  .movie-hero-container,
  .wrapper-image-hero,
  .internal-hero {
    padding: 0;
    gap: 1%;

  }

  .hero-tite {
    font-size: 0.9rem !important;
  }
}



@media (max-width: 1199px) and (min-width: 768px) {
  .hero-poster-img {
    width: 120px !important;

  }
}


@media (max-width: 992px) and (min-width: 768px) {
  .hero-background-img {
    aspect-ratio: 12/9 !important;

  }
}

@media (max-width: 768px) and (min-width: 600px) {
  .hero-background-img {
    aspect-ratio: 2/2 !important;

  }
}

@media (max-width: 600px) and (min-width: 500px) {
  .hero-background-img {
    aspect-ratio: 2/2 !important;

    .hero-poster-img {
      width: 25%;
    }
  }
}

@media (max-width: 500px) and (min-width: 400px) {
  .hero-background-img {
    aspect-ratio: 2/2 !important;
    height: 526px !important;
  }
}

@media (max-width: 400px) and (min-width: 300px) {
  .hero-background-img {
    aspect-ratio: 2/2 !important;
    height: 526px !important;
  }

  .hero-poster-img {
    width: 28% !important;
  }
}
</style>
