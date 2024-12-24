<template>
  <main class="container">
    <div class="error-card">
      <div v-if="status === 'NOK'" class="error-header">
        <h2>خطا در پرداخت</h2>
      </div>
      <div v-else class="success-header">
        <h2>پرداخت موفقیت‌آمیز</h2>
      </div>
      
      <div class="error-body">
        <div class="info-row">
          <span class="info-label">نوع اشتراک</span>
          <span class="info-value">{{ subscriptionType }}</span>
        </div>
        
        <div class="info-row">
          <span class="info-label">مبلغ</span>
          <span class="info-value">{{ amount }}</span>
        </div>
        
        <p v-if="status === 'NOK'" class="warning-message">
          در صورت کسر وجه از حساب تا 72 ساعت تامل نموده
          <br>
          و در صورت رفع نشدن مشکل با پشتیبانی تماس حاصل فرمایید
        </p>
        
        <NuxtLink to="/" class="home-button">
          صفحه اصلی
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup>
const subscriptionType = ref('شش ماهه')
const amount = ref('۷۹۰,۰۰۰')
const route = useRoute()


const status = computed(()=>  {
 return route.query.Status
})

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: start;
  min-height: 100vh;
  padding: 0.75rem;
  background-color: #f5f5f5;
}

.error-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .error-header {
    background-color: #ff0000;
    color: white;
    padding: 0.75rem;
    text-align: center;

    h2 {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 600;
    }
  }

  .error-body {
    padding: 1.5rem;

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      background-color: #f8f8f8;
      border-radius: 6px;
      margin-bottom: 0.75rem;
      font-size: 0.9rem;

      .info-label {
        color: #666;
        font-weight: 500;
      }

      .info-value {
        color: #333;
        font-weight: 600;
      }
    }

    .warning-message {
      text-align: center;
      color: #666;
      line-height: 1.8;
      margin: 1.5rem 0;
      font-size: 0.85rem;
    }

    .home-button {
      display: block;
      width: 100%;
      padding: 0.75rem;
      background-color: #0066cc;
      color: white;
      text-align: center;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      transition: background-color 0.2s;
      font-size: 0.9rem;
      text-decoration: none;

      &:hover {
        background-color: darken(#0066cc, 10%);
      }
    }
  }
}

@media (max-width: 480px) {
  .error-card {
    margin: 0.75rem;
    
    .error-body {
      padding: 1rem;

      .info-row {
        padding: 0.6rem;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.4rem;
      }
    }
  }
}

.success-header {
  background-color: #28a745;
  color: white;
  padding: 0.75rem;
  text-align: center;

  h2 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
  }
}
</style>