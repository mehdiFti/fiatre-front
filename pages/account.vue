<template>
  <main  v-if="profileRequest.status.value === 'success'" class="container mb-5">
    <section class="profile-container">
      <img class="profile-image" src="/image/background.jpg" alt="پروفایل کاربر">
      <div class="profile-form-wrapper">
          <h2 class="profile-title">ویرایش پروفایل</h2>
        <VeeForm :initialValues="form" @submit="handleSubmit" class="profile-form">
          <div class="avatar-subs">
            <Avatar 
              ref="avatarRef"
              :profile-avatar="profileData?.avatar" 
              @avatar-change="handleAvatarChange"
            />
            <SubscriptionDuration/>
          </div>
          <div class="profile-form-control">
            <VeeField name="name" rules="required|alpha_custom" v-slot="{ field, errors }">
              <input
                id="name"
                v-bind="field"
                v-model="form.name"
                :disabled="!isEditing"
                type="text"
                :class="[`dir-${getDirection(form.name)}`]"
                class="profile-input"
                :has-value="!!form.name"
                @input="handleInputChange"
              />
              <label for="name" class="profile-label">نام:</label>
              <span v-if="errors.length" class="error-message">{{ errors[0] }}</span>
            </VeeField>
          </div>
          <div class="profile-form-control">
            <VeeField name="lastname" rules="required|alpha_custom" v-slot="{ field, errors }">
              <input
                id="lastname"
                v-bind="field"
                v-model="form.lastname"
                :disabled="!isEditing"
                type="text"
                class="profile-input"
                :class="[`dir-${getDirection(form.lastname)}`]"
                :has-value="!!form.lastname"
                @input="handleInputChange"
              />
              <label for="lastname" class="profile-label">نام خانوادگی:</label>
              <span v-if="errors.length" class="error-message">{{ errors[0] }}</span>
            </VeeField>
          </div>
          <div class="profile-form-control">
            <VeeField name="email" rules="required|email" v-slot="{ field, errors }">
              <input
                id="email"
                v-bind="field"
                v-model="form.email"
                :disabled="!isEditing"
                type="email"
                class="profile-input"
                @input="handleInputChange"
              />
              <label for="email" class="profile-label">ایمیل:</label>
              <span v-if="errors.length" class="error-message">{{ errors[0] }}</span>
            </VeeField>
          </div>
          <div class="profile-form-control">
            <VeeField name="phone" rules="required|phone" v-slot="{ field, errors }">
              <input
                id="phone"
                v-bind="field"
                v-model="form.phone"
                :disabled="!isEditing"
                type="text"
                class="profile-input"
                @input="handleInputChange"
              />
              <label for="phone" class="profile-label">شماره تماس:</label>
              <span v-if="errors.length" class="error-message">{{ errors[0] }}</span>
            </VeeField>
          </div>
          <div class="profile-form-control">
            <VeeField name="password" :rules="passwordRules" v-slot="{ field, errors }">
              <input
                id="password"
                v-bind="field"
                v-model="form.password"
                :disabled="!isEditing"
                :type="isPasswordVisible ? 'text' : 'password'" 
                class="profile-input"
                @input="handleInputChange"
              />
              <label for="password" class="profile-label"> تغییر رمز:</label>
              <span v-if="errors.length" class="error-message">{{ errors[0] }}</span>
              <button type="button" @click="togglePasswordVisibility" class="toggle-password-visibility">
                <nuxt-icon :name="isPasswordVisible ? 'eye-off' : 'eye'" class="icon-move-up" />
              </button>
            </VeeField>
          </div>
          <button v-if="!isEditing" @click="toggleEditMode" class="profile-submit">
            ویرایش اطلاعات
          </button>
          <button v-else type="submit" :disabled="!canSubmit" class="profile-submit">
            اعمال تغییرات
          </button>
          <button @click="handleLogout" class="profile-submit-exit">
            خارج شدن از حساب
          </button>
        </VeeForm>
      </div>
    </section>
  </main>

  <main class="container" v-else-if="profileRequest.status.value === 'pending'">pending</main>

  <main class="container" v-else-if="profileRequest.status.value === 'error'">error</main>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Form as VeeForm, Field as VeeField, useForm } from 'vee-validate';
import Avatar from '~/components/core/Avatar.vue';
import { useValidationRules } from '~/utils/validationRules';
import SubscriptionDuration from '~/components/core/SubscriptionDuration.vue';
import { useRouter, useRoute  } from 'vue-router';
import { toast } from 'vue3-toastify';

definePageMeta({
  middleware: ['redirect-to-login'],
});
useSeoMeta({
  title: 'ویرایش پروفایل',
  description: 'صفحه ویرایش پروفایل در سایت برای به‌روزرسانی اطلاعات کاربری.',
  keywords: 'ویرایش پروفایل, اطلاعات کاربری, سایت',
  ogTitle: 'ویرایش پروفایل',
  ogDescription: 'صفحه ویرایش پروفایل در سایت برای به‌روزرسانی اطلاعات کاربری.',
  ogType: 'website',
  ogUrl: 'https://fiatre.ir/account',
  ogImage: 'https://fiatre.ir/og-image.jpg',
  robots: 'index, follow',
});

useValidationRules();

const userStore = useUserStore();

const form = ref({
  name: '',
  lastname: '',
  email: '',
  password: '',
  phone: '',
  avatar: '',
  originalPassword: ''
});

const isEditing = ref(false);
const formChanged = ref(false);

const toggleEditMode = () => {
  isEditing.value = true;
  formChanged.value = false;
};

const { errors } = useForm({
  initialValues: form.value
});

const handleInputChange = () => {
  formChanged.value = true;
};

