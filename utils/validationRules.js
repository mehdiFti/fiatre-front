import { defineRule, configure } from 'vee-validate';
import { required, email, min, digits, alpha, numeric } from '@vee-validate/rules';

// Register rules
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('digits', digits);
defineRule('alpha', alpha);
defineRule('numeric', numeric); 
defineRule('password_custom', (value) => {
  return /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{}|;:,.<>?]+$/.test(value) || 'اعداد، حروف انگلیسی و نمادها مجاز هستند';
});

// Custom rule for password to ensure no non-English characters
defineRule('name', (value) => {
  return /^[\w@%]+$/.test(value) || 'از کلمات انگلیسی استفاده کنید';
});

// Custom phone number rule
defineRule('phone', (value) => {
  if (!/^09/.test(value)) {
    return 'شماره همراه با 09 شروع میشود';
  }
  if (!/^\d{11}$/.test(value)) {
    return 'شماره همراه باید 11 رقم باشد';
  }
  return true;
});

// Custom rules for name
defineRule('alpha_custom', (value) => {
  if (value.length < 3) {
    return 'حداقل سه حرف باشد';
  }
  return /^[a-zA-Z\u0600-\u06FF]+$/.test(value) || 'فقط حروف مجاز هستند';
});

// Custom rule for confirming password
defineRule('confirmed', (value, [target], ctx) => {
  return value === ctx.form[target] || 'رمزهای عبور مطابقت ندارند';
});

// Configure global error messages
configure({
  generateMessage: (ctx) => {
    const messages = {
      required: 'این بخش نباید خالی باشد',
      email: 'ایمیل فرمت درستی ندارد',
      min: 'حداقل 8 کرکتر باید باشد',
      confirmed: 'رمزهای عبور مطابقت ندارند',
      alpha: 'فقط حروف مجاز هستند',
      numeric: 'فقط اعداد مجاز هستند',
      password: 'فقط حروف انگلیسی و نمادها مجاز هستند',
      phone: 'شماره همراه باید 11 رقم باشد',
      alpha_custom: 'فقط حروف مجاز هستند',
    };
    return messages[ctx.rule.name] || `The field ${ctx.field} is invalid`;
  },
});

// Export a function to use the rules in any component
export const useValidationRules = () => {
  // You can return any additional logic if needed
};
