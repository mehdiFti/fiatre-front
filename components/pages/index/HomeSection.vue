<template>
  <div class="container">
    <HomeSeprator class="mb-3" :slug="section.slug" :title="section.name" />
    <div class="movie-section-container" :style="{ backgroundImage: `url(https://www.fiatre.ir${section.image})` }">
      <div class="content-section"></div>
      <div class="card-section">
        <div v-for="episode in displayedCards" :key="episode.id" class="card">
          <FeatureCard :link="`/episodes/${episode.slug}`" :img="`https://www.fiatre.ir${episode.image}`"
            :title="episode.title" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { defineProps } from 'vue';
import { useWindowSize } from '@vueuse/core';
import FeatureCard from '~/components/core/FeatureCard.vue';
import HomeSeprator from '~/components/core/HomeSeprator.vue';

interface IProps {
  section: {
    created_at: string,
    updated_at: string,
    description: string,
    id: number,
    image: string,
    name: string,
    slug: string,
    is_hidden: boolean,
    location: number,
    index: number,
    episodes: any[]
  }
}

const props = defineProps<IProps>();

const { width: screenWidth } = useWindowSize();

const displayedCards = computed(() => {
  const card = props.section.episodes;

  if (screenWidth.value < 768) {
    return card.slice(0, 3);
  } else if (screenWidth.value < 1024) {
    return card.slice(0, 4);
  } else if (screenWidth.value < 1280) {
    return card.slice(0, 5);
  } else {
    return card.slice(0, 5);
  }
});

</script>
<style lang="scss">
.movie-section-container {
  background-size: cover;
  background-position: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 380px;
  width: 100%;
  min-height: 300px;
  border-radius: 5px;
  // aspect-ratio: 16 / 9;
  // position: relative;
  background-repeat: no-repeat;
}

.card-section {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
  padding: 0 16px;
}

.card {
  flex: 1;
  max-width: 200px;
  min-width: 180px;
}
</style>
