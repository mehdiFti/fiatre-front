<template>

    <RtlHeader class="mb-5" dir="rtl"/>
    
    <VideoHeader :movie="movie" />
    
    <VideoDetails dir="rtl" :details="details" mb-5 />
    
    <TheSeparator title="گالری تصاویر" dir="rtl" class="mt-5" />
    
    <Gallery :images="images" dir="rtl" /> 

    <TheSeparator title="توضیحات" dir="rtl" class="mt-5" />
    
    <VideoDescription :vDescription="vDescription" dir="ltr" />

    <TheSeparator title="عوامل و بازیگران" dir="rtl" />
    
    <CastCrew :crews="crews" class="mb-5"/>
    
    <TheSeparator title="عناوین مشابه" dir="rtl" />
    
    <TheSlider class="mb-5 " title="کار در سینما" :cardsSlider="cardSlider"/>
    
    <CommentSection dir="rtl" class="mb-5"/>
    
    <Footer dir="rtl"/>
    
    </template>
    
    <script setup lang="ts">
    definePageMeta({
      layout: 'custom'
    });
    
    import VideoHeader from '~/components/pages/episode/VideoHeader.vue';
    import VideoDetails from '~/components/core/videos/VideoDetails.vue';
    import VideoDescription from '~/components/core/videos/VideoDescription.vue';
    import CastCrew from '~/components/core/videos/CastCrew.vue';
    import CommentSection from '~/components/core/CommentSection.vue';
    import TheSlider from '~/components/core/TheSlider.vue';
    import Gallery from '~/components/core/Gallery.vue';
    import RtlHeader from '~/components/core/RtlHeader.vue';
    import Footer from '~/components/core/Footer.vue';
    import TheSeparator from '~/components/core/TheSeparator.vue';
    

    const getEpisodesRequest = await useApiFetch(`/api/episodes`, {
});

const movie = computed(() => {
  if (getEpisodesRequest.status.value === 'success') {
    return getEpisodesRequest.data.value;
  }

  return []
})

    
    const details = {
      releaseValue: '2001',
      genreValue: 'sci-fi',
      categoryValue: 'فیلم تئاتر',
      ageValue: '15+',
      productValue: 'آمریکا',
      durationValue: '1:30',
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
    
    
    const images = [
        { url: 'https://www.fiatre.ir/uploads/gallery/%D9%88%DB%8C%D9%84%D9%87-%D9%BE%D9%88%D9%84%D9%87-%D9%88%DB%8C%D9%84%D9%87-%D9%BE%D9%88%D9%84%D9%87/1689960467.9008622-wF3zKBq2uWy9-3.3.jpg', alt: 'Beautiful Villa 1' },
        { url: 'https://www.fiatre.ir/uploads/gallery/%D9%88%DB%8C%D9%84%D9%87-%D9%BE%D9%88%D9%84%D9%87-%D9%88%DB%8C%D9%84%D9%87-%D9%BE%D9%88%D9%84%D9%87/1689960463.9175813-oNeMly5LDEiY-3.2.jpg', alt: 'Beautiful Villa 2' },
        { url: 'https://www.fiatre.ir/uploads/gallery/%D9%88%DB%8C%D9%84%D9%87-%D9%BE%D9%88%D9%84%D9%87-%D9%88%DB%8C%D9%84%D9%87-%D9%BE%D9%88%D9%84%D9%87/1689960471.3369725-kPZpMYXwKprj-3.4.jpg', alt: 'Beautiful Villa 3' },
        { url: 'https://www.fiatre.ir/uploads/gallery/%D9%88%DB%8C%D9%84%D9%87-%D9%BE%D9%88%D9%84%D9%87-%D9%88%DB%8C%D9%84%D9%87-%D9%BE%D9%88%D9%84%D9%87/1689963367.002185-TwWdRvV7T9Pf-3.6.jpg', alt: 'Beautiful Villa 4' },
        { url: 'https://www.fiatre.ir/uploads/gallery/%D9%88%DB%8C%D9%84%D9%87-%D9%BE%D9%88%D9%84%D9%87-%D9%88%DB%8C%D9%84%D9%87-%D9%BE%D9%88%D9%84%D9%87/1689960480.9022105-ukDvJy4Xqzcs-3.jpg', alt: 'Beautiful Villa 5' },
        { url: 'https://www.fiatre.ir/uploads/gallery/%D9%88%DB%8C%D9%84%D9%87-%D9%BE%D9%88%D9%84%D9%87-%D9%88%DB%8C%D9%84%D9%87-%D9%BE%D9%88%D9%84%D9%87/1689960475.145209-LtrfqoTffibb-3.5.jpg', alt: 'Beautiful Villa 6' },
    ];
    const vDescription = {
      title: 'فیلم تئاتر اودیسه',
      description: 'همه پسران من یک نمایشنامه سه پرده ای است که در سال 1946 توسط آرتور میلر نوشته شده است. در برادوی در تئاتر Coronet در شهر نیویورک در 29 ژانویه 1947 افتتاح شد، در 8 نوامبر 1949 بسته شد و برای 328 اجرا اجرا شد. این تئاتر با بازی اد بیگلی، بت مریل، آرتور کندی و کارل مالدن برنده جایزه تونی بهترین نویسنده شد. و جایزه تونی برای بهترین کارگردانی نمایشنامه. این نمایشنامه در سال های 1948 و 1987 برای فیلم اقتباس شد. داستان درباره مردی است که قطعات هواپیما می‌فروشد. او به خوبی آگاه است که قطعاتش دچار مشکل هستند اما باز هم آن‌ها را برای فروش آماده می‌کند و نتیجه این کار، کشته شدن بیست و یک سرباز است. در نهایت او موفق می‌شود که در دادگاه خود را تبرئه کند اما شریکش را، مردی که از همه جا بی‌خبر است، راهی زندان می‌کند. در این داستان با شخصیت‌هایی آشنا می‌شویم که آرتور میلر به خوبی ساخته و پرداخته است. شخصیت‌هایی که ممکن است فکر کنیم همه آن‌ها را به خوبی می‌شناسیم. این فیلم تئاتر در سال 2019 از اجرای صحنه ای تئاتر فیلمبرداری شده است',
      secondaryTitle: 'تفاوت ادیسه کوبریک با ادیسه شکسپیر',
    };
    
    const crews = [
      {
        src: 'https://i.insider.com/60f9c4dd0729770012b96150?width=700',
        link:'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/',
        title: 'کیت بکیسنل',
        id: 1,
      },
      {
        src: 'https://i0.wp.com/www.thewrap.com/wp-content/uploads/2021/06/Megan-Boone.jpg?fit=936%2C527&ssl=1',
        link:'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/',
        title: 'مگان بون',
        id: 2,
      },
      {
        src: '',
        title: 'ممد نوبری',
        link:'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/',
        id: 3,
      },
      {
        src: '',
        title: 'عواملینو فرمینو',
        link:'https://www.fiatre.ir/episodes/%D8%A7%DA%A9%D8%AA%D9%88%D8%B1%D8%B2-%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1%D9%84%D8%AA-%D8%AC%D9%88%D9%87%D8%A7%D9%86%D8%B3%D9%88%D9%86/',
        id: 4,
      },
    ];
    
    
    </script>
    
    <style lang="scss">
    
    
    </style>
    