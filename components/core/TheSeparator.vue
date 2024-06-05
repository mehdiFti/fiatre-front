<template>
  <div class="title-static">
    {{ title }}
    <hr>
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

<style lang="scss">


.title-static {
  font-size: 18px;
  font-weight: bold;
  color: $dark;

  > hr {
    width: 40%;
    color: $dark;
    padding-bottom: 10px;
  }
}


</style>
