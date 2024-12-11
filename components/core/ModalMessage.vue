<template>
  <div v-if="visible" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <p>{{ message }}</p>
      <button @click="close">بستن</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, onMounted } from 'vue';

const props = defineProps({
  message: String,
  visible: Boolean,
});

// Debug: Watch for prop changes
watch(() => props.visible, (newVal) => {
  console.log('Modal visibility changed:', newVal);
});

watch(() => props.message, (newVal) => {
  console.log('Modal message changed:', newVal);
});

const emit = defineEmits(['close']);

// Add timer logic
let timer = null;

const close = () => {
  if (timer) clearTimeout(timer);
  emit('close');
};

// Watch for visibility changes and set up timer
watch(() => props.visible, (newVal) => {
  if (newVal) {
    // Start 5-second timer when modal becomes visible
    timer = setTimeout(() => {
      close();
    }, 5000);
  } else {
    // Clear timer if modal is closed before timeout
    if (timer) clearTimeout(timer);
  }
});

// Clean up timer on component unmount
onMounted(() => {
  return () => {
    if (timer) clearTimeout(timer);
  };
});
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  bottom: 0;
  left: 50%;
  border-radius: 5px;
  transform: translateX(-50%);
  width: 100%;
  max-width: 400px;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000; // Add z-index to ensure modal appears above other content
  animation: fadeIn 0.3s ease-in-out;
}

.modal-content {
  background: $primary;
  color: $white;
  padding: 20px;
  border-radius: 5px 5px 0 0;
  text-align: center;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  animation: slideUp 0.3s ease-in-out forwards;
}


button {
  background: darken($primary, 10%);
  color: $white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: lighten($primary, 10%);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
