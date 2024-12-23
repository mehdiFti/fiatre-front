<template>
    <div>
        <ClientOnly>
            <div v-if="getSearchedEpisodes.status.value === 'success'" class="container search-results">
                <div v-if="getSearchedEpisodes.data.value?.results?.length" class="container cards-grid">
                    <div v-for="episode in getSearchedEpisodes.data.value?.results" 
                         :key="episode.id" 
                         class="search-card">
                        <NuxtLink :to="`/episodes/${episode.slug}`" class="card-link">
                            <div class="image-wrapper">
                                <img :src="episode.image" :alt="episode.title" class="card-image" />
                                <div class="overlay">
                                    <h3 class="card-title">{{ episode.title }}</h3>
                                    <div class="card-details">
                                        <span v-if="episode.time" class="duration">{{ episode.time }} دقیقه</span>
                                        <span v-if="episode.construction_year" class="year">{{ episode.construction_year }}</span>
                                    </div>
                                </div>
                            </div>
                        </NuxtLink>
                    </div>
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
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px;
}

.search-card {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    background: #1a1a1a;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);    

    }
}

.card-link {
    text-decoration: none;
    color: inherit;
}

.image-wrapper {
    position: relative;
    width: 100%;
    padding-top: 150%; // 2:3 aspect ratio
}

.card-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.9) 0%,
        rgba(0, 0, 0, 0.7) 50%,
        transparent 100%
    );
    padding: 20px 10px 10px;
    opacity: 0.9;
    transition: opacity 0.3s ease;
}

.card-title {
    color: white;
    margin: 0;
    font-size: 0.9rem;
    font-weight: 500;
    text-align: center;
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4;
}

.card-details {
    display: flex;
    justify-content: center;
    gap: 10px;
    font-size: 0.8rem;
    color: #cccccc;

    .duration, .year {
        background: rgba(0, 0, 0, 0.5);
        padding: 2px 8px;
        border-radius: 12px;
    }
}

.loading, .error {
    padding: 20px;
    text-align: center;
}

.no-results {
    padding: 20px;
    font-size: 1.2rem;
    text-align: center;
    color: $dark;
}

@media (max-width: 768px) {
    .cards-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 15px;
    }

    .card-title {
        font-size: 0.85rem;
    }

    .card-details {
        font-size: 0.75rem;
    }
}

@media (max-width: 480px) {
    .cards-grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 10px;
    }

    .overlay {
        padding: 15px 8px 8px;
    }

    .card-title {
        font-size: 0.8rem;
        -webkit-line-clamp: 1;
        margin-bottom: 5px;
    }

    .card-details {
        font-size: 0.7rem;
        gap: 6px;
    }
}
</style>

