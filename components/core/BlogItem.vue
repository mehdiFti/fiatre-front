<template>
  <div class="blog_card">
    <NuxtImg
      :src="imageSrc"
      alt="card__image"
      class="card__image"
    />

    <div class="blog-title">
      {{ title }}
    </div>

    <div>
      <hr class="simple-hr">
    </div>


    <div class="blog-description">
      {{ description }}
    </div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue';

defineProps({
  imageSrc: String,
  title: String,
  description: String,
});
</script>

<style lang="scss">
.blog_card {
  padding: 8px;
background: $light;
  border: 1px solid $gray-200;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: calc(100% /5);
  min-height: 500px;
  max-height: 560px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card__image {
  width: 100%;
  border-radius: 5px ;
  height: auto;
  object-fit: cover;
}

.blog-title {
  text-align: center;
  font-weight: bold;
  min-height: 50px;
 max-height: 50px ;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 10px;

}

.simple-hr {
  color: $dark;
text-align: center;

  margin: 0 auto;
  width: 8rem;
}

.blog-description {
  margin-top: 10px;
  color: $gray-500;
}
</style>
