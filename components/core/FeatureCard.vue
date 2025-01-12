<template>
  <div class="movie-card">
    <NuxtLink :to="link">
      <div class="movie-card-image-container">
        <img :src="img" class="movie-card-image" alt="movie poster" />
        <h3 class="movie-card-title">{{ title }}</h3>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps({
  link: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.movie-card {
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease-in-out;
  border-radius: 8px;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
  }

  .movie-card-image-container {
    width: 100%;
    overflow: hidden;
  }

  .movie-card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px 8px 0  0 ;
  }

  .movie-card-title {
    padding: 2px 2px;
    margin: 0;
    background:$milky ;
    color: $black;
    font-size: 0.8rem;
    white-space: nowrap;
    width: 100%;
    text-align: center;
    line-height: 1.4;
    max-height: 60px; // Allows for 2-3 lines of text
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

@media (max-width: 768px) {
  .movie-card {
    .movie-card-title {
      font-size: 0.7rem;
    }
  }
}

@media (max-width: 480px) {
  .movie-card {
    .movie-card-title {
      font-size: 0.685rem;
      max-height: 50px;
    }
  }
}

</style>
