<template>
  <ClientOnly>
    <div class="container video-header">
      <Player 
        :movie="movie" 
        :video-url="videoUrl" 
        :start-time="startTime" 
        :no-container="noContainer"
        :is-inside-video-series="true" 
        :on-pause="onPause" 
        ref="playerRef"
      />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Player from '~/components/core/Player.vue';
import { useVideoPlayer } from '~/composables/useVideoPlayer';

const playerRef = ref(null);
const { registerPlayer, unregisterPlayer } = useVideoPlayer();

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

onMounted(() => {
  if (playerRef.value) {
    registerPlayer(playerRef.value);
  }
});

onBeforeUnmount(() => {
  if (playerRef.value) {
    unregisterPlayer(playerRef.value);
  }
});
</script>

<style lang='scss' scoped>
.video-header {
  border-radius: 5px;
  width: 100%;
  
  :deep(.video-player) {
    aspect-ratio: 16/9;
    width: 100%;
  }
}
</style>