const canSubmit = computed(() => {
  return isEditing.value && formChanged.value && Object.keys(errors.value).length === 0;
});

const isPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const router = useRouter();

const handleLogout = () => {
  userStore.logout();
};

interface IProfile {
avatar:string;
bookmarks_count:number;
email:string;
first_name:string;
games_score:number;
id:number;
is_subscription_active:boolean;
is_watching:boolean;
last_name:string;
likes_count:number;
phone:string;
}
const profileRequest = await useAuthFetch<IProfile>('api/auth/profile');

const profileData = computed(() => profileRequest.data.value)

watch(profileData, (newVal) => {
  if (newVal) {
    form.value.name = newVal.first_name;
    form.value.lastname = newVal.last_name;
    form.value.email = newVal.email;
    form.value.phone = newVal.phone;
    form.value.avatar = newVal.avatar;
    form.value.password = '';
    form.value.originalPassword = '';
  }
}, {
  immediate: true
});

const getDirection = (val: string) => {
  return /^[a-zA-Z]/.test(val) ? 'ltr' : 'rtl'
}

// Define the computed property for the request body
const computedProfileBodyRequest = computed(() => {
  const body: any = {
    first_name: form.value.name,
    last_name: form.value.lastname,
    phone: form.value.phone,
    email: form.value.email,
  };

  // Only include password if it has been changed and is not empty
  if (form.value.password && form.value.password !== form.value.originalPassword) {
    body.password = form.value.password;
  }

  return body;
});

// Function to handle the PATCH request
const updateProfile = async () => {
  try {    
    const response = await useAuthFetch('/api/auth/profile/', {
      method: 'PATCH',
      body: computedProfileBodyRequest.value,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status.value === 'success') {
      toast.success('اطلاعات با موفقیت به‌روزرسانی شد!');
      isEditing.value = false;
      formChanged.value = false;
    } else {
      toast.error('خطا در به‌روزرسانی اطلاعات');
    }
  } catch (error) {
    toast.error('خطا در به‌روزرسانی اطلاعات');
  }
};

// Update the handleSubmit function to not rely on the event object
const handleSubmit = () => {
  if (canSubmit.value) {
    updateProfile();
  }
};

const passwordRules = computed(() => {
  return form.value.password ? 'min:8|password_custom' : '';
});

const avatarRef = ref(null);

const handleAvatarChange = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await useAuthFetch('/api/auth/profile/', {
      method: 'PATCH',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    if (response.status.value === 'success' && response.data.value?.avatar) {
      form.value.avatar = response.data.value.avatar;
    } else {
      console.error('Avatar update failed:', response);
    }
  } catch (error) {
    console.error('Error updating avatar:', error);
  } finally {
    avatarRef.value?.stopLoading();
  }
};

</script>

<style lang="scss">
.profile-container {
    position: relative;
  z-index: 1000;
  display: flex;
  padding: 40px 0;
  justify-content: center;
  align-items: center;


  .profile-image {
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

.profile-form-wrapper {
  width: 100%;
  max-width: 450px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.85);
  border-radius: 8px;
  text-align: center;
  overflow: hidden;

  .profile-title {
    color: $white;
    font-size: 2rem;
  }

  .profile-form {
    margin: 25px 0 65px;

    .profile-form-control {
      height: 50px;
      position: relative;
      margin-bottom: 30px;

      .profile-input {
        height: 100%;
        background-color: $white;
        width: 100%;
        border: none;
        outline: none;
        border-radius: 4px;
        color: $dark;
        font-size: 1rem;
        padding: 0 20px;
        direction: rtl;
        transition: background-color 0.3s ease;

        &:not(:disabled) {
          background-color: $gray-300; 
          font-style: italic;
          color: $white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

      }

      .profile-input:focus + .profile-label,
      .profile-input[has-value] + .profile-label {
        font-size: 0.75rem;
        transform: translateY(-130%);
      }

      .profile-label {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1rem;
        pointer-events: none;
        color: $dark;
        transition: all 0.1s ease;
        
      }

      .toggle-password-visibility {
      position: absolute;
      left: 45px;
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
    }

    .profile-submit {
      width: 100%;
      padding: 16px 0;
      font-size: 1rem;
      background: $primary;
      color: $white;
      font-weight: 500;
      border-radius: 4px;
      border: none;
      outline: none;
      margin: 25px 0 10px;
      cursor: pointer;
      transition: 0.1s ease;

      &:hover {
        background: darken($primary,10);
      }
    }
    .profile-submit-exit {
      width: 100%;
      padding: 16px 0;
      font-size: 1rem;
      background: $third;
      color: $white;
      font-weight: 500;
      border-radius: 4px;
      border: none;
      outline: none;
      margin: 25px 0 10px;
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

@media (max-width: 768px) {
  .profile-form-wrapper {
    padding: 20px;

    .profile-title {
      font-size: 1.5rem;
    }

    .profile-form-control {
      margin-bottom: 20px;

      .profile-input {
        font-size: 0.875rem;
        padding: 0 15px;
      }

      .profile-label {
        font-size: 0.875rem;
      }
    }

    .profile-submit {
      padding: 12px 0;
      font-size: 0.875rem;
    }
  }
}

@media (max-width: 480px) {
  .profile-form-wrapper {
    padding: 15px;

    .profile-title {
      font-size: 1.25rem;
    }

    .profile-form-control {
      margin-bottom: 15px;

      .profile-input {
        font-size: 0.75rem;
        padding: 0 10px;
      }

      .profile-label {
        font-size: 0.75rem;
      }
    }

    .profile-submit {
      padding: 10px 0;
      font-size: 0.75rem;
    }
  }
}
 .icon-move-up { 
  padding-left: 30px;

 }
.profile-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $white;
  cursor: pointer;
}
</style>
