<template>
  <main class="container mb-5">
    <section class="about-container">
      <h2 class="about-us-heading">درباره فیاتر</h2>
      <article class="about-us">
        <div v-if="isLoading" class="debug-info">
          در حال بارگذاری...
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
  title: 'درباره فیاتر',
  description: 'صفحه درباره ما در سایت فیاتر برای معرفی سرویس پخش آنلاین و اهداف آن.',
  keywords: 'درباره ما, فیاتر, سرویس پخش آنلاین, آموزش هنر, سرگرمی',
  ogTitle: 'درباره فیاتر',
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
  const aboutUsItem = settings.value?.results?.find(item => item?.key === 'about_text');
  return aboutUsItem?.value || '';
});

const isLoading = computed(() => pending.value);


</script>

<style scoped lang="scss">
.about-container {
  margin: 0 auto;
  padding: 20px 60px;
  background-color: $milky;
  border-radius: 5px;

  .about-us-heading {
    font-size: 24px;
    text-align: left;
    color: $third;
    font-weight: bold;
    margin-bottom: 20px;
    padding-left: 0px !important;

    @media (max-width: 768px) {
      font-size: 20px;
    }

    @media (max-width: 550px) {
      font-size: 18px;
    }
  }

  .about-us {
    font-size: 16px;
    line-height: 2.2;
    text-align: justify;
    color: $black;
  }
}
</style>
