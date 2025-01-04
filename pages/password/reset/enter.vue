<template>
  <div class="container mb-5">
    <div class="login-container">
      <img class="login-image" src="/image/background.jpg" alt="login-image" />

      <div class="login-form-wrapper">
        <h2 class="login-title">
         بازیابی رمز عبور
        </h2>

        <VeeForm
          class="login-form"
          :validate-on-blur="true"
          :validate-on-change="true"
          :validate-on-input="false"
          :validate-on-model-update="true"
          @submit="onSubmit"

        >
          <div class="login-form-control">
            <VeeField
              v-model="formData.password"
              name="password"
              class="login-input"
              type="password"
              rules="required|min:8"
              autocomplete="new-password"
            />

            <label class="login-label">
             رمز جدید
            </label>

            <ErrorMessage name="password" as="span" class="error-message" />
          </div>
          <div class="login-form-control">
            <VeeField
              v-model="formData.password2"
              name="password2"
              class="login-input"
              type="password"
              rules="required|confirmed:password"
              autocomplete="new-password"
            />

            <label class="login-label">
              تکرار رمز جدید
            </label>

            <ErrorMessage name="password2" as="span" class="error-message" />
          </div>

          <div class="login-btn">
            <button type="submit" class="login-submit"> تائید </button>

          </div>
        </VeeForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ErrorMessage, useForm, Field as VeeField, Form as VeeForm } from 'vee-validate';
import { useValidationRules } from '@/utils/validationRules';
import { toast } from 'vue3-toastify';

definePageMeta({
middleware: ['redirect-to-login'],
});
useValidationRules();

const formData = ref({
  password: '',
  password2: '',
});

const { handleSubmit } = useForm({
  initialValues: formData.value
});

const requestNewCode = async () => {
  const phone = localStorage.getItem('resetPhone');
  if (!phone) {
    toast.error('شماره تلفن یافت نشد');
    return navigateTo('/password/reset');
  }

  try {
    const { data, error } = await useAuthFetch('/api/auth/profile/', {
      method: 'PATCH',
      body: { phone },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (error.value) {
      toast.error(error.value.data?.error || 'خطا در ارسال کد جدید');
      return;
    }

    if (data.value) {
      toast.success('کد جدید ارسال شد');
      await navigateTo('/password/reset/confirm');
    }
  } catch (err) {
    console.error('Error requesting new code:', err);
    toast.error('خطا در ارسال کد جدید');
  }
};

const profileEditRequest = useAuthFetch('/api/auth/profile/', {
      method: 'PATCH',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      immediate: false,
      watch: false,
      credentials: 'include'
    });

const onSubmit = handleSubmit(async () => {
  try {
    const code = localStorage.getItem('verificationCode');
    const phone = localStorage.getItem('resetPhone');

    if (!code || !phone) {
      toast.error('اطلاعات ناقص است. لطفا دوباره تلاش کنید');
      return navigateTo('/password/reset');
    }

    const requestData = {
      password: formData.value.password,
      password2: formData.value.password2,
      code: code
    };

    await profileEditRequest.execute();

    if (profileEditRequest.error.value) {
      console.error('Error response:', profileEditRequest.error.value);
      
      const errorMessage = profileEditRequest.error.value.data?.error || profileEditRequest.error.value.data?.message;
      if (errorMessage?.includes('کد')) {
        const shouldRequestNew = confirm('کد وارد شده اشتباه است. آیا میخواهید کد جدید دریافت کنید؟');
        if (shouldRequestNew) {
          await requestNewCode();
        }
        return;
      }

      toast.error(errorMessage || 'خطا در تغییر رمز عبور');
      return;
    }

    if (profileEditRequest.data.value) {
      toast.success('رمز عبور با موفقیت تغییر کرد');
      localStorage.removeItem('resetPhone');
      localStorage.removeItem('verificationCode');
      await navigateTo('/account');
    }

  } catch (err) {
    console.error('API Error:', err);
    toast.error('خطا در ارتباط با سرور. لطفا دوباره تلاش کنید.');
  }
});
</script>

<style lang="scss">



.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  z-index: 100;

  position: relative;
  .login-image {
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

.login-form-wrapper {
  width: 100%;
  max-width: 450px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.75);
  border-radius: 8px;
  text-align: center;

  .login-title {
    color: $white;
    font-size: 2rem;
  }

  .login-form {
    margin: 25px 0 65px;

    .login-form-control {
      height: 50px;
      position: relative;
      margin-bottom: 30px;

      .login-input {
        height: 100%;
        width: 100%;
        border: none;
        outline: none;
        border-radius: 4px;
        color: $dark;
        font-size: 1rem;
        padding: 0 20px;
        direction: rtl;
      }

      .login-input:focus + .login-label,
      .login-input[has-value] + .login-label {
        font-size: 0.75rem;
        transform: translateY(-130%);
      }

      .login-label {
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
    .login-btn {
      display: flex;
      flex-direction: column;
      gap: 25px;

      .login-submit {
      width: 100%;
      padding: 16px 0;
      font-size: 1rem;
      background: $third;
      color: $white;
      font-weight: 500;
      border-radius: 4px;
      border: none;
      outline: none;
      cursor: pointer;
      transition: 0.1s ease;

      &:hover {
        background: darken($third,10);
      }
    }

  }

  .error-message {
    color: $danger;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
}

}
</style>

