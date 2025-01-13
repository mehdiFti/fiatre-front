<template>
  <div>
    <ImageHeader :imageHeader="imageHeader" :class="{ 'mb-5': !quote.text }" />

    <Quote v-if="quote.text" :quote="quote" />

    <TheSeparator class="ps-4" title="توضیحات" :class="{ 'mt-4': quote.text }" />

    <Description class="mb-3" :bDescription="bio" />

    <TheSeparator class="ps-4" title="عناوین مرتبط" />

    <TheSlider class="mb-5" :cardsSlider="RelatedArtists" />

  </div>
</template>

<script setup lang="ts">


import { ref, computed } from 'vue';
import ImageHeader from '~/components/core/ImageHeader.vue';
import Quote from '~/components/pages/biography/Quote.vue';
import Description from '~/components/core/Description.vue';
import TheSeparator from '~/components/core/TheSeparator.vue';
import TheSlider from '~/components/core/TheSlider.vue';
import { useRoute } from 'vue-router';


const route = useRoute();

const getbiographyRequest = await useApiFetch<any>(`/api/artists/${route.params.id}/`, {
}).catch(error => {
  console.error('Error fetching biography:', error);
});

const biography = computed(() => {
  if (getbiographyRequest?.status.value === 'success') {
    return getbiographyRequest.data.value;
  }
  return [];
});

const RelatedArtists = computed(() => {
  if (biography.value?.related_episodes) {
    return biography.value.related_episodes.map((episode: any) => ({
      id: episode.title,
      title: episode.title,
      image: episode.image,
      slug: episode.slug
    }));
  }
  return [];
});

const imageHeader = computed(() => ({
  title: biography.value?.name,
  image: biography.value?.image,

}));

const quote = computed(() => ({
  text: biography.value?.desc,
}));

const bio = computed(() => ({
  title: biography.value?.title || '',
  bio: biography.value?.bio || '',
  // secondaryTitle: biography.value?.secondaryTitle || '',
}));

const title = computed(() => ` بیوگرافی ${biography.value?.name || ''} | فیاتر`);
const description = computed(() => biography.value?.desc || 'بیوگرافی هنرمند در فیاتر');
const keywords = 'بیوگرافی, هنرمند, فیلم, سینما';

useSeoMeta({
  title: title.value,
  description: description.value,
  keywords: keywords,
  // Open Graph
  ogTitle: title.value,
  ogDescription: description.value,
  ogType: 'website',
  ogUrl: `https://fiatre.ir/biography/${route.params.id}`,
  ogImage: biography.value?.image || 'https://fiatre.ir/og-image-biography.jpg',
  // Twitter Card
  twitterCard: 'summary_large_image',
  twitterTitle: title.value,
  twitterDescription: description.value,
  twitterImage: biography.value?.image || 'https://fiatre.ir/og-image-biography.jpg',
  // Robots
  robots: 'index, follow',
});


</script>

<style scoped></style>
