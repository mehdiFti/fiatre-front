<template>
  <div class="container mt-5 mb-5">
    <div class="category-wrapper">
      <CategoryItem
        v-for="item in categories"
        :key="item.id"
        :src="getImageUrl(item.image)"
        :name="item.name"
        :link="item.slug"
        class="category-card"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryItem from '~/components/pages/categories/CategoryItem.vue';

const props = defineProps<{
  categories: Array<{
    id: number;
    name: string;
    image: string;
    slug: string;
    description: string;
  }>;
}>();

// Define the base URL for the image
const baseUrl = 'https://www.fiatre.ir';

// Function to get the full image URL
const getImageUrl = (imagePath: string) => {
  return baseUrl + imagePath;
};
</script>

<style lang="scss" scoped>
.category-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.category-card {
  flex: 1 1 calc(33.33% - 20px);
  max-width: calc(33.33% - 20px);
  box-sizing: border-box;
}

@media (max-width: 991px) {
  .category-card {
    flex: 1 1 calc(50% - 20px);
    max-width: calc(50% - 20px);
  }
}

@media (max-width: 576px) {
  .category-card {
    flex: 1 1 calc(50% - 20px); 
    max-width: calc(50% - 20px);
  }
}
</style>
