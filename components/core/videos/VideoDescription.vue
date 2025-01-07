<template>
  <div class="container">
    <div class="video-desc-wrapper">

      <div class="video-description" v-html="vDescription.description" v-once />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  vDescription: {
    description: string;
  };
}>();
</script>

<style lang="scss">
.video-desc-wrapper {
  border-radius: 10px;
  padding: 20px 40px;
  background: $milky;
  text-align: right;

  >.video-desc-static {
    font-size: 18px;
    font-weight: bold;
    color: $dark;
  }

  >hr {
    width: 40%;
    color: $dark;
    padding-bottom: 10px;
  }

  >.video-title {
    padding-top: 10px;
    font-size: 20px;
    font-weight: bold;
    color: $primary;
  }

  >.video-description {
    font-size: 16px;
    line-height: 2.6;
    white-space: pre-wrap;
    margin-bottom: 10px;
  }

  >.video-secondary-title {
    font-size: 18px;
    font-weight: bold;
    color: $primary;
    padding-top: 10px;
  }
}

@media (max-width: 490px) {


  .video-description {

    font-size: 12px !important;
    // line-height: 2;
    white-space: wrap;
    overflow-wrap: break-word;
    margin-bottom: 10px;
  }
}
</style>
