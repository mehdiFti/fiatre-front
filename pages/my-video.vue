<template>
  <RtlHeader dir="rtl"/>
  <ClientOnly>
    <div class="container">
      <h2 class="incomplete-videos-title">ویدئوهای ناتمام من</h2>
      <hr />
      <div class="video-episode-wrapper">
        <div v-if="incompleteVideos.length === 0" class="no-videos-message">
      !ویدیوی ناتمامی ندارید
    </div>
        <div
          v-for="video in incompleteVideos"
          :key="video.key"
          :class="{'video-episode-card': true, 'removing': video.removing}"
        >
          <media-player
            ref="addPlayerRef"
            :title="video.title"
            :src="video.src"
            keep-alive
            :current-time="getSavedTime(video.key)"
            class="video-player"
            @play="handlePlay($event.target)"
            @time-update="handleTimeUpdate(video.key, $event)"
            @ended="handleVideoEnded(video.key)"
          >
            <media-provider />
            <media-poster 
              class="vds-poster"
              :src="video.poster"
              :alt="`Poster for ${video.title}`"
            />
            <media-video-layout class="video-layout" />
            <vds-volume></vds-volume>
          </media-player>
          <div class="episode-info">
            <div class="episode-title">
              <span class="episode-number">{{ video.number }}</span> - {{ video.title }}
            </div>
            <hr>
            <div class="episode-desc">
              {{ truncateDescription(video.description) }}
            </div>
          </div>
          <div class="other-buttons">
            <DownloadButton />
            <BookmarkButton
              :videoId="video.key"
              :videoDetails="{ key: video.key, title: video.title, src: video.src, poster: video.poster, description: video.description }"
            />
            <button class="remove-button" @click="removeVideo(video.key)" title="ویدئو از صفحه حذف شود؟">
              <nuxt-icon name="cancel" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
  <Footer dir="rtl"/>
</template>

<script setup lang="ts">
 
definePageMeta({
layout: 'custom'
})

  useSeoMeta({
  title: 'ویدئوهای من',
  description: 'صفحه ویدئوهای من در سایت FIATRE برای مشاهده ویدئوهای ذخیره شده و ادامه تماشا.',
  keywords: 'ویدئوهای من, تماشا, ذخیره شده, سایت FIATRE',
  ogTitle: 'ویدئوهای من',
  ogDescription: 'صفحه ویدئوهای من در سایت FIATRE برای مشاهده ویدئوهای ذخیره شده و ادامه تماشا.',
  ogType: 'website',
  ogUrl: 'https://fiatre.ir/my-video',
  ogImage: 'https://fiatre.ir/og-image.jpg',
  robots: 'index, follow'
});

import { ref, onMounted, onBeforeUnmount } from 'vue';
import RtlHeader from '~/components/core/RtlHeader.vue';
import Footer from '~/components/core/Footer.vue';
import DownloadButton from '~/components/core/DownloadButton.vue';
import BookmarkButton from '~/components/pages/bookmark/BookmarkButton.vue';


interface Video {
  key: string;
  title: string;
  src: string;
  poster: string;
  number: string;
  description: string;
  removing?: boolean;
}

const incompleteVideos = ref<Video[]>([]);
const playerRefs = ref<HTMLMediaElement[]>([]);
const currentPlaying = ref<HTMLMediaElement | null>(null);

const addPlayerRef = (el: HTMLMediaElement) => {
  if (el && !playerRefs.value.includes(el)) {
    playerRefs.value.push(el);
  }
};

const handlePlay = (player: EventTarget) => {
  const mediaPlayer = player as HTMLMediaElement;
  if (currentPlaying.value && currentPlaying.value !== mediaPlayer) {
    currentPlaying.value.pause();
  }
  currentPlaying.value = mediaPlayer;
};

const handleTimeUpdate = (key: string, event: Event) => {
  const currentTime = (event.target as HTMLMediaElement).currentTime;
  localStorage.setItem(`video-${key}-time`, currentTime.toString());
};

