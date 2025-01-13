<template>
  <div class="bookmark-wrapper">
    <FeatureCard
      :link="episode.src"
      :img="src"
      :title="name"
    />
    <div class="bookmark-action">
      <BookmarkButton
        :videoId="episode.key"
        :videoDetails="episode"
        :isInBookmarksPage="isInBookmarksPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Import FeatureCard
import FeatureCard from '~/components/core/FeatureCard.vue';

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
.bookmark-wrapper {
  position: relative;
  flex: 0 0 calc(25% - 24px);

  .bookmark-action {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2;
  }
}

@media (max-width: 1024px) {
  .bookmark-wrapper {
    flex: 0 0 calc(50% - 20px);
  }
}

@media (max-width: 768px) {
  .bookmark-wrapper {
    flex: 0 0 calc(100% - 20px);
  }
}
</style>