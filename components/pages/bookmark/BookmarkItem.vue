<template>
  <div v-if="visible" :class="['bookmark-item', fadeOut ? 'fade-out' : '']">
    <nuxt-link :to="episode.src">
      <NuxtImg class="bookmark-img" :src="src" />
    </nuxt-link>
    <div class="bookmark-text">
      <div class="bookmark-number" v-if="number">{{ number }}</div>
      <h3 :class="{ 'highlight-title': !number }">{{ name }}</h3>
      <p>{{ description }}</p>
      <div class="other-button">
        <BookmarkButton
          :videoId="episode.key"
          :videoDetails="episode"
          :isInBookmarksPage="isInBookmarksPage"
          @bookmark-toggled="handleBookmarkToggled"
        />
        <DownloadButton />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DownloadButton from '~/components/core/DownloadButton.vue';
import BookmarkButton from '~/components/pages/bookmark/BookmarkButton.vue';

interface Episode {
  key: string;
  title: string;
  src: string;
  poster: string;
  description: string;
  
}

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  episode: {
    type: Object as () => Episode,
    required: true,
  },
  isInBookmarksPage: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits(['remove-bookmark']);
const visible = ref(true);
const fadeOut = ref(false); 

const handleBookmarkToggled = ({ videoId, isBookmarked }: { videoId: string, isBookmarked: boolean }) => {
  if (!isBookmarked) {
    fadeOut.value = true;
    setTimeout(() => {
      emit('remove-bookmark', videoId);
      visible.value = false;
    }, 2000);
  }
};
</script>

<style lang="scss" scoped>
.bookmark-item {
  position: relative;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  background-color: $white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.5s ease;
  height: 400px;
  opacity: 1;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  &.fade-out {
    opacity: 0;
    transition: opacity 2s ease; 
  }

  .bookmark-img {
    width: 100%;
    height: 190px;
    object-fit: cover;
    border-bottom: 2px solid $gray-100;
  }

  .bookmark-text {
    padding: 16px;
    background-color: $white;
    text-align: center;
    font-size: 1.1rem;
    color: $gray-600;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    margin-bottom: 10px;

    .bookmark-number {
      font-size: 1rem;
      color: $primary;
      margin-bottom: 8px;
    }

    h3 {
      font-size: 1rem;
      margin: 0;
      color: darken($primary, 10);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-clamp: 2;
      height: 68px;

      &.highlight-title {
        font-size: 1.5rem;
        color:$primary;
        line-height: 2.5;
      }
    }

    p {
      font-size: 0.7rem;
      margin: 8px 0 0;
      color: $gray-400;
    }
  }

  .other-button {
    display: flex;
    position: absolute;
    bottom: 16px;
    right: 16px;
  }
}

@media (max-width: 768px) {
  .bookmark-item .bookmark-text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-clamp: 2;
  }
}

@media (max-width: 1400px) {
  .bookmark-item .bookmark-text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-clamp: 2;
  }
}
</style>
