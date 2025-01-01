<template>
  <div class="bookmark-item">
    <nuxt-link :to="episode.src" class="bookmark-link">
      <div class="image-wrapper">
        <img class="bookmark-img" :src="src" :alt="name" />
        <div class="overlay">
          <span class="play-icon">▶</span>
        </div>
      </div>
      <div class="bookmark-text">
        <h3 :class="{ 'highlight-title': !number }">{{ name }}</h3>
        <div class="other-button">
          <BookmarkButton
            :videoId="episode.key"
            :videoDetails="episode"
            :isInBookmarksPage="isInBookmarksPage"
          />
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">


interface Episode {
  key: string;
  title: string;
  src: string;
  poster: string;
  description: string;
}

// Props
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
  },
  episode: {
    type: Object as () => Episode,
    required: true,
  },
  isInBookmarksPage: {
    type: Boolean,
    default: false,
  }
});

</script>

<style lang="scss" scoped>
.bookmark-item {
  position: relative;
  flex: 0 0 calc(25% - 24px);
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  padding-bottom: 5px;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);

    .overlay {
      opacity: 1;
    }

    .bookmark-img {
      transform: scale(1.15);
    }
  }

  .bookmark-link {
    text-decoration: none;
    height: 100%;
    display: block;
  }

  .image-wrapper {
    position: relative;
    height: 185px;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 40%;
      background: linear-gradient(to top, rgba(0,0,0,0.3), transparent);
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 2;

    .play-icon {
      color: white;
      font-size: 3rem;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
    }
  }

  .bookmark-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .bookmark-text {
    align-items: center;
    padding: 10px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    position: relative;
    background: transparent;

    h3 {
      font-size: 0.9rem;
      font-weight: 600;
      margin: 0;
      color: #2c3e50;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      transition: color 0.3s ease;
    }
  }
}

@media (max-width: 1024px) {
  .bookmark-item {
    flex: 0 0 calc(50% - 20px);
    height: 400px;

    .image-wrapper {
      height: 240px;
    }
  }
}

@media (max-width: 768px) {
  .bookmark-item {
    flex: 0 0 calc(100% - 20px);
    height: 380px;

    .image-wrapper {
      height: 220px;
    }
  }
}

@media (max-width: 420px) {
  .bookmark-item {
    height: 340px;

    .image-wrapper {
      height: 200px;
    }

    .bookmark-text {
      padding: 15px;
    }
  }
}
</style>