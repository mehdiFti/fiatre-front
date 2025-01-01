<template>
  <div class="bookmark-item">
    <nuxt-link :to="episode.src">
      <img class="bookmark-img" :src="src" />
    </nuxt-link>
    <div class="bookmark-text">
      <div class="bookmark-number" v-if="number">{{ number }}</div>
      <h3 :class="{ 'highlight-title': !number }">{{ name }}</h3>
      <div class="other-button">
        <BookmarkButton
          :videoId="episode.key"
          :videoDetails="episode"
          :isInBookmarksPage="isInBookmarksPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


interface Episode {
  key: string;
  title: string;
  src: string;
  poster: string;
  description: string;
}

// Props
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
  },
  episode: {
    type: Object as () => Episode,
    required: true,
  },
  isInBookmarksPage: {
    type: Boolean,
    default: false,
  }
});

</script>

<style lang="scss" scoped>
.bookmark-item {
  position: relative;
  flex: 0 0 calc(25% - 20px);
  display: flex;
  flex-direction: column;
  background-color: $white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 380px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  .bookmark-img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-bottom: 2px solid $gray-100;
  }

  .bookmark-text {
    padding: 12px;
    height: 160px;
    display: flex;
    flex-direction: column;
    background-color: $white;
    position: relative;

    .bookmark-number {
      font-size: 0.9rem;
      color: $primary;
      margin-bottom: 4px;
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
      line-height: 1.5;
      height: 48px;

      &.highlight-title {
        font-size: 1.2rem;
        color: $primary;
        line-height: 1.5;
      }
    }

    p {
      font-size: 0.8rem;
      margin: 8px 0;
      color: $gray-400;
    }
  }

  .other-button {
    display: flex;
    gap: 15px;
    position: absolute;
    bottom: 16px;
    right: 16px;
  }
}

@media (max-width: 1024px) {
  .bookmark-item {
    flex: 0 0 calc(50% - 20px);
    height: 420px;
  }
}

@media (max-width: 768px) and (min-width: 421px) {
  .bookmark-item {
    flex: 0 0 calc(100% - 20px);
    height: 400px;
  }
}

@media (max-width: 420px) {
  .bookmark-item {
    flex: 0 0 calc(100% - 20px);
    height: 320px;
  }
}
</style>