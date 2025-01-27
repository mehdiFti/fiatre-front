<template>
  <div class="background-color">
    <div class="hero-wrapper">
      <Hero class="margin-home" :images-hero="heroSections" />
    </div>

    <div v-for="(section, key, index) in homeSections" :key="section.sectionTitle">
      <HomeSection v-if="index % 2 === 1" :section="section" />

      <template v-else>
        <HomeSeprator class="mb-3" :slug="section.slug" :title="section.name" />
        <TheSlider :cardsSlider="section.episodes" class="semi-button" />
      </template>

      <ExclusiveCard :class="{ 'mt-5': hasPosters(index) }" :posters="posters[index]" />
    </div>

    <TheBlog />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: ' صفحه اصلی | فیاتر',
  description: 'صفحه اصلی سایت برای مشاهده ویدیوها و مقالات جدید.',
  keywords: 'صفحه اصلی, ویدیوها, مقالات, سایت',
  ogTitle: 'صفحه اصلی',
  ogDescription: 'صفحه اصلی سایت برای مشاهده ویدیوها و مقالات جدید.',
  ogType: 'website',
  ogUrl: 'https://fiatre.ir',
  ogImage: 'https://fiatre.ir/og-image.jpg',
  robots: 'index, follow',
});

import { computed } from 'vue';
import { useWindowSize } from '@vueuse/core';
import HomeSection from '~/components/pages/index/HomeSection.vue';
import Hero from '~/components/pages/index/Hero.vue';
import TheBlog from '~/components/core/TheBlog.vue';
import TheSlider from '~/components/core/TheSlider.vue';
import ExclusiveCard from '~/components/pages/index/ExclusiveCard.vue';

import HomeSeprator from '~/components/core/HomeSeprator.vue';

const getHomeRequest = await useApiFetch('/api/home/');

const homeSections = computed(() => {
  if (getHomeRequest.status.value === 'success') {
    const categories = {};

    for (const [key, value] of Object.entries(getHomeRequest.data.value)) {
      if (key.startsWith('categories_') && value[0]) {
        categories[key] = value[0];
      }
    }

    return categories;
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

const { width } = useWindowSize();

const heroSections = computed(() => {
  const isMobile = width.value < 768;

  if (getHomeRequest.status.value === 'success') {
    console.log('Hero data:', getHomeRequest.data.value.sliders);
    return getHomeRequest.data.value.sliders.map((slider) => ({
      id: slider.id,
      name: slider.name,
      background: isMobile ? slider.file_mobile : slider.file,
      poster: slider.banner,
      title: slider.name,
      text: slider.desc || 'برای تماشا کلیک کنید',
      links: slider.link,
    }));
  }
  return [];
});

// Helper function to check if posters exist for the given index
const hasPosters = (index) => posters.value[index] && posters.value[index].length > 0;

import { useRoute, navigateTo } from '#app';
import { onMounted } from 'vue';

onMounted(() => {
  const route = useRoute();

  // Check if there are payment-related query parameters
  if (route.query.status || route.query.Status) {
    const status = (route.query.status || route.query.Status || '').toUpperCase();
    const authority = route.query.Authority || '';
    const refID = route.query.refID || '';

    // Redirect to the proper result page
    navigateTo({
      path: '/subscription/buys/result',
      query: {
        Authority: authority,
        Status: status,
        refID: refID
      },
    });
  }
});
</script>

<style lang="scss">
.hero-wrapper {
  min-height: 400px; // Adjust based on your smallest possible hero height
  width: 100%;
  position: relative;
}

.margin-home {
  margin-bottom: 40px;
}

// Add aspect ratio container for images
.background-color {
  width: 100%;
  overflow: hidden;
}
</style>
