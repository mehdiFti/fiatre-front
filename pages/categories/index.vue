<template>
  <div v-if="getCategoriesRequest.status.value === 'error'">{{ getCategoriesRequest.error.value }}</div>

  <CategoryParent v-else :status="getCategoriesRequest.status.value" :categories="categories" class="mb-5" />
</template>

  <script setup lang="ts">
useSeoMeta({
  title: 'دسته بندی فیلم ها',
  description: 'مروری بر دسته بندی فیلم ها و اطلاعات مربوط به هر دسته.',
  keywords: 'فیلم, دسته بندی, سینما',
  ogTitle: 'دسته بندی فیلم ها',
  ogDescription: 'مروری بر دسته بندی فیلم ها و اطلاعات مربوط به هر دسته.',
  ogType: 'website',
  ogUrl: 'https://fiatre.ir/category',
  ogImage: 'https://fiatre.ir/og-image-category.jpg',
  robots: 'index, follow',
});
import CategoryParent from '~/components/pages/categories/CategoryParent.vue'; 


const getCategoriesRequest = await useApiFetch(`/api/categories/with-episodes/`, {
});

const categories = computed(() => {
  if (getCategoriesRequest.status.value === 'success') {
    return getCategoriesRequest.data.value;
  }

  return []
})
</script>
  
  <style lang="scss">
  
  
  </style>
