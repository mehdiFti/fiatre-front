<template>
  <header class="header-wrapper">
    <div class="container header">
      <div class="right-section">
        <img src="~/assets/images/logo-horizontal.svg">
      </div>

      <div class="center-section">
        <NuxtLink to="/">
          خانه
        </NuxtLink>

        <NuxtLink to="/products">
          محصولات
        </NuxtLink>

        <NuxtLink to="/blog">
          وبلاگ
        </NuxtLink>

        <NuxtLink to="/contact-us">
          تماس با ما
        </NuxtLink>

        <NuxtLink to="about-us">
          درباره ما
        </NuxtLink>
      </div>

      <div class="left-section">
        <div> ورود / ثبت‌نام </div>

        <JJIcon icon="cart-shopping" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
@import "/assets/scss/components/core/header";
</style>

