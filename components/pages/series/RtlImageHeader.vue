<template>
  <div class="container" dir="rtl">
    <div class="rtl-image-header-wrapper" dir="rtl">
      <img class="rtl-image-header" :src="imageHeader.src" />

      <h1 class="rtl-image-title" dir="rtl">
        {{ imageHeader.title }}
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  imageHeader: {
    src: string;
    title: string;
  };
}>();
</script>

<style lang="scss">
@media (max-width: 998px) {
  .rtl-image-title {
    font-size: 20px !important;
    padding: 0 5px;
    text-align: right;
  }
}

@media (max-width: 468px) {
  .rtl-image-title {
    font-size: 16px !important;
    padding: 0 5px;
    text-align: right;
  }
}


.rtl-image-header-wrapper {
  border-radius: 5px;
  position: relative;
  margin-right: auto;

  >.rtl-image-header {
    border-radius: 5px;
    object-fit: cover;
    width: 100%;
    height: 540px;
    position: relative;
    left: 0;
    bottom: 0;
  }

  >.rtl-image-title {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    width: auto;
    position: absolute;
    padding: 0 5px;
    margin-right: 10px;
    color: $white;
    bottom: 10px;
    font-size: 24px;
  }


}


</style>
