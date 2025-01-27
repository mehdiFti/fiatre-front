<template>
  <main :class="{ 'container': isLargeScreen, 'mobile-container': !isLargeScreen }">
    <section class="bookmark-wrapper mb-5">
      <header>
        <h2 class="my-fav-h2">علاقه‌مندی‌های من</h2>
        <hr>
      </header>

      <template v-if="bookmarksRequest.status.value === 'success'">
        <div v-if="false" class="not-text">
          <pre>{{ bookmarkedVideos }}</pre>
        </div>

        <div class="cards-grid">
          <FeatureCard v-for="video in bookmarkedVideos" :key="video.key" :link="video.src" :img="video.poster"
            :title="video.title" />
        </div>
      </template>

      <!-- Loading State -->
      <main v-else-if="bookmarksRequest.status.value === 'pending'" class="loading">
        در حال بارگذاری...
      </main>

      <!-- Error State -->
      <main v-else-if="bookmarksRequest.status.value === 'error'" class="error">
        خطا در بارگذاری علاقه‌مندی‌ها
      </main>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import FeatureCard from '~/components/core/FeatureCard.vue';
// Page Meta
// definePageMeta({
//   middleware: ['redirect-to-login']
// });

// SEO Meta
const title = computed(() => 'علاقه‌مندی‌های من | فیاتر');
const description = 'مشاهده لیست فیلم‌ها و سریال‌های مورد علاقه شما در فیاتر';
const keywords = 'علاقه‌مندی‌ها, لیست مورد علاقه, فیلم های مورد علاقه, فیاتر';

useSeoMeta({
  title: title.value,
  description: description,
  keywords: keywords,
  // Open Graph
  ogTitle: title.value,
  ogDescription: description,
  ogType: 'website',
  ogUrl: 'https://fiatre.ir/bookmarks',
  ogImage: 'https://fiatre.ir/og-image.jpg',
  // Twitter Card
  twitterCard: 'summary_large_image',
  twitterTitle: title.value,
  twitterDescription: description,
  twitterImage: 'https://fiatre.ir/og-image.jpg',
  // Robots - Prevent indexing of personal bookmarks page
  robots: 'noindex, nofollow',
});

// Types
interface BookmarkResponse {
  data: {
    id: number;
    created_at: string;
    updated_at: string;
    episode: {
      title: string;
      en_title: string | null;
      slug: string;
      image: string;
      cover: string | null;
    };
  }[];
}

// API Call
const bookmarksRequest = await useAuthFetch<BookmarkResponse>('/api/episodes/bookmarks/your/', {

});

// Computed
const bookmarkedVideos = computed(() => {
  if (bookmarksRequest.status.value === 'success' && bookmarksRequest.data.value?.data) {
    const videos = bookmarksRequest.data.value.data.map(bookmark => ({
      key: bookmark.id.toString(),
      title: bookmark.episode.title || 'Unknown Title',
      src: `/episodes/${bookmark.episode.slug}/`,
      poster: bookmark.episode.image ? `https://fiatre.ir${bookmark.episode.image}` : '',
      description: bookmark.episode.slug
    }));
    return videos;
  }
  return [];
});

// Actions
// const removeBookmark = async (videoId: number) => {
//   const { error } = await useAuthFetch(`/api/episodes/bookmarks/${videoId}/`, {
//     method: 'DELETE'
//   });

//   if (error.value) {
//     console.error('Failed to remove bookmark:', error.value);
//     return;
//   }

//   // Refresh bookmarks
//   await bookmarksRequest.execute();
//   emit('bookmark-removed', videoId);
// };

// Events
const emit = defineEmits(['bookmark-removed']);

const isLargeScreen = ref(true)
const { width } = useWindowSize()

watch(width, (newWidth) => {
  isLargeScreen.value = newWidth > 550
}, { immediate: true })
</script>

<style lang="scss" scoped>
.bookmark-wrapper {
  .my-fav-h2 {
    font-size: 1.5rem;
    color: $black;
    font-weight: bold;
    margin: 20px 0;

    @media (max-width: 768px) {
      font-size: 1.25rem;
    }

    @media (max-width: 550px) {
      font-size: 1rem;
    }
  }
}

.cards-grid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  padding: 10px;
}

@media (max-width: 360px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 10px;
  }
}

@media (max-width: 991px) {
  .cards-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 550px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
}

.loading,
.error {
  padding: 20px;
  text-align: center;
}

.mobile-container {
  padding: 0 8px;
}
</style>