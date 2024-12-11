<template>
    <div class="container">
      <div class="desc-wrapper">
        <div class="desc-description" v-html="bDescription.bio" v-once />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">

  
  const props = defineProps<{
    bDescription: {
      bio: string;
    };
  }>();
  </script>
  
  <style lang="scss">
  
  .desc-wrapper {
    padding:  20px 10px;
    background: $white;
    direction: ltr;
  
    > .desc-static {
      font-size: 18px;
      font-weight: bold;
      color: $dark;
    }
  
    > hr {
      width: 40%;
      color: $dark;
      padding-bottom: 10px;
    }
  
    > .desc-title {
      font-size: 20px;
      font-weight: bold;
      color: $primary;
    }
  
    > .desc-description {
      font-size: 16px;
      line-height: 2.6;
      white-space: pre-wrap;
      margin-bottom: 10px;
    }
  
    > .desc-secondary-title {
      font-size: 18px;
      font-weight: bold;
      color: $primary;
      padding-top: 10px;
    }
  }
  </style>
