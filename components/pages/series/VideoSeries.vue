<template>
  <ClientOnly>
    <div class="container">
      <div class="video-episode-wrapper">
        <div
          v-for="episode in episodesToShow"
          :key="episode.key"
          class="video-episode-card"
        >
          <media-player
            ref="addPlayerRef"
            :title="episode.title"
            :src="episode.src"
            keep-alive
            playsinline
            :current-time="getSavedTime(episode.key)"
            class="video-player"
            @play="handlePlay($event.target)"
            @time-update="handleTimeUpdate(episode.key, $event)"
            @ended="handleVideoEnded(episode.key)"
          >
            <media-provider />
            <media-poster 
              class="vds-poster"
              :src="episode.poster"
              :alt="`Poster for ${episode.title}`"
            />
            <media-video-layout class="video-layout" />
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
            </media-controls>
          </media-player>
          <div class="episode-info">
            <h4 class="episode-title">
              <span class="episode-number">{{ episode.number }}</span> - {{ episode.title }}
            </h4>
            <hr>
            <div class="episode-desc">
              {{ truncateDescription(episode.description) }}
            </div>
          </div>
          <div class="other-buttons">
            <DownloadButton/>
            <BookmarkButton :videoId="episode.key" :videoDetails="episode" @bookmark-toggled="handleBookmarkToggled" />
          </div>
        </div>
      </div>
      <div class="show-button-container">
        <button v-if="episodes.length > 4 && !showMore" @click.prevent="toggleShowMore" class="show-more-btn">
          نمایش تمامی قسمت‌ها 
        </button>
      </div>
      <div v-if="showMore">
        <div class="video-episode-wrapper-rest">
          <div
            v-for="episode in episodes.slice(4)"
            :key="episode.key"
            class="video-episode-card"
          >
            <media-player
              ref="addPlayerRef"
              :title="episode.title"
              :src="episode.src"
              keep-alive
              :current-time="getSavedTime(episode.key)"
              class="video-player"
              @play="handlePlay($event.target)"
              @time-update="handleTimeUpdate(episode.key, $event)"
              @ended="handleVideoEnded(episode.key)"
            >
              <media-provider />
              <media-poster 
                class="vds-poster"
                :src="episode.poster"
                :alt="`Poster for ${episode.title}`"
              />
              <media-video-layout class="video-layout" />
            </media-player>
            <div class="episode-info">
              <h4 class="episode-title">
                <span class="episode-number">{{ episode.number }} -</span> {{ episode.title }}
              </h4>
              <hr>
              <div class="episode-desc">
                {{ truncateDescription(episode.description) }}
              </div>
              <div class="other-buttons">
                <DownloadButton/>
                <BookmarkButton :videoId="episode.key" :videoDetails="episode" @bookmark-toggled="handleBookmarkToggled" />
              </div>
            </div>
          </div>
        </div>
        <div class="show-button-container">
          <button @click.prevent="toggleShowMore" class="show-less-btn">
            نمایش کمتر
          </button>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import 'vidstack/bundle';
import 'vidstack/icons';
import { MediaPlayerElement } from 'vidstack/elements';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import BookmarkButton from '~/components/pages/bookmark/BookmarkButton.vue';
import DownloadButton from '~/components/core/DownloadButton.vue';

const props = defineProps<{
  episodes: Episode[];
}>();

interface Episode {
  key: string;
  title: string;
  src: string;
  poster: string;
  number: string;
  description: string;
}

const { width: screenWidth } = useWindowSize();

const playerRefs = ref<MediaPlayerElement[]>([]);
const showMore = ref(false);
const currentPlaying = ref<MediaPlayerElement | null>(null);

const isMobile = computed(() => {
  if (typeof navigator !== 'undefined') {
    return /Mobi|Android/i.test(navigator.userAgent);
  }
  return false;
});


if (typeof navigator !== 'undefined') {
  console.log('User Agent:', navigator.userAgent);
}

const addPlayerRef = (el: MediaPlayerElement) => {
  if (el && !playerRefs.value.includes(el)) {
    playerRefs.value.push(el);
  }
};

const handlePlay = (player: EventTarget) => {
  const mediaPlayer = player as MediaPlayerElement;
  if (currentPlaying.value && currentPlaying.value !== mediaPlayer) {
    currentPlaying.value.pause();
  }
  currentPlaying.value = mediaPlayer;
};

