<template>
  <div class="container">
    <div class="profile-card-wrapper">
    <div class="profile-card score-profile-card">
      <div class="profile-icon">
         <img class="img-profile" src="/assets/images/score.png" alt="Score Icon" />
      </div>
      <ul class="list">
        <li>
          <Nuxt-icon name="correct"/>
          <span>پاسخ‌های صحیح :</span>
          <span class="answers">{{ correctAnswers }}</span>
        </li>
        <li>
          <Nuxt-icon name="wrong"/>
          <span>پاسخ‌های اشتباه :</span>
          <span class="answers">{{ wrongAnswers }}</span>
        </li>
        <li>
          <Nuxt-icon name="stars"/>
          <span>امتیاز کسب شده :</span>
          <span class="answers">{{ totalPoints }}</span>
        </li>
      </ul>
    </div>
    <div class="profile-card reward-profile-card">
      <div class="profile-icon">
        <img src="/assets/images/medal.png" alt="Medal Icon" />
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
import { computed } from 'vue';
import { useScoreStore } from '~/stores/scoreStore';

const scoreStore = useScoreStore(); 

const rewards = [
  { name: 'بلیت تئاتر / سینما', points: 10000 },
  { name: 'نمایشنامه / رمان', points: 5000 },
  { name: 'اشتراک شش ماهه فیاتر', points: 2500 },
  { name: 'اشتراک سه ماهه فیاتر', points: 2000 },
  { name: 'اشتراک یک ماهه فیاتر', points: 1000 }
];

const correctAnswers = computed(() => scoreStore.correctAnswers);
const wrongAnswers = computed(() => scoreStore.wrongAnswers);
const totalPoints = computed(() => scoreStore.score);

</script>

<style scoped lang="scss">
.profile-card-wrapper {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background-color: $light;
  align-items: center;
  margin: 60px 0;
}

.profile-card {
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  width: 400px;
  white-space: nowrap;
  transition: transform 0.3s, box-shadow 0.3s;
}

.score-profile-card {
  width: 250px;
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
</style>