const getSavedTime = (key: string) => {
  const savedTime = localStorage.getItem(`video-${key}-time`);
  return savedTime ? parseFloat(savedTime) : 0;
};

const truncateDescription = (description: string) => {
  const maxWords = 100;
  const words = description.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  return description;
};

const handleVideoEnded = (key: string) => {
  const video = incompleteVideos.value.find(video => video.key === key);
  if (video) {
    video.removing = true;
    setTimeout(() => {
      localStorage.removeItem(`incomplete-video-${key}`);
      incompleteVideos.value = incompleteVideos.value.filter(video => video.key !== key);
    }, 500);
  }
};

const removeVideo = (key: string) => {
  const video = incompleteVideos.value.find(video => video.key === key);
  if (video) {
    video.removing = true;
    setTimeout(() => {
      localStorage.removeItem(`incomplete-video-${key}`);
      incompleteVideos.value = incompleteVideos.value.filter(video => video.key !== key);
    }, 500);
  }
};

onMounted(() => {
  loadIncompleteVideos();
});

const loadIncompleteVideos = () => {
  const keys = Object.keys(localStorage).filter(key => key.startsWith('incomplete-video-'));
  const videos = keys.map(key => {
    const videoData = JSON.parse(localStorage.getItem(key) || '{}');
    return {
      key: key.replace('incomplete-video-', ''),
      title: videoData.title || 'Unknown Title',
      src: videoData.src || 'https://example.com/video.mp4',
      poster: videoData.poster || 'https://example.com/poster.jpg',
      number: videoData.number || '',
      description: videoData.description || 'No description available'
    };
  });
  incompleteVideos.value = videos;
};

onBeforeUnmount(() => {
  playerRefs.value.forEach((player) => {
    if (player) {
      player.pause();
    }
  });
});
</script>

<style scoped lang="scss">
.video-episode-wrapper {
  margin: 30px 0 50px 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  background: $light;
  padding: 20px;
  flex-direction: row-reverse;
}

.video-episode-card {
  flex: 0 0 calc(33.33% - 20px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  height: 400px;
  position: relative;
}

.video-episode-card.removing {
  opacity: 0;
  transform: scale(0.9);
}

.video-player {
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: $light;
}

.episode-info {
  padding: 15px;
  text-align: right;
  flex-grow: 1;
}

.episode-number {
  font-weight: bold;
  margin-bottom: 10px;
}

.episode-title {
  font-size: 1.2rem;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  line-clamp: 1;
}

.episode-desc {
  font-size: 1em;
  color: #666;
  line-height: 1.5;
  max-height: 4.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
}

hr {
  border: none;
  border-top: 1px solid $dark;
  margin: 10px 0;
}

.other-buttons {
  display: flex;
  align-items: center; 
  gap: 15px;
  position: relative;
  bottom: 15px; 
  left: 15px; 
}

.remove-button {
  background-color: $third;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: $white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  position: relative;
}

.remove-button:hover::after {
  content: 'ویدئو از صفحه حذف شود؟';
  position: absolute;
  top: -30px;
  right: 50%;
  transform: translateX(50%);
  background-color: black;
  color: white;
  padding: 5px;
  border-radius: 5px;
  white-space: nowrap;
  font-size: 12px;
  z-index: 10;
}
 .incomplete-videos-title {
  font-size: 1.5rem;
  color: $dark;
  text-align: right; 
  margin: 20px 0;
}
@media (max-width: 1024px) {
  .video-episode-card {
    flex: 0 0 calc(50% - 20px);
    height: 420px;
  }
}

@media (max-width: 768px) and (min-width: 421px) {
  .video-episode-card {
    flex: 0 0 calc(100% - 20px); 
    height: 400px;
  }
}

@media (max-width: 420px) {
  .video-episode-card {
    flex: 0 0 calc(100% - 20px); 
    height: 320px;
  }
}

@media (max-width: 480px) {
  .episode-desc {
    max-height: 3em;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
