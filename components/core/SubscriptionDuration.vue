<template>
  <div class="subscription-duration">
    <span>{{ remainingDays }} روز </span>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  endDate: {
    type: String,
    required: true
  }
});
const remainingDays = ref(28);

function calculateRemainingDays() {
  const end = new Date(props.endDate);
  const now = new Date();
  const diffTime = end - now;
  if (diffTime >= 0) {
    remainingDays.value = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } else {
    remainingDays.value = 0; 
  }
}
const interval = ref()
onMounted(() => {
  setTimeout(() => {
    calculateRemainingDays();
    interval.value = setInterval(calculateRemainingDays, 1000 * 60 * 60 * 24); 

  }, 122000); 
});
    onUnmounted(() => {
      clearInterval(interval);
    });
</script>

<style lang="scss" scoped>
.subscription-duration {
  font-size: 0.8rem;
  color: $dark;
  padding-left: 4px
}
</style>
