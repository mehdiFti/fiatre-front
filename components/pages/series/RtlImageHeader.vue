<template>
    <div class="container">
      <div class="rtl-image-header-wrapper">
        <img class="rtl-image-header" :src="imageHeader.src" />
  
        <h1 class="rtl-image-title">
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
  .rtl-image-header-wrapper {
    border-radius: 5px;
    position: relative;
    margin-right: auto;
  
    > .rtl-image-header {
      border-radius: 5px;
      object-fit: cover;
      width: 100%;
      height: 600px;
      position: relative;
      left: 0;
      bottom: 0;
    }
  
    > .rtl-image-title {
      background: rgba(0,0,0,0.5);
      border-radius: 5px;
      width: auto;
      position: absolute;
      color: $white;
      bottom: 10px;
      right: 10px;    
      left: auto;    
      font-size: 24px;
      direction: rtl; 
    }
  
  }
  </style>

