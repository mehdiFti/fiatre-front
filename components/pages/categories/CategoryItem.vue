<template>
  <div class="category-item-containers">
    <div class="category-item">
      <NuxtLink :to="`/categories/${link}`">
        <img class="category-img" :src="src" />
      </NuxtLink>
      <div class="category-text">
        {{ name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  link: { 
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">

.category-item-containers {
  display: flex;
  justify-content: center;
}

.category-item {
  width: 100%;
  max-width: 300px;
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
  border-radius: 10px;
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
</style>
