<template>
  <div
    class="movie-section-container"
    :style="{ backgroundImage: 'url(' + backgroundImage + ')'}"
  >
    <div class="content-section">
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

const backgroundImage = 'https://wallpapers.com/images/hd/joker-poster-37j6jfl9mk1jmozx.jpg';
const cards = [
  {
    title: 'جوکر از نولان تا نسخه',
    img: 'https://www.fiatre.ir/uploads/episodes/images/%D8%AC%D9%88%DA%A9%D8%B1-%D8%A7%D8%B2-%D9%86%D9%88%D9%84%D8%A7%D9%86-%D8%AA%D8%A7-%D9%86%D8%B3%D8%AE%D9%87-%D9%87%D8%A7%DB%8C-%D8%B4%D8%B1%D9%88%D8%B1-%D8%A7%D8%B2-%D8%A8%D8%B1%D8%AA%D9%88%D9%86-%D9%81%DB%8C%D9%84%DB%8C%D9%BE%D8%B3/1672851168.8742936-lvfJ4F_qrJY72z.jpg',
    description: 'اطلاعات دوره کیت بلانشت',
    alt: 'تصویری از کیت بلانشت',
    id:1,
    link: 'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%DA%A9%DB%8C%D8%AA-%D8%A8%D9%84%D8%A7%D9%86%D8%B4%D8%AA/',
  },
  {
    title: 'جنگ ستارگان حرکت دوربین',
    img: 'https://www.fiatre.ir/uploads/episodes/images/%D8%AC%D9%86%DA%AF-%D8%B3%D8%AA%D8%A7%D8%B1%DA%AF%D8%A7%D9%86-%D8%AD%D8%B1%DA%A9%D8%AA-%D8%AF%D9%88%D8%B1%D8%A8%DB%8C%D9%86/1672850347.9049053-kncj48HrsJdP-1668425970.47698_O8GoHnE.jpg',
    description: 'اطلاعات دوره خانم اسکارلت',
    alt: 'تصویری از اسکارلت',
    id:2,
    link:'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/',
  },
  {
    title: 'سبک کارگردانی کوبیریک',
    img: 'https://www.fiatre.ir/uploads/episodes/images/%D8%B3%D8%A8%DA%A9-%DA%A9%D8%A7%D8%B1%DA%AF%D8%B1%D8%AF%D8%A7%D9%86%DB%8C-%DA%A9%D9%88%D8%A8%D8%B1%DB%8C%DA%A9/1698502260.1101644-e0g6VtJE4Ddb-Kubricks_Directing__RSEiV8l.jpg',
    description: 'اطلاعات دوره کیت بلانشت',
    alt: 'تصویری از کیت بلانشت',
    id:3,
    link: 'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%DA%A9%DB%8C%D8%AA-%D8%A8%D9%84%D8%A7%D9%86%D8%B4%D8%AA/',
  },
  {
    title: 'جوکر فینچر و تارانتینو',
    img: 'https://www.fiatre.ir/uploads/episodes/images/%DA%86%DA%AF%D9%88%D9%86%D9%87-%D8%AA%D8%A7%D8%B1%D8%A7%D9%86%D8%AA%DB%8C%D9%86%D9%88-%D9%81%DB%8C%D9%86%DA%86%D8%B1-%D9%88-%D9%86%D9%88%D9%84%D8%A7%D9%86-%D8%AF%DB%8C%D9%86%D8%A7%D9%85%DB%8C%DA%A9-%D9%82%D8%AF%D8%B1%D8%AA-%D8%B1%D8%A7/1700931385.6206143-Tfe3y61_nGgX6ig.jpg',
    description: 'اطلاعات دوره خانم اسکارلت',
    alt: 'تصویری از اسکارلت',
    id:4,
    link:'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/',
  },
  {
    title: 'نسبت تصویر یک به دو چیست',
    img: 'https://www.fiatre.ir/uploads/episodes/images/%D9%86%D8%B3%D8%A8%D8%AA-%D8%AA%D8%B5%D9%88%DB%8C%D8%B1-2-1-%DA%86%DB%8C%D8%B3%D8%AA/1695643366.1086109-3NsxNz910bEO-What_is_2-1_Aspect_Ratio.jpg',
    description: 'اطلاعات دوره کیت بلانشت',
    alt: 'تصویری از کیت بلانشت',
    id:5,
    link: 'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%DA%A9%DB%8C%D8%AA-%D8%A8%D9%84%D8%A7%D9%86%D8%B4%D8%AA/',
  },
  {
    title: 'ایزو چیست',
    img: 'https://www.fiatre.ir/uploads/episodes/images/iso-%DA%86%DB%8C%D8%B3%D8%AA/1672851679.2944343-KBQwLXmiVBZ8-1668428763.2779667-IBSLubyA9x1c_U3rhLnt.jpg',
    description: 'اطلاعات دوره خانم اسکارلت',
    alt: 'تصویری از اسکارلت',
    id:6,
    link:'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/',
  },
];
</script>

<style lang="scss">
@import 'assets/scss/pages/index/home-section';
</style>
