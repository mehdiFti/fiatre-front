<template>
<ImageHeader :imageHeader="imageHeader"/>

<Quote :quote="quote" /> 
 
<TheSeparator  class="ps-4" title="توضیحات" dir="rtl" />

<Description  class="mb-5" :bDescription="bDescription"/>

<TheSeparator  class="ps-4" title="عناوین مشابه" dir="rtl"/>

<TheSlider class="mb-5 " title="کار در سینما" :cardsSlider="cardSlider"/>

<CommentSection class="mb-5" />

</template>
<script setup lang="ts">


import ImageHeader from '~/components/core/ImageHeader.vue';
import Quote from '~/components/pages/biography/Quote.vue';
import CommentSection from '~/components/core/CommentSection.vue';
import TheSeparator from '~/components/core/TheSeparator.vue';
import TheSlider from '~/components/core/TheSlider.vue';
import Description from '~/components/core/Description.vue'

const imageHeader = {
  src: 'https://www.fiatre.ir/uploads/episodes/images/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A2%D9%84-%D9%BE%D8%A7%DA%86%DB%8C%D9%86%D9%88/1672820616.289091-NNpbcZz8MQWc-1668591177.28411_bZPcU1r.jpg',
  alt: 'تصویر دوره بازیگری الپاچینو',
  title: 'دوره بازیگری آل پاچینو',
};

const quote = {
  text: 'اگر بتوانید با مردم همزاد پنداری کنید، می توانید با مردم همدلی کنید و بنابراین همه چیز را می فهمید.',
};

const bDescription = {
  title: 'فیلم تئاتر اودیسه',
  description: 'همه پسران من یک نمایشنامه سه پرده ای است که در سال 1946 توسط آرتور میلر نوشته شده است. در برادوی در تئاتر Coronet در شهر نیویورک در 29 ژانویه 1947 افتتاح شد، در 8 نوامبر 1949 بسته شد و برای 328 اجرا اجرا شد. این تئاتر با بازی اد بیگلی، بت مریل، آرتور کندی و کارل مالدن برنده جایزه تونی بهترین نویسنده شد. و جایزه تونی برای بهترین کارگردانی نمایشنامه. این نمایشنامه در سال های 1948 و 1987 برای فیلم اقتباس شد. داستان درباره مردی است که قطعات هواپیما می‌فروشد. او به خوبی آگاه است که قطعاتش دچار مشکل هستند اما باز هم آن‌ها را برای فروش آماده می‌کند و نتیجه این کار، کشته شدن بیست و یک سرباز است. در نهایت او موفق می‌شود که در دادگاه خود را تبرئه کند اما شریکش را، مردی که از همه جا بی‌خبر است، راهی زندان می‌کند. در این داستان با شخصیت‌هایی آشنا می‌شویم که آرتور میلر به خوبی ساخته و پرداخته است. شخصیت‌هایی که ممکن است فکر کنیم همه آن‌ها را به خوبی می‌شناسیم. این فیلم تئاتر در سال 2019 از اجرای صحنه ای تئاتر فیلمبرداری شده است',
  secondaryTitle: 'تفاوت ادیسه کوبریک با ادیسه شکسپیر',
};

const cardSlider = [
  {
    title: 'جوکر از نولان تا نسخه',
    img: 'https://www.fiatre.ir/uploads/episodes/images/%D8%AC%D9%88%DA%A9%D8%B1-%D8%A7%D8%B2-%D9%86%D9%88%D9%84%D8%A7%D9%86-%D8%AA%D8%A7-%D9%86%D8%B3%D8%AE%D9%87-%D9%87%D8%A7%DB%8C-%D8%B4%D8%B1%D9%88%D8%B1-%D8%A7%D8%B2-%D8%A8%D8%B1%D8%AA%D9%88%D9%86-%D9%81%DB%8C%D9%84%DB%8C%D9%BE%D8%B3/1672851168.8742936-lvfJ4F_qrJY72z.jpg',
    description: 'اطلاعات دوره کیت بلانشت',
    alt: 'تصویری از کیت بلانشت',
    id:1,
    link: 'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%DA%A9%DB%8C%D8%AA-%D8%A8%D9%84%D8%A7%D9%86%D8%B4%D8%AA/',
  },
  {
    title: 'جوکر از نولان تا نسخه',
    img: 'https://www.fiatre.ir/uploads/episodes/images/%D8%AC%D9%88%DA%A9%D8%B1-%D8%A7%D8%B2-%D9%86%D9%88%D9%84%D8%A7%D9%86-%D8%AA%D8%A7-%D9%86%D8%B3%D8%AE%D9%87-%D9%87%D8%A7%DB%8C-%D8%B4%D8%B1%D9%88%D8%B1-%D8%A7%D8%B2-%D8%A8%D8%B1%D8%AA%D9%88%D9%86-%D9%81%DB%8C%D9%84%DB%8C%D9%BE%D8%B3/1672851168.8742936-lvfJ4F_qrJY72z.jpg',
    description: 'اطلاعات دوره کیت بلانشت',
    alt: 'تصویری از کیت بلانشت',
    id:1,
    link: 'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%DA%A9%DB%8C%D8%AA-%D8%A8%D9%84%D8%A7%D9%86%D8%B4%D8%AA/',
  },
  {
    title: 'جوکر از نولان تا نسخه',
    img: 'https://www.fiatre.ir/uploads/episodes/images/%D8%AC%D9%88%DA%A9%D8%B1-%D8%A7%D8%B2-%D9%86%D9%88%D9%84%D8%A7%D9%86-%D8%AA%D8%A7-%D9%86%D8%B3%D8%AE%D9%87-%D9%87%D8%A7%DB%8C-%D8%B4%D8%B1%D9%88%D8%B1-%D8%A7%D8%B2-%D8%A8%D8%B1%D8%AA%D9%88%D9%86-%D9%81%DB%8C%D9%84%DB%8C%D9%BE%D8%B3/1672851168.8742936-lvfJ4F_qrJY72z.jpg',
    description: 'اطلاعات دوره کیت بلانشت',
    alt: 'تصویری از کیت بلانشت',
    id:1,
    link: 'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%DA%A9%DB%8C%D8%AA-%D8%A8%D9%84%D8%A7%D9%86%D8%B4%D8%AA/',
  },
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
    description: 'اطلاعات دوره یت بلانشت',
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
<style lang="scss" scoped>
</style>