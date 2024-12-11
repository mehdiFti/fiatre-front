<template>
    <main class="container">
    <section class="card">
      <div class="card-header">
        <h2 class="title">اطلاعات اشتراک</h2>
      </div>
      <div class="card-body">
        <div class="info-row">
          <span class="info-label">نوع اشتراک:</span>
          <span class="info-value">{{ duration }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">مبلغ:</span>
          <span class="info-value">{{ finalPrice }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">شماره سفارش:</span>
          <span class="info-value">{{ randomOrderNumber }}</span>
        </div>
      </div>
    </section>
    </main>
  </template>
  
  <script setup>

  useSeoMeta({
  title: 'تایید اشتراک',
  description: 'صفحه تایید اشتراک در سایت فیاتر برای وارد کردن اطلاعات و تایید اشتراک.',
  keywords: 'تایید اشتراک, خرید اشتراک, سایت فیاتر',
  ogTitle: 'تایید اشتراک',
  ogDescription: 'صفحه تایید اشتراک در سایت فیاتر برای وارد کردن اطلاعات و تایید اشتراک.',
  ogType: 'website',
  ogUrl: 'https://fiatre.ir/subscription/verify',
  ogImage: 'https://fiatre.ir/og-image.jpg',
  robots: 'index, follow',
  author: 'FIATRE',
  charset: 'UTF-8',
  viewport: 'width=device-width, initial-scale=1.0',
  canonical: 'https://fiatre.ir/subscription/verify'
});      

  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const duration = ref('')
  const finalPrice = ref('')

  watch(
    () => route.query,
    (newQuery) => {
      duration.value = newQuery.duration || '3 ماهه'
      finalPrice.value = newQuery.finalPrice || '1000'
    },
    { immediate: true }
  )

  const randomOrderNumber = ref(Math.floor(Math.random() * 1000000))
  </script>
  
  <style lang="scss" scoped>
  
  .card {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 80px auto;
    background: #fff;
    font-family: 'Arial', sans-serif;
  }
  
  .card-header {
    background: #007bff; 
    color: #fff;
    padding: 16px;
    text-align: center;
  }
  
  .title {
    margin: 0;
    font-size: 1.5rem;
  }
  
  .card-body {
    padding: 20px;
  }
  
  .info-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
  
  .info-row:last-child {
    border-bottom: none;
  }
  
  .info-label {
    font-weight: bold;
    color: #333;
  }
  
  .info-value {
    color: #666;
    text-align: right;
  }
  
  @media (max-width: 600px) {
    .info-row {
        display: flex;
    }
  
    .info-label {
      margin-bottom: 5px;
    }
  
    .info-value {
      text-align: left;
    }
  }
  </style>
