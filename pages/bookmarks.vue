<template>
    <main class="container" v-if="!userStore.isAuthenticated">
        <section class="not-text">
            لطفا وارد <nuxt-link to="/login">حساب کاربری </nuxt-link>خود شوید
        </section>
    </main>

    <main class="container" v-else>
        <section class="bookmark-wrapper mb-5">
            <header>
                <h2 class="my-fav-h2">علاقه‌مندی‌های من</h2>
                <hr>
            </header>
            <div class="not-text" v-if="bookmarkedVideos.length === 0">
                <p>هیچ ویدیویی در علاقه‌مندی‌های شما وجود ندارد.</p>
            </div>
            <div v-else class="video-list">
                <BookmarkItem
                    v-for="video in bookmarkedVideos"
                    :key="video.key"
                    :src="video.poster"
                    :name="video.title"
                    :number="video.number"
                    :episode="video"
                    :description="video.description"
                    :isInBookmarksPage="true" 
                    @remove-bookmark="removeBookmark"
                />
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">

import { ref, onMounted, defineEmits } from 'vue';
import BookmarkItem from '~/components/pages/bookmark/BookmarkItem.vue';


useSeoMeta({
    title: 'علاقه‌مندی‌ها',
    description: 'صفحه علاقه‌مندی‌ها در سایت برای مشاهده ویدئوهای ذخیره شده.',
    keywords: 'علاقه‌مندی‌ها, ویدئوهای ذخیره شده, سایت',
    ogTitle: 'علاقه‌مندی‌ها',
    ogDescription: 'صفحه علاقه‌مندی‌ها در سایت برای مشاهده ویدئوهای ذخیره شده.',
    ogType: 'website',
    ogUrl: 'https://fiatre.ir/bookmarks',
    ogImage: 'https://fiatre.ir/og-image.jpg',
    robots: 'index, follow',
});

const bookmarkedVideos = ref<{ key: string; title: string; src: string; poster: string; number: string; description: string; }[]>([]);

onMounted(() => {
    loadBookmarkedVideos();
});

const loadBookmarkedVideos = () => {
  const keys = Object.keys(localStorage).filter(key => key.startsWith('bookmark-'));
  const videos = keys.map(key => {
    const videoData = JSON.parse(localStorage.getItem(key) || '{}');
    return {
      key: key.replace('bookmark-', ''), 
      title: videoData.title || 'Unknown Title',
      src: videoData.src || 'https://example.com/video.mp4',
      poster: videoData.poster || 'https://example.com/poster.jpg',
      number: videoData.number || '',
      // description: videoData.description || ''
      description: ''
    };
  });
  bookmarkedVideos.value = videos;
};

const removeBookmark = (videoId: number) => {
    localStorage.removeItem(`bookmark-${videoId}`);
    loadBookmarkedVideos();
    emit('bookmark-removed', videoId);
};

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
        margin-top: 30px;
        font-size: 1.5rem;
        color: $dark;
    }

    .video-list > * {
        max-width: calc(25% - 20px); 
        box-sizing: border-box;
    }

    @media (max-width: 991px) {
        .video-list > * {
            max-width: calc(33.33% - 20px); 
        }
    }

    @media (max-width: 576px) {
        .video-list > * {
            max-width: calc(50% - 20px); 
        }
    }

    > h1 {
        font-size: 1.5em;
        color: $gray-500;
        text-align: left;
        margin: 30px 0;
        padding: 10px;
    }

    .nested-element {
        color: $gray-400;
        padding: 10px;
    }
}

.highlight-title {
    font-size: 1.2em;
    color: $primary;
}

.list-enter-active, .list-leave-active {
    transition: all 0.5s;
}
.list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.not-text { 
    font-size: 22px; 
    margin: 40px 40px 300px 4px;
}
</style>