<template>
  <div class="container">
    <h3 class="cat-title"> دسته‌بندی‌ها </h3>
    <hr>
    <div v-if="getCategoriesRequest.status.value === 'error'">{{ getCategoriesRequest.error.value }}</div>
    <div class="categories-container" v-else>
      <LoadingScreen v-if="getCategoriesRequest.status.value === 'loading'" />
      <div v-else class="categories-grid">
        <NuxtLink v-for="category in categories" :key="category.id" :to="`/categories/${category.slug}`"
          class="category-card">
          <div class="card-content">
            <img :src="`https://fiatre.ir/${category.image}`" :alt="category.name" class="category-image" />
            <p class="category-name">{{ category.name }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'دسته بندی فیلم‌ها | فیاتر',
  description: 'مروری بر دسته بندی فیلم ها و اطلاعات مربوط به هر دسته.',
  keywords: 'فیلم, دسته بندی, سینما',
  ogTitle: 'فیاتر - دسته بندی فیلم‌ها',
  ogDescription: 'مروری بر دسته بندی فیلم ها و اطلاعات مربوط به هر دسته.',
  ogType: 'website',
  ogUrl: 'https://fiatre.ir/category',
  ogImage: 'https://fiatre.ir/og-image-category.jpg',
  robots: 'index, follow',
});





const getCategoriesRequest = await useApiFetch(`/api/categories/with-episodes/`, {
});

const categories = computed(() => {
  if (getCategoriesRequest.status.value === 'success') {
    return getCategoriesRequest.data.value;
  }

  return []
})
</script>

<style lang="scss" scoped>
.cat-title {
  font-size: 1.5rem;
  color: $black ;
  font-weight: bold;
  margin: 20px 0px;

}


// .categories-container {
// padding: 50px 0 0 20px ;
// }

.categories-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  /* Ensures spacing between cards */
  gap: 20px;
  /* Adds spacing between rows */
}

.category-card {
  flex: 1 1 calc(25% - 20px);
  /* Default: 3 cards per row */
  max-width: calc(25% - 20px);
  /* Prevents cards from exceeding row width */
  box-sizing: border-box;
  /* Ensures padding doesn't break the layout */
}

@media (max-width: 992px) {
  .category-card {
    flex: 1 1 calc(33.33% - 20px);
    /* 2 cards per row */
    max-width: calc(33.33% - 20px);
    /* Prevents cards from exceeding row width */
  }

  .category-image {
    height: 175px !important;

  }

  @media (max-width: 768px) {
    .category-card {
      flex: 1 1 calc(50% - 20px);
      /* 2 cards per row */
      max-width: calc(50% - 20px);
      /* Prevents cards from exceeding row width */
    }

    .category-image {
      height: 110px !important;

    }
  }
}

@media (max-width: 577px) {
  .category-card {
    flex: 1 1 calc(50% - 20px);
    /* 2 cards per row */
    max-width: calc(50% - 20px);
    /* Prevents cards from exceeding row width */
  }

  @media (max-width: 577px) {
    .category-card {
      flex: 1 1 calc(50% - 20px);
      /* 2 cards per row */
      max-width: calc(50% - 20px);
      /* Prevents cards from exceeding row width */
    }

    .category-name {

      font-size: 0.8rem !important;
    }

    .category-image {
      height: 100px !important;

    }

  }


}

.card-content {
  background: white;
  color: $black;
  border-radius: 0 0 8px 8px;
  overflow: hidden;

}

.category-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.category-name {
  background: $milky;
  padding: 2px 0;
  margin: 0;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cat-title {
  font-size: 1.5rem; // Original size
  @media (max-width: 768px) {
    font-size: 1.25rem; // Smaller size for medium screens
  }
  @media (max-width: 550px) {
    font-size: 1rem; // Smaller size for small screens
  }
}
</style>
