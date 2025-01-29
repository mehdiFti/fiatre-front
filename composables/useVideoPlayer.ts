import { ref } from 'vue'
import type { MediaPlayerElement } from 'vidstack/elements'

const activePlayers = ref<MediaPlayerElement[]>([])
let currentlyPlaying = ref<MediaPlayerElement | null>(null)

export function useVideoPlayer() {
    const pauseAllOtherPlayers = (currentPlayer: MediaPlayerElement) => {
        // First pause any currently playing video
        if (currentlyPlaying.value && currentlyPlaying.value !== currentPlayer) {
            try {
                currentlyPlaying.value.pause()
            } catch (error) {
                console.error('Error pausing current player:', error)
            }
        }

        // Then pause all other active players
        activePlayers.value.forEach(player => {
            if (player !== currentPlayer && !player.paused) {
                try {
                    player.pause()
                } catch (error) {
                    console.error('Error pausing player:', error)
                }
            }
        })

        // Set the current player as the currently playing one
        currentlyPlaying.value = currentPlayer
    }

    const registerPlayer = (player: MediaPlayerElement) => {
        if (!activePlayers.value.includes(player)) {
            activePlayers.value.push(player)

            // Add play event listener to handle auto-pausing
            player.addEventListener('play', () => {
                pauseAllOtherPlayers(player)
            })
        }
    }

    const unregisterPlayer = (player: MediaPlayerElement) => {
        const index = activePlayers.value.indexOf(player)
        if (index > -1) {
            activePlayers.value.splice(index, 1)
        }
        if (currentlyPlaying.value === player) {
            currentlyPlaying.value = null
        }
    }

    return {
        pauseAllOtherPlayers,
        registerPlayer,
        unregisterPlayer,
        activePlayers,
        currentlyPlaying
    }
} 