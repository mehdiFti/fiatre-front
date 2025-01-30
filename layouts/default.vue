<template>
  <div class="color">

    <main class="main-layout">
      <Header />
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
      { name: 'description', content: 'فیاتر مرجع تیاتر، آموزش بازیگری و هنر برای علاقه مندان به نمایش نامه، فیلم کوتاه، اخبار و فیلم تیاتر' },
      { name: 'theme-color', content: '#FE0000' },
      { name: 'msapplication-TileColor', content: '#FE0000' },
      { name: 'msapplication-TileImage', content: '/favicon.ico' },
      { name: 'msapplication-config', content: '/browserconfig.xml' },
      { name: 'theme-color', content: '#FE0000' },
      { name: 'msapplication-TileColor', content: '#FE0000' },
      { name: 'msapplication-TileImage', content: '/favicon.ico' },
      { name: 'msapplication-config', content: '/browserconfig.xml' },
    ]
  }
});

useHead(head);
</script>

<style lang="scss">
@import "/assets/scss/common/app";
@import "/assets/scss/layout/default";
</style>
