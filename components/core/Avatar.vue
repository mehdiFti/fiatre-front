<template>
  <div class="avatar-container">
    <input type="file" id="fileInput" @change="handleFileChange" accept="image/jpg,image/jpeg,image/png" style="display: none;" />
    <div class="avatar" @click.prevent="triggerFileInput">
      <img :src="displayedAvatarUrl" alt="User Avatar" />
      <div v-if="isLoading" class="loading-overlay">
        <div class="spinner"></div>
      </div>
      <nuxt-icon v-else name="camera" class="camera-icon" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  profileAvatar: {
    type: String,
    default: ''
  }
});

const avatarUrl = ref('https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/person-profile-icon.png');
const tempPreviewUrl = ref(null);
const isLoading = ref(false);

// Use a computed property for the displayed URL
const displayedAvatarUrl = computed(() => {
  // Show temporary preview if available
  if (tempPreviewUrl.value) {
    return tempPreviewUrl.value;
  }
  // Show profile avatar if available
  if (props.profileAvatar) {
    return `https://fiatre.ir${props.profileAvatar}`;
  }
  // Fall back to default avatar
  return avatarUrl.value;
});

// Watch for changes in profileAvatar prop
watch(() => props.profileAvatar, (newValue) => {
  if (newValue) {
    // Clear temporary preview when actual avatar is updated
    tempPreviewUrl.value = null;
  }
});

const emit = defineEmits(['avatar-change']);

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    isLoading.value = true;
    
    // Create temporary preview
    const reader = new FileReader();
    reader.onload = (e) => {
      tempPreviewUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
    
    // Emit the file for upload
    emit('avatar-change', file);
  }
};

const triggerFileInput = () => {
  document.getElementById('fileInput').click();
};

const stopLoading = () => {
  isLoading.value = false;
};

defineExpose({ stopLoading });
</script>

<style scoped lang="scss">
.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 120px;
  margin: auto;
  padding-bottom: 15px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  background-color: $white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;


}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.camera-icon {
  position: absolute;
  bottom: -4px;
  font-size: 20px;
  color: $white;
  border-radius: 50%;
  z-index: 999;
  transition: transform 0.3s ease; 

  &:hover {
    transform: scale(1.4); 
  }
}

input[type="file"] {
  display: none;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid transparent;
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
