<template>
    <div v-if="getSearchedEpisodes.status.value === 'success'">
        {{ getSearchedEpisodes.data.value }}
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
}))

const getSearchedEpisodes = useApiFetch('/api/episodes', {
    query: getSearchedEpisodesQuery,
});

</script>

