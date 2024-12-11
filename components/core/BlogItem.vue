<template>
  <div class="blog_card">

    <NuxtImg
      :src="imageSrc"
      :alt="title"
      class="card__image"
    />

    <div class="right-part">
      <h3 class="blog-title">
        {{ title }}
      </h3>

      <p class="blog-description">
        {{ truncatedDescription }}
      </p>

      <div class="spacer"></div>

      <div class="blog-time">
        تاریخ انتشار: <span class="reverse-date">{{ formattedTime }}</span>
      </div>
    </div>

  </div>
</template>

<script setup>
import {defineProps, computed} from 'vue';

const props = defineProps({
  imageSrc: String,
  title: String,
  description: String,
  timestamp: String,
});

const truncatedDescription = computed(() => {
  const words = props.description.split(' ');
  return words.length > 50 ? words.slice(0, 50).join(' ') + '...' : props.description;
});

const formattedTime = computed(() => {
  const date = new Date(props.timestamp);
  return date.toLocaleDateString('fa-IR');
});
</script>

<style lang="scss">
.blog_card {
  padding: 10px;
  margin-bottom: 20px;
  background: $light;
  border: 1px solid $gray-200;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  max-height: 550px;
  overflow: hidden;
  text-overflow: ellipsis;

  .card__image {
    width: 100%;
    border-radius: 5px; 
    height: auto;
    object-fit: cover;
  }

  .right-part {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .blog-title {
    
    text-align: center;
    font-weight: bold;
    margin: 10px 0 15px 0;
    font-size: 0.9rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-clamp: 1; 
    line-height: 1.4rem; 
  }

  .blog-description {
    padding-top: 15px;
    color: $gray-500;
    font-size: 13px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
      overflow: hidden;
    text-overflow: ellipsis;

    max-height: 7.8rem;
  }

  .spacer {
    flex-grow: 1;
  }

  .blog-time {
    text-align: left;
    font-size: 12px;
    color: $gray-500;
    margin-top: 5px;
    font-weight: bold;
  }

  .reverse-date {
    direction: rtl;
    unicode-bidi: bidi-override;
  }

  @media (max-width: 504px) {
    flex-direction: row;
    align-items: stretch; 
    width: 200px;
    height: 160px;

    .blog_card {
      padding-top: 1px;
    }

    .card__image {
      height: auto;
      width: 50%;
      object-fit: cover;
      object-position: center; 
      border-radius: 5px;
      margin-right: 10px; 
      display: block; 
    }

    .right-part {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    
    .blog-title {
      text-align: left;
      font-size: 0.7rem;
      padding-left: 5px;
      margin-bottom: 10px;
    }

    .blog-description {
      font-size: 0.75rem; 
      padding-top: 15px;
      margin-top: 10px;
      padding-left: 5px;
 

    }

    .spacer {
      flex-grow: 1;
    }

    .blog-time {
      padding-left: 5px;
    }
  }
}
</style>