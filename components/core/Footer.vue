<template>
  <div class="container">
  <div class=" footer-dark">
    <footer class="footer">
        <div class="footer-row">
          <div class="footer-col contact">
            <h3 class="footer-title">بهترین خودت باش</h3>
            <ul class="footer-list">
              <li><NuxtLink to="#">تماس با ما</NuxtLink></li>
              <li><NuxtLink to="/register">درباره ما</NuxtLink></li>
              <li><NuxtLink to="#">قوانین و مقررات</NuxtLink></li>
              <li><NuxtLink to="#">سوالات متداول</NuxtLink></li>
            </ul>
          </div>
          <div class="footer-col about">
            <h3 class="footer-title">نامفهوم از صنعت چاپ</h3>
            <p class="footer-text">نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.</p>
          </div>
          <div class="footer-col social">
            <a class="footer-icon"><JJIcon icon="instagram" /></a>
            <a class="footer-icon"><JJIcon icon="whatsapp" /></a>
            <a class="footer-icon"><JJIcon icon="telegram" /></a>
          </div>
        </div>
        <p class="footer-copyright primary-bold">خدمات ارائه شده در فیاتر دارای مجوز است و هر گونه سوء استفاده از محتوای فیاتر، پیگرد قانونی دارد.</p>
    </footer>
  </div>
</div>
</template>

<script setup lang="ts">
import JJIcon from '~/components/core/icons/JJIcon.vue';

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


</script>

<style lang="scss">
.footer-dark {
  padding: 50px 0;
  color: #f0f9ff;
  background-color: #282d32;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
}



.footer-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
}

.footer-col {
  flex: 1;
  margin: 20px;
  text-align: center;

  @media (min-width: 769px) {
    text-align:center;
  }
}

.footer-title {
  margin-top: 0;
  margin-bottom: 12px;
  font-weight: bold;
  font-size: 16px;
}

.footer-list {
  padding-right: 2rem;
  list-style: none;
  line-height: 1.6;
  font-size: 14px;
  margin-bottom: 0;
  display: flex;
  gap: 20px;
  
  @media (max-width: 1400px) {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    flex-direction: row; 
  }

  @media (max-width: 450px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

.footer-list a {
  color: inherit;
  text-decoration: none;
  opacity: 0.6;
}

.footer-list a:hover {
  opacity: 0.8;
}

.footer-text {
  font-size: 14px;
}

.footer-icon {
  font-size: 20px;
  width: 36px;
  height: 36px;
  line-height: 36px;
  display: inline-flex; 
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.4);
  margin: 0 8px;
  color: $white;
  opacity: 0.75;

  &:hover {
    opacity: 0.9;
  }
}

.footer-copyright {
  text-align: center;
  padding-top: 24px;
  opacity: 0.3;
  font-size: 13px;
  margin-bottom: 0;
}

.primary-bold {
  font-weight: 700;
  font-size: 20px;
  color: $white;
}

</style>