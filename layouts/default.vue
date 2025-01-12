<template>
  <div class="color">
    <Header />
    <main class="main-layout">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import type { MetaObject } from '@nuxt/schema';
import Header from '~/components/core/Header.vue';
import Footer from '~/components/core/Footer.vue';

const head = computed<MetaObject>(() => {
  const bodyClass: string[] = ['iransans'];

  return {
    htmlAttrs: {
      dir: 'rtl',
      lang: 'fa',
    },
    bodyAttrs: { class: bodyClass },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'فیاتر مرجع تیاتر، آموزش بازیگری و هنر برای علاقه مندان به نمایش نامه، فیلم کوتاه، اخبار و فیلم تیاتر' }
    ]
  }
});

useHead(head);
</script>

<style lang="scss">
@import "/assets/scss/common/app";
@import "/assets/scss/layout/default";

// .main-layout {
//   min-height: 100dvh;
// }
</style>
