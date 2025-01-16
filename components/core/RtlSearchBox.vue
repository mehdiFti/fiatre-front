<template>
  <div>
    <!-- Modal Search -->
    <Teleport to="body">
      <transition name="fade">
        <div v-if="isSearchModalOpen" class="search-modal" @click="closeModal">
          <div class="modal-content" @click.stop>
            <div class="modal-header">
              <h3>جستجو</h3>
              <button class="close-button" @click="closeModal">×</button>
            </div>
            <form @submit.prevent="handleSubmit" class="search-form">
              <div class="input-wrapper">
                <input v-model.trim="searchQuery" type="text" placeholder="عنوان ویدیو، بازیگر و... را جستجو کنید."
                  class="modal-search-input" spellcheck="false" />
                <button type="submit" class="search-button" :disabled="!searchQuery">
                  <NuxtIcon name="search" />
                </button>
              </div>
            </form>

          </div>
        </div>
      </transition>
    </Teleport>

    <!-- Regular Search for Desktop -->
    <div class="search-container" v-if="!isMobile">
      <form @submit.prevent="handleSubmit" class="search-form">
        <div class="input-wrapper">
          <input v-model.trim="searchQuery" type="text" placeholder="جستجو..." class="search-input"
            spellcheck="false" />
          <button type="submit" class="search-button" :disabled="!searchQuery">
            <NuxtIcon name="search" />
          </button>
        </div>
      </form>
    </div>

    <!-- Search Trigger Button (for mobile) -->
    <button v-else class="search-trigger" @click="openModal">
      <NuxtIcon class="big-bin" name="search" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { width } = useWindowSize()

const isSearchModalOpen = ref(false)
const searchQuery = ref('')

const isMobile = computed(() => width.value <= 768)

const openModal = () => {
  isSearchModalOpen.value = true
  // Focus input when modal opens
  nextTick(() => {
    document.querySelector('.search-input')?.focus()
  })
}

const closeModal = () => {
  isSearchModalOpen.value = false
  searchQuery.value = ''
}

const handleSubmit = () => {
  if (searchQuery.value) {
    const query = searchQuery.value
    router.push(`/search?q=${query}`)
    searchQuery.value = ''

    if (isSearchModalOpen.value) {
      closeModal()
    }
  }
}


// Close modal on desktop view
watch(width, (newWidth) => {
  if (newWidth > 768) {
    isSearchModalOpen.value = false
  }
})
</script>

<style lang="scss" scoped>
.search-modal {
  position: fixed;
  inset: 0;
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
}

.modal-content {
  direction: rtl;
  position: relative;
  width: 90%;
  max-width: 500px;
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

  @media screen and (min-width: 1600px) {
    max-width: 600px; // Slightly wider for larger screens
  }

  @media screen and (max-width: 768px) {
    width: 95%;
    padding: 15px;
  }

  @media screen and (max-width: 390px) {
    width: 98%;
    padding: 12px;
  }

  .search-button {
    position: absolute;
    left: -120px;
    top: 50%;
    transform: translateY(-50%);
    color: $gray-500;
    font-size: 1.2rem;
  }
}

.modal-header {
  display: flex;
  padding-right: 5px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  h3 {
    font-size: 1.25rem;

    margin: 0;
  }
}

.close-button {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  color: #666;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
    color: #000;
  }
}

.search-form {
  width: 100%;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 5px 35px 5px 10px;
  transform: translateX(-20px);
  border: 1px solid $gray-300;
  border-radius: 25px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: $gray-300;
  }
}

.modal-search-input {
  width: 100%;
  padding: 12px 45px 12px -1px;
  border: 2px solid $gray-300;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: $gray-400;
  }

  @media screen and (min-width: 1600px) {
    padding: 14px 45px 14px -1px;
    font-size: 1.1rem;
  }

  @media screen and (max-width: 768px) {
    padding: 10px 40px 10px 15px;
    font-size: 0.95rem;
  }

  @media screen and (max-width: 390px) {
    padding: 8px 35px 8px 12px;
    font-size: 0.9rem;
  }
}

.search-button {
  position: absolute;
  right: 178px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: $gray-800;
  padding: 4px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: $gray-400;
  }

  &:disabled {
    color: $gray-300;
  }
}

.search-trigger {
  background: none;
  border: none;
  padding: 8px;
  transform: translateX(-25px);
  cursor: pointer;
  color: $gray-600;
  transition: color 0.2s;
  font-size: 1.5rem;

  &:hover {
    color: $gray-500;
  }
}

.big-bin {
  color: $third;
  background-color: third;
  font-weight: 500;
}

// Animation
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// Media query for mobile screens
@media screen and (max-width: 768px) {
  .modal-content {
    .input-wrapper {

      position: relative;


    }

    .search-button {
      position: absolute;
      left: 12px;
      right: auto;
      top: 50%;
      transform: translateY(-50%);
      padding: 8px;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        color: $gray-500;
      }

      &:disabled {
        color: $gray-300;
      }
    }

    .modal-search-input {
      padding-left: 40px;
      padding-right: 15px;
    }
  }
}

@media screen and (max-width: 800px) {
  .modal-content {
    width: 90%;
    padding: 15px;
  }

  .modal-search-input {
    padding: 8px;
  }

  .search-button {
    padding: 5px;
  }
}

.input-wrapper input::placeholder {
  font-size: 0.75rem;

  @media screen and (min-width: 1600px) {
    font-size: 0.85rem;
  }

  @media screen and (max-width: 390px) {
    font-size: 0.7rem;
  }
}

// .modal-search-button {
//   color: red !important;

//   &:hover {
//     color: darkred !important;
//   }

//   &:disabled {
//     color: rgba(255, 0, 0, 0.5) !important;
//   }
// }</style>