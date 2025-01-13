<template>
  <ClientOnly>
    <div class=" container video-header">
      <Player :movie="movie" :video-url="videoUrl" :start-time="startTime" :no-container="noContainer"
        :is-inside-video-series="isInsideVideoSeries" :on-pause="onPause" />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import Player from '~/components/core/Player.vue';

const props = defineProps<{
  movie: {
    key: string;
    title: string;
    video: string;
    cover: string;
    image: string;
    number: string;
    description: string;
    slug: string;
  };
  noContainer: boolean;
  videoUrl: string;
  isInsideVideoSeries?: boolean;
  onPause?: (currentTime: number) => void;
  startTime?: number;
}>();
</script>

<style lang='scsss' scoped>

</style>
