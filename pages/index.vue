<template>
  <div class="background-color">
    <Hero class="margin-home" :images-hero="heroSections" />

    <div v-for="(section, key, index) in homeSections" :key="section.sectionTitle">
      <HomeSection class="mb-5" :section="section"/>

      <ExclusiveCard :posters="posters[index]" />

      <TheSlider :cardsSlider="section.episodes" class="mb-5 semi-button" />
    </div>

    <TheBlog />
  </div>
</template>
<script setup lang="ts">
useSeoMeta({
  title: 'صفحه اصلی',
  description: 'صفحه اصلی سایت برای مشاهده ویدئوها و مقالات جدید.',
  keywords: 'صفحه اصلی, ویدئوها, مقالات, سایت',
  ogTitle: 'صفحه اصلی',
  ogDescription: 'صفحه اصلی سایت برای مشاهده ویدئوها و مقالات جدید.',
  ogType: 'website',
  ogUrl: 'https://fiatre.ir',
  ogImage: 'https://fiatre.ir/og-image.jpg',
  robots: 'index, follow',
});

import {computed} from 'vue';
import {useWindowSize} from '@vueuse/core';
import HomeSection from '~/components/pages/index/HomeSection.vue';
import Hero from '~/components/pages/index/Hero.vue';
import TheBlog from '~/components/core/TheBlog.vue';
import TheSlider from '~/components/core/TheSlider.vue';
import ExclusiveCard from '~/components/pages/index/ExclusiveCard.vue';

const getHomeRequest = await useApiFetch('/api/home/');


const homeSections = computed(() => {
  if (getHomeRequest.status.value === 'success') {
    const categories = {};

    for (const [key,value] of Object.entries(getHomeRequest.data.value)) {   
      if (key.startsWith('categories_') && value[0]) {
        categories[key] = value[0];
      }
    }

    return categories
  }
  return {};
});

const posters = computed(() => {
  if (getHomeRequest.status.value === 'success') {
    const postersData = [];
    
    for (const [key, value] of Object.entries(getHomeRequest.data.value)) {
      if (key.startsWith('posters_') && value) {
        postersData.push(value);
      }
    }
    
    return postersData;
  }
  return [];
});

const {width} = useWindowSize(); // Get the reactive window width

const heroSections = computed(() => {
  const isMobile = width.value < 800; // Use the reactive width value

  if (getHomeRequest.status.value === 'success') {
    console.log('Hero data:', getHomeRequest.data.value.sliders); // Log the hero data
    return getHomeRequest.data.value.sliders.map((slider) => ({
      id: slider.id,
      name: slider.name,
      background: isMobile ? slider.file_mobile : slider.file, // Use mobile_file if on mobile
      poster:  slider.banner,
      // font: slider.image,
      title: slider.name,
      text: slider.desc || 'برای تماشا کلیک کنید',
      links: slider.link,
    }));
  }
  return [];
});

interface Hero {
  id: number;
  name: string;
  image: string;
  link: string;
}
</script>
<style lang="scss">
.margin-home {
  margin-bottom: 100px;
}

</style>

