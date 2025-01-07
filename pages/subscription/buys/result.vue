<template>
  <main class="container mb-5">
    <div class="result-card">
      <!-- Conditional rendering based on payment status -->
      <div v-if="status === 'NOK'" class="plan-header error-header">
        <h2>خطا در پرداخت</h2>
      </div>
      <div v-else-if="status === 'OK'" class="plan-header success-header">
        <h2>پرداخت موفقیت‌آمیز</h2>
      </div>

      <div class="plan-body">
        <!-- Transaction Reference ID -->
        <div v-if="status === 'OK'" class="info-row">
          <span class="info-label">کد رهگیری:</span>
          <span class="info-value">{{ refID }}</span>
        </div>

        <!-- Error Message for Failed Transactions -->
        <p v-if="status === 'NOK'" class="warning-message">
          در صورت کسر وجه از حساب تا ۷۲ ساعت تامل نموده
          <br />
          و در صورت رفع نشدن مشکل با پشتیبانی تماس حاصل فرمایید.
        </p>

        <!-- Redirect to Homepage -->
        <NuxtLink to="/" class="select-button">
          صفحه اصلی
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRoute } from '#app';

const route = useRoute();

// Extract query parameters
const status = route.query.Status || '';
const refID = route.query.refID || '';
</script>

<style lang="scss" scoped>
.container {
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
}

.result-card {
  background-color: $white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  background-color: $milky;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;

  .error-header {
    background-color: $third;
    color: $white;
    font-size: 20px;
    font-weight: bold;
    border-radius: 15px 15px 0 0;
    padding: 20px;
  }

  .success-header {
    background-color: $primary;
    color: $white;
    border-radius: 15px 15px 0 0;
    padding: 20px;
  }

  .plan-body {
    padding: 20px 15px;

    .info-row {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .info-label {
        color: $gray-500;
        font-size: 1.4rem;
        padding-bottom: 10px;
      }

      .info-value {
        color: $gray-700;
        font-weight: bold;
        font-size: 1.1rem;
        padding-bottom: 10px;
      }
    }

    .warning-message {
      padding-bottom: 60px;
      margin: 20px 0;
      color: $gray-500;
      font-size: 1rem;
      line-height: 1.6;
    }

    .select-button {
      display: inline-block;
      background-color: $primary;
      color: $white;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 1rem;
      width: 100%;
      transition: background-color 0.3s;

      &:hover {
        background-color: darken($primary, 10%);
      }
    }
  }
}
</style>
