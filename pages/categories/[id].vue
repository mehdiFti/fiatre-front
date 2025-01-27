<template>
  <!-- <div>
        <h1 dir="ltr" class="text-end" style="white-space: pre-wrap;">{{ category }}</h1>
        <ul>
            <li v-for="item in items" :key="item.id">
                {{ item.name }}
            </li>
        </ul>
    </div> -->
  <!-- {{ categories }} -->

  <div :class="{ 'container': isLargeScreen, 'mobile-container': !isLargeScreen }">
    <h3 class="cat-title">{{ getCategoryName }}</h3>
    <hr>
    <CategoryParent :status="getCategoriesRequest.status.value" :categories="categories" linkType="episodes" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useWindowSize } from '@vueuse/core';
import CategoryParent from '~/components/pages/categories/CategoryParent.vue';

const isLargeScreen = ref(true)
const { width } = useWindowSize()

watch(width, (newWidth) => {
  isLargeScreen.value = newWidth > 550
}, { immediate: true })

const route = useRoute();
const id = route.params.id;

// Get all categories first
const allCategoriesRequest = await useApiFetch(`/api/categories/with-episodes/`, {});

// Get episodes for specific category
const getCategoriesRequest = await useApiFetch<Record<string, string>>(`/api/episodes/category/${id}/`, {});

// Add this computed property to get the category name from all categories
const getCategoryName = computed(() => {
  if (allCategoriesRequest.status.value === 'success') {
    const category = allCategoriesRequest.data.value.find(cat => cat.slug === id);
    return category ? category.name : '';
  }
  return '';
});

const categories = computed(() => {
  if (getCategoriesRequest.status.value === 'success') {
    return getCategoriesRequest.data.value.data.map((item) => {
      return { ...item, name: item.title }
    });
  }

  return []
})

const items = ref<{ id: number; name: string }[]>([]);

// Add these computed properties for SEO
const title = computed(() => `${getCategoryName.value} | فیاتر`);
const description = computed(() => `مروری بر دسته بندی ${getCategoryName.value} و اطلاعات مربوط به هر دسته.`);
const keywords = 'فیلم, دسته بندی, سینما';

useSeoMeta({
  title: title.value,
  description: description.value,
  keywords: keywords,
  // Open Graph
  ogTitle: title.value,
  ogDescription: description.value,
  ogType: 'website',
  ogUrl: `https://fiatre.ir/category/${id}`,
  ogImage: 'https://fiatre.ir/og-image-category.jpg',
  robots: 'index, follow',
});
</script>

<style lang="scss" scoped>
.cat-title {
  padding-left: 10px;
  font-size: 1.5rem;
  color: $black ;
  font-weight: bold;
  margin: 20px 0px;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 550px) {
    font-size: 1rem;
  }
}


</style>
