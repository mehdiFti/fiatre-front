<template>
  <div class="background-container">
    <div class="container-wr">
      <div class="content-section">
        <div class="title">
          آموزش بازیگری تئاتر
        </div>

        <div class="description">
          با برترین اساتید بازیگری تبدیل به بازیگر ایده عالی خود شوید
        </div>

        <div class="see-more">
          <button class="btn btn-primary btn-lg"> مشاهده بیشتر </button>
        </div>
      </div>

      <div class="card-section">
        <div v-for="card in cards" :key="card.img" class="card">
          <HomeSectionCard :link="card.link" :img="card.img" :title="card.title" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeSectionCard from '~/components/pages/index/HomeSectionCard.vue';

const cards = [
  {
    title: 'دوره بازیگری کیت بلانشت',
    img: 'https://www.fiatre.ir/uploads/episodes/images/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%DA%A9%DB%8C%D8%AA-%D8%A8%D9%84%D8%A7%D9%86%D8%B4%D8%AA/1700843738.0070274-J4vNsOz2N2dM-inside_the_act_LPsGz1o.jpg',
    // description: 'اطلاعات دوره کیت بلانشت',
    alt: 'تصویری از کیت بلانشت',
    link: 'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%DA%A9%DB%8C%D8%AA-%D8%A8%D9%84%D8%A7%D9%86%D8%B4%D8%AA/',
  },
  {
    title: 'دوره بازیگری اسکارلت جوهانسون',
    img: 'https://www.fiatre.ir/uploads/episodes/images/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/1672820452.7050824-MZywUj2UI0Lm-16685944_3HKC0pK.jpg',
    // description: 'اطلاعات دوره خانم اسکارلت',
    alt: 'تصویری از اسکارلت',
    link:'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/',
  },
  {
    title: 'دوره بازیگری کیت بلانشت',
    img: 'https://www.fiatre.ir/uploads/episodes/images/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%DA%A9%DB%8C%D8%AA-%D8%A8%D9%84%D8%A7%D9%86%D8%B4%D8%AA/1700843738.0070274-J4vNsOz2N2dM-inside_the_act_LPsGz1o.jpg',
    // description: 'اطلاعات دوره کیت بلانشت',
    alt: 'تصویری از کیت بلانشت',
    link: 'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%DA%A9%DB%8C%D8%AA-%D8%A8%D9%84%D8%A7%D9%86%D8%B4%D8%AA/',
  },
  {
    title: 'دوره بازیگری اسکارلت جوهانسون',
    img: 'https://www.fiatre.ir/uploads/episodes/images/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/1672820452.7050824-MZywUj2UI0Lm-16685944_3HKC0pK.jpg',
    // description: 'اطلاعات دوره خانم اسکارلت',
    alt: 'تصویری از اسکارلت',
    link:'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/',
  },
  {
    title: 'دوره بازیگری کیت بلانشت',
    img: 'https://www.fiatre.ir/uploads/episodes/images/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%DA%A9%DB%8C%D8%AA-%D8%A8%D9%84%D8%A7%D9%86%D8%B4%D8%AA/1700843738.0070274-J4vNsOz2N2dM-inside_the_act_LPsGz1o.jpg',
    // description: 'اطلاعات دوره کیت بلانشت',
    alt: 'تصویری از کیت بلانشت',
    link: 'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%DA%A9%DB%8C%D8%AA-%D8%A8%D9%84%D8%A7%D9%86%D8%B4%D8%AA/',
  },
  {
    title: 'دوره بازیگری اسکارلت جوهانسون',
    img: 'https://www.fiatre.ir/uploads/episodes/images/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/1672820452.7050824-MZywUj2UI0Lm-16685944_3HKC0pK.jpg',
    // description: 'اطلاعات دوره خانم اسکارلت',
    alt: 'تصویری از اسکارلت',
    link:'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/',
  },
];
</script>

<style lang="scss">
@import "assets/scss/pages/index/second-home-section";
</style>


