<template>
  <div class="container exclusive-cards-container">
    <NuxtLink
      v-for="card in cards"
      :key="card.id"
      :to="card.link"
      class="exclusive-card"
    >
      <NuxtImg class="exclusive-card-image" alt="card.alt" :src="card.img" />

      <div class="exclusive-card-info">
        <div class="exclusive-card-title">
          {{ card.title }}
        </div>

        <div class="exclusive-card-desc">
          {{ card.description }}
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const cards
    = [
      {
        title: 'داستان یک ادیسه',
        img: 'https://www.fiatre.ir/uploads/posters/The_Story_of_Film_An_Odyssey_Gq7b1ZN.jpg',
        description: 'داستان یک ادیسه برگرفته از اثر فاخر استنلی کوبریک یکی از شاخص ترین فیلم های تاریخ سینما شناخته میشود.اثری که دید کم نظیری از آینده را به نمایش گذاشت',
        alt: 'تصویر داستان یک ادیسه',
        id:1,
        link: 'https://www.fiatre.ir/episodes/%D8%AF%D8%A7%D8%B3%D8%AA%D8%A7%D9%86-%D8%B3%DB%8C%D9%86%D9%85%D8%A7-%DB%8C%DA%A9-%D8%A7%D8%AF%DB%8C%D8%B3%D9%87/',
      },
      {
        title: '',
        img: 'https://www.fiatre.ir/uploads/posters/david_lynch_Teaches_Creativity_and_Film.jpg',
        description: 'در این مسترکلاس، کارگردان آوانگارد دیوید لینچ کارگردان فیلم های مخمل آبی، بزرگراه گمشده، جاده مالهالند فرآیند آفرینش خلاقانه، رسیدن به ایده‌های مناسب و تبدیل کردن آن‌ها به داستان و بیان هنری در مدیوم‌های مختلف را آموزش می‌دهد.',
        alt: 'تصویر دوره آموزشی داوید لینچ',
        id:2,
        link: 'https://www.fiatre.ir/episodes/%D9%85%D8%B3%D8%AA%D8%B1%DA%A9%D9%84%D8%A7%D8%B3-%D8%AF%DB%8C%D9%88%DB%8C%D8%AF-%D9%84%DB%8C%D9%86%DA%86/',
      },
      {
        title: 'آموزش نقاشی با ریکی آلمن',
        img: 'https://www.fiatre.ir/uploads/posters/how_to_paint_ricky_allman_t5hxXuv.jpg',
        description: 'آموزش نقاشی با ریکی آلمن آموزش نقاشی با ریکی آلمن',
        alt: 'آموزش نقاشی با ریکی آلمن',
        id:3,
        link: 'https://www.fiatre.ir/episodes/%D8%A2%D9%85%D9%88%D8%B2%D8%B4-%D9%86%D9%82%D8%A7%D8%B4%DB%8C-%D8%A8%D8%A7-%D8%B1%DB%8C%DA%A9%DB%8C-%D8%A2%D9%84%D9%85%D9%86/',
      },
      {
        title: 'آموزش نمایشنامه نویسی با ممت',
        img: 'https://www.fiatre.ir/uploads/posters/david_mamet_teaches_dramatic_writing_vxsY6nG.jpg',
        description: 'دیوید ممت با تعداد زیادی دزد سر یک میز پوکر نشست و ایده American Buffalo را الهام گرفت. اکنون این نویسنده برنده جایزه پولیتزر و صاحب اثر Glengarry Glen Ross فرآیند تبدیل عجیب ترین لحظات زندگی به هنر درام را به شما آموزش می دهد. او قواعد درام، نکات ریز دیالوگ نویسی، و مهارت های لازم برای داشتن سبک اختصاصی و خلق شاهکارتان را به شما می آموزد.',
        alt: 'آموزش نمایشنامه نویسی با ممت',
        id:4,
        link: 'https://www.fiatre.ir/episodes/%D8%A2%D9%85%D9%88%D8%B2%D8%B4-%D9%86%D9%85%D8%A7%DB%8C%D8%B4%D9%86%D8%A7%D9%85%D9%87-%D9%86%D9%88%DB%8C%D8%B3%DB%8C-%D8%A8%D8%A7-%D9%85%D9%85%D8%AA/',
      },
    ];

</script>

<style lang="scss">
@import "assets/scss/pages/index/exclusive-card";
</style>
