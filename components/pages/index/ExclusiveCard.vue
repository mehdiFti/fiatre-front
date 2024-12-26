<template>
  <div class="mb-5 mt-5 container exclusive-cards-container">
    <NuxtLink
      v-for="card in posters"
      :key="card.id"
      :to="card.link"
      class="exclusive-card"
    >
      <img class="exclusive-card-image" :src="`https://www.fiatre.ir${card.image}`" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  posters: any[]
}>()
</script>

<style lang="scss">
.exclusive-cards-container {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 250px;
  }

  @media (max-width: 450px) {
    .exclusive-card {
      flex: 1 0 100% !important;
  
    }
  }

  .exclusive-card {
    flex: 1 0 calc(40%);
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    transition: opacity 0.3s ease;
    aspect-ratio: 16/9;
    background-color: #f0f0f0;

    .exclusive-card-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .exclusive-card-info {
      display: flex;
      flex-direction: column;
      position: absolute;
      bottom: 0;
      left: 0;
      overflow: hidden;
      width: 100%;
      padding: 10px;
      background-color: transparent;
      text-align: center;
      margin: 20px 0;
      color: $light;
      font-size: 16px;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 2;

      .exclusive-card-title {
        font-size: 1.2rem;
        overflow: hidden;
        padding-bottom: 4px;
        font-weight: bold;
        background-image: linear-gradient(90deg, $third 0% , $primary 78%);
        background-clip: text;
        color: transparent;
      }

      .exclusive-card-desc {
        line-height: 2rem;
      }
    }
  }
}
</style>