const handleTimeUpdate = (key: string, event: Event) => {
  const currentTime = (event.target as HTMLMediaElement).currentTime;
  const duration = (event.target as HTMLMediaElement).duration;
  localStorage.setItem(`video-${key}-time`, currentTime.toString());

  if (currentTime < duration - 10) {
    const episode = props.episodes.find(ep => ep.key === key);
    if (episode) {
      localStorage.setItem(`incomplete-video-${key}`, JSON.stringify(episode));
    }
  } else {
    localStorage.removeItem(`incomplete-video-${key}`);
  }
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

const toggleShowMore = () => {
  showMore.value = !showMore.value;
};

onMounted(() => {
  playerRefs.value = [];
});

onBeforeUnmount(() => {
  playerRefs.value.forEach((player) => {
    if (player) {
      player.destroy();
    }
  });
});


const episodesToShow = computed(() => {
  if (screenWidth.value >= 421 && screenWidth.value <= 1024) {
    return props.episodes.slice(0, 4);
  } else {
    return props.episodes.slice(0, 3);
  }
});


const handleVideoEnded = (key: string) => {
  localStorage.removeItem(`incomplete-video-${key}`);
  const index = props.episodes.findIndex(episode => episode.key === key);
  if (index !== -1) {
    props.episodes.splice(index, 1);
  }
};
const handleBookmarkToggled = ({ videoId, isBookmarked }: { videoId: string; isBookmarked: boolean }) => {
  if (!isBookmarked) {
    const bookmarkButton = document.querySelector(`.bookmark-button[data-video-id="${videoId}"]`);
    if (bookmarkButton) {
      bookmarkButton.classList.remove('bookmark-button--bookmarked');
    }
  }
};
const handleBookmarkRemoved = (videoId: string) => {
console.log(`Bookmark removed for video ID: ${videoId}`);
};

const { width } = useWindowSize();

const isScreenSmall = computed(() => width.value < 680);


</script>


<style scoped lang="scss">
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


.vds-slider {
  margin-top: 2px;
  position: absolute; 
  top: 2px; 
  left: 10px; 
--media-slider-width: 80px ; 
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
}

.volume-settings {
display: flex;
flex-direction: column;
align-items: center;
opacity: 1 ;


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

.video-episode-wrapper {
  margin-top: 30px;
  display: flex;
justify-content: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  background: $light;
  padding: 20px;
  flex-direction: row-reverse;
}

.video-episode-wrapper-rest {
  display: flex;
justify-content: flex-end;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  background: $light;
  padding: 20px;
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
  height: 440px;
  position: relative;
}

.video-player {
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: $light;
}

.episode-info {
  display: flex; 
  flex-direction: column; 
  padding: 15px;
  text-align: right;
  flex-grow: 1;
}

.episode-number {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.episode-title {
  direction: rtl;
  display: flex;
  align-items: center; 
  font-size: 1rem;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  max-height: 4rem;
}

.episode-desc {
  direction: rtl;
  font-size: 0.9rem;
  color: $gray-500;
  line-height: 1.5;
  max-height: 4.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  max-height: 4rem;


}

hr {
  border: none;
  border-top: 1px solid $dark;
  margin: 10px 0;
}

.show-more-btn,
.show-less-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  padding: 10px 20px;
  background-color: $primary;
  color: $white;
  border: none;
  margin-bottom: 40px;
  border-radius: 0 0 5px 5px;
  cursor: pointer;
  font-size: 1rem;
}

.show-more-btn:hover,
.show-less-btn:hover {
  background-color: darken($primary, 10%);
}


.other-buttons {
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  align-self: center;
  position: absolute;
  bottom: 15px;
  left: 15px;
}

@media screen and (max-width: 1024px) {
  .video-episode-card {
    flex: 0 0 calc(50% - 20px);
    height: 420px;
    padding-bottom: 480px;
  }
}

@media screen and (max-width: 767px) and (min-width: 421px) {
  .video-episode-card {
    flex: 0 0 calc(100% - 20px);
    height: 420px;
  }
}

@media screen and (max-width: 420px) {
  .video-episode-card {
    flex: 0 0 calc(100% - 20px);
    height: 340px;
  }
}

@media screen and (max-width: 480px) {
  .episode-desc {
    max-height: 3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.8rem;
  }
}

.show-button-container {
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 768px) {
  .show-more-btn,
  .show-less-btn {
    width: 40%;
  }
}

@media screen and (max-width: 489px) {
  .show-more-btn,
  .show-less-btn {
    width: 50%;
    white-space: nowrap;
    font-size: 0.8rem;  
  }
  .show-less-btn {
    margin-bottom: 40px
  }
}

@media screen and (max-width: 340px) {
  .episode-title {
    font-size: 0.9rem;
    max-height: 3.5rem
  }
}
</style>
