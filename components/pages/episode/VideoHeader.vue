<template>
  <ClientOnly>
    <div class="container video-header">
      <Player ref="playerRef" :movie="movie" :video-url="videoUrl" :start-time="startTime" :no-container="noContainer"
        :is-inside-video-series="isInsideVideoSeries" :on-pause="onPause" />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import Player from '~/components/core/Player.vue';

const playerRef = ref(null);

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

onBeforeUnmount(() => {
  if (playerRef.value) {
    playerRef.value.$destroy?.();
  }
});
</script>

<style lang='scss' scoped>
.video-header {
  border-radius: 5px;
}
</style>
