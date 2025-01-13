<template>
  <div class="container">
    <div class="image-header-wrapper">
      <img :src="imageHeader.image" :alt="imageHeader.title" class="image-header" v-if="imageHeader.image" />

      <div class="image-title">
        {{ imageHeader.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  imageHeader: {
    type: Object,
    required: true
  }
});
</script>

<style lang="scss">
@media (max-width: 468px) {
  .image-title {
    font-size: 16px !important;
    padding: 0 5px;
  }
}

.image-header-wrapper {
  border-radius: 5px;
  position: relative;

  >.image-header {
    border-radius: 5px;
    object-fit: cover;
    width: 100%;
    height: 540px;
    position: relative;
    left: 0;
    bottom: 0;
  }

  >.image-title {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    width: auto;
    padding: 0 5px;
    position: absolute;
    color: $white;
    bottom: 10px;
    left: 10px;
    font-size: 24px;
  }


}
</style>
