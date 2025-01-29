import { ref } from 'vue'
import type { MediaPlayerElement } from 'vidstack/elements'

const currentPlayingPlayer = ref<MediaPlayerElement | null>(null)

export function useVideoPlayer() {
    const pauseAllOtherPlayers = (currentPlayer: MediaPlayerElement) => {
        if (currentPlayingPlayer.value && currentPlayingPlayer.value !== currentPlayer) {
            currentPlayingPlayer.value.pause()
        }
        currentPlayingPlayer.value = currentPlayer
    }

    return {
        currentPlayingPlayer,
        pauseAllOtherPlayers
    }
} 