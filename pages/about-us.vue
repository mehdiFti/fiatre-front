<template>
  <main class="container mb-5">
    <section class="about-container">
      <h2 class="about-us-heading">درباره فیاتر</h2>
      <article class="about-us">
        <div v-if="isLoading" class="debug-info">
          Loading...
        </div>
        <div v-else-if="!aboutUs" class="debug-info">
          No content found
        </div>
        <p v-else class="about-us" v-html="aboutUs"></p>
      </article>
    </section>
  </main>
</template>

<script setup lang="ts">

useSeoMeta({
  title: 'درباره ما',
  description: 'صفحه درباره ما در سایت فیاتر برای معرفی سرویس پخش آنلاین و اهداف آن.',
  keywords: 'درباره ما, فیاتر, سرویس پخش آنلاین, آموزش هنر, سرگرمی',
  ogTitle: 'درباره ما',
  ogDescription: 'صفحه درباره ما در سایت فیاتر برای معرفی سرویس پخش آنلاین و اهداف آن.',
  ogType: 'website',
  ogUrl: 'https://fiatre.ir/about-us',
  ogImage: 'https://fiatre.ir/og-image.jpg',
  robots: 'index, follow',
});

const { data: settings, pending } = await useApiFetch('/api/settings/', {
  query: {
    offset: 10,
  }
});

const aboutUs = computed(() => {
  const aboutUsItem = settings.value?.results?.find(item => item?.key === 'terms_text');
  return aboutUsItem?.value || '';
});

const isLoading = computed(() => pending.value);


</script>

<style scoped lang="scss">
.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  .about-us-heading {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: left;
    color: $third;
  }

  .about-us {
    font-size: 16px;
    line-height: 2.2;
    text-align: justify;
    color: $dark;
  }
}
</style>
