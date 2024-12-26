<template>
  <div>
    <!-- Modal Search -->
    <transition name="fade">
      <div v-if="isSearchModalOpen" class="search-modal" @click="toggleSearchModal">
        <div class="search-modal-content" @click.stop>
          <div class="modal-header">
            <h3>جستجو</h3>
            <button class="close-button" @click="toggleSearchModal">×</button>
          </div>
          <div class="input-wrapper">
            <input
              v-model.trim="searchInput"
              type="text"
              placeholder="سرچ کنید..."
              class="search-modal-input"
              spellcheck="false"
            />
            <button 
              class="modal-search-button" 
              @click="searchSubmit"
              :disabled="!searchInput"
            >
              <NuxtIcon name="search" />
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Regular Search -->
    <div class="search-container" v-if="!isSearchInModal">
      <div class="input-wrapper">
        <input
          v-model.trim="searchInput"
          type="text"
          placeholder="جستجو..."
          class="search-input"
          spellcheck="false"
        />
        <button 
          class="search-button" 
          @click="searchSubmit"
          :disabled="!searchInput"
        >
          <NuxtIcon name="search" />
        </button>
      </div>
      <!-- Add search icon for mobile -->
      <button class="search-icon-button" @click="toggleSearchModal">
        <NuxtIcon name="search" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();
const isSearchModalOpen = ref(false);
const isSearchInModal = ref(false);
const searchInput = ref(route.query.q || '');

const { width } = useWindowSize();

const searchSubmit = () => {
  if (searchInput.value) {
    router.push(`/search?q=${searchInput.value}`);
    if (isSearchModalOpen.value) {
      toggleSearchModal();
    }
  }
};

function toggleSearchModal() {
  isSearchModalOpen.value = !isSearchModalOpen.value;
}

watch(width, (newWidth) => {
  if (newWidth > 768) {
    isSearchModalOpen.value = false;
  }
});
</script>

<style lang="scss" scoped>
.search-container {
  display: flex;
  align-items: center;
  margin-right: 20px;
  position: relative;
}

.search-input {
  padding: 5px 10px;
  border: 1px solid $gray-300;
  border-radius: 20px;
  transition: width 0.3s ease;
}

@media (max-width: 768px) {
  .search-container {
    position: relative;
  }

  .search-input,
  .search-button {
    display: none;
  }

  .search-icon-button {
    display: block;
  }

  .search-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .search-modal-content {
    background: $white;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 500px;
    animation: modalSlideIn 0.3s ease;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    h3 {
      margin: 0;
      color: #333;
      font-size: 1.2rem;
    }
  }

  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: gray-500;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 50%;
    transition: all 0.2s ease;
    
    &:hover {
      background: #f5f5f5;
      color: gray-200;
    }
  }

  .search-modal-input {
    width: 100%;
    padding: 12px 45px 12px 15px;
    border: 2px solid $gray-300;
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: $gray-400;
    }
  }

  .modal-search-button {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    color: gray-500;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    transition: color 0.2s ease;

    &:hover {
      color: $gray-500;
    }

    &:disabled {
      color: $gray-300;

    }
  }

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .search-container {
    margin: 0 15px;
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

  .search-modal-content {
    width: 90%;
    padding: 15px;
  }

  .search-modal-input {
    padding: 8px;
  }
}

@media (max-width: 390px) {
  .search-input {
    width: 120px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.search-button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  color: $gray-800;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;

  &:hover {
    color: $gray-500;;
  }

  &:disabled {
    color: $gray-300;
  }
}

.search-input, .search-modal-input {
  padding-right: 35px; // Make room for the button
}

.search-icon-button {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: $gray-600;
  transition: color 0.2s;
  font-size: 1.5rem;
  
  &:hover {
    color: $gray-500;
  }
}

@media (max-width: 768px) {
  .search-container {
    position: relative;
  }

  .search-input,
  .search-button {
    display: none;
  }

  .search-icon-button {
    display: block;
  }
}
</style>
