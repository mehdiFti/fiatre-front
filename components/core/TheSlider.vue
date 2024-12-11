<template>
  <div class="container slider-wrapper" dir="rtl">
    <Swiper
      class="custom-swiper"
      :slides-per-view="slidesPerView"
      :space-between="10"
      follow-finger
      :options="swiperOptions"
    >
      <SwiperSlide v-for="card in cardsSlider" :key="card.id">
        <FeatureCard
          class="slider-cards alt-hover"
          :title="card.title"
          :img="`https://www.fiatre.ir${card.image}`"
          :link="`/episodes/${card.slug}`"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { computed } from 'vue';
import { useWindowSize } from '@vueuse/core';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';
import FeatureCard from '~/components/core/FeatureCard.vue';

interface CardSlider {
  id: number;
  title: string;
  image: string;
  slug: string;
}

const props = defineProps<{
  cardsSlider: CardSlider[];
}>();
console.log(props.cardsSlider);
const swiperOptions = {};

const { width } = useWindowSize();

const slidesPerView = computed(() => {
  if (width.value >= 1200) {
    return 6.5;
  } else if (width.value >= 992) {
    return 5.5;
  } else if (width.value >= 768) {
    return 4.5;
  } else if (width.value >= 320) {
    return 3.2;
  } else {
    return 2.5;
  }
});
</script>

<style scoped lang="scss">
.custom-swiper {
  --swiper-navigation-size: 1rem;
}

.alt-hover {
  border-radius: 5px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
}

.slider-wrapper {
  .slider-cards {
    &.alt-hover:hover {
      transform: none;
      transition: transform 0.3s ease;
      box-shadow: 0 0 10px rgba($third, 1);
    }
  }
}
</style>