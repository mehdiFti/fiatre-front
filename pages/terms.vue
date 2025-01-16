<template>
  <main class="container mb-5">
    <article class="terms-wrapper">
      <h2 class="terms-heading">قوانین و مقررات</h2>
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
  title: 'قوانین و مقررات | فیاتر',
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
    padding: 20px 30px;
    background-color: $milky;
  }

  .terms-heading {
    font-size: 24px;
    text-align: left;
    color: $third;
    font-weight: bold;

    @media (max-width: 768px) {
      font-size: 20px;
    }

    @media (max-width: 550px) {
      font-size: 18px;
    }
  }

  .terms {
    font-size: 16px;
    line-height: 2.2;
    text-align: justify;
    color: $black;
  }

  .loading-state,
  .error-state,
  .empty-state {
    text-align: center;
    padding: 2rem;
    color: $black;
  }

  .error-state {
    color: red;
  }

  .faqs {
    margin-top: 2rem;
    font-size: 16px;
    line-height: 2.2;
    text-align: justify;
    color: $black;
  }
}
</style>
