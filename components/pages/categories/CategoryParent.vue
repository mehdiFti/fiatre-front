<template>
  <div class="container mt-4">
    <div class="category-wrapper">
      <FeatureCard v-for="item in categories" :key="item.id" :link="linkPath + item.slug" :img="getImageUrl(item.image)"
        :title="item.name" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Import FeatureCard component
import FeatureCard from '~/components/core/FeatureCard.vue';

const props = defineProps<{
  categories: Array<{
    id: number;
    name: string;
    image: string;
    slug: string;
    description: string;
  }>;
  linkType?: 'categories' | 'episodes';
}>();

// Set the link path based on the linkType prop
const linkPath = computed(() => {
  return `/${props.linkType || 'categories'}/`;
});


const baseUrl = 'https://www.fiatre.ir';

const getImageUrl = (imagePath: string) => {
  return baseUrl + imagePath;
};
</script>

<style lang="scss" scoped>
.category-wrapper {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 0 10px;
}

@media (max-width: 991px) {
  .category-wrapper {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 550px) {
  .category-wrapper {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
}


@media (max-width: 360px) {
  .category-wrapper {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }


}
</style>
