<template>
  <main class="subscription-container mb-5">
    <header>
      <h1 class="subscription-title">انتخاب اشتراک</h1>
    </header>
    <section class="buy-card">
      <div class="input-container">
        <label for="discount-code" class="discount-label">کد تخفیف</label>
        <div class="input-with-button">
          <input type="text" id="discount-code" v-model="discountCode"/>
          <button class="apply-button" @click="applyDiscount">اعمال</button>
        </div>
      </div>
      <div class="final-price-container">
        <span class='text-final-price'>قیمت نهایی: </span>
        <span class="final-price">{{ formatNumber(finalPrice) }} تومان</span>
      </div>
      <div class="additional-info">
        <p>لطفا قبل از پرداخت اطلاعات خود را بررسی کنید.</p>
      </div>
      <button class="pay-button" @click="proceedToPayment">پرداخت</button>
      <ModalMessage
        :visible="isModalVisible"
        :message="modalMessage"
        @close="isModalVisible = false"
      />
    </section>
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
import ModalMessage from '@/components/core/ModalMessage.vue';

const route = useRoute();
const originalPrice = ref(parseFloat(route.query.finalPrice as string) || 0);
const finalPrice = ref(originalPrice.value);

const discountCode = ref('');
const isModalVisible = ref(false);
const modalMessage = ref('');

const formatNumber = (number: Number) => {
  const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const [integerPart, decimalPart] = formattedNumber.split('.');
  if (decimalPart && parseInt(decimalPart) < 3) {
    return integerPart;
  }
  return formattedNumber;
};

const applyDiscount = async () => {
  try {
    const response = await useAuthFetch('/api/coupons/check/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        code: discountCode.value,
        amount: originalPrice.value
      }),
    });

    if (response.data && response.data.value) {
      if (response.data.value.status === 'success') {
        finalPrice.value = response.data.value.new_amount;
        modalMessage.value = 'کد تخفیف مورد نظر با موقیت ثبت شد.';
      } else {
        modalMessage.value = 'همچین کد تخفیفی وجود ندارد!';
      }
    } else if (response.error && response.error.value) {
      modalMessage.value = 'همچین کد تخفیفی وجود ندارد!';
    }
  } catch (error) {
    modalMessage.value = 'همچین کد تخفیفی وجود ندارد!';
  } finally {
    isModalVisible.value = true;
  }
};

const proceedToPayment = () => {
};
</script>

<style lang="scss" scoped>
.subscription-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #f7f9fc, #e0e7ff);
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 20px auto;
  font-family: 'Roboto', sans-serif;
}

.subscription-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.buy-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 400px;
}

.input-container {
  margin-bottom: 20px;

  .discount-label {
    display: block;
    margin-bottom: 8px;
    font-size: 1.1rem;
    color: #666;
  }

  .input-with-button {
    position: relative;
    width: 100%;

    input {
      width: 100%;
      padding: 12px;
      padding-right: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 1rem;
    }

    .apply-button {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: #ff6f61;
      color: #fff;
      border: none;
      padding: 0 15px;
      border-radius: 0 8px 8px 0;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #e65b52;
      }
    }
  }
}

.final-price-container {
  font-size: 1.4rem;
  color: #333;
  margin: 20px 0;
  text-align: center;

  .final-price {
    font-weight: bold;
    color: #4caf50;
    margin-left: 10px;
  }

  .text-final-price {
    display: flex;
    align-items: flex-end;
    font-size: 20px;
  }
}

.additional-info {
  font-size: 1rem;
  color: #777;
  margin-bottom: 20px;
  text-align: center;
}

.pay-button {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 15px 20px;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #43a047;
  }
}

@media (max-width: 600px) {
  .subscription-container {
    padding: 10px;
  }

  .buy-card {
    width: 100%;
    padding: 15px;
  }

  .final-price-container {
    font-size: 1.2rem;
  }

  .pay-button {
    font-size: 1rem;
    padding: 10px;
  }
}
</style>
