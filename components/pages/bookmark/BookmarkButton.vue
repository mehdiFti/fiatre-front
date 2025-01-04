<template>
  <ClientOnly>
    <button 
      @click="handleClick" 
      :class="{ 
        'bookmark-button--bookmarked': isBookmarked,
        'bookmark-button--disabled': isDisabled 
      }" 
      class="bookmark-button"
      :disabled="isDisabled"
    >
      <nuxt-icon 
        name="like" 
        :class="isBookmarked ? 'icon-bookmarked' : 'icon-unbookmarked'" 
      />
    </button>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  videoId: string;
  videoDetails: {
    key: string;
    title: string;
    video?: string;
    cover?: string;
    description: string;
  };
  isInBookmarksPage?: boolean;
}>();

const emit = defineEmits(['bookmark-toggled']); 
const isBookmarked = ref(false); 
const isDisabled = ref(false);

const checkBookmarkStatus = async () => {

  try {
    const { data } = await useAuthFetch(`/api/episodes/bookmarks/${props.videoId}/`);
    if (data.value) {

      isBookmarked.value = data.value.some(
        (bookmark: any) => bookmark.episode.id.toString() === props.videoDetails.key
      );
    }
  } catch (error) {
    console.error('Failed to check bookmark status:', error);
  }
};

const toggleBookmark = async () => {
  try {
    const episodeId = parseInt(props.videoDetails.key);

    const endpoint = !isBookmarked.value 
      ? '/api/episodes/bookmarks/submit/user/bookmark/'
      : '/api/episodes/bookmarks/delete/user/bookmark/';

    const { error } = await useAuthFetch(endpoint, {
      method: 'POST',
      body: {
        episode: episodeId
      }
    });

    if (error.value) {
      throw new Error(`Failed to ${isBookmarked.value ? 'remove' : 'add'} bookmark`);
    }

    // Toggle state and emit event
    isBookmarked.value = !isBookmarked.value;
    emit('bookmark-toggled', { 
      videoId: props.videoId, 
      isBookmarked: isBookmarked.value,
      episodeId 
    });

  } catch (error) {
    console.error('Failed to toggle bookmark:', error);
  }
};

// Add cooldown handler
const handleClick = async () => {
  if (isDisabled.value) return;
  
  await toggleBookmark();
  
  // Set cooldown
  isDisabled.value = true;
  setTimeout(() => {
    isDisabled.value = false;
  }, 5000); // 5 seconds cooldown
};

onMounted(() => {
  checkBookmarkStatus();
});
</script>

<style lang="scss" scoped>
.bookmark-button {
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
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

.bookmark-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.icon-bookmarked {
  padding: 2px 6px;
  color: $third;
  transition: color 0.1s ease;
  border: 2px solid $third; 
  border-radius: 6px;
  
  /* Add active styles */
  animation: pulse 0.3s ease;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
</style>

