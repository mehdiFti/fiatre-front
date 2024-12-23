<template>
  <ClientOnly>
    <button @click="toggleBookmark" :class="{ 'bookmark-button--bookmarked': isBookmarked }" class="bookmark-button">
      <nuxt-icon :name="isBookmarked ? 'like' : 'unlike'" :class="isBookmarked ? 'icon-bookmarked' : 'icon-unbookmarked'" />
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

const toggleBookmark = async () => {
  try {
    const episodeId = parseInt(props.videoDetails.key);
    
    if (!isBookmarked.value) {
      // Add bookmark
      const { data, error } = await useAuthFetch('/api/episodes/bookmarks/submit/user/bookmark/', {
        method: 'POST',
        body: {
          episode: episodeId
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (error.value) {
        throw new Error('Failed to add bookmark');
      }
    } else {
      // Delete bookmark using the episode ID directly
      const { error } = await useAuthFetch(`/api/episodes/bookmarks/${episodeId}/`, {
        method: 'DELETE'
      });

      if (error.value) {
        throw new Error('Failed to delete bookmark');
      }
    }

    // Toggle bookmark state and emit event
    isBookmarked.value = !isBookmarked.value;
    emit('bookmark-toggled', { videoId: props.videoId, isBookmarked: isBookmarked.value });

  } catch (error) {
    console.error('Failed to toggle bookmark:', error);
  }
};

// Also update the onMounted hook to store the bookmark ID when checking initial status
const bookmarkId = ref<number | null>(null);

onMounted(async () => {
  try {
    const { data, error } = await useAuthFetch(`/api/episodes/bookmarks/check/${props.videoDetails.key}/`);
    if (data.value) {
      isBookmarked.value = true;  // Shows 'like' icon if already bookmarked
    }
  } catch (error) {
    console.error('Failed to check bookmark status:', error);
  }
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
</style>

