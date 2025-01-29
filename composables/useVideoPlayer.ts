import { ref } from 'vue'
import type { MediaPlayerElement } from 'vidstack/elements'

const activePlayers = ref<MediaPlayerElement[]>([])

export function useVideoPlayer() {
    const pauseAllOtherPlayers = (currentPlayer: MediaPlayerElement) => {
        activePlayers.value.forEach(player => {
            if (player !== currentPlayer && !player.paused) {
                try {
                    player.pause()
                } catch (error) {
                    console.error('Error pausing player:', error)
                }
            }
        })
    }

    const registerPlayer = (player: MediaPlayerElement) => {
        if (!activePlayers.value.includes(player)) {
            activePlayers.value.push(player)
        }
    }

    const unregisterPlayer = (player: MediaPlayerElement) => {
        const index = activePlayers.value.indexOf(player)
        if (index > -1) {
            activePlayers.value.splice(index, 1)
        }
    }

    return {
        pauseAllOtherPlayers,
        registerPlayer,
        unregisterPlayer,
        activePlayers
    }
} 