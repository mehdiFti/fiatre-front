<template>
  <main class="container">
    <section class="bookmark-wrapper mb-5">
      <header>
        <h2 class="my-fav-h2">علاقه‌مندی‌های من</h2>
        <hr>
      </header>

      <template v-if="bookmarksRequest.status.value === 'success'">
        <div v-if="false" class="not-text">
          <pre>{{ bookmarkedVideos }}</pre>
        </div>

        <div class="video-list">
          <BookmarkItem v-for="video in bookmarkedVideos" :key="video.key" :src="video.poster" :name="video.title"
            :number="video.number" :episode="video" :description="video.description" :isInBookmarksPage="true"
            @remove-bookmark="removeBookmark" />
        </div>
      </template>

      <!-- Loading State -->
      <main v-else-if="bookmarksRequest.status.value === 'pending'" class="not-text">
        در حال بارگذاری...
      </main>

      <!-- Error State -->
      <main v-else-if="bookmarksRequest.status.value === 'error'" class="not-text">
        خطا در بارگذاری علاقه‌مندی‌ها
      </main>
    </section>
  </main>
</template>

<script setup lang="ts">

import BookmarkItem from '~/components/pages/bookmark/BookmarkItem.vue';
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
</script>

<style lang="scss" scoped>
.bookmark-wrapper {
  .video-list {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
  }

  .my-fav-h2 {
    font-size: 1.5rem;
    color: $black;
    font-weight: bold;
    margin: 20px 0;
  }

  .video-list>* {
    max-width: calc(20% - 20px);
    box-sizing: border-box;
  }

  @media (max-width: 991px) {
    .video-list>* {
      max-width: calc(25% - 20px);
    }
  }

  @media (max-width: 550px) {
    .video-list>* {
      max-width: calc(33.33% - 20px);
    }
  }

  @media (max-width: 360px) {
    .video-list>* {
      max-width: calc(50% - 20px);
    }
  }
}

.not-text {
  font-size: 22px;
  margin: 40px 40px 300px 4px;
}
</style>