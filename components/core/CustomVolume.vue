<template>
    <div class="custom-volume-slider">
      <input
        type="range"
        min="0"
        max="100"
        v-model="volume"
        @input="handleVolumeChange"
        class="volume-slider-input"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  

  const emit = defineEmits(['volume-change']);
  

  const volume = ref(50);
  

  const handleVolumeChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newVolume = Number(target.value) / 100; 
    emit('volume-change', newVolume);
  };
  </script>
  
  
  <style lang="scss" scoped>
  .custom-volume-slider {
    width: 120px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
  }
  
  .volume-slider-input {

    appearance: none; 
    width: 100%;
    height: 10px;
    background: $white;
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;
    border-radius: 5px;
  }
  
  .volume-slider-input:hover {
    opacity: 1;
  }
  
  .volume-slider-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    background: #4e9cf6;
    cursor: pointer;
    border-radius: 50%;
  }
  
  .volume-slider-input::-moz-range-thumb {
    width: 15px;
    height: 15px;
    background: #4e9cf6;
    cursor: pointer;
    border-radius: 50%;
  }
  </style>
