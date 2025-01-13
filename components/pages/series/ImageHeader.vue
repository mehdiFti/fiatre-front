<template>
  <div class="container">
    <div class="image-header-wrapper">
      <NuxtImg class="image-header" :src="image.src" :alt="image.alt" />

      <div class="image-title">
        {{ image.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const image = {
  src: 'https://www.fiatre.ir/uploads/episodes/images/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A2%D9%84-%D9%BE%D8%A7%DA%86%DB%8C%D9%86%D9%88/1672820616.289091-NNpbcZz8MQWc-1668591177.28411_bZPcU1r.jpg',
  alt: 'تصویر دوره بازیگری الپاچینو',
  title: 'دوره بازیگری آل پاچینو',
};
</script>

<style lang="scss">
.image-header-wrapper {
  border-radius: 5px;
  position: relative;
  background: red;

  > .image-header {
    border-radius: 5px;
    object-fit: cover;
    width: 100%;
    height: 500px;
    position: relative;
    left: 0;
    bottom: 0;
  }

  > .image-title {
    background: rgba(0,0,0,0.5);
    border-radius: 5px;
    width: auto;
    position: absolute;
    color: $white;
    bottom: 10px;
    left: 10px;
    font-size: 24px;
  }

}
</style>


