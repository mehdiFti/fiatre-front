<template>
  <div class=" container media-player-container">
    <media-player
      ref="player"
      class="video-plyr"
      title="Sprite Fight"
      src="https://files.vidstack.io/sprite-fight/720p.mp4"
      keep-alive
    >
      <media-provider />

      <media-poster
        class="vds-poster"
        src="https://files.vidstack.io/sprite-fight/poster.webp"
        alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
      />


      <media-video-layout class="video-plyr" thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt" />
    </media-player>
  </div>
</template>

<script setup lang="ts">
import 'vidstack/bundle';
import {onMounted, onBeforeUnmount, ref} from 'vue';

import {defineCustomElement, MediaPlayerElement, MediaToggleButtonElement} from 'vidstack/elements';

defineCustomElement(MediaToggleButtonElement);


import 'vidstack/player/styles/base.css';
import 'vidstack/player/styles/plyr/theme.css';
defineCustomElement(MediaPlayerElement);

const player = ref<MediaPlayerElement | null>(null);

onMounted(() => {
  if (player.value) {
    player.value.setAttribute('dir', 'ltr');
  }
});

onBeforeUnmount(() => {
  if (player.value) {
    player.value.destroy();
  }
});
</script>

<style lang="scss">
/*rtl:begin:ignore*/



.media-player-container {
  display: flex;
  justify-content: center; /* Center the content horizontally */
  align-items: center; /* Center the content vertically */
  height: 100%; /* Set the height of the container */
}
media-player {
  /* Player CSS variables (defaults shown). */
  --media-font-family: sans-serif;
  --media-controls-color: #f5f5f5;
  --media-focus-ring: 0 0 0 3px rgb(78 156 246);
}

/* Override RTL styles for specific elements */
.media-player-container .vds-menu-items,
.media-player-container .vds-menu-items .vds-menu-item {
  direction: ltr; /* Force left-to-right direction */
}

.vds-poster {
  border-radius: 5px;
}

.video-plyr{
  border-radius: 5px;
}

/*rtl:end:ignore*/
</style>
