<template>

  <div class='Container'>
    <media-player ref="addPlayerRef" :title="movie.title" :src="videoUrl" :current-time="startTime" keep-alive
      load="play" preload="none" viewType="video" class="video-player" @play="handlePlay($event.target)"
      @pause="handlePause($event)" @fullscreen-change="handleFullscreenChange">
      <ClientOnly>
        <media-provider />
        <media-poster class="vds-poster" :src="movie.cover" posterLoad="visible" :alt="`Poster for ${movie.title}`" />
        <media-video-layout class="video-layout">
          <div class="other-buttons-lg" v-if="!isPlaying && !isInsideVideoSeries">
            <ButtonPreview :episodeId="movie.key" :slug="movie.title" @showModal="handlePreviewModal" />
            <DownloadButton :videoUrl="movie.video_mp4" />
            <BookmarkButton :videoId="movie.key" :videoDetails="{
              key: movie.key,
              title: movie.title,
              video: movie.video,
              cover: movie.cover,
              description: movie.description
            }" @bookmark-toggled="handleBookmarkToggled" />
          </div>

          <media-controls class="vds-controls">
            <media-controls-group class="vds-controls-group">
              <div class="vds-controls-spacer"></div>
              <media-volume-slider v-if="isMobile" class="vds-slider">
                <div class="volume-settings">
                  <div class="vds-slider-track"></div>
                  <div class="vds-slider-track-fill vds-slider-track"></div>
                  <div class="vds-slider-thumb"></div>
                </div>
              </media-volume-slider>
            </media-controls-group>
            <div class="vds-controls-spacer"></div>
            <media-controls-group class="vds-controls-group"></media-controls-group>
            <div class="vds-controls-spacer"></div>
            <media-controls-group class="vds-controls-group"></media-controls-group>
          </media-controls>
        </media-video-layout>
      </ClientOnly>
    </media-player>
    <div class="other-buttons-sm" v-if="!isPlaying && !isInsideVideoSeries">
      <ButtonPreview :episodeId="movie.key" :slug="movie.title" @showModal="handlePreviewModal" />
      <DownloadButton :videoUrl="movie.video_mp4" />
      <BookmarkButton :videoId="movie.key" :videoDetails="{
        key: movie.key,
        title: movie.title,
        video: movie.video,
        cover: movie.cover,
        description: movie.description
      }" @bookmark-toggled="handleBookmarkToggled" />
    </div>
  </div>

</template>
<script setup lang="ts">
import 'vidstack/bundle';
import 'vidstack/icons';
import { MediaPlayerElement } from 'vidstack/elements';
import { onBeforeUnmount, ref, onMounted, computed } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { defineCustomElement, MediaTitleElement, MediaControlsElement } from "vidstack/elements";
import BookmarkButton from '~/components/pages/bookmark/BookmarkButton.vue';
import DownloadButton from '~/components/core/DownloadButton.vue';
import ButtonPreview from '~/components/core/ButtonPreview.vue';
import { useVideoPlayer } from '~/composables/useVideoPlayer' // for palying only one video at a time

defineCustomElement(MediaTitleElement);
defineCustomElement(MediaControlsElement);
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
  noContainer: boolean
  videoUrl: string;
  isInsideVideoSeries?: boolean;
  onPause?: (currentTime: number) => void;
  startTime?: number;
}>();

const playerRefs = ref<MediaPlayerElement[]>([]);
const currentPlaying = ref<MediaPlayerElement | null>(null);
const isPlaying = ref(false);
const isFullscreen = ref(false);

const { pauseAllOtherPlayers } = useVideoPlayer()

const addPlayerRef = (el: MediaPlayerElement) => {
  if (el && !playerRefs.value.includes(el)) {
    playerRefs.value.push(el);
  }
};

const handlePlay = (player: EventTarget) => {
  const mediaPlayer = player as MediaPlayerElement
  pauseAllOtherPlayers(mediaPlayer)
  isPlaying.value = true
}

const handlePause = (event: Event) => {
  const mediaPlayer = event.target as MediaPlayerElement;
  isPlaying.value = false;
  props.onPause?.(mediaPlayer.currentTime);

  // Reset controls visibility when paused
  const controls = mediaPlayer.querySelector('media-controls');
  if (controls) {
    controls.setAttribute('data-visible', '');
  }
};

const handleVolumeChange = (newVolume: number) => {
  if (currentPlaying.value) {
    currentPlaying.value.volume = newVolume;
  }
};

const handleFullscreenChange = (event: Event) => {
  const mediaPlayer = event.target as MediaPlayerElement;
  isFullscreen.value = mediaPlayer.fullscreen;
  
  // Reset controls visibility when exiting fullscreen
  if (!isFullscreen.value) {
    setTimeout(() => {
      const controls = mediaPlayer.querySelector('media-controls');
      if (controls) {
        controls.setAttribute('data-visible', '');
        // Force controls to update their visibility state
        controls.dispatchEvent(new Event('mousemove'));
      }
    }, 100);
  }
};

onMounted(() => {
  playerRefs.value = [];

  const removeElement = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.remove();
    }
  };

  const removeGoogleCastButton = () => {
    const googleCastButton = document.querySelector('media-google-cast-button');
    if (googleCastButton) {
      googleCastButton.remove();
    }
  };

  removeElement('media-pip-button');
  removeElement('media-menu-button');
  removeGoogleCastButton();

  const observer = new MutationObserver(() => {
    removeElement('media-pip-button');
    removeElement('media-menu-button');
    removeGoogleCastButton();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  onBeforeUnmount(() => {
    observer.disconnect();
  });
});

