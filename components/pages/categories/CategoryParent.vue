<template>
  <div class="container mt-5 mb-5">
    <div class="category-wrapper">
      <div 
        v-for="item in categories" 
        :key="item.id"
        class="category-card category-item-containers"
      >
        <div class="category-item">
          <NuxtLink :to="linkPath + item.slug">
            <img class="category-img" :src="getImageUrl(item.image)" />
          </NuxtLink>
          <div class="category-text">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.category-card {
  flex: 1 1 calc(25% - 10px);
  max-width: calc(25% - 10px);
  box-sizing: border-box;
}

.category-item-containers {
  display: flex;
  justify-content: center;
  padding-bottom: 10px
}

.category-item {
  width: 100%;
  max-width: 250px;
  aspect-ratio: 3/2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, #f9f9f9, #e0e0e0);
  cursor: pointer;
  transition: transform 0.3s;
}

.category-item:hover {
  transform: scale(1.05);
}

.category-img {

  width: 100%; 
  height: auto; 
  object-fit: cover; 
  border-radius: 10px 10px 0 0;
  transition: transform 0.3s;
}

.category-text {
  font-size: 0.9rem;
  margin-top: 5px;
  text-align: center;
  font-weight: 500;
  word-wrap: break-word;
  color: #333;
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
