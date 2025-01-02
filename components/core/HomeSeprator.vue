<template>
  <div class="container title-statics">
    <h2 class="title-seprator">{{ title }}</h2>
    <hr class="home-hr">
    <NuxtLink 
      :to="isExternalLink ? undefined : `/categories/${slug}`"
      :href="isExternalLink ? slug : undefined"
      class="gradient-button"
      :target="isExternalLink ? '_blank' : undefined"
    >
      مشاهده همه
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: false,
    default: null
  },
  isExternalLink: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss">
.title-statics {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: $dark;

  .home-hr {
    flex-grow: 1;
    margin-left: 8px;
    border: none;
    height: 0.15rem;
    background: linear-gradient(to right, $primary, $third);
  }

  .gradient-button {
    margin-left: 8px;
    padding: 0.3rem 0.8rem; 
    font-size: 14px;
    border: none;
    background: linear-gradient(70deg, $primary , $third 100%);
    color: $white;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
    opacity: 0.8;
    transition: opacity 0.3s, transform 0.3s;

    &:hover {
      opacity: 1;
      transform: scale(1.05);
    }
  }
}

.title-seprator {
  display: contents;
  font-size: 1.2rem; 
  margin-right: 8px; 
}
@media (max-width: 500px) {
  .title-statics {
    font-size: 16px;

    .gradient-button {
      padding: 0.6rem 0.8rem; 
      font-size: 14px; 
    }
  }
}

@media (max-width: 430px) {
  .title-statics {
    font-size: 14px;

    .gradient-button {
      padding: 0.6rem 0.7rem;
      font-size: 8px;
    }
  }
}
</style>