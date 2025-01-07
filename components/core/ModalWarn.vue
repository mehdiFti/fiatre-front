<template>
  <div v-if='showModal && !userStore.user?.is_subscription_active' class="modal-container">
    <div class="warn-wrappers">
      <div class="warn-img">
        <img src="/assets/images/warn.png" alt="warn" class="warn-logo" />
      </div>
      <div class="warn-text">برای تماشا یا دانلود باید اشتراک تهیه کنید.</div>
      <div class="warn-button">
        <NuxtLink class="warn-subscription" to="/subscription/plans" @click="closeModal">خرید اشتراک</NuxtLink>
        <button class="warn-close" @click="closeModal">بستن</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '~/stores/userStore';
const userStore = useUserStore();
const showModal = ref(false);

const closeModal = () => {
  showModal.value = false;
  console.log('Modal closed:', showModal.value); // Debug log
};

onMounted(() => {
  setTimeout(() => {
    showModal.value = true;
    console.log('Modal opened:', showModal.value); // Debug log
  }, 5000);
});
</script>

<style lang="scss" scoped>
.modal-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.warn-wrappers {
  width: 360px;
  height: 150px;
  padding: 20px;
  background-color: #222;
  border: 1px solid $border-color;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.warn-text {
  margin: 10px 0;
  color: $white;
}

.warn-button {
  display: flex;
  justify-content: center;
}

.warn-close,
.warn-subscription {
  background-color: $primary;
  color: $white;
  font-weight: bold;
  padding: 5px 10px;
  font-size: 0.875rem;
  border: none;
  width: 120px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.warn-close {
  background-color: $primary;
  margin-left: 10px;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.warn-close:hover {
  background-color: darken($primary, 10%);
}

.warn-subscription {
  background-color: $third;
  color: $white;
  font-weight: bold;
  padding: 5px 10px;
  font-size: 0.875rem;
  border: none;
  width: 120px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.warn-subscription:hover {
  background-color: darken($third, 10%);
}

@media (max-width: 480px) {
  .warn-wrappers {
    width: 250px;
    height: 140px;
    padding: 15px;
  }

  .warn-text {
    font-size: 0.8rem;
  }

  .warn-logo {
    width: 30px;
    height: auto;
  }

  .warn-button {
    flex-direction: row;
  }

  .warn-subscription,
  .warn-close {
    font-size: 0.7rem;
    margin: 0 5px;
    width: auto;
  }
}

.warn-logo {
  width: 50px;
  height: auto;
}
</style>
