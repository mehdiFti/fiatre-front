<template>
  <div class="subscription-duration">
    <span>{{ remainingDays }} روز </span>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps({
  slug: {
    type: String,
    default: ''
  },
  subscriptionExpiration: {
    type: Number,
    default: null,
  }
});

const remainingDays = ref(0);
// const subscriptionExpiration = computed(() => {
//   if (profileRequest.status.value === 'success' && 
//       profileRequest.data.value?.subscription?.subscription_expiration) {
//     return profileRequest.data.value.subscription.subscription_expiration;
//   }
//   return null;
// });

function convertPersianToEnglish(str) {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[۰-۹]/g, d => persianNumbers.indexOf(d));
}

watch(() => props.subscriptionExpiration, (newValue) => {
  if (newValue) {
    calculateRemainingDays();
  }
}, {immediate: true});

function calculateRemainingDays() {
  if (!props.subscriptionExpiration) {
    remainingDays.value = 0;
    return;
  }
  
  try {
    // Parse subscription date
    const [date] = props.subscriptionExpiration.split(' ');
    const [year, month, day] = date.split('/').map(num => parseInt(num));

    // Get current Persian date
    const todayPersian = new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
    
    // Convert and parse current date
    const todayConverted = convertPersianToEnglish(todayPersian);
    const [todayYear, todayMonth, todayDay] = todayConverted.split('/').map(num => parseInt(num));

    // Calculate total days difference
    const totalDays = ((year - todayYear) * 365) + 
                     ((month - todayMonth) * 30) + 
                     (day - todayDay);
    
    remainingDays.value = Math.max(totalDays, 0);
  } catch (error) {
    console.error('Error calculating remaining days:', error);
    remainingDays.value = 0;
  }
}
</script>

<style lang="scss" scoped>
.subscription-duration {
  font-size: 0.8rem;
  color: $dark;
  padding-left: 4px;
}

.loading-circle {
  $width: 10px;
  width: $width;
  height: $width;
  min-width: $width;
  min-height: $width;
  border: 1px solid $dark;
  border-top: 1px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: inline-block;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
