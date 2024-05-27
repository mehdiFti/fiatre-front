<template>
  <div class="container mt-5">
    <div class="video-desc-wrapper">
      <div class="video-desc-static">
        توضیحات
      </div>

      <hr>

      <h1>
        {{ video.title }}
      </h1>


      <p class="video-description">
        {{ video.description }}
      </p>

      <h2>
        {{ video.secondaryTitle }}
      </h2>

      <p class="video-description">
        {{ video.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const video = {
  title:'فیلم تئاتر اودیسه',
  description:' همه پسران من یک  نمایشنامه سه پرده ای است که در سال 1946 توسط آرتور میلر نوشته شده است. در برادوی در تئاتر Coronet در شهر نیویورک  در 29 ژانویه 1947 افتتاح شد، در 8 نوامبر 1949 بسته شد و برای 328 اجرا اجرا شد . این تئاتر با بازی اد بیگلی ، بت مریل، آرتور کندی و کارل مالدن برنده جایزه تونی بهترین نویسنده شد.و جایزه تونی برای بهترین کارگردانی نمایشنامه . این نمایشنامه در سال های 1948 و 1987 برای فیلم اقتباس شد . داستان درباره مردی است که قطعات هواپیما می‌فروشد. او به خوبی آگاه است که قطعاتش دچارمشکل هستند اما باز هم آن‌ها را برای فروش آماده می‌کند و نتیجه این کار، کشته شدن بیست و یک سرباز است. در نهایت او موفق می‌شود که در دادگاه خود را تبرئه کند اما شریکش را، مردی که از همه جا بی‌خبر است، راهی زندان می‌کند. در این داستان با شخصیت‌هایی آشنا می‌شویم که آرتور میلر به خوبی ساخته و پرداخته است. شخصیت‌هایی که ممکن است فکر کنیم همه آن‌ها را به خوبی می‌شناسیم. این فیلم تئاتر در سال 2019 از اجرای صحنه ای تئاتر فیلمبرداری شده است',
  secondaryTitle:'تفاوت ادیسه کوبریک با ادیسه شکسپیر',
};
</script>

<style lang="scss">
.video-desc-wrapper {
  padding: 10px;
  background: $light;


  >.video-desc-static {
    font-size: 18px;
    font-weight: bold;
    color: $dark;
  }

  > hr {
    width: 40%;
    color: $dark;
    padding-bottom: 10px;
  }

  > h1 {

    padding-top: 10px;
    font-size: 24px;
    font-weight: bold;
    color: $primary ;
  }

  > .video-description {

    font-size: 18px;
    line-height: 2.2;
    white-space: pre-wrap;
    margin-bottom: 10px;
  }

  > h2 {
    font-size: 20px;
    font-weight: bold;
    color: $primary;
    padding-top: 10px;
  }


}
</style>
