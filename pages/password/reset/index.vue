<template>
  <div class="container mb-5">
    <div class="reset-container">
      <img class="reset-image" src="/image/background.jpg" alt="">

      <div class="reset-form-wrapper">
        <h2 class="reset-title">بازیابی رمز عبور</h2>

        <VeeForm class="reset-form" @submit="onSubmit">
          <div class="reset-form-control">
            <VeeField
              name="phone"
              class="reset-input"
              type="tel"
              rules="required|phone"
            />
            <label class="reset-label">شماره همراه</label>
            <ErrorMessage name="phone" as="span" class="error-message" />
          </div>

          <div class="reset-form-control">
            <VeeField name="email" class="reset-input" type="email" rules="email" />
            <label class="reset-label">ایمیل</label>
            <ErrorMessage name="email" as="span" class="error-message" />
          </div>

          <button type="submit" class="reset-submit">ارسال کد فعال سازی</button>
        </VeeForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: ['redirect-if-authenticated'],
});

// SEO metadata
useSeoMeta({
  title: 'بازیابی رمز عبور',
  description: 'صفحه بازیابی رمز عبور برای کاربران.',
  keywords: 'بازیابی, رمز عبور, امنیت',
  ogTitle: 'بازیابی رمز عبور',
  ogDescription: 'صفحه بازیابی رمز عبور برای کاربران.',
  ogType: 'website',
  ogUrl: 'https://fiatre.ir/password/reset',
  ogImage: 'https://fiatre.ir/og-image.jpg',
  robots: 'index, follow',
});

import { ErrorMessage } from 'vee-validate';
import { useValidationRules } from '@/utils/validationRules';
import { toast } from 'vue3-toastify';

useValidationRules();

const onSubmit = async (values: any) => {
  try {
    if (!values.phone) {
      toast.warning('لطفا شماره تلفن را وارد کنید');
      return;
    }

    const formattedPhone = values.phone.replace(/\s+/g, '').replace(/[^0-9]/g, '');

    const { data, error } = await useApiFetch('/api/auth/login/code/', {
      method: 'POST',
      body: {
        phone: formattedPhone
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (data.value) {
      toast.success(data.value.message);
      localStorage.setItem('resetPhone', formattedPhone);
      await navigateTo('/password/reset/confirm');
      return;
    }

    if (error.value) {
      const status = error.value.statusCode;
      const errorMessage = error.value.data?.error || error.value.data?.detail;

      switch (status) {
        case 404:
          toast.error(errorMessage || 'کاربری با این شماره موبایل وجود ندارد!');
          break;
        default:
          toast.error(errorMessage || 'خطا در ارتباط با سرور. لطفا دوباره تلاش کنید.');
          break;
      }
    }

  } catch (err: any) {
    console.error('API Error:', err);
    toast.error(err.message || 'خطا در ارتباط با سرور. لطفا دوباره تلاش کنید.');
  }
};
</script>

<style lang="scss">
.reset-container {
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #000 url('/image/thisis.jpg') center/cover no-repeat;
  position: relative;

  .reset-image {
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

.reset-form-wrapper {
  width: 100%;
  max-width: 450px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.75);
  border-radius: 8px;
  text-align: center;

  .reset-title {
    color: #fff;
    font-size: 2rem;
  }

  .reset-form {
    margin: 25px 0 65px;

    .reset-form-control {
      height: 50px;
      position: relative;
      margin-bottom: 30px;

      .reset-input {
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

      .reset-label {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1rem;
        pointer-events: none;
        color: #8c8c8c;
        transition: all 0.1s ease;
      }

      .reset-input:focus + .reset-label,
      .reset-input[has-value] + .reset-label {
        font-size: 0.75rem;
        transform: translateY(-130%);
      }
    }

    .reset-submit {
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
</style>