<template>
  <div class="container mb-5">


  <div class="confirm-container">
    <img class="confirm-image" src="/image/background.jpg" alt="">

    <div class="confirm-form-wrapper">
      <h2 class="confirm-title">کد فعال سازی را وارد کنید</h2>

      <VeeForm class="confirm-form" @submit="onSubmit">
        <div class="confirm-form-control">
          <VeeField
            v-model="values.code"
            name="code"
            class="confirm-input"
            type="text"
            rules="required|digits:5"
            placeholder="کد تایید را وارد کنید"
          />
          <label class="confirm-label">کد تایید</label>
          <ErrorMessage name="code" as="span" class="error-message" />
        </div>
        <nuxt-link to="/password/reset">شماره همراه / ایمیل را اشتباه وارد کرده ام</nuxt-link>
        <button type="submit" class="confirm-submit">بازیابی رمز</button>
        <p class="confirm-countdown">{{ countdown }} ثانیه تا دریافت مجدد کد فعال سازی</p>
      </VeeForm>

    </div>
  </div>
</div>
</template>

<script setup lang="ts">
useSeoMeta({
title: 'تأیید کد فعال سازی',
description: 'صفحه تأیید کد فعال سازی برای کاربران.',
keywords: 'تأیید, کد فعال سازی, امنیت',
ogTitle: 'تأیید کد فعال سازی',
ogDescription: 'صفحه تأیید کد فعال سازی برای کاربران.',
ogType: 'website',
ogUrl: 'https://fiatre.ir/password/reset/confirm',
ogImage: 'https://fiatre.ir/og-image-confirm.jpg',
robots: 'index, follow',
});       

import { ref, onMounted, onUnmounted } from 'vue';
import { useValidationRules } from '@/utils/validationRules'; 
import { ErrorMessage, useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

definePageMeta({
middleware: ['redirect-if-authenticated'],
});
useValidationRules(); 

const { handleSubmit, values } = useForm({
initialValues: {
  code: ''
}
});
const router = useRouter(); 
const userStore = useUserStore();

const countdown = ref(180);
let countdownInterval: NodeJS.Timeout;

const startCountdown = () => {
countdownInterval = setInterval(() => {
  if (countdown.value > 0) {
    countdown.value--;
  } else {
    clearInterval(countdownInterval);
  }
}, 1000);
};

onMounted(() => {
startCountdown();
});

onUnmounted(() => {
clearInterval(countdownInterval);
});

const onSubmit = handleSubmit(async (values) => {
  try {
    const phone = localStorage.getItem('resetPhone');
    
    const { data, error } = await useApiFetch('/api/auth/login/code/confirm/', {
      method: 'POST',
      body: {
        code: values.code,
        phone: phone
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (error.value) {
      toast.error(error.value.data?.error || 'خطا در تایید کد');
      return;
    }

    if (data.value) {
      // Store the verification code for password reset
      localStorage.setItem('verificationCode', values.code);
      userStore.setLoginData(data.value.refresh, data.value.access, data.value.user);
      toast.success('کد با موفقیت تایید شد');
      await navigateTo('/password/reset/enter');
    }
  } catch (err) {
    console.error('API Error:', err);
    toast.error('خطا در ارتباط با سرور. لطفا دوباره تلاش کنید.');
  }
});
</script>

<style lang="scss">
.confirm-container {
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;

  .confirm-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    filter: brightness(45%);
  }
}

.confirm-form-wrapper {
  width: 100%;
  max-width: 450px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.75);
  border-radius: 8px;
  text-align: center;

  .confirm-title {
    color: #fff;
    font-size: 2rem;
  }

  .confirm-form {
    margin: 25px 0 65px;

    .confirm-form-control {
      height: 50px;
      position: relative;
      margin-bottom: 30px;

      .confirm-input {
        height: 100%;
        width: 100%;
        border: none;
        outline: none;
        border-radius: 4px;
        color: black;
        font-size: 1rem;
        padding: 0 20px;
        direction: rtl;
      }

      .confirm-input:focus + .confirm-label,
      .confirm-input[has-value] + .confirm-label {
        font-size: 0.75rem;
        transform: translateY(-130%);
      }

      .confirm-label {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1rem;
        pointer-events: none;
        color: #8c8c8c;
        transition: all 0.1s ease;
      }
    }

    .confirm-submit {
      width: 100%;
      padding: 16px 0;
      font-size: 1rem;
      background: #e50914;
      color: #fff;
      font-weight: 500;
      border-radius: 4px;
      border: none;
      outline: none;
      margin: 25px 0 10px;
      cursor: pointer;
      transition: 0.1s ease;

      &:hover {
        background: #c40812;
      }
    }
  }

  .error-message {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
}

.confirm-countdown {
  color: $white;
}
</style>