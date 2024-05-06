<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li
        v-for="item in items"
        :key="item.title"
        class="breadcrumb-item"
      >
        <NuxtLink :to="item.link">
          {{ item.title }}
        </NuxtLink>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
type PropsDefinition = {
  items: Array<{
    link: string,
    title: string,
  }>
}

defineProps<PropsDefinition>();
</script>

<style lang="scss">
@import "assets/scss/components/core/bootstrap/breadcrumb";
</style>
