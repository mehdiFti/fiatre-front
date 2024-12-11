<template>
  <div class="container mb-5 mt-5">
    <HomeSeprator class="mb-3" title="اخبار فیاتر" />

    <div class="blog__wrapper">
      <BlogItem
        v-for="(item, index) in filteredBlogItems"
        v-show="!isMediumScreen || !isMediumLargeScreen || index < 3"
        :key="item.key"
        :image-src="item.imageSrc"
        :title="item.title"
        :description="item.description"
        :timestamp="item.timestamp"
      />
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import {timestamp, useMediaQuery} from '@vueuse/core';
import BlogItem from '~/components/core/BlogItem.vue';
import HomeSeprator from './HomeSeprator.vue';

const getBlogersRequest = await useApiFetch('/api/blogs/', {
  baseURL: 'https://www.fiatre.ir/',
}).catch((error) => {
  console.error('Error fetching blogs:', error); // Log errors for debugging
});

const blogItems = computed(() => {
  if (getBlogersRequest?.status.value === 'success') {
    return getBlogersRequest.data.value.results.map((apiData) => ({
      id: apiData.id,
      link: apiData.link,
      title: apiData.title,
      imageSrc: apiData.image,
      description: apiData.text,
      timestamp: apiData.updated_at,
    }));
  }
  return [];
});

const isMediumScreen = useMediaQuery('(max-width: 979px) and (min-width: 768px)');
const isMediumLargeScreen = useMediaQuery('(max-width: 1024px) and (min-width: 980px)');

const filteredBlogItems = computed(() => {
  return blogItems.value.slice(-4);
});
</script>

<style scoped lang="scss">
.blog__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

@media (min-width: 1025px) {
  .blog__wrapper > * {
    flex: 0 0 calc(25% - 20px);
  }
}

@media (max-width: 1024px) and (min-width: 980px) {
  .blog__wrapper > * {
    flex: 0 0 calc(33.33% - 20px);
  }
}

@media (max-width: 979px) and (min-width: 768px) {
  .blog__wrapper > * {
    flex: 0 0 calc(33.33% - 20px);
  }
}

@media (max-width: 768px) {
  .blog__wrapper > * {
    flex: 0 0 calc(50% - 20px);
  }
}

@media (max-width: 503px) {
  .blog__wrapper > * {
    flex: 0 0 100%;
  }
}
</style>
