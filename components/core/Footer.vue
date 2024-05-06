<template>
  <footer class="container footer">
    <div class="footer-section">
      <div class="footer-section__right">

        <NuxtLink class="item">
          تماس با ما
        </NuxtLink>

        <NuxtLink class="item" to="/register">
       درباره ما
        </NuxtLink>
        <NuxtLink class="item">
          قوانین و مقررات
        </NuxtLink>
        <NuxtLink class="item">
       سوالات متداول
        </NuxtLink>
      </div>

      <div class="footer-section__center">

        <div class="subtitle">
          نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
        </div>

        <div class="social-icons">
          <a><JJIcon icon="instagram" /></a>

          <a><JJIcon icon="whatsapp" /></a>

          <a><JJIcon icon="telegram" /></a>
        </div>
      </div>

      <div class="footer-section__left">
        <div class="title">
        اپلیکیشن فیاتر
        </div>
        <div class="phone-number">
         دانلود ios
        </div>

        <div class="title">
          آدرس
        </div>

        <div class="address">
          دانلود اندروید
        </div>
      </div>
    </div>

    <hr>

    <div class="copyright primary-bold">
      خدمات ارائه شده در فیاتر دارای مجوز است و هر گونه سوء استفاده از محتوای فیاتر، پیگرد قانونی دارد.
    </div>
  </footer>
</template>

<script setup lang="ts">
import JJIcon from '~/components/core/icons/JJIcon.vue';
</script>

<style lang="scss">
@import "/assets/scss/components/core/footer";
</style>
