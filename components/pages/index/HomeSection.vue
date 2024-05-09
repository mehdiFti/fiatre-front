<template>
  <div class="container">
    <div class="content-section">
      <div class="title" >
        آموزش بازیگری تئاتر
      </div>
      <div class="description" >
        با برترین اساتید بازیگری تبدیل به بازیگر ایده عالی خود شوید
      </div>
      <div class="see-more"   >
        <button class="btn btn-primary btn-lg"> مشاهده بیشتر </button>
      </div >
    </div>
    <div class="images-section">
      <div v-for="(image, index) in images" :key="index" class="image-card">
        <img :src="image.url" alt="Image">
        <!-- You can add more content or styling for each image card here -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const images = ref([
  {   url: 'path_to_image_1.jpg' },
  { url: 'path_to_image_2.jpg' },
  { url: 'path_to_image_3.jpg' },
  { url: 'path_to_image_4.jpg' }
]);
</script>

<style lang="scss">
@import "assets/scss/pages/index/home-section";

</style>
