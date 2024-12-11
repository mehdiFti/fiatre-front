<template>
    <div class="container mb-5">
      <div @click="onClicked">
        dd
      </div>
  
      <div @click="onClicked2">
        dd2
      </div>
  
      <div class="login-container">
        <NuxtImg class="login-image" src="/image/thisis.jpg" alt="login-image" />
  
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
      alert('شماره تلفن یافت نشد');
      return navigateTo('/password/reset');
    }

    try {
      const { data, error } = await useAuthFetch('/api/auth/login/code/', {
        method: 'POST',
        body: { phone },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (error.value) {
        alert(error.value.data?.error || 'خطا در ارسال کد جدید');
        return;
      }

      if (data.value) {
        alert('کد جدید ارسال شد');
        await navigateTo('/password/reset/confirm');
      }
    } catch (err) {
      console.error('Error requesting new code:', err);
      alert('خطا در ارسال کد جدید');
    }
  };
  
  const onSubmit = handleSubmit(async () => {
    try {
      const code = localStorage.getItem('verificationCode');
      const phone = localStorage.getItem('resetPhone');
      const confirmationResponse = localStorage.getItem('confirmationResponse');
      
      console.log('Stored confirmation response:', confirmationResponse);
      
      if (!code || !phone) {
        alert('اطلاعات ناقص است. لطفا دوباره تلاش کنید');
        return navigateTo('/password/reset');
      }

      // Format code to ensure it's exactly 5 digits
      // const formattedCode = code.padStart(5, '0');
console.log();

      const requestData = {
        password: formData.value.password,
        password2: formData.value.password2,
        code,
        phone, // Try including phone in the request
      };

      console.log('Sending request with:', requestData);
      // console.log('Using access token:', accessToken.value);
      console.log('Using verification code:', code);

      const { data, error } = await useAuthFetch('/api/auth/password/reset/enter/', {
        method: 'POST',
        body: requestData,
      });

      if (error.value) {
        console.error('Full error details:', {
          status: error.value.status,
          statusText: error.value.statusText,
          data: error.value.data,
          message: error.value.message
        });
        
        if (error.value.data?.error === 'کد وارد شده اشتباه است! دوباره درخواست کنید.') {
          // Log the stored code and confirmation response for debugging
          console.log('Stored code:', code);
          console.log('Confirmation response:', confirmationResponse);
          
          const shouldRequestNew = confirm('کد وارد شده اشتباه است. آیا میخواهید کد جدید دریافت کنید؟');
          if (shouldRequestNew) {
            await requestNewCode();
          }
          return;
        }

        alert(error.value.data?.error || error.value.data?.message || 'خطا در تغییر رمز عبور');
        return;
      }

      if (data.value) {
        alert('رمز عبور با موفقیت تغییر کرد');
        localStorage.removeItem('resetPhone');
        localStorage.removeItem('verificationCode');
        localStorage.removeItem('confirmationResponse');
        // accessToken.value = null;
        // refreshToken.value = null;
        await navigateTo('/profile');
      }

    } catch (err) {
      console.error('Full API Error:', err);
      alert('خطا در ارتباط با سرور. لطفا دوباره تلاش کنید.');
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
  
