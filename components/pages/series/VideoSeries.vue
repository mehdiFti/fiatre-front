<template>
  <ClientOnly>
    <div class="container">
      <div class="video-episode-wrapper">
        <div v-for="episode in displayedEpisodes" :key="episode.key" class="video-episode-card">
          <Player :movie="{
            key: episode.key,
            title: episode.title,
            video: episode.src,
            cover: episode.poster,
            description: episode.description
          }" :videoUrl="episode.src" :isInsideVideoSeries="true" :onPause="onPause"
            :startTime="getStartTime(episode.key)" />
          <div class="episode-info">
            <h4 class="episode-title">
              <span class="episode-number">{{ episode.number }}</span> - {{ episode.title }}
            </h4>
            <hr>
            <div class="episode-desc" v-html="sanitizeAndTruncateDescription(episode.description)"></div>
          </div>
          <div class="other-buttons">
            <DownloadButton :videoUrl="episode.src" />
            <BookmarkButton :videoId="episode.key" :videoDetails="episode" @bookmark-toggled="handleBookmarkToggled" />
          </div>
        </div>
      </div>
      <div class="show-button-container">
        <button v-if="props.episodes.length > 4" @click.prevent="toggleShowMore" class="show-more-btn">
          {{ showMore ? "نمایش کمتر" : "نمایش تمامی قسمت‌ها" }}
        </button>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import BookmarkButton from '~/components/pages/bookmark/BookmarkButton.vue';
import DownloadButton from '~/components/core/DownloadButton.vue';
import Player from '~/components/core/Player.vue';

const props = defineProps<{
  episodes: Episode[];
  onPause?: (currentTime: number) => void;
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
const showMore = ref(false);

const sanitizeAndTruncateDescription = (description: string) => {
  const cleanText = description.replace(/<\/?[^>]+(>|$)/g, "");
  const maxWords = 100;
  const words = cleanText.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  return cleanText;
};

const toggleShowMore = () => {
  showMore.value = !showMore.value;
};

const displayedEpisodes = computed(() => {
  if (showMore.value) {
    return props.episodes; // Show all episodes when "show more" is toggled
  }
  if (screenWidth.value > 991) {
    return props.episodes.slice(0, 3);
  } else if (screenWidth.value > 360) {
    return props.episodes.slice(0, 2);
  } else {
    return props.episodes.slice(0, 1);
  }
});

const handleBookmarkToggled = ({ videoId, isBookmarked }: { videoId: string; isBookmarked: boolean }) => {
  if (!isBookmarked) {
    const bookmarkButton = document.querySelector(`.bookmark-button[data-video-id="${videoId}"]`);
    if (bookmarkButton) {
      bookmarkButton.classList.remove('bookmark-button--bookmarked');
    }
  }
};

const { width } = useWindowSize();
const isScreenSmall = computed(() => width.value < 680);

const getStartTime = (episodeKey: string) => {
  const episode = props.episodes.find(ep => ep.key === episodeKey);
  return episode?.lastWatchedSecond || 0;
};

const onPause = (currentTime: number) => {
  if (props.onPause) {
    props.onPause(currentTime);
  }
};
</script>

<style scoped lang="scss">
.video-episode-wrapper {
  margin-left: -2% !important;
  margin-top: 30px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  background: $light;
  padding: 20px 0px;
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

.episode-info {
  display: flex;
  flex-direction: column;
  padding: 0px 15px;
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
  color: $gray;
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

// Desktop and large tablets (3 videos per row)
@media screen and (min-width: 992px) {
  .video-episode-card {
    flex: 0 0 calc(33.33% - 20px);
    height: 440px;
  }
}

// Tablets and large phones (2 videos per row)
@media screen and (max-width: 991px) and (min-width: 360px) {
  .video-episode-card {
    flex: 0 0 calc(50% - 20px);
    height: 400px;
  }

  .episode-desc {
    max-height: 3rem;
    font-size: 0.85rem;
  }

  .episode-title {
    font-size: 0.95rem;
  }

  .other-buttons {
    bottom: 10px;
    left: 10px;
    gap: 10px;
  }

  .show-more-btn,
  .show-less-btn {
    width: 40%;
    font-size: 0.9rem;
  }
}

@media screen and (max-width: 360px) {
  .video-episode-card {
    flex: 0 0 calc(100% - 20px);
    height: 360px;
  }

  .episode-desc {
    max-height: 2.5rem;
    font-size: 0.8rem;
  }

  .episode-title {
    font-size: 0.9rem;
    max-height: 3.5rem;
  }

  .other-buttons {
    bottom: 8px;
    left: 8px;
    gap: 8px;
  }

  .show-more-btn,
  .show-less-btn {
    width: 50%;
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
