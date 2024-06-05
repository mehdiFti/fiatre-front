<template>
  <div class="movie-card">
    <NuxtLink :to="link" class="movie-card-link">
      <div class="movie-card-image-container">
        <NuxtImg :src="img" class="movie-card-image" />
      </div>

      <p class="movie-card-title"> {{ title }} </p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">

defineProps({
  link: {
    type:String,
    required: true,
  },
  img: {
    type:String,
    required:true,
  },
  title: {
    type:String,
    required:true,
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
    transform: scale(1.1);
  }

  .movie-card-title {
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: -16px;
    font-size: 0.8rem;
    color: $light;
    border-radius: 0 0 5px 5px;
    overflow: hidden;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.24);
    background-color: rgba(black, 0.75);
  }

  .movie-card-image {
    position: relative;
    width: 100%;
    object-fit: cover;
    border-radius: 5px;
    overflow: hidden;
  }
}


</style>
