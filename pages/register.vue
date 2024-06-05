<template>
  <div class="login-container">
    <img class="login-image" src="/public/image/thisis.jpg" alt="">

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
        @submit.prevent="onSubmit"
      >
        <div class="login-form-control">
          <VeeField
            name="email"
            class="login-input"
            type="email"
            rules="required|email"
          />

          <label class="login-label">
            ایمیل یا شماره همراه
          </label>

          <ErrorMessage name="email" as="span" class="error-message" />
        </div>

        <div class="login-form-control">
          <VeeField
            name="password"
            class="login-input"
            type="password"
            rules="required|min:8|password"
          />

          <label class="login-label">
            رمز
          </label>

          <ErrorMessage name="password" as="span" class="error-message" />
        </div>

        <button type="submit" class="login-submit">ورود به فیاتر</button>

        <div class="login-form-help">
          <div class="login-remember-me">
            <VeeField id="login-remember-me" name="remember" type="checkbox" />

            <label for="login-remember-me">
              رمز را به یاد داشته باش
            </label>
          </div>
        </div>
      </VeeForm>
    </div>
  </div>
</template>

<script setup>
import {defineRule, configure, ErrorMessage} from 'vee-validate';
import {required, email, min} from '@vee-validate/rules';
import {ref} from 'vue';

// Custom rule for password to ensure no non-English characters
defineRule('password', (value) => {
  const regex = /^[\w@%]+$/; // English letters, numbers, and @, %
  if (!regex.test(value)) {
    return 'از کلمات انگلیسی استفاده کنید';
  }
  return true;
});

// Register rules
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);

// Configure global error messages
configure({
  generateMessage: (ctx) => {
    const messages = {
      required: 'این بخش نباید خالی باشد',
      email: 'این ایمیل فرمت درستی ندارد',
      min: 'حداقل 8 کرکتر باید باشد',
    };
    return messages[ctx.rule.name] ? messages[ctx.rule.name] : `The field ${ctx.field} is invalid`;
  },
});

const onSubmit = () => {
  console.log('onSubmit');
};
</script>

<style lang="scss">
.login-container {
  background-position: center;

  .login-image {
    filter: brightness(45%);
  }
}

.login-form-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 4px;
  padding: 70px;
  width: 450px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.75);

  .login-title {
    color: #fff;
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
        color: black;
        font-size: 1rem;
        padding: 0 20px;
        direction: rtl;
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

    .login-submit {
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

    .login-form-help {
      display: flex;
      justify-content: space-between;

      .login-remember-me {
        display: flex;

        .login-input {
          margin-right: 5px;
          accent-color: #b3b3b3;
        }

        .login-label {
          font-size: 0.9rem;
        }
      }
    }
  }
}

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
