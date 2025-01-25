<template>
  <div class="container">
    <header class="header-container">
      <div class="left-section">
        <NuxtLink to="/" class="logo">
          <NuxtImg src="https://www.fiatre.ir/static/front/src/icons/logo.png" alt="Logo" class="logo-img" />
        </NuxtLink>
      </div>

      <div class="right-section">
        <SearchBox />
        <div class="wrapper-when-login">
          <NuxtLink v-if="userStore.isAuthenticated && !userStore.user?.is_subscription_active" to="/subscription/plans"
            class="subscription-button-deactive">
            خرید اشتراک
          </NuxtLink>
          <NuxtLink v-else-if="userStore.isAuthenticated" to="/categories" class="subscription-button-active">
            دسته‌بندی‌ها
          </NuxtLink>
          <div v-if="userStore.isAuthenticated" class="burger-menu" @click="toggleMenu">
            <div :class="['burger-icon', isMenuOpen ? 'open' : '']"></div>
          </div>
          <transition name="slide-fade">
            <div v-if="isMenuOpen" class="modal-burger" @click="toggleMenu">
              <div class="modal-content" @click.stop>
                <ul class="modal-list">
                  <li>
                    <NuxtLink to="/account" class="link-black" @click="toggleMenu">
                      <NuxtIcon name="pen" /> ویرایش حساب کاربری
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/bookmarks" class="link-black" @click="toggleMenu">
                      <NuxtIcon name="stars" /> علاقه مندی‌ها
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/my-video" class="link-black" @click="toggleMenu">
                      <NuxtIcon name="camera-movie" /> ادامه ویدیوها
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/game" class="link-black" @click="toggleMenu">
                      <NuxtIcon name="game" /> بازی و سرگرمی
                    </NuxtLink>
                  </li>
                  <!-- <li>
                    <div class="link-black" @click.stop="toggleMailBox">
                      <NuxtIcon name="mail" /> صندوق پیام
                    </div>
                     <MailBox :showMailBox="showMailBox" @close="showMailBox = false" /> -->
                  <!-- </li>  -->
                  <li v-if="userStore.isAuthenticated && userStore.user?.is_subscription_active">
                    <div class="timer-subs" @click="toggleMenu">
                      <NuxtIcon name="timer" />زمان باقی مانده از اشتراک:
                    </div>

                    <SubscriptionDuration
                      :subscriptionExpiration="userStore.user?.subscription?.subscription_expiration"
                      :slug="userStore.user?.subscription_slug" />

                  </li>
                  <li v-if="userStore.isAuthenticated && !userStore.user?.is_subscription_active">
                    <NuxtLink to="/categories" class="link-black" @click="toggleMenu">
                      <NuxtIcon name="category" /> دسته‌بندی‌ها
                    </NuxtLink>
                  </li>
                </ul>
                <button class="logout-button" @click="logout">خروج از حساب کاربری</button>
              </div>
            </div>
          </transition>
        </div>
        <template v-if="!userStore.isAuthenticated" dir="rtl">
          <div class="no-auth">
            <NuxtLink to="/categories" class="auth-link">دسته‌بندی‌ها</NuxtLink>
            <div class="gap-from-burger">
              <NuxtLink to="/login" class="auth-link">ورود</NuxtLink>
              <span>|</span>
              <NuxtLink to="/register" class="auth-link">ثبت نام</NuxtLink>
            </div>
          </div>
        </template>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, onMounted, onUnmounted } from 'vue';
import { useWindowSize } from '@vueuse/core';
import SubscriptionDuration from '~/components/core/SubscriptionDuration.vue';
// import MailBox from '~/components/core/MailBox.vue';
import SearchBox from '~/components/core/SearchBox.vue';
import { useRouter } from 'vue-router';

const route = useRoute();

const isMenuOpen = ref(false);
const showMailBox = ref(false);
const userStore = useUserStore()

const { width } = useWindowSize();

