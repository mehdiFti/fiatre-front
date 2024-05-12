<template>
  <div
    class="movie-section-container"
    :style="{ backgroundImage: 'url(' + backgroundImage + ')'}"
  >
    <div
      class="
    container
    content-section"
    >
      <div class="motto title">
        آموزش بازیگری تئاتر
      </div>

      <div class="motto-description">
        با برترین اساتید بازیگری تبدیل به بازیگر ایده عالی خود شوید
      </div>

      <div class="see-more">
        <button class="btn btn-primary btn-lg"> مشاهده بیشتر </button>
      </div>
    </div>

    <div class="card-section">
      <div v-for="card in cards" :key="card.id" class="card">
        <HomeSectionCard
          :link="card.link"
          :img="card.img"
          :title="card.title"
          :description="card.description"
        />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import HomeSectionCard from '~/components/pages/index/HomeSectionCard.vue';
const backgroundImage = 'https://images.hdqwalls.com/download/2024-fly-me-to-the-moon-4k-og-1920x1080.jpg';
const cards
    = [
      {
        title: 'فریم ریت چیست',
        img: 'https://www.fiatre.ir/uploads/episodes/images/%D9%86%D9%85%D8%A7%D9%87%D8%A7%DB%8C-%D8%AF%D9%88%D8%B1%D8%A8%DB%8C%D9%86/1672854921.237678-TEgjxZO2F46q-1668613342.371346-GpMdhAwTb_BTpAJ45.jpg',
        description: 'اطلاعات دوره کیت بلانشت',
        alt: 'تصویری از کیت بلانشت',
        id:1,
        link: 'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%DA%A9%DB%8C%D8%AA-%D8%A8%D9%84%D8%A7%D9%86%D8%B4%D8%AA/',
      },
      {
        title: 'پایه دوربین',
        img: 'https://www.fiatre.ir/uploads/episodes/images/%DA%A9%D8%AA%D8%A7%D8%A8-%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C-%D8%AA%D9%84%D9%88%DB%8C%D8%B2%DB%8C%D9%88%D9%86/1672835076.1079004-oEJwenMTr0vH-1668414199.2245386_SgBCl3B.jpg',
        description: 'اطلاعات دوره خانم اسکارلت',
        alt: 'تصویری از اسکارلت',
        id:2,
        link:'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/',
      },
      {
        title: 'جلوه بصری',
        img: 'https://www.fiatre.ir/uploads/episodes/images/%D8%AC%D9%84%D9%88%D9%87-%D9%87%D8%A7%DB%8C-%D8%A8%D8%B5%D8%B1%DB%8C-%D9%81%DB%8C%D9%84%D9%85-%D8%AA%D9%84%D9%82%DB%8C%D9%86/1672839346.3534787-UYjCa32QxKpv-1668425281.3925_AGvjBmI.jpg',
        description: 'اطلاعات دوره کیت بلانشت',
        alt: 'تصویری از کیت بلانشت',
        id:3,
        link: 'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%DA%A9%DB%8C%D8%AA-%D8%A8%D9%84%D8%A7%D9%86%D8%B4%D8%AA/',
      },
      {
        title: 'لنز دوربین',
        img: 'https://www.fiatre.ir/uploads/episodes/images/%D9%84%D9%86%D8%B2-%D8%AF%D9%88%D8%B1%D8%A8%DB%8C%D9%86/1672854715.674316-oQQ4UJ9xrat3-1668628588.4868019-Auv4O0kMhkk_DRe5rr3.jpg',
        description: 'اطلاعات دوره خانم اسکارلت',
        alt: 'تصویری از اسکارلت',
        id:4,
        link:'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/',
      },
      {
        title: 'دوره بازیگری کیت بلانشت',
        img: 'https://www.fiatre.ir/uploads/episodes/images/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%DA%A9%DB%8C%D8%AA-%D8%A8%D9%84%D8%A7%D9%86%D8%B4%D8%AA/1700843738.0070274-J4vNsOz2N2dM-inside_the_act_LPsGz1o.jpg',
        description: 'اطلاعات دوره کیت بلانشت',
        alt: 'تصویری از کیت بلانشت',
        id:3,
        link: 'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%DA%A9%DB%8C%D8%AA-%D8%A8%D9%84%D8%A7%D9%86%D8%B4%D8%AA/',
      },
      {
        title: 'دوره بازیگری اسکارلت جوهانسون',
        img: 'https://www.fiatre.ir/uploads/episodes/images/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/1672820452.7050824-MZywUj2UI0Lm-16685944_3HKC0pK.jpg',
        description: 'اطلاعات دوره خانم اسکارلت',
        alt: 'تصویری از اسکارلت',
        id:4,
        link:'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/',
      },
    ];
</script>

<style lang="scss">
@import 'assets/scss/pages/index/home-section';
</style>
