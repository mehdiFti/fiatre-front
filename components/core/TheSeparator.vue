<template>
  <div class="container">
  <div class=" title-static">
    {{ props.title }}
    <hr class="simple-hr">
  </div>
</div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>

.title-static {
  padding-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: $dark;
  text-align: left;

  > .simple-hr {
    width: 100%;
    color: $dark;
    text-align: right;
  }
}
</style>