// Add watch for route changes
watch(
  () => route.path,
  () => {
    isMenuOpen.value = false;
  }
);


onMounted(() => {
  document.addEventListener('click', (event) => {
    const burgerMenu = document.querySelector('.burger-menu');
    const modalBurger = document.querySelector('.modal-burger');

    if (isMenuOpen.value &&
      burgerMenu &&
      modalBurger &&
      !burgerMenu.contains(event.target) &&
      !modalBurger.contains(event.target)) {
      isMenuOpen.value = false;
    }
  });
});



function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;

  nextTick(() => {
    const burgerMenu = document.querySelector('.burger-menu');
    const modal = document.querySelector('.modal-burger');
    if (burgerMenu) {
      burgerMenu.classList.toggle('open', isMenuOpen.value);
    }
    if (modal && isMenuOpen.value) {
      modal.style.transform = 'translateX(0)';
    } else if (modal) {
      modal.style.transform = 'translateX(-100%)';
    }
  });
}

function logout() {
  const modal = document.querySelector('.modal-burger');
  if (modal) {
    modal.classList.add('no-animation');
  }
  isMenuOpen.value = false;
  userStore.logout();
  setTimeout(() => {
    if (modal) modal.classList.remove('no-animation');
  }, 300);
}

function toggleMailBox() {
  showMailBox.value = !showMailBox.value;
}

</script>

<style lang="scss" scoped>
.color {
  background-color: $light;
}

.container {
  position: sticky;
  z-index: 10000;
  top: 0;
}

.header-container {
  position: relative;
  width: 100%;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $milky;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}


.left-section,
.right-section {
  display: flex;
  align-items: center;

  &.is-rtl {
    flex-direction: row-reverse;
  }
}

.logo-img {
  height: 40px;
}

.nav-link,
.link-black {
  margin: 0 15px;
  text-decoration: none;
  color: $black;
  transition: color 0.3s;
  white-space: nowrap;
  font-size: 0.8rem;
}


.nav-link:hover,
.auth-link:hover,
.link-black:hover {
  color: $primary;
}

