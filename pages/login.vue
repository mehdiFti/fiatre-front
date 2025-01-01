<template>
  <div class="container mb-5">
    <div class="login-container">
      <img class="login-image" src="/image/background.jpg" alt="login-image" />

      <div class="login-form-wrapper">


        <h2 class="login-title">
          ورود
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
              v-model="form.phone"
              name="phone"
              class="login-input"
              type="tel"
              rules="required|phone"
            />

            <label class="login-label">
              شماره همراه
            </label>

            <ErrorMessage name="phone" as="span" class="error-message" />
          </div>

          <div class="login-form-control">
            <VeeField
              v-model="form.password"
              name="password"
              class="login-input"
              :type="isPasswordVisible ? 'text' : 'password'"
              rules="required|min:8|password_custom"
            />

            <label class="login-label">
              رمز
            </label>

            <button 
              type="button" 
              @click="togglePasswordVisibility" 
              class="toggle-password-visibility"
            >
              <nuxt-icon 
                :name="isPasswordVisible ? 'eye-off' : 'eye'" 
                class="icon-move-up" 
              />
            </button>

            <ErrorMessage name="password" as="span" class="error-message" />
          </div>

          <div class="login-btn">
            <button type="submit" class="login-submit">
              {{ isLoading ? 'لطفا منتظر بمانید' : 'ورود به فیاتر' }}
            </button>

            <NuxtLink to="/password/reset" class="login-forget">
              بازیابی رمز عبور
            </NuxtLink>
          </div>
        </VeeForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useValidationRules} from '@/utils/validationRules';
import {ErrorMessage, useForm, Field as VeeField, Form as VeeForm} from 'vee-validate';
import {ref} from 'vue';
import { toast } from 'vue3-toastify';

definePageMeta({
  middleware: ['redirect-if-authenticated'],
});

const route = useRoute();
const router = useRouter();
const userStore = useUserStore(); 

useSeoMeta({
  title: 'ورود',
  description: 'صفحه ورود به سایت برای دسترسی به حساب کاربری و مشاهده محتوای شخصی.',
  keywords: 'ورود, سایت, کاربر, رمز عبور',
  ogTitle: 'ورود',
  ogDescription: 'صفحه ورود به سایت برای دسترسی به حساب کاربری و مشاهده محتوای شخصی.',
  ogType: 'website',
  ogUrl: 'https://fiatre.ir/login',
  ogImage: 'https://fiatre.ir/og-image.jpg',
  robots: 'index, follow',
});
useValidationRules();

const form = ref({
  phone: '',
  password: '',
});

const {handleSubmit} = useForm({
  initialValues: form.value,
});

const isPasswordVisible = ref(false);
const isLoading = ref(false);

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  
  try {
    userStore.phone = form.value.phone;
    userStore.password = form.value.password;
    await userStore.loginPostRequest.execute();
console.log(userStore.loginPostRequest.status.value, userStore.loginPostRequest)
    if (userStore.loginPostRequest.status.value === 'success') {
        const redirect = route.query.redirect;
        if (redirect) {
            await router.push(decodeURIComponent(redirect as string));
        } else {
          console.log('router.push /account');
          
            await router.push('/account');
        }
    } else if (userStore.loginPostRequest.error.value.statusCode === 400) {
      toast.error(userStore.loginPostRequest.error.value.data.error);
    } else {
      toast.error(userStore.loginPostRequest.error.value.message);
    }
  } finally {
    isLoading.value = false;
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

    .login-forget {
      width: 35%;
      padding: 6px 0;
      font-size: 0.7rem;
      background: $primary;
      color: $white;
      border-radius: 4px;
      border: none;
      outline: none;
      cursor: pointer;
      transition: 0.1s ease;

      &:hover {
        background: darken($primary,10);
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

.toggle-password-visibility {
  position: absolute;
  left: 35px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  color: #8c8c8c;

  &:hover {
    color: $dark;
  }
}

.login-form-control {
  .login-input {
    padding-right: 40px;
  }
}

.icon-move-up {
  display: block;
   transform: translateX(10px) !important;
  width: 20px;
  height: 20px;
}
</style>
