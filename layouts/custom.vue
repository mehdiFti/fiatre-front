<template>
  <div class="color">
    <main class="main-layout">
      <slot />
    </main>
    </div>

</template>

<script setup lang="ts">
import type {MetaObject} from '@nuxt/schema';

const head = computed<MetaObject>(() => {
  const bodyClass: string[] = ['peyda'];

  return {
    htmlAttrs: {
      dir: 'ltr',
      lang: 'fa',
    },
    bodyAttrs: {class: bodyClass},
  };
});

useHead(head);
</script>

<style lang="scss">
@import "/assets/scss/common/app";
@import "/assets/scss/layout/default";

.main-layout {
  min-height: 100dvh;
}
</style>
