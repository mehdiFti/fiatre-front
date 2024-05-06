<template>
  <header class="header-wrapper">
    <div class="container header">
      <div class="right-section">
      </div>

      <div class="center-section">
        <NuxtLink to="/">
          خانه
        </NuxtLink>

        <NuxtLink to="/register">
          ثبت نام
        </NuxtLink>

        <NuxtLink>
          وبلاگ
        </NuxtLink>

        <NuxtLink to="/contact-us">
          تماس با ما
        </NuxtLink>

        <NuxtLink>
          درباره ما
        </NuxtLink>
      </div>

      <div class="left-section">
        <div> ورود / ثبت‌نام </div>

      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
@import "/assets/scss/components/core/header";
</style>

