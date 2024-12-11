<template>
  <div class="movie-card">
    <NuxtLink :to="link">
      <div class="movie-card-image-container">
        <img :src="img" class="movie-card-image" />
        <h3 class="movie-card-title"> {{ title }} </h3>
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

<style lang="scss">
.movie-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: transform 0.25s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  .movie-card-title {
    position: absolute;
    width: 100%;
    text-align: center;
    font-size: 0.8rem;
    bottom: -1px;
    color: $light;
    border-radius: 0 0 5px 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.24);
    background-color: rgba(black, 0.75);
  }

  .movie-card-image {
    position: relative;
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 5px;
    overflow: hidden;
  }
}
@media (max-width: 768px) {
  .movie-card {
    flex: 1 1 calc(50% - 10px);

  }
}

@media (max-width: 480px) {
  .movie-card {
    flex: 1 1 calc(33.33% - 10px);

  }
}

@media (max-width: 430px) {
  .movie-card-title {
    font-size: 0.6rem !important;
  }
}
</style>
