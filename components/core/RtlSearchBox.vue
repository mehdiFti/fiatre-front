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
                <input
                  v-model.trim="searchQuery"
                  type="text"
                  placeholder="جستجو کنید..."
                  class="search-input"
                  spellcheck="false"
                />
                <button 
                  type="submit" 
                  class="search-button"
                  :disabled="!searchQuery"
                >
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
          <input
            v-model.trim="searchQuery"
            type="text"
            placeholder="جستجو..."
            class="search-input"
            spellcheck="false"
          />
          <button 
            type="submit" 
            class="search-button"
            :disabled="!searchQuery"
          >
            <NuxtIcon name="search" />
          </button>
        </div>
      </form>
    </div>

    <!-- Search Trigger Button (for mobile) -->
    <button v-else class="search-trigger" @click="openModal">
      <NuxtIcon name="search" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { width } = useWindowSize()

const isSearchModalOpen = ref(false)
const searchQuery = ref(route.query.q || '')

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
    router.push(`/search?q=${searchQuery.value}`)
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
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 500px;
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
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
  padding: 12px 45px 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
}

.search-button {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  padding: 4px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #3b82f6;
  }

  &:disabled {
    color: #d1d5db;
  }
}

.search-trigger {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #374151;
  transition: color 0.2s;

  &:hover {
    color: #1f2937;
  }
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
</style>
  