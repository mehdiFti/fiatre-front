<template>
  <div class="container">
    <div class="profile-card-wrapper">
    <div class="profile-card score-profile-card card-score">
      <div class="profile-icon">
         <img class="img-profile" src="/assets/images/score.png" alt="Score Icon" />
      </div>
      <ul class="list">
        <li>
          <Nuxt-icon name="correct"/>
          <span>پاسخ‌های صحیح :</span>
          <span class="answers">
            <div v-if="isLoading" class="loader"></div>
            <template v-else>{{ correctAnswers }}</template>
          </span>
        </li>
        <li>
          <Nuxt-icon name="wrong"/>
          <span>پاسخ‌های اشتباه :</span>
          <span class="answers">
            <div v-if="isLoading" class="loader"></div>
            <template v-else>{{ wrongAnswers }}</template>
          </span>
        </li>
        <li>
          <Nuxt-icon name="stars"/>
          <span>امتیاز کسب شده :</span>
          <span class="answers">
            <div v-if="isLoading" class="loader"></div>
            <template v-else>{{ totalPoints }}</template>
          </span>
        </li>
      </ul>
    </div>
    <div class="profile-card  score-profile-card card-reward ">
      <div class="profile-icon">
        <img class="img-profile"  src="/assets/images/medal.png" alt="Medal Icon" />
      </div>
      <ul class="list">
        <li v-for="reward in rewards" :key="reward.name">
          <span>{{ reward.name }}</span>
          <span class="scroe-style">{{ reward.points }} امتیاز</span>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue';

definePageMeta({
  middleware: ['redirect-to-login']
});

useSeoMeta({
  title: 'پروفایل کاربری',
  description: 'صفحه پروفایل کاربری در سایت FIATRE برای مشاهده امتیازات و جوایز کسب شده.',
  keywords: 'پروفایل, کاربری, امتیازات, جوایز, FIATRE',
  ogTitle: 'پروفایل کاربری',
  ogDescription: 'صفحه پروفایل کاربری در سایت FIATRE برای مشاهده امتیازات و جوایز کسب شده.',
  ogType: 'website',
  ogUrl: 'https://fiatre.ir/profile',
  ogImage: 'https://fiatre.ir/og-image.jpg',
  robots: 'index, follow'
});

const correctAnswers = ref(0);
const wrongAnswers = ref(0);
const totalPoints = ref(0);
const isLoading = ref(true);

const rewards = [
  { name: 'بلیت تئاتر / سینما', points: 10000 },
  { name: 'نمایشنامه / رمان', points: 5000 },
  { name: 'اشتراک شش ماهه فیاتر', points: 2500 },
  { name: 'اشتراک سه ماهه فیاتر', points: 2000 },
  { name: 'اشتراک یک ماهه فیاتر', points: 1000 }
];

const getProfileData = async () => {
  const { data: profileData } = await useAuthFetch('/api/games/user-games/your/profile/');
  return profileData;
};

onMounted(async () => {
  try {
    const data = await getProfileData();
    if (data.value?.data) {
      correctAnswers.value = data.value.data.correct_game_choices;
      wrongAnswers.value = data.value.data.incorrect_game_choices;
      totalPoints.value = data.value.data.scores;
    }
  } catch (error) {
    console.error('Error fetching profile data:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped lang="scss">
.profile-card-wrapper {
  display: flex;
  gap: 60px;
  margin-top: 40px;
  justify-content: center;
  align-items: center;
}

.profile-card {
  height: 430px;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  width: 400px;
  white-space: nowrap;
  background-color: $milky;
  transition: transform 0.3s, box-shadow 0.3s;
}

.score-profile-card {
  color: $gray-100;
}

.score-style {
  color: $primary
}

.answers {
  color: $third;
}

.profile-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  .img-profile {
    width: 60px;
    height: 60px;
  }
}

.list {
  list-style: none;
  padding: 0;

  >li {
    display: flex;
    justify-content: space-around;
    padding: 12px 0;
    font-size: 18px;
    color: $dark;
    border-bottom: 1px solid $white;
  }

  li:last-child {
    border-bottom: none;
  }
}

.scroe-style {
  color: $gray-500; // 
}

@media (max-width: 992px) {
  .profile-card-wrapper {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .profile-card {
    width: calc(50% - 10px);
    margin-bottom: 20px;
  }
}

@media (max-width: 768px) {
  .profile-card-wrapper {
    flex-direction: column;
    align-items: center;
  }

  .profile-card {
    width: 100%;
    margin-bottom: 20px;
  }
}

@media (max-width: 440px) {
  .list li {
    font-size: 14px;
  }
}

.loader {
  width: 20px;
  height: 20px;
  border: 2px solid $third;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.card-score {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.card-reward {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
</style>