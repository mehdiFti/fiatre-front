<template>
    <div :class="['container', $attrs.class]" :dir="direction">
      <header class="header-container">
        <hr class="header-hr" />
        <div class="left-section">
          <NuxtLink to="/" class="logo">
            <NuxtImg
              src="https://www.fiatre.ir/static/front/src/icons/logo.png"
              alt="Logo"
              class="logo-img"
            />
          </NuxtLink>
        </div>
  
        <!-- <div class="center-section">
          <NuxtLink to="/category" class="nav-link">دسته</NuxtLink>
          <NuxtLink to="/series" class="nav-link">سریال</NuxtLink>
        </div> -->
  
        <div class="right-section">
          <div class="search-container" v-if="!isSearchInModal">
            <NuxtIcon name="search" class="search-icon" @click="toggleSearchModal" />
            <input
              type="text"
              placeholder="جستجو..."
              class="search-input"
            />
          </div>
          <template v-if="userStore.isAuthenticated" dir="rtl">
            <div class="wrapper-when-login">
              <NuxtLink to="/subscription/plans" class="subscription-button">خرید اشتراک</NuxtLink>
              <!-- Show burger menu only when logged in -->
              <div class="burger-menu" @click="toggleMenu">z
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
                      <NuxtLink to="/episode" class="link-black" @click="toggleMenu">
                        <NuxtIcon name="stars" /> اپیزود
                      </NuxtLink> 
                    </li>
                    <li>
                      <NuxtLink to="/series" class="link-black" @click="toggleMenu">
                        <NuxtIcon name="stars" /> سریال
                      </NuxtLink> 
                    </li>
                    <li>
                      <NuxtLink to="/my-video" class="link-black" @click="toggleMenu">
                        <NuxtIcon name="stars" /> ادامه ویدئوها
                      </NuxtLink> 
                    </li>
                      <li>
                        <NuxtLink to="/game" class="link-black" @click="toggleMenu">
                          <NuxtIcon name="game" /> بازی و سرگرمی
                        </NuxtLink>
                      </li>
                      <li>
                      <div class="link-black" @click.stop="toggleMailBox">
                        <NuxtIcon name="mail" /> صندوق پیام
                      </div>
                      <MailBox  :showMailBox="showMailBox" @close="showMailBox = false"/>
                    </li>
                      <li>
                        <div class="timer-subs" @click="toggleMenu">
                          <NuxtIcon name="timer" />زمان باقی مانده از اشتراک: 
                        </div>
                        <SubscriptionDuration/>
                      </li>
                    </ul>
                    <div v-if="isSearchInModal" class="search-container">
                      <input
                        type="text"
                        placeholder="Search..."
                        class="search-input"
                      />
                    </div>
                    <button class="logout-button" @click="logout">خروج از حساب کاربری</button>
                  </div>
                </div>
              </transition>
            </div>
          </template>
          <template v-else dir="rtl">
            <div class="gap-from-burger">
              <NuxtLink to="/login" class="auth-link">ورود</NuxtLink>
              <span>|</span>
              <NuxtLink to="/register" class="auth-link">ثبت نام</NuxtLink>
            </div>
          </template>
        </div>
      </header>
      <ModalWarn/>
    </div>
    <transition name="fade">
      <div v-if="isSearchModalOpen" class="search-modal" @click="toggleSearchModal">
        <div class="search-modal-content" @click.stop>
          <input
            type="text"
            placeholder="سرچ کنید..."
            class="search-modal-input"
          />
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { onMounted, nextTick, watch } from 'vue';
  import { useToggle } from '@vueuse/core';
  import ModalWarn from './ModalWarn.vue';
  import SubscriptionDuration from '~/components/core/SubscriptionDuration.vue';
  import MailBox from '~/components/core/MailBox.vue';
  import { useRouter } from 'vue-router';
  import { useWindowSize } from '@vueuse/core';

  const [isMenuOpen, toggleMenu] = useToggle(false);
  const [isSearchInModal, toggleSearchInModal] = useToggle(false);
  const [isSearchModalOpen, toggleSearchModal] = useToggle(false);
  const [showMailBox, toggleMailBox] = useToggle(false);
  const userStore = useUserStore()

  const router = useRouter();

  function logout() {
  userStore.logout();
}

  const { width } = useWindowSize();

  watch(width, (newWidth) => {
    if (newWidth > 768) {
      isSearchModalOpen.value = false;
    }
  });

  onMounted(() => {
    nextTick(() => {
      const modal = document.querySelector('.modal-burger');
      if (modal) {
        modal.style.transform = 'translateX(0)';
      }
    });
  });

  // Define props
  const props = defineProps({
    direction: {
      type: String,
      default: 'rtl'
    }
  });

  // Make sure to explicitly inherit attrs
  defineOptions({
    inheritAttrs: false
  });
  </script>
  
  <style lang="scss" scoped>
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
    background-color: rgba(244, 244, 244, 0.9);
    border-bottom: 1px solid #ddd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 5px;
  }
  
  .header-hr {
    position: absolute;
    top: -16px;
    left: 0;
    width: 100%;
    border: 0;
    height: 5px;
    background: linear-gradient(to right, $primary, $third);
    z-index: 999;
  }
  
  .left-section,
  .right-section {
    display: flex;
    align-items: center;
  }
  
  // .center-section {
  //   font-weight: bold;
  //   display: flex;
  //   flex-grow: 1;
  // }
  
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
  
  .search-container {
    display: flex;
    align-items: center;
    margin-right: 20px;
    position: relative;
  }
  
  .search-input {
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    transition: width 0.3s ease;
  }
  
  .subscription-button {
    background-color: $third;
    color:$white !important; 
    white-space: nowrap;
    font-weight: bold;
    padding: 8px 10px;
    font-size: 0.875rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .subscription-button:hover {
    background-color: darken($third, 10%);
  }
  
  .burger-menu {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 -20px  0  5px !important;
    padding: 20px 20px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .burger-icon {
    margin-right: 10px;
    width: 30px;
    text-align: right;
    height: 4px;
    background: #333;
    direction: rtl;
    border-radius: 2px;
    position: relative;
    transition: transform 0.3s ease, background-color 0.3s ease;
    
  }
  
  .burger-icon::before,
  .burger-icon::after {
    content: '';
    text-align: right;
    width: 30px;
    height: 4px;
    background: #333;
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
  
  @media (max-width: 992px) {

.modal-burger {
  transform: translateX(2px);
  background-color: red;
}


    .wrapper-when-login {
      gap: 10px;
    }
    
    .burger-menu {
      margin-left: 20px;
    }
  
    .right-section {
      gap: 10px;
    }
  
    .wrapper-when-login {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  
  @media (max-width: 768px) {



    .search-container {
      position: relative;
    }
  
    .search-input {
      display: none; 
    }
  
    .search-icon {
      display: block;
      font-size: 1.5rem;
      cursor: pointer;
    }
  
    .search-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
  
    .search-modal-content {
      background: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      width: 80%;
      max-width: 400px;
    }
  
    .search-modal-input {
        direction: rtl;
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }
  
  @media (min-width: 769px) {
    .search-icon {
      display: none;
    }
  
    .search-input {
      display: block;
    }
  }
  
  @media (max-width: 480px) {
    .search-input {
      width: 150px;
    }
  
    .subscription-button {
      font-size: 0.7rem;
      display: flex;
      flex-direction: column;
    }
  
    .search-modal-content {
      width: 90%; 
      padding: 15px;
    }
  
    .search-modal-input {
      padding: 8px;
    }
  }
  
  @media (max-width: 390px) {
    .burger-menu {
      height: 25px;
      margin-left: 0;
      
    }
  
    .wrapper-when-login {
      gap: 0;
    }
  
    .header-container {
      padding: 10px 15px;
    }
  
    .nav-link,
    .subscription-button {
      margin: 0 5px;
      padding: 5px;
      font-size: 0.75rem;
    }
  
    .search-container {
      margin-right: 10px;
    }
  
    .search-input {
      width: 120px;
    }
  }
  
  @media (max-width: 768px) {
  
  }
  
  .wrapper-when-login {
    display: flex;
    justify-content: center;
    align-items: center;;
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
    direction: rtl;
    position: absolute;
    top: 100%;
    transform: translateX(-13px) !important;
    background: #ffffff;
    border-radius: 0 0 15px 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    width: 250px;
    padding: 20px 0 0;
    animation: fade-in 0.3s ease;
    display: flex;
    will-change: transform, opacity;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  
  .category-link {
  margin-left: 15px;
  margin-top: 5px;
  font-weight: bold;
  text-decoration: none;
  color: $black;
  font-size: 1rem;
  font-size:bold;
  transition: color 0.3s;
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
    border-radius: 0 0 10px  10px  ;
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
  margin-left: 15px ;
  color:$black;
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
  @media (max-width: 992px) {

.modal-burger {
  transform: translateX(-7px);
}}

@media (max-width: 480px) {
  .modal-burger {
    transform: translateX(-15px);
  }
}

@media (max-width: 390px) {
  .modal-burger {
    transform: translateX(-28px); 
    top:60px;
  }
}



@media (max-width: 490px) {


.logo-img {
  height: 30px;
}


.nav-link,
.subscription-button,
.category-link {
  margin: 0 2px;
  padding: 2px;
  font-size: 0.8rem;
}

.subscription-button {
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
}

@media (max-width: 370px) {

.header-container {
  padding: 10px 20px;
}

.logo-img {
  height: 30px;
}

.nav-link,
.subscription-button,
.category-link {
  margin: 0 1px;
  padding: 0;
  font-size: 0.75rem;
}

.subscription-button {
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