<template>
  <div>
    <!-- Modal Search -->
    <transition name="fade">
      <div v-if="isSearchModalOpen" class="search-modal" @click="toggleSearchModal">
        <div class="search-modal-content" @click.stop>
          <div class="input-wrapper">
            <input
              v-model.trim="searchInput"
              type="text"
              placeholder="سرچ کنید..."
              class="search-modal-input"
              spellcheck="false"
            />
            <button class="search-button" @click="searchSubmit">
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
        <button class="search-button" @click="searchSubmit">
          <NuxtIcon name="search" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
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
  router.push(`/search?q=${searchInput.value}`);
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
  border: 1px solid #ccc;
  border-radius: 20px;
  transition: width 0.3s ease;
}

@media (max-width: 768px) {
  .search-container {
    position: relative;
  }

  .search-input {
    display: none;
  }

  .search-icon {
    display: block;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .search-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .search-modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 400px;
  }

  .search-modal-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
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
  color: #666;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;

  &:hover {
    color: #333;
  }
}

.search-input, .search-modal-input {
  padding-right: 35px; // Make room for the button
}
</style>
