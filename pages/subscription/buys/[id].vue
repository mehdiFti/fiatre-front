<template>
  <main class="container">
    <div class="subscription-card">
      <div class="subscription-header">
        <h2>انتخاب اشتراک</h2>
      </div>
      <div class="subscription-body">
        <!-- Discount Code Section -->
        <div class="info-row">
          <div class="discount-container">
            <label for="discount-code" class="info-label">کد تخفیف</label>
            <div class="input-group">
              <input 
                type="text" 
                id="discount-code" 
                v-model="discountCode"
                placeholder="کد تخفیف خود را وارد کنید"
                :disabled="discountRequest.status.value === 'success' || discountRequest.status.value === 'pending'"
              />
              <button class="apply-button dis" 
              @click="applyDiscount"
              :disabled="discountRequest.status.value === 'success' || discountRequest.status.value === 'pending'"
              >
                اعمال
              </button>
            </div>
          </div>
        </div>

        <!-- Price Information -->
        <div class="info-row">
          <span class="info-label">قیمت اولیه</span>
          <span class="info-value">{{ formatNumber(subscription.price) }} تومان</span>
        </div>

        <div class="info-row">
          <span class="info-label">قیمت با تخفیف عمومی</span>
          <span class="info-value">{{ formatNumber(subscription.discount_price) }} تومان</span>
        </div>

        <div class="info-row final-price">
          <span class="info-label">قیمت نهایی</span>
          <span class="info-value highlight">{{ formatNumber(finalPrice) }} تومان</span>
        </div>

        <p class="warning-message">
          لطفا قبل از پرداخت اطلاعات خود را بررسی کنید.
        </p>

        <button class="payment-button" @click="proceedToPayment">
          پرداخت
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: ['redirect-to-login'],
});

useSeoMeta({
  title: 'تایید اشتراک',
  description: 'صفحه تایید اشتراک در سایت فیاتر برای انتخاب و خرید اشتراک.',
  keywords: 'تایید اشتراک, خرید اشتراک, سایت فیاتر',
  ogTitle: 'تایید اشتراک',
  ogDescription: 'صفحه تایید اشتراک در سایت فیاتر برای انتخاب و خرید اشتراک.',
  ogType: 'website',
  ogUrl: 'https://fiatre.ir/subscription/buys',
  ogImage: 'https://fiatre.ir/og-image.jpg',
  robots: 'index, follow',
});    

import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import redirectToLogin from '~/middleware/redirectToLogin';

const route = useRoute();
const subscriptionGetRequest = await useAuthFetch(`api/subcriptions/types/${route.params.id}`);

const subscription = computed(() => subscriptionGetRequest.data.value);

const finalPrice = ref(subscription.value?.discount_price);

const couponId = ref();
const discountCode = ref('');

const gatewayLinkBody = computed(() => ({
  type: subscription.value.id,
  coupon: couponId.value
}))

const formatNumber = (number: Number) => {
  const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const [integerPart, decimalPart] = formattedNumber.split('.');
  if (decimalPart && parseInt(decimalPart) < 3) {
    return integerPart;
  }
  return formattedNumber;
};

const gatewayLinkRequest = useAuthFetch('/api/gateway/payment/link/', {
  method: 'post',
  body: gatewayLinkBody,
  immediate: false,
  watch: false,
});
  const discountbody = computed(()=> {
    return { 
        code: discountCode.value,
        amount: subscription.value.discount_price
        }
  })
  const discountRequest = useAuthFetch('/api/coupons/check/', {
      method: 'POST',
      watch: false,
      immediate: false,
      headers: {
        'Content-Type': 'application/json',
      },
      body: discountbody,
      });
      const applyDiscount = async () => {
      try {
        await discountRequest.execute();
    

        if (discountRequest.data && discountRequest.data.value) {
          if (discountRequest.data.value.status === 'success') {
            finalPrice.value = discountRequest.data.value.new_amount;
            couponId.value = discountRequest.data.value.coupon_id;
            toast.success('کد تخفیف مورد نظر با موقیت ثبت شد.');
          } else {
            finalPrice.value = subscription.value.discount_price;
            toast.error('همچین کد تخفیفی وجود ندارد!');
          }
        } else if (discountRequest.error && discountRequest.error.value) {
          finalPrice.value = subscription.value.discount_price;
          toast.error('همچین کد تخفیفی وجود ندارد!');
        }
      } catch (error) {
        finalPrice.value = subscription.value.discount_price;
        toast.error('همچین کد تخفیفی وجود ندارد!');
      }
    };

const proceedToPayment = async () => {
  await gatewayLinkRequest.execute();

  console.log(gatewayLinkRequest);
  if (gatewayLinkRequest.status.value === 'success') {
    location.href = gatewayLinkRequest.data.value.link;
  }
};
</script>

<style lang="scss" scoped>

.container {
 display: flex;
 justify-content: center;
 align-items: center;


.container-wr {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  background-color: #f5f5f5;
}

.subscription-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .subscription-header {
    background-color: #0066cc;
    text-align: center;
    color: white;
    padding: 0.75rem;

    h2 {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 600;
    }
  }

  .subscription-body {
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

      &.final-price {
        background-color: #e8f4ff;
        border: 1px solid #0066cc;

        .info-value.highlight {
          color: #0066cc;
          font-size: 1.1rem;
        }
      }

      .info-label {
        color: #666;
        font-weight: 500;
      }

      .info-value {
        color: #333;
        font-weight: 600;
      }
    }

    .discount-container {
      width: 100%;

      .input-group {
        display: flex;
        gap: 0.4rem;
        margin-top: 0.4rem;

        input {
          flex: 1;
          padding: 0.6rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 0.85rem;
        }

        .apply-button {
          padding: 0.6rem 1.2rem;
          background-color: #0066cc;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s;
          font-size: 0.85rem;

          &:hover {
            background-color: darken(#0066cc, 10%);
          }
        }
      }
    }

    .warning-message {
      text-align: center;
      color: #666;
      line-height: 1.8;
      margin: 1.5rem 0;
      font-size: 0.85rem;
    }

    .payment-button {
      display: block;
      width: 100%;
      padding: 0.75rem;
      background-color: #0066cc;
      color: white;
      text-align: center;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
      font-size: 0.9rem;

      &:hover {
        background-color: darken(#0066cc, 10%);
      }
    }
  }
}

@media (max-width: 480px) {
  .subscription-card {
    margin: 0.75rem;
    
    .subscription-body {
      padding: 1rem;

      .info-row {
        padding: 0.6rem;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.4rem;
      }

      .discount-container {
        .input-group {
          flex-direction: column;

          .apply-button {
            width: 100%;
          }
        }
      }
    }
  }
}
}
</style>
