<template>
  <div>
    <ImageHeader :imageHeader="imageHeader" />

    <Quote :quote="quote" />

    <TheSeparator class="ps-4" title="توضیحات" />

    <Description class="mb-5" :bDescription="bio" />

    <TheSeparator class="ps-4" title="عناوین مرتبط" />

    <TheSlider class="mb-5"  :cardsSlider="RelatedArtists" />

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


</script>

<style scoped>
</style>
