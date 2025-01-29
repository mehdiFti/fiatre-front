<template>
  <ClientOnly>
    <div class="container video-header">
      <div class="video-player-wrapper">
        <Player ref="playerRef" :movie="movie" :video-url="videoUrl" :start-time="startTime" :no-container="noContainer"
          :is-inside-video-series="isInsideVideoSeries" :on-pause="onPause" />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
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

onMounted(() => {
  // Force a reflow of the player component
  if (playerRef.value?.$el) {
    playerRef.value.$el.style.display = 'none';
    requestAnimationFrame(() => {
      if (playerRef.value?.$el) {
        playerRef.value.$el.style.display = '';
      }
    });
  }
});

// Clean up on component destroy
onBeforeUnmount(() => {
  if (playerRef.value?.$el) {
    const mediaPlayer = playerRef.value.$el.querySelector('media-player');
    if (mediaPlayer) {
      mediaPlayer.destroy?.();
    }
  }
});
</script>

<style lang='scss' scoped>
.video-header {
  border-radius: 5px;
}

.video-player-wrapper {
  position: relative;
  width: 100%;

  &::after {
    content: '';
    display: block;
    clear: both;
  }
}

:deep(media-player) {
  display: block;
  width: 100%;
}

:deep(media-controls) {
  opacity: 0.6;
  transition: opacity 0.3s ease;

  &[data-visible] {
    opacity: 0.6;
  }
}
</style>
