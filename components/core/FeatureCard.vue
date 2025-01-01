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
  position: relative;
  transition: transform 0.25s ease-in-out;
  border-radius: 8px;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
  }

  .movie-card-image-container {
    position: relative;
    width: 100%;
    padding-top: 150%; // 2:3 aspect ratio for movie posters
    overflow: hidden;
  }

  .movie-card-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  .movie-card-title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 8px;
    margin: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9), transparent);
    color: white;
    font-size: 0.9rem;
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
      font-size: 0.8rem;
      padding: 6px;
    }
  }
}

@media (max-width: 480px) {
  .movie-card {
    .movie-card-title {
      font-size: 0.75rem;
      padding: 4px;
      max-height: 50px;
    }
  }
}
</style>