.subscription-button-deactive {
  background-color: $third;
  color: $white !important;
  white-space: nowrap;
  font-weight: bold;
  padding: 8px 12px;
  font-size: 0.875rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.subscription-button-deactive:hover {
  background-color: darken($third, 10%);
}

.subscription-button-active {
  background-color: $milky !important;
  color: $black !important;
  white-space: nowrap;
  font-weight: bold;
  padding: 8px 11px;
  font-size: 0.875rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

// .subscription-button-active:hover {
//   background-color: darken($primary, 10%);
// }

.burger-menu {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: -15px;
  padding: 20px 20px;
  border-radius: 5px;
}

.burger-icon {
  width: 30px;
  height: 4px;
  background: $third;
  border-radius: 2px;
  position: relative;
  transition: transform 0.3s ease, background-color 0.3s ease;

}

.burger-icon::before,
.burger-icon::after {
  content: '';
  width: 30px;
  height: 4px;
  background: $third;
  position: absolute;
  border-radius: 2px;
  transition: transform 0.3s ease;
}

.burger-icon::before {
  top: -10px;
}

.burger-icon::after {
  top: 10px;
}

.burger-icon.open {
  background: transparent;
}

.burger-icon.open::before {
  transform: rotate(45deg) translate(5px, 5px);
}

.burger-icon.open::after {
  transform: rotate(-45deg) translate(5px, -5px);
}

@keyframes slide-down {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}


.wrapper-when-login {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}


.modal-burger {
  position: absolute;
  top: 100%;
  transform: translateX(-15px) !important;
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 15px 15px;
  width: 250px;
  padding: 15px 0 0;
  animation: fade-in 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  will-change: transform, opacity;
  gap: 15px;
}

.modal-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  text-align: right;
  direction: ltr;
}

.modal-list li {
  padding: 10px 0;
  font-size: 1rem;
  color: $black;
  cursor: pointer;
  transition: color 0.3s;
  display: flex;
  justify-content: flex-start;
}

.modal-list li .nuxt-icon {
  color: $black;
  margin-right: 8px;
}

.logout-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(to right, #ff416c, #ff4b2b);
  border: none;
  border-radius: 0 0 10px 10px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.logout-button:hover {
  background: linear-gradient(to right, #ff4b2b, #ff416c);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.modal-content .search-container {
  margin-bottom: 15px;
}

.modal-content .search-input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 25px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.link-black {
  color: $black;
  text-decoration: none;

}

.link-black:hover {
  color: $primary;
}

.timer-subs {
  margin: 0 15px;
  color: $black;
  text-decoration: none;
  font-size: 0.8rem;
  cursor: default;

}

.auth-link {
  margin: 5px;
  font-weight: bold;
  text-decoration: none;
  color: $black;
  transition: color 0.3s;
  white-space: nowrap;
  font-size: 1rem;
}

.auth-link:hover {
  color: $primary;
}







.category-link {
  margin-left: 15px;
  margin-top: 5px;
  font-weight: bold;
  text-decoration: none;
  color: $black;
  font-size: 1rem;
  font-size: bold;
  transition: color 0.3s;
}

.category-link:hover {
  color: $primary;
}





.no-auth {
  display: flex;
}


.no-animation {
  transition: none !important;
  transform: none !important;
}

.gap-from-burger {
  display: flex;
  justify-content: center;
  align-items: center;
}


@media (max-width: 390px) {
  .modal-burger {
    transform: translateX(-34px) !important;
    // top:60px;
  }
}





@media (max-width: 991px) {
  // .burger-menu {
  //   margin-left: 14px;
  // }

  .wrapper-when-login {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
  }

  .modal-burger {
    transform: translateX(-15px) !important;
  }
}



@media (min-width: 768px) {

  .no-auth {
    gap: 20px;
    margin-right: 20px;
  }
}

@media (max-width: 490px) {


  .logo-img {
    height: 30px;
  }

  .subscription-button-active {
    margin: 0 2px;
    padding: 2px;
    font-size: 0.8rem;
  }

  .nav-link,

  .subscription-button-deactive,
  .category-link {
    margin: 0 1px;
    padding: 2px;
    font-size: 0.8rem;
  }

  .subscription-button-active,
  .subscription-button-deactive {
    padding: 4px 2px;
  }

  .category-link {
    font-size: 0.8rem;
    font-weight: bold;
  }

  .search-container {
    margin-right: 5px;
  }

  .burger-menu {
    padding: 1px 4px;
  }

  .modal-burger {
    transform: translateX(-41px) !important;
  }

  .subscription-button-deactive {
    padding: 4px 4px !important;
  }
}


@media (max-width: 450px) {

  .no-auth {
    gap: 10px;
  }

  .auth-link {
    font-size: 12px;
  }
}


@media (max-width: 370px) {
  .modal-burger {
    transform: translateX(-57px) !important;
  }

  .no-auth {
    gap: 5px;
  }

  .auth-link {
    font-size: 12px;
  }

  .subscription-button-deactive {
    padding: 4px 2px !important;
  }

  .header-container {
    padding: 10px 20px;
  }

  .logo-img {
    height: 30px;
  }

  .subscription-button-active {
    margin: 0 0px;
    padding: 0;
    font-size: 0.75rem;
  }

  .nav-link,

  .subscription-button-deactive,
  .category-link {
    margin: 0 0px;
    padding: 0;
    font-size: 0.75rem;
  }

  .subscription-button-active,
  .subscription-button-deactive {
    padding: 3px 1px;
  }



  .category-link {
    font-size: 0.7rem;
    font-weight: bold;
  }

  .search-container {
    margin-right: 3px;
  }

  .burger-menu {
    padding: 1px 3px;
  }

}
</style>