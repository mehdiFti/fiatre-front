<template>
  <div>
    <Header />

    <main>
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import type {MetaObject} from '@nuxt/schema';
import Header from '~/components/core/Header.vue';
import Footer from '~/components/core/Footer.vue';

const head = computed<MetaObject>(() => {
  const bodyClass: string[] = ['peyda'];

  return {
    htmlAttrs: {
      dir: 'rtl',
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
</style>
