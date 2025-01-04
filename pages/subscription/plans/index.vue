<template>
  <main class="container mb-5">
    <section class="subscription-plans">
      <div v-if="isLoading" class="loading"> در حال بارگذاری...</div>

      <div v-else-if="error" class="error">
        Failed to load subscription plans. Please try again.
      </div>

      <template v-else>
        <header>
        </header>
        <div class="plans-container">
          <div class="plan-card" v-for="plan in plans" :key="plan.id">
            <img class="plan-image" :src="plan.imageUrl" :alt="plan.duration" />
            <div class="plan-header">
              <h2>{{ plan.duration }}</h2>
              <p>{{ plan.downloadCapability }}</p>
            </div>
            <div class="plan-body">
              <div class="plan-price">
                <span class="discount-circle">{{ plan.discount }}</span>
                <span class="original-price">{{ formatNumber(plan.originalPrice) }}</span>
                <span class="final-price">{{ formatNumber(plan.finalPrice) }}</span>
              </div>
              <NuxtLink :to="{ name: 'subscription-buys-id', params: { id: plan.plansRoute } }" class="select-button">
                {{ plan.buttonText }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="subscription-info-container">
          <div class="subscription-info">
            <h2 class="title-plan">مزایای پلن‌های اشتراکی فیاتر </h2>
            <ul>
              <li>تماشای نامحدود برترین فیلم تئاتر های روز دنیا و مجموعه های آموزشی هفت هنر با زیرنویس تخصصی فارسی.</li>
              <li>ترافیک نیم‌بها برای تمامی اپراتورها و سرویس‌دهندگان اینترنت ایران.</li>
              <li>امکان دانلود تمامی محتواهای قابل و تماشای آن در زمانی که دسترسی به اینترنت ندارید.</li>
            </ul>
          </div>
        </div>
      </template>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';

console.log('Starting API call...');

useSeoMeta({
  title: 'پلن‌های اشتراکی',
  description: 'صفحه پلن‌های اشتراکی در سایت فیاتر برای مشاهده و خرید اشتراک.',
  keywords: 'پلن‌های اشتراکی, خرید اشتراک, سایت فیاتر',
  ogTitle: 'پلن‌های اشتراکی',
  ogDescription: 'صفحه پلن‌های اشتراکی در سایت فیاتر برای مشاهده و خرید اشتراک.',
  ogType: 'website',
  ogUrl: 'https://fiatre.ir/subscription/plans',
  ogImage: 'https://fiatre.ir/og-image.jpg',
  robots: 'index, follow',
});

// Add loading and error states
const isLoading = ref(false);
const error = ref(null);

// Create reactive data source
const subscriptionData = ref(null);

// Create reactive fetch function
const fetchSubscriptionPlans = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await useAuthFetch('/api/subcriptions/types/', {
    });

    console.log('API Response:', response);

    if (response.error.value) {
      throw new Error('Failed to fetch subscription plans');
    }

    subscriptionData.value = response.data.value;
  } catch (err) {
    error.value = err;
    console.error('Error fetching plans:', err);
  } finally {
    isLoading.value = false;
  }
};
fetchSubscriptionPlans();

// Update plans computed property
const plans = computed(() => {
  if (!subscriptionData.value) return [];

  return subscriptionData.value.results.map(plan => ({
    id: plan.id,
    duration: plan.name,
    plansRoute: plan.slug,
    downloadCapability: 'قابلیت دانلود: دارد',
    originalPrice: plan.price,
    discount: `${((plan.price - plan.discount_price) / plan.price * 100).toFixed(0)}%-`,
    finalPrice: plan.discount_price,
    buttonText: 'انتخاب و ادامه',
    imageUrl: plan.image,
  }));
});

const formatNumber = (number: Number) => {
  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
</script>

<style lang="scss" scoped>
.title-plan {
  font-size: 20px;
  font-weight: bold;
}


.subscription-plans {
  padding: 40px;
  background-color: $milky;
  display: flex;
  flex-direction: column;
  align-items: center;

  .plans-container {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;


  }

  .plan-card {

    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    width: calc(33.33% - 40px);
    margin: 20px;
    text-align: center;
    padding: 20px;
    background-color: $white;
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }



    .plan-image {
      max-width: 100%;
      height: auto;
      border-radius: 10px;
      margin-bottom: 20px;
    }

    .plan-header {
      margin-bottom: 20px;

      h2 {
        font-size: 1.6rem;
        color: $gray-500;
      }

      p {
        font-size: 1rem;
        color: $gray-400;
      }
    }

    .plan-body {
      .plan-price {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;

        .discount-circle {
          background-color: $warning;
          color: #fff;
          border-radius: 50%;
          padding: 8px;
          font-size: 0.9rem;
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .original-price {
          margin-top: 20px;
          text-decoration: line-through;
          color: $gray-400;
        }

        .final-price {
          font-size: 1.4rem;
          color: #333;
          font-weight: bold;
        }
      }

      .select-button {
        display: inline-block;
        background-color: $primary;
        color: #fff;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 1rem;
        transition: background-color 0.3s;

        &:hover {
          background-color: darken($primary, 10%);
        }
      }
    }

    @media (max-width: 992px) {
      width: calc(50% - 40px);
    }

    @media (max-width: 600px) {
      width: calc(100% - 40px);
    }
  }

  .subscription-info-container {
    width: 100%;
  }

  .subscription-info {
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    padding: 30px;
    text-align: left;

    p {
      font-size: 1.2rem;
      margin-bottom: 20px;
      font-weight: bold;
      color: #333;
    }

    ul {
      list-style: disc;
      padding-left: 20px;

      li {
        font-size: 1rem;
        margin: 10px 0;
        color: #555;
      }
    }
  }
}
</style>
