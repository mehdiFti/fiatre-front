<template>
  <div class="container">
    <div class="video-episode-wrapper">
      <div
        v-for="episode in episodes"
        :key="episode.key"
        class="video-episode-card"
      >
        <media-player
          ref="addPlayerRef"
          :title="episode.title"
          :src="episode.src"
          keep-alive
          :current-time="getSavedTime(episode.key)"
          class="video-player"
          @play="handlePlay(episode.key)"
          @time-update="handleTimeUpdate(episode.key, $event)"
        >
          <media-provider />

          <media-poster
            class="vds-poster"
            :src="episode.poster"
            :alt="`Poster for ${episode.title}`"
          />

          <media-video-layout class="video-layout" />
        </media-player>

        <div class="episode-info">
          <div class="episode-title">
            <span class="episode-number">{{ episode.number }}</span> - {{ episode.title }}
          </div>

          <hr>

          <div class="episode-desc">
            {{ truncateDescription(episode.description) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import 'vidstack/bundle';
import type {MediaPlayerElement} from 'vidstack/elements';
import {ref, onBeforeUnmount, onMounted} from 'vue';

// Function to check if the code is running on the client side
const isClient = () => typeof window !== 'undefined';

const episodes = [
  {
    number: 'قسمت 1',
    title: 'انتخاب یک مونولوگ',
    src: 'https://dl.fiatre.ir/Kevin-Spacey-Teaches-Acting/02Choosing%20A%20Monologue-2.m4v',
    poster: 'https://files.vidstack.io/sprite-fight/poster.webp',
    description: 'شرح قسمت اول',
    key: 1,
  },
  {
    number: 'قسمت 2',
    title: 'آموزش بازیگری پیشرفته',
    src: 'https://dl.fiatre.ir/Kevin-Spacey-Teaches-Acting/02Choosing%20A%20Monologue-2.m4v',
    poster: 'https://files.vidstack.io/sprite-fight/poster.webp',
    description: 'شرح قسمت دوم',
    key: 2,
  },
  {
    number: 'قسمت 2',
    title: 'آموزش بازیگری پیشرفته',
    src: 'https://dl.fiatre.ir/Kevin-Spacey-Teaches-Acting/02Choosing%20A%20Monologue-2.m4v',
    poster: 'https://files.vidstack.io/sprite-fight/poster.webp',
    description: 'آموزش بازیگری پیشرفتهآموزش بازیگری پیشرفتهآموزش بازیگری پیشرفتهآموزش بازیگری پیشرفتهآموزش بازیگری پیشرفتهآموزش بازیگری پیشرفتهآموزش بازیگری پیشرفتهآموزش بازیگری پیشرفتهآموزش بازیگری پیشرفتهآموزش بازیگری پیشرفتهآموزش بازیگری پیشرفتهآموزش بازیگری پیشرفتهآموزش بازیگری پیشرفتهآموزش بازیگری پیشرفتهآموزش بازیگری پیشرفتهآموزش بازیگری پیشرفتهآموزش بازیگری پیشرفته',
    key: 3,
  },
  {
    number: 'قسمت 2',
    title: 'آموزش بازیگری پیشرفته',
    src: 'https://dl.fiatre.ir/Kevin-Spacey-Teaches-Acting/02Choosing%20A%20Monologue-2.m4v',
    poster: 'https://files.vidstack.io/sprite-fight/poster.webp',
    description: 'شرح قسمت دوم',
    key: 4,
  },
  {
    number: 'قسمت 2',
    title: 'آموزش بازیگری پیشرفته',
    src: 'https://dl.fiatre.ir/Kevin-Spacey-Teaches-Acting/02Choosing%20A%20Monologue-2.m4v',
    poster: 'https://files.vidstack.io/sprite-fight/poster.webp',
    description: 'شرح قسمت دوم',
    key: 5,
  },
  // Add more episodes as needed
];

const playerRefs = ref<MediaPlayerElement[]>([]);

const addPlayerRef = (el: MediaPlayerElement) => {
  if (el) {
    playerRefs.value.push(el);
  }
};

const handlePlay = (key: number) => {
  playerRefs.value.forEach((player, index) => {
    if (index + 1 !== key && player) {
      player.pause();
    }
  });
};

const handleTimeUpdate = (key: number, event: CustomEvent) => {
  if (isClient()) {
    const currentTime = event.detail;
    localStorage.setItem(`video-${key}-time`, currentTime.toString());
  }
};

const getSavedTime = (key: number) => {
  if (isClient()) {
    const savedTime = localStorage.getItem(`video-${key}-time`);
    return savedTime ? parseFloat(savedTime) : 0;
  }
  return 0;
};

const truncateDescription = (description: string) => {
  const maxWords = 100;
  const words = description.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  return description;
};

onMounted(() => {
  playerRefs.value = [];
});

onBeforeUnmount(() => {
  playerRefs.value.forEach((player, index) => {
    if (player) {
      player.destroy();
    }
    if (isClient()) {
      localStorage.removeItem(`video-${index + 1}-time`);
    }
  });
});
</script>
<style scoped lang="scss">
//

.video-episode-wrapper {
margin-top: 40px;
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to the next row */
  gap: 20px;
  width: 100%;
  background: $light;
/* Adjust this value to fit your design */
}

.video-episode-card {
  flex: 0 0 calc(25% - 20px); /* Each card occupies 25% width with 20px gap */
  display: flex;
  flex-direction: column;
  background-color: $white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  height: 400px;


}

.video-player {
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: $light;
}

.episode-info {
  padding: 15px;
  text-align: left;
}

.episode-number {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.episode-title {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.episode-desc {
  font-size: 1em;
  color: #666;
  line-height: 1.5;
}

hr {
  border: none;
  border-top: 1px solid $dark;
  margin: 10px 0;
}

@media screen and (max-width: 1024px) {
  .video-episode-card {
    flex: 0 0 calc(33.33% - 20px); /* Adjust for smaller screens */
  }
}

@media screen and (max-width: 768px) {
  .video-episode-card {
    flex: 0 0 calc(50% - 20px); /* Adjust for smaller screens */
  }
}

@media screen and (max-width: 480px) {
  .video-episode-card {
    flex: 0 0 calc(100% - 20px); /* Each episode occupies 100% width on smaller screens */
  }
}

@media screen and (max-width: 480px) {
  .episode-desc {
    max-height: 3em; /* Limit height to 3 lines */
    overflow: hidden;
    text-overflow: ellipsis; /* Add ellipsis for overflow */
  }
}
</style>
