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
              <p>{{ plan.downloadCapability }} <span> {{ plan.downloadCapabilityReply }} </span> </p>
              <h2>{{ plan.duration }}</h2>
            </div>
            <div class="plan-body">
              <div class="plan-price">
                <div class="disc-origi">
                  <span class="discount-circle">{{ plan.discount }}</span>
                  <span class="original-price">{{ formatNumber(plan.originalPrice) }} تومان</span>
                </div>
                <span class="final-price">قیمت: {{ formatNumber(plan.finalPrice) }} تومان</span>
              </div>
              <NuxtLink :to="{ name: 'subscription-buys-id', params: { id: plan.plansRoute } }" class="select-button">
                {{ plan.buttonText }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="subscription-info-container container">
          <div class="subscription-info container">
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
  title: ' طرح‌های اشتراکی | فیاتر',
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
    downloadCapability: 'قابلیت دانلود: ',
    downloadCapabilityReply: 'دارد',
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
.disc-origi {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}

.plans-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 10px;
}

.title-plan {
  font-size: 20px;
  font-weight: bold;
}

.subscription-plans {
  background-color: $light;
}

.plan-card {
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: calc(33.33% - 40px);
  margin: 10px;
  text-align: center;
  padding: 20px 0px;
  background-color: $white;
  transition: transform 0.3s, box-shadow 0.3s;
}

.plan-card:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.plan-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
}

.plan-header h2 {
  font-size: 1.2rem;
  color: $black;
}

.plan-header p {
  font-size: 1rem;
  color: $black;
  font-weight: 500
}

.plan-header span {
  font-sizr: 1rem;
  color: $primary;
  font-weight: 500
}

.plan-price {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.discount-circle {
  background-color: $third;
  color: #fff;
  border-radius: 6px;
  font-size: 0.9rem;
  height: 34px;
  padding: 2px 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.original-price {
  font-size: 0.9rem;
  text-decoration: line-through;
  color: $gray;
}

.final-price {
  font-size: 1rem;
  color: #333;
  margin-bottom: 10px;
  font-weight: bold;
}

.select-button {
  display: inline-block;
  background-color: #065FD4;
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.select-button:hover {
  background-color: darken(#065FD4, 10%);
}

@media (min-width: 992px) {
  .select-button {
    padding: 10px 60px;
    font-size: 1.2rem;
  }

  .final-price {
    margin-top: 10px;
    font-size: 1rem
  }

  .plan-header p {
    margin: 20px 0px;
  }

  .plan-header h2 {
    margin: 30px 0px;
  }

  .plan-image {
    margin: 30px 0;
  }

}


@media (max-width: 992px) and (min-width: 768px) {
  .plan-card {
    width: calc(33.33% - 20px);

  }

  .plan-header h2 {
    font-size: 1.2rem !important;
    margin-bottom: 15px
  }

  .plans-container {
    justify-content: flex-start;
  }

  .plan-header p {
    margin: 20px 0px;
  }

  .select-button {
    margin-top: 20px;
  }

  .plan-image {
    margin: 10px 0px 20px 0px;
  }

  .final-price {
    font-size: 1rem;
  }

}

@media (max-width: 768px) and (min-width: 450px) {
  .plan-card {
    width: calc(50% - 20px);

  }

  .plan-header h2 {
    font-size: 1.2rem;
  }

  .plans-container {
    justify-content: flex-start;

  }

}

@media (max-width: 450px) {
  .plan-card {
    width: calc(50% - 20px);
  }

  .plans-container {
    justify-content: flex-start;

  }

  .plan-header h2 {
    font-size: 1.2rem;
  }

  .select-button {
    padding: 10px 20px;
  }

  .title-plan {
    white-space: nowrap;
    text-align: center;
    font-size: 14px
  }

  .plan-image {
    width: 120px;
  }

}

@media (max-width: 400px) {
  .plan-header h2 {
    font-size: 14px
  }

  .final-price {
    margin-top: 10px;
    font-size: 0.9rem
  }

  .discount-circle {
    width: 30px;
    height: 20px;
  }

}

@media (max-width: 368px) {
  .plan-card {
    width: calc(100% - 20px);
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
}

.subscription-info p {
  font-size: 1.2rem;
  margin-bottom: 20px;
  font-weight: bold;
  color: #333;
}

.subscription-info ul {
  list-style: disc;
  padding-left: 20px;
}

.subscription-info ul li {
  font-size: 1rem;
  margin: 10px 0;
  color: #555;
}
</style>
