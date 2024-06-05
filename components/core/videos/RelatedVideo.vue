<template>
  <div class="container">
    <div class="related-wrapper">
      <TheSeparator title="عناوین مرتبط" />

      <div class="card-section">
        <div v-for="card in cards" :key="card.id" class="card">
          <FeatureCard
            :link="card.link"
            :img="card.img"
            :title="card.title"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import FeatureCard from '~/components/core/FeatureCard.vue';
import TheSeparator from '~/components/core/TheSeparator.vue';

const cards = [
  {
    title: 'جوکر از نولان تا نسخه',
    img: 'https://www.fiatre.ir/uploads/episodes/images/%D8%AC%D9%88%DA%A9%D8%B1-%D8%A7%D8%B2-%D9%86%D9%88%D9%84%D8%A7%D9%86-%D8%AA%D8%A7-%D9%86%D8%B3%D8%AE%D9%87-%D9%87%D8%A7%DB%8C-%D8%B4%D8%B1%D9%88%D8%B1-%D8%A7%D8%B2-%D8%A8%D8%B1%D8%AA%D9%88%D9%86-%D9%81%DB%8C%D9%84%DB%8C%D9%BE%D8%B3/1672851168.8742936-lvfJ4F_qrJY72z.jpg',
    alt: 'تصویری از کیت بلانشت',
    id:1,
    link: 'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%DA%A9%DB%8C%D8%AA-%D8%A8%D9%84%D8%A7%D9%86%D8%B4%D8%AA/',
  },
  {
    title: 'جنگ ستارگان حرکت دوربین',
    img: 'https://www.fiatre.ir/uploads/episodes/images/%D8%AC%D9%86%DA%AF-%D8%B3%D8%AA%D8%A7%D8%B1%DA%AF%D8%A7%D9%86-%D8%AD%D8%B1%DA%A9%D8%AA-%D8%AF%D9%88%D8%B1%D8%A8%DB%8C%D9%86/1672850347.9049053-kncj48HrsJdP-1668425970.47698_O8GoHnE.jpg',
    alt: 'تصویری از اسکارلت',
    id:2,
    link:'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/',
  },
  {
    title: 'سبک کارگردانی کوبیریک',
    img: 'https://www.fiatre.ir/uploads/episodes/images/%D8%B3%D8%A8%DA%A9-%DA%A9%D8%A7%D8%B1%DA%AF%D8%B1%D8%AF%D8%A7%D9%86%DB%8C-%DA%A9%D9%88%D8%A8%D8%B1%DB%8C%DA%A9/1698502260.1101644-e0g6VtJE4Ddb-Kubricks_Directing__RSEiV8l.jpg',

    alt: 'تصویری از کیت بلانشت',
    id:3,
    link: 'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%DA%A9%DB%8C%D8%AA-%D8%A8%D9%84%D8%A7%D9%86%D8%B4%D8%AA/',
  },
  {
    title: 'جوکر فینچر و تارانتینو',
    img: 'https://www.fiatre.ir/uploads/episodes/images/%DA%86%DA%AF%D9%88%D9%86%D9%87-%D8%AA%D8%A7%D8%B1%D8%A7%D9%86%D8%AA%DB%8C%D9%86%D9%88-%D9%81%DB%8C%D9%86%DA%86%D8%B1-%D9%88-%D9%86%D9%88%D9%84%D8%A7%D9%86-%D8%AF%DB%8C%D9%86%D8%A7%D9%85%DB%8C%DA%A9-%D9%82%D8%AF%D8%B1%D8%AA-%D8%B1%D8%A7/1700931385.6206143-Tfe3y61_nGgX6ig.jpg',

    alt: 'تصویری از اسکارلت',
    id:4,
    link:'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/',
  },
  {
    title: 'نسبت تصویر یک به دو چیست',
    img: 'https://www.fiatre.ir/uploads/episodes/images/%D9%86%D8%B3%D8%A8%D8%AA-%D8%AA%D8%B5%D9%88%DB%8C%D8%B1-2-1-%DA%86%DB%8C%D8%B3%D8%AA/1695643366.1086109-3NsxNz910bEO-What_is_2-1_Aspect_Ratio.jpg',

    alt: 'تصویری از کیت بلانشت',
    id:5,
    link: 'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%DA%A9%DB%8C%D8%AA-%D8%A8%D9%84%D8%A7%D9%86%D8%B4%D8%AA/',
  },
  {
    title: 'ایزو چیست',
    img: 'https://www.fiatre.ir/uploads/episodes/images/iso-%DA%86%DB%8C%D8%B3%D8%AA/1672851679.2944343-KBQwLXmiVBZ8-1668428763.2779667-IBSLubyA9x1c_U3rhLnt.jpg',

    alt: 'تصویری از اسکارلت',
    id:6,
    link:'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/',
  },
];
</script>


<style lang="scss">
.related-wrapper {
  padding:40px 10px 10px;
  background: $light;


 > .card-section {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 20px;

    .movie-card:hover {

     transform: none !important;
     transition: transform 0.3s ease;
     box-shadow: 0 0 10px rgba($primary, 1);

   }
  }


}

</style>
