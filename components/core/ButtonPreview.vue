<template>
  <div>
    <button @click="showModal = true" class="hero-btn-preview">
      <nuxt-icon class="hero-play" name="camera-movie"></nuxt-icon> 
      پیش نمایش
    </button>

    <div v-if="showModal" class="modal">
      <div class="modal-content">>
        <video controls autoplay class="video">
          <source src="https://dl.fiatre.ir/Movie-theater/True%20West-gghRcQ.m4v" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <button @click="closeModal" class="close-modal-btn">&times;</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const showModal = ref(false);

watch(showModal, (newVal) => {
  emit('showModal', newVal);
});

const emit = defineEmits(['showModal'])

function closeModal() {
  showModal.value = false;
}
</script>

<style scoped lang="scss">
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: rgba(0, 0, 0, 0.4); 
  border-radius: 5px;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.video {
  width: 100%;
  height: auto;
}
  
.close-modal-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 8px;
  background-color: $third;
  color: $white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.hero-btn-preview {
  color: $white;
  white-space: nowrap;  
  border: none;
  border-radius: 5px;
  padding: 7px 10px;
  font-size: 0.8rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  margin-right: 10px;
  background-color: $primary;
  display: flex;
  align-items: center; 

  &:hover {
    background-color: darken($primary, 5%);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 560px) {
    padding: 8px 12px;
    font-size: 0.7rem;
  }

  @media (max-width: 391px) {
          padding: 4px 6px; 
          font-size: 0.7rem;
        }

  .hero-play {
    font-size: 0.7rem;
    margin-right: 8px;
  }
}
</style>
