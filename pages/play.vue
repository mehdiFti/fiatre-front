<template>
    <div class="container">
        <media-player ref="player" title="Sample Video" src="https://vjs.zencdn.net/v/oceans.mp4" preload="none"
            playsInline viewType="video" class="video-player">
            <ClientOnly>
                <media-provider />
                <media-video-layout>
                    <media-controls>
                        <media-controls-group class="vds-controls-group">
                            <media-play-button />
                            <media-mute-button />
                            <media-volume-slider />
                            <media-time-slider />
                            <media-time-display />
                            <media-fullscreen-button />
                        </media-controls-group>
                    </media-controls>
                </media-video-layout>
            </ClientOnly>
        </media-player>
    </div>
</template>

<script setup lang="ts">
import 'vidstack/bundle'
import 'vidstack/icons'
import { MediaPlayerElement } from 'vidstack/elements'
import { onMounted, ref } from 'vue'

const player = ref<MediaPlayerElement | null>(null)

onMounted(() => {
    if (player.value) {
        // Player is ready for configuration
        player.value.addEventListener('play', () => {
            console.log('Video started playing')
        })

        player.value.addEventListener('pause', () => {
            console.log('Video paused')
        })
    }
})
</script>

<style scoped lang="scss">
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.video-player {
    aspect-ratio: 16/9;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    background: #000;
}

:deep(media-controls) {
    --media-brand: #f5f5f5;
    --media-focus-ring-color: #4e9cf6;
}

:deep(.vds-controls-group) {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
}
</style>
