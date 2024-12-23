<template>
  <RtlHeader dir="rtl"/>
  <ClientOnly>
    <div class="container">
      <h2 class="incomplete-videos-title">ویدئوهای ناتمام من</h2>
      <hr />
      
      <div class="video-episode-wrapper">
        <!-- Success State -->
        <template v-if="getWatchLogsRequest.status.value === 'success'">
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
              :current-time="video.second"
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
              <div class="episode-title">{{ video.title }}</div>
              <hr>
              <div class="episode-desc">{{ truncateDescription(video.description) }}</div>
            </div>
            
            <div class="other-buttons">
              <DownloadButton :videoUrl="video.src" />
              <BookmarkButton
                :videoId="video.key"
                :videoDetails="{ key: video.key, title: video.title, src: video.src, poster: video.poster, description: video.description }"
              />
              <button class="remove-button" @click="removeVideo(video.key)" title="ویدئو از صفحه حذف شود؟">
                <nuxt-icon name="cancel" />
              </button>
            </div>
          </div>
        </template>

        <!-- Loading State -->
        <main v-else-if="getWatchLogsRequest.status.value === 'pending'" class="loading-message">
          در حال بارگذاری...
        </main>

        <!-- Error State -->
        <main v-else-if="getWatchLogsRequest.status.value === 'error'" class="error-message">
          خطا در بارگذاری ویدئوها
        </main>
      </div>
    </div>
  </ClientOnly>
  <Footer dir="rtl"/>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'custom'
});

// SEO Meta
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

import RtlHeader from '~/components/core/RtlHeader.vue';
import Footer from '~/components/core/Footer.vue';
import DownloadButton from '~/components/core/DownloadButton.vue';
import BookmarkButton from '~/components/pages/bookmark/BookmarkButton.vue';
import 'vidstack/bundle';
import 'vidstack/icons';
import { MediaPlayerElement } from 'vidstack/elements';

// Types
interface WatchLogResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    id: number;
    second: number;
    episode: {
      title: string;
      en_title: string | null;
      slug: string;
      image: string;
    };
  }[];
}

const addPlayerRef = ref();

// API Call
const getWatchLogsRequest = await useAuthFetch<WatchLogResponse>('/api/episodes/watch-logs/');

// Computed
const incompleteVideos = computed(() => {
  if (getWatchLogsRequest.status.value === 'success' && getWatchLogsRequest.data.value?.results) {
    return getWatchLogsRequest.data.value.results.map(item => ({
      key: item.id.toString(),
      title: item.episode.title,
      src: item.episode.video,
      poster: `https://fiatre.ir/${item.episode.image}`,
      second: item.second,
      description: item.episode.en_title || item.episode.title,
      removing: false
    }));
  }
  return [];
});

watch(addPlayerRef, (newRef) => {
  console.log(newRef);
}, {immediate: true});

// Player Management
const playerRefs = ref<HTMLMediaElement[]>([]);
const currentPlaying = ref<HTMLMediaElement | null>(null);

const handlePlay = (player: EventTarget) => {
  const mediaPlayer = player as HTMLMediaElement;
  if (currentPlaying.value && currentPlaying.value !== mediaPlayer) {
    currentPlaying.value.pause();
  }
  currentPlaying.value = mediaPlayer;
};

const handleTimeUpdate = async (key: string, event: Event) => {
  console.log(key, event)
  // const currentTime = (event.target as HTMLMediaElement).currentTime;
  // try {
  //   await useAuthFetch(`/api/episodes/watch-logs/${key}/`, {
  //     method: 'PATCH',
  //     body: {
  //       second: currentTime
  //     }
  //   });
  // } catch (error) {
  //   console.error('Failed to update watch time:', error);
  // }
};

const getSavedTime = (key: string) => {
  const video = incompleteVideos.value.find(v => v.key === key);
  return video ? video.second : 0;
};

const truncateDescription = (description?: string) => {
  if (!description) return '';
  
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
  height: auto;
  position: relative;
  aspect-ratio: 3/4;
  min-height: 0;
}

.video-episode-card.removing {
  opacity: 0;
  transform: scale(0.9);
}

.video-player {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  background-color: $light;
  position: relative;

  ::v-deep(video),
  ::v-deep(.vds-poster) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
  }
}

@media (max-width: 768px) and (min-width: 421px) {
  .video-episode-card {
    flex: 0 0 calc(100% - 20px); 
  }
}

@media (max-width: 420px) {
  .video-episode-card {
    flex: 0 0 calc(100% - 20px); 
  }
}

@media (max-width: 480px) {
  .episode-desc {
    max-height: 3em;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.loading-message,
.error-message,
.no-videos-message {
  width: 100%;
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
  color: $dark;
}

.error-message {
  color: $third;
}
</style>
