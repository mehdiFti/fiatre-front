<template>
  <main class="container mb-5">
    <section class="register-container" dir="rtl">
      <img class="register-image" src="/image/background.jpg" alt=""/>
      <div class="register-form-wrapper">
        <h1 class="register-title">ثبت نام</h1>
        <VeeForm
          class="register-form"
          :validate-on-blur="true"
          :validate-on-change="true"
          :validate-on-input="false"
          :validate-on-model-update="true"
          @submit="onSubmit"
        >
          <div class="register-form-control">
            <VeeField
              v-model="values.lastname"
              name="lastname"
              class="register-input"
              rules="required|alpha_custom"
            />
            <label class="register-label">نام</label>
            <ErrorMessage name="lastname" as="span" class="error-message" />
          </div>

          <div class="register-form-control">
            <VeeField
              v-model="values.familyname"
              name="familyname"
              class="register-input"
              rules="required|alpha_custom"
            />
            <label class="register-label">نام خانوادگی</label>
            <ErrorMessage name="familyname" as="span" class="error-message" />
          </div>

          <div class="register-form-control">
            <VeeField
              v-model="values.phone"
              name="phone"
              class="register-input"
              type="tel"
              rules="required|phone"
            />
            <label class="register-label">شماره همراه</label>
            <ErrorMessage name="phone" as="span" class="error-message" />
          </div>

          <div class="register-form-control">
            <VeeField
              v-model="values.email"
              name="email"
              class="register-input"
              type="email"
              rules="required|email"
            />
            <label class="register-label">ایمیل</label>
            <ErrorMessage name="email" as="span" class="error-message" />
          </div>

          <div class="register-form-control">
            <VeeField
              v-model="values.password"
              name="password"
              class="register-input"
              type="password"
              rules="required|min:8|password_custom"
            />
            <label for="password" class="register-label">رمز</label>
            <ErrorMessage name="password" as="span" class="error-message" />
          </div>

          <div class="register-form-control">
            <VeeField
              v-model="values.repeat_password"
              name="repeat_password"
              class="register-input"
              type="password"
              rules="required|confirmed:password"
            />
            <label for="password" class="register-label">تکرار رمز</label>
            <ErrorMessage name="repeat_password" as="span" class="error-message" />
          </div>

          <div class="register-form-control">
            <VeeField
              name="terms"
              type="checkbox"
              :value="true"
              :unchecked-value="false"
              v-slot="{ field }"
            >
              <span class="terms-text">
                <NuxtLink to="/terms" target="_blank" style="color: #fe0100;">شرایط و قوانین فیاتر</NuxtLink> را می‌پذیرم و بیشتر از 15 سال سن دارم.
              </span>
              <label for="terms" class="register-label" />
            </VeeField>
          </div>
          <button type="submit" class="register-submit">ثبت نام</button>
        </VeeForm>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'ثبت نام',
  description: 'صفحه ثبت نام در سایت FIATRE برای دسترسی به خدمات و محتوای ویژه.',
  keywords: 'ثبت نام, FIATRE, عضویت, خدمات ویژه, محتوای ویژه',
  ogTitle: 'ثبت نام',
  ogDescription: 'صفحه ثبت نام در سایت FIATRE برای دسترسی به خدمات و محتوای ویژه.',
  ogType: 'website',
  ogUrl: 'https://fiatre.ir/register',
  ogImage: 'https://fiatre.ir/og-image.jpg',
  robots: 'index, follow'
});
import { useValidationRules } from '@/utils/validationRules';
import { ErrorMessage, useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
useValidationRules();

const router = useRouter();
const isLoading = ref(false);

const initialValues = {
  lastname: '',
  familyname: '',
  phone: '',
  email: '',
  password: '',
  repeat_password: '',
};

const { handleSubmit, values } = useForm({
  initialValues,
  validateOnMount: false
});

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;

    const { data, error } = await useAuthFetch('/api/auth/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: values.lastname,
        last_name: values.familyname,
        email: values.email,
        phone: values.phone,
        password: values.password,
        password2: values.repeat_password,
        remember_me: true
      }),
      credentials: 'include'
    });

    if (error.value) {
      if (error.value.data?.non_field_errors) {
        toast.error(error.value.data.non_field_errors[0]);
      } else if (error.value.data) {
        const messages = Object.values(error.value.data)
          .flat()
          .join('\n');
         toast.error(messages);
      } else {
        toast.error('خطا در ثبت نام');
      }
      return;
    }

    if (data.value) {
      toast.success('ثبت نام با موفقیت انجام شد');
      await navigateTo('/');
    }
  } catch (err) {
    toast.error('خطا در ارتباط با سرور');
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped lang="scss">
.register-container {
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .register-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    filter: brightness(45%);
  }

  .register-form-wrapper {
    width: 100%;
    max-width: 450px;
    margin: 40px 0;
    padding: 40px;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 8px;
    text-align: center;
    position: relative;

    .register-title {
      color: $white;
      font-size: 2rem;
    }

    .register-form {
      margin: 25px 0 65px;

      .register-form-control {
        height: 50px;
        position: relative;
        margin-bottom: 30px;

        .register-input {
          height: 100%;
          width: 100%;
          border: none;
          outline: none;
          border-radius: 4px;
          color: $dark;
          font-size: 1rem;
          padding: 0 20px;
          direction: rtl;

          &:focus + .register-label,
          &[has-value] + .register-label {
            font-size: 0.75rem;
            transform: translateY(-130%);
          }
        }

        .register-label {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1rem;
          pointer-events: none;
          color: $gray-500;
          transition: all 0.1s ease;
          display: flex;
        }

        .error-message {
          color: $danger;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }
      }

      .register-submit {
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
          background: darken($third, 10);
        }
      }
    }

    .terms-text {
      color: #797979;
      display: block;
      margin-bottom: 10px;
    }
  }
}

@media (max-width: 455px) {
  .terms-text {
    font-size: 0.875rem;
    text-align: center;
  }
}
</style>
