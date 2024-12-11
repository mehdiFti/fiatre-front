<template>
  <div class="container" dir="rtl">
    <div class="crew-wrapper">
      <div class="crew-flex">
        <div v-for="crew in crews" :key="crew.id">
          <div class="card-container">
            <NuxtLink :to="crew.link">
              <nuxt-img
                class="crew-card"
                :src="crew.src || defaultImage"
                alt="Crew image"
                :style="{'pointer-events': crew.src ? 'auto' : 'none' }"
              />
            </NuxtLink>
          </div>

          <div class="crew-name">
            {{ crew.title }} <!-- Displaying the title -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Crew {
  id: number;
  link: string;
  src: string | null;
  title: string;
}

const props = defineProps<{
  crews: Crew[];
}>();

console.log('Received crews:', props.crews);

const defaultImage = 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/person-profile-icon.png';
</script>

<style lang="scss">
.crew-wrapper {
  padding: 40px 10px 10px;
  background: $light;
}

.crew-flex {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  .card-container {
    width: 150px;
    height: 150px;
  }

  .crew-card {
    background: $light;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }

  .crew-card:hover {
    transform: scale(1.1);
    cursor: pointer;
    box-shadow: 0 0 10px rgba($primary, 1);
  }

  .crew-name {
    text-align: center;
    margin-top: 14px;
    font-weight: bold;
  }
}

@media (max-width: 768px) {
  .crew-flex .card-container {
    width: 100px; 
    height: 100px;
  }

  .crew-flex .card-container .crew-card {
    width: 100px;
    height: 100px; 
  }
}

@media (max-width: 480px) {
  .crew-flex .card-container {
    width: 100px; 
    height: 100px;
  }

  .crew-flex .card-container .crew-card {
    width: 100px;
    height: 100px; 
  }
}
</style>
