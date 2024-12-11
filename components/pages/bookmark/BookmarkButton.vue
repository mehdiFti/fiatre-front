<template>
  <button @click="toggleBookmark" :class="{ 'bookmark-button--bookmarked': isBookmarked }" class="bookmark-button">
    <span v-if="showText" :class="['bookmark-text', fadeOut ? 'fade-out' : '']">
      {{ isInBookmarksPage ? 'حذف شد!' : (isBookmarked ? "افزودن به علاقه‌مندی‌ها" : "حذف از علاقه‌مندی‌ها") }}
    </span>
    <nuxt-icon v-else :name="isBookmarked ? 'like' : 'unlike'" :class="isBookmarked ? 'icon-bookmarked' : 'icon-unbookmarked'" />
  </button>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  videoId: string;
  videoDetails: {
    key: string;
    title: string;
    src: string;
    poster: string;
    description: string;
  };
  isInBookmarksPage?: boolean;
}>();

const emit = defineEmits(['bookmark-toggled']); 
const isBookmarked = ref(false); 
const showText = ref(false);
const fadeOut = ref(false);
const canClick = ref(true);

const toggleBookmark = () => {
  if (!canClick.value) return; 

  isBookmarked.value = !isBookmarked.value;
  showText.value = true;
  fadeOut.value = false;

  setTimeout(() => {
    fadeOut.value = true;
  }, 1800);

  setTimeout(() => {
    showText.value = false;
    fadeOut.value = false;
  }, 2300);

  if (isBookmarked.value) {
    localStorage.setItem(`bookmark-${props.videoId}`, JSON.stringify(props.videoDetails));
  } else {
    localStorage.removeItem(`bookmark-${props.videoId}`);
  }

  canClick.value = false;
  setTimeout(() => {
    canClick.value = true; 
  }, 3000);

  emit('bookmark-toggled', { videoId: props.videoId, isBookmarked: isBookmarked.value });
};

watchEffect(() => {
  isBookmarked.value = !!localStorage.getItem(`bookmark-${props.videoId}`);
});
</script>

<style lang="scss" scoped>
.bookmark-button {
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}

.bookmark-text {
  font-size: 0.8rem;
  color: $third;
  animation: fadeIn 0.5s ease-in-out;
  transition: opacity 0.5s ease-in-out; 
}

.fade-out {
  opacity: 0;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.bookmark-button--bookmarked .icon-bookmarked,
.icon-unbookmarked {
  padding: 2px 6px;
  color: $third;
  transition: color 0.1s ease;
  border: 2px solid $third; 
  border-radius: 6px; 
}

.bookmark-button:focus,
.bookmark-button:hover {
  outline: none;
}

@media (max-width: 340px) {
  .bookmark-text {
    font-size: 0.7rem;
  }
}
</style>