onBeforeUnmount(() => {
  playerRefs.value.forEach((player) => {
    if (player) {
      player.destroy();
    }
  });
});

const handleBookmarkToggled = ({ videoId, isBookmarked }: { videoId: string | number; isBookmarked: boolean }) => {
  const bookmarkButton = document.querySelector(`.bookmark-button[data-video-id="${videoId}"]`);
  if (bookmarkButton && !isBookmarked) {
    bookmarkButton.classList.remove('bookmark-button--bookmarked');
  }
};

const isMobile = computed(() => {
  if (typeof navigator !== 'undefined') {
    return /Mobi|Android/i.test(navigator.userAgent);
  }
  return false;
});

if (typeof navigator !== 'undefined') {
  console.log('User Agent:', navigator.userAgent);
}

const handlePreviewModal = (isShowing: boolean) => {
  if (isShowing) {
    isPlaying.value = false;
    if (currentPlaying.value) {
      currentPlaying.value.pause();
    }
  }
};

const posterFit = computed(() => {
  return props.isInsideVideoSeries ? 'contain' : 'cover';
});
</script>
<style lang="scss" scoped>
:deep([data-media-player][data-layout='video']:not([data-fullscreen])) {
  border: none !important;
  // border-radius: 0 !important;
}

.player {
  --brand-color: #f5f5f5;
  --focus-color: #4e9cf6;
  --audio-brand: var(--brand-color);
  --audio-focus-ring-color: var(--focus-color);
  --audio-border-radius: 2px;
  --video-brand: var(--brand-color);
  --video-focus-ring-color: var(--focus-color);
  --video-border-radius: 2px;
}

// .player[data-view-type='video'] {
//   aspect-ratio: 5/2 !important;
// }

.src-buttons {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 40px;
  margin-inline: auto;
  max-width: 300px;
}

.vds-audio-menu {
  display: none !important;
  border: 1px solid red;
}

.other-buttons-sm {
  display: none;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  gap: 10px;
  background: $light;
  padding: 10px;
}

.other-buttons-lg {
  display: none;
  position: absolute;
  top: 10px;
  z-index: 1001;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  flex-direction: row-reverse;
  gap: 10px;
}

@media (max-width: 480px) {
  .other-buttons-sm {
    display: flex;
  }
}

@media (min-width: 481px) {
  .other-buttons-lg {
    display: flex;
  }
}

.btn-and-title {
  background: $light;
  justify-content: space-between;
  align-items: center;

  .mv-title {
    font-size: 20;
    padding-right: 30px;
  }
}

.hidden {
  display: none;
}

.bookmark-button {
  margin-left: -15px;
  color: #000 !important;
  border-radius: 4px;
  font-weight: bold;
}

/* Ensure the media-mute-button is always visible */
media-mute-button {
  display: block !important;
}

.vds-slider {
  margin-top: 2px;
  position: absolute;
  top: 2px;
  left: 10px;
  --media-slider-width: 80px;
  --media-slider-height: 30px;
  --media-slider-track-width: 100%;
  --media-slider-track-height: 4px;
  --media-slider-track-bg: rgb(255 255 255 / 0.3);
  --media-slider-track-fill-bg: var(--media-brand, #f5f5f5);
  --media-slider-track-border-radius: 2px;
  --media-slider-focused-track-width: var(--media-slider-track-width);
  --media-slider-focused-track-height: calc(var(--media-slider-track-height) * 1.25);
  --media-slider-thumb-size: 12px;
  --media-slider-thumb-border: 1px solid #cacaca;
  --media-slider-thumb-border-radius: 9999px;
  --media-slider-thumb-bg: #fff;
  --media-slider-thumb-transition: opacity 0.2s ease-in, box-shadow 0.2s ease;
  --media-slider-focused-thumb-size: calc(var(--media-slider-thumb-size) * 1.1);
  --media-slider-focused-thumb-shadow: 0 0 0 4px hsla(0, 0%, 100%, 0.4);
}

media-controls[data-visible] {
  opacity: 0.6;
  z-index: 1000;
  transition: opacity 0.3s ease;
}

:deep([data-paused]) media-controls[data-visible] {
  opacity: 0.6 !important;
}

.volume-settings {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 1;
}

:deep(.vds-poster :where(img)) {
  object-fit: v-bind(posterFit);
}

.vds-slider-thumb::before {
  content: '';
  background-image: url('data:image/svg+xml;utf8,<svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M17.5091 24.6594C17.5091 25.2066 16.8864 25.5207 16.4463 25.1956L9.44847 20.0252C9.42553 20.0083 9.39776 19.9991 9.36923 19.9991H4.66667C4.29848 19.9991 4 19.7006 4 19.3324V12.6658C4 12.2976 4.29848 11.9991 4.66667 11.9991H9.37115C9.39967 11.9991 9.42745 11.99 9.45039 11.973L16.4463 6.80358C16.8863 6.4784 17.5091 6.79258 17.5091 7.33975L17.5091 24.6594Z" fill="currentColor"/><path d="M22.8424 12.6667C22.8424 12.2985 22.544 12 22.1758 12H20.8424C20.4743 12 20.1758 12.2985 20.1758 12.6667V19.3333C20.1758 19.7015 20.4743 20 20.8424 20H22.1758C22.544 20 22.8424 19.7015 22.8424 19.3333V12.6667Z" fill="currentColor"/></svg>');
  background-size: cover;
  width: 20px;
  height: 20px;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>