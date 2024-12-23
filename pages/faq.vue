<template>
  <main class="container mb-5">
    <section v-for="(item, index) in faqs" :key="index" class="faq-item">
      <header 
        class="faq-question" 
        @click="toggleAnswer(index)"
        :aria-expanded="activeIndex === index"
        :aria-controls="'faq-collapse-' + index"
        role="button"
      >
        <p>{{ item.question }}</p>
        <i :class="{ 'icon-chevron-up': activeIndex === index, 'icon-chevron-down': activeIndex !== index }"></i>
      </header>
      <div 
        :id="'faq-collapse-' + index"
        class="collapse"
        :class="{ 'show': activeIndex === index }"
      >
        <article class="faq-answer">
          <p>{{ item.answer }}</p>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">

useSeoMeta({
  title: 'سوالات متداول',
  description: 'صفحه سوالات متداول در سایت برای پاسخ به سوالات کاربران.',
  keywords: 'سوالات متداول, پرسش و پاسخ, سایت',
  ogTitle: 'سوالات متداول',
  ogDescription: 'صفحه سوالات متداول در سایت برای پاسخ به سوالات کاربران.',
  ogType: 'website',
  ogUrl: 'https://fiatre.ir/faq',
  ogImage: 'https://fiatre.ir/og-image.jpg',
  robots: 'index, follow',
});

import { ref } from 'vue';

const faqs = [
  {
    question: "نحوه ثبت نام در سایت فیاتر چگونه است؟",
    answer: "ثبت نام در فیاتر با شماره تلفن همراه و ایمیل انجام می ‌گیرد. پس از انتخاب گزینه عضویت، اطلاعات (نام، نام خانوادگی، رمز عبور و ...) از شما دریافت می ‌شود."
  },
  {
    question: "چرا باید برای تماشای فیلم ‌ها اشتراک تهیه کنم؟",
    answer: "حقوق صاحبین اثر تمامی فیلم های ایرانی، خارجی، سریال‌ ها، انیمیشن‌ ها، و مستندات موجود در فیاتر، بصورت کاملا قانونی خریداری شده و در فیاتر قرار داده شده اند. شما با پرداخت مبلغ مربوط به خرید اشتراک، در عین اینکه فیلم را قانونی تماشا می کنید، از صاحبین اثر نیز حمایت می ‌کنید و باعث محتوای با کیفیت‌ تر خواهید شد. ضمنا شما با خرید اشتراک، در طول مدت تعیین شده، به تمامی محتواهای فیاتر دسترسی خواهید داشت و میتوانید هر کدام را هر چند بار که خواستید تماشا کنید."
  },
  {
    question: "چگونه می ‌توانم فیلم‌ های فیاتر را دانلود کنم؟",
    answer: "این قابلیت در پلن های سه و شش ماهه فراهم است."
  },
  {
    question: "با خرید اشتراک فیاتر، آیا قادر به استفاده از ترافیک رایگان خواهم بود؟",
    answer: "خیر. خرید اشتراک فیاتر فقط برای دسترسی به تمامی فیلم‌ های فیاتر می‌باشد و هزینه ‌ایست که بابت رعایت حقوق صاحبین اثر پرداخت می ‌کنید. ترافیک فیاتر برای مشترکین اپراتورها به صورت نیم بها محاسبه می ‌گردد."
  },
  {
    question: "در هنگام پخش فیلم ‌ها از فیاتر، ارور دریافت می ‌کنم. مشکل از کجاست؟",
    answer: "چنانچه حین پخش با هرگونه خطا مواجه شدید، به صفحه پشتیبانی مراجعه و مشکل خود را مطرح نمایید تا در اولین فرصت مشکل را بررسی و برطرف کنیم."
  },
  {
    question: "به صورت همزمان، چند کاربر می‌توانند از اکانت یک شخص استفاده کنند و فیلم ببینند؟",
    answer: "با یک ip می‌توان روی هر چند دستگاه که بخواهید به صورت همزمان فیلم تماشا کنید. ضمن اینکه به کاربران گرامی توصیه می‌شود اطلاعات کاربری خود را در اختیار دیگران قرار ندهند."
  },
  {
    question: "فیلم‌ های فیاتر در تلویزیون هوشمند من پخش نمی‌شود. مشکل از کجاست؟",
    answer: "چنانچه حین پخش با تلویزیون هوشمند با هرگونه مشکلی مواجه شدید، به صفحه پشتیبانی مراجعه و جزییات مشکل خود را مطرح نمایید. در نظر داشته باشید که ممکن است دستگاه شما، سیستم پخش فیلم در فیاتر را پشتیبانی نکند، اما سعی ما بر این است که راه حلی برای تمامی مشکلات شما پیدا کنیم."
  },
  {
    question: "در صورت بروز مشکل در خرید از فیاتر مانند فعال نشدن اشتراک و یا ثبت نشدن پرداخت، امکان پیگیری از چه طریقی وجود دارد؟",
    answer: "چنانچه جهت خرید اشتراک اقدام کرده‌ اید و مبلغی از حساب شما کم شده اما پرداخت صورت نگرفته، لطفا تا ۷۲ ساعت تامل کنید تا پول به حساب شما بازگردد. پس از سپری شدن این مدت، چنانچه مبلغ به حساب شما بازنگشت، می‌ توانید شماره کارت بانکی که پرداخت با آن صورت گرفته را به همراه تاریخ خرید برای ما از طریق صفحه پشتیبانی ارسال کنید تا بررسی شود. اگر پرداخت در فیاتر برگشت خورده بود و مبلغ به شما بازنگشت، می‌بایست با پشتیبانی درگاه بانکی مورد نظر تماس بگیرید."
  },
  {
    question: "کاربران مقیم خارج از کشور به چه ترتیب می‌ توانند اشتراک فیاتر را تهیه کنند؟",
    answer: "کاربران مقیم خارج از کشور در صورت عدم دسترسی به کارت های بانکی عضو شتاب می توانند جهت خرید اشتراک از راه های دیگر اقدام به خریداری اشتراک نمایند. این دسته از علاقه مندان می تواند به صفحه پشتیبانی مراجعه و راهنمایی مورد نظر را دریافت نمایند."
  }
];




// const { data: settings, pending } = await useApiFetch('/api/settings/', {
//   query: {
//     offset: 10,
//   }
// });
// const terms = computed(() => {
//   const termsItem = settings.value?.results?.find(item => item?.key === 'terms_text');
//   return termsItem?.value || '';
// });

// const isLoading = computed(() => pending.value);


const activeIndex = ref<number | null>(null);

const toggleAnswer = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<style lang="scss" scoped>

  .container {
    background-color: $white;
  }

.faq-item {
  border-bottom: 1px solid $gray-300;
  padding: 15px 20px;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  color: $gray-500;
  transition: color 0.1s ease;

  &:hover {
    background: linear-gradient(60deg, $primary, $third);
    background-clip: text; 
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.faq-answer {
  padding-top: 10px;
  color: $gray-500;
  overflow: hidden;
}

.icon-chevron-up,
.icon-chevron-down {
  font-size: 18px;
}

.icon-chevron-down {
  transform: rotate(0deg);
}

.icon-chevron-up {
  transform: rotate(180deg);
}

.collapse {
  &:not(.show) {
    display: none;
  }
}

.collapsing {
  height: 0;
  overflow: hidden;
  transition: height 0.35s ease;
}
</style>