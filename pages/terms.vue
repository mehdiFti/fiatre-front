<template>
    <main class="container mb-5">
  <article class="terms-wrapper">
    <h1 class="terms-heading">قوانین و مقررات</h1>
    <div v-if="isLoading" class="debug-info">
      Loading terms...
    </div>
    <div v-else-if="!terms" class="debug-info">
      No terms found
    </div>
    <p v-else class="terms" v-html="terms"></p>
  </article>
 </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'قوانین و مقررات',
  description: 'This is the terms and conditions page of FIATRE.',
  keywords: 'terms, conditions, FIATRE, قوانین, مقررات',
  ogTitle: 'قوانین و مقررات',
  ogDescription: 'This is the terms and conditions page of FIATRE.',
  ogType: 'website',
  ogUrl: 'https://fiatre.ir/terms',
  ogImage: 'https://fiatre.ir/og-image.jpg',
  robots: 'index, follow'
});

const { data: settings, pending } = await useApiFetch('/api/settings/', {
  query: {
    offset: 10,
  }
});

const terms = computed(() => {
  const termsItem = settings.value?.results?.find(item => item?.key === 'terms_text');
  return termsItem?.value || '';
});

const isLoading = computed(() => pending.value);

</script>

<style scoped lang="scss">
.container {
  .terms-wrapper {
    z-index: 1000;
    margin: 0 auto;
    padding: 20px;
    background-color: $white;
  }

  .terms-heading {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: left;
    color: $third;
  }

  .terms {
    font-size: 16px;
    line-height: 2.2;
    text-align: justify;
    color: $dark;
  }

  .loading-state,
  .error-state,
  .empty-state {
    text-align: center;
    padding: 2rem;
    color: $dark;
  }

  .error-state {
    color: red;
  }

  .faqs {
    margin-top: 2rem;
    font-size: 16px;
    line-height: 2.2;
    text-align: justify;
    color: $dark;
  }
}
</style>
