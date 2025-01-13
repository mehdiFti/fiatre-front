<template>
    <div>
        <ClientOnly>
            <div v-if="getSearchedEpisodes.status.value === 'success'" class="container search-results">
                <div v-if="getSearchedEpisodes.data.value?.results?.length" class="container cards-grid">
                    <FeatureCard v-for="episode in getSearchedEpisodes.data.value?.results" :key="episode.id"
                        :link="`/episodes/${episode.slug}`" :img="episode.image" :title="episode.title" />
                </div>
                <div v-else class="no-results">
                    نتیجه ای یافت نشد
                </div>
            </div>
            <div v-else-if="getSearchedEpisodes.status.value === 'pending'" class="loading">
                در حال جستجو...
            </div>
            <div v-else-if="getSearchedEpisodes.status.value === 'error'" class="error">
                خطا در جستجو
            </div>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import FeatureCard from '~/components/core/FeatureCard.vue';

const route = useRoute();

const searchValue = computed(() => route.query.q);

const page = ref(1);

const getSearchedEpisodesQuery = computed(() => ({
    search: searchValue.value,
    limit: 10,
    page: page.value,
}));

const getSearchedEpisodes = useApiFetch('/api/episodes', {
    query: getSearchedEpisodesQuery,
});

// const title = computed(() => searchValue.value
//     ? `جستجو برای ${searchValue.value} | فیاتر`
//     : 'جستجو در فیاتر'
// );
const title = 'جستجو | فیاتر'
const description = 'جستجوی فیلم‌ها و سریال‌های مورد نظر شما در فیاتر';
const keywords = 'جستجو, فیلم, سریال, تماشای آنلاین, فیاتر';

useSeoMeta({
    title: title,
    description: description,
    keywords: keywords,
    // Open Graph
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogUrl: 'https://fiatre.ir/search',
    ogImage: 'https://fiatre.ir/og-image.jpg',
    // Twitter Card
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: 'https://fiatre.ir/og-image.jpg',
    // Robots - Consider not indexing search results
    robots: 'noindex, follow', // Allow crawling but prevent indexing of search results
});

onMounted(() => {
    if (searchValue.value) {
        getSearchedEpisodes.execute();
    }
});

watch(
    () => route.query.q,
    (newValue) => {
        if (newValue) {
            getSearchedEpisodes.execute();
        }
    },
    { immediate: true }
);
</script>

<style lang="scss" scoped>
.search-results {
    padding: 20px;
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

.no-results {
    padding: 20px;
    font-size: 1.2rem;
    text-align: center;
    color: $dark;
}
</style>
