<template>
  <i
    :class="{
      [`jj-icon-${icon}`]: true,
    }"
  />
</template>

<script setup lang="ts">
type PropsDefinition = {
  icon: string,
}

defineProps<PropsDefinition>();
</script>

<style lang="scss">
@import "/assets/scss/components/core/icons/jj-icons";
</style>
