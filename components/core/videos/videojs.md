<!-- <template>
    <div class="container">
        <div class="video-container">
            <video ref="videoPlayer"
                class="video-js vjs-show-big-play-button-on-pause vjs-theme-forest  vjs-mobile-view" controls
                preload="auto" data-setup="{}" title="Ocean Video">
                <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
                <p class="vjs-no-js">
                    To view this video please enable JavaScript, and consider upgrading to a
                    web browser that supports HTML5 video
                </p>
            </video>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/forest/index.css';
// import 'videojs-mobile-ui';
// import 'videojs-mobile-ui/dist/videojs-mobile-ui.css';

definePageMeta({
    layout: 'custom'
});


// Import the skip buttons plugin if it's not included by default
// import 'videojs-skip-buttons'; // Uncomment if needed

const videoPlayer = ref<HTMLVideoElement | null>(null);
let player: any = null;

onMounted(() => {
    player = videojs(videoPlayer.value, {
        controls: true,
        fluid: true,
        enableSmoothSeeking: true,
        playbackRates: [0.5, 1, 1.5, 2],
        userActions: {
            // Custom click handler
            click: function (event) {
                if (this.paused()) {
                    this.play();
                } else {
                    this.pause();
                }
            },
            // Custom double-click handler for fullscreen
            doubleClick: function (event) {
                if (this.isFullscreen()) {
                    this.exitFullscreen();
                } else {
                    this.requestFullscreen();
                }
            },
            // Custom hotkeys
            hotkeys: {
                // Custom fullscreen key (press 'f')
                fullscreenKey: function (event) {
                    return (event.which === 70);
                },
                // Custom mute key (press 'm')
                muteKey: function (event) {
                    return (event.which === 77);
                },
                // Custom play/pause key (press 'k' or spacebar)
                playPauseKey: function (event) {
                    return (event.which === 75 || event.which === 32);
                }
            }
        },
        controlBar: {
            skipButtons: {
                backward: 10, // Skip backward by 10 seconds
                forward: 10   // Skip forward by 10 seconds
            },
            playbackRateMenuButton: true, // Enable playback speed control
            remainingTimeDisplay: true,   // Show remaining time
            downloadButton: true,         // Enable download button

        },
        sources: [{
            src: 'https://vjs.zencdn.net/v/oceans.mp4',
            type: 'video/mp4'
        }]
    });

    // Initialize mobile UI with custom options
    player.mobileUi({
        fullscreen: {
            enterOnRotate: true,
            exitOnRotate: true,
            lockOnRotate: true,
            lockToLandscapeOnEnter: true,
            disabled: false
        },
        touchControls: {
            seekSeconds: 10,
            tapTimeout: 300,
            disableOnEnd: false,
            disabled: false
        }
    });

    // Add custom title display
    const titleComponent = videojs.extend(videojs.getComponent('Component'), {
        constructor: function () {
            videojs.getComponent('Component').apply(this, arguments);
            this.addClass('vjs-title');
            this.el().innerHTML = 'Ocean Video'; // Set your video title here
        }
    });

    videojs.registerComponent('TitleComponent', titleComponent);
    player.getChild('controlBar').addChild('TitleComponent', {}, 0);
});

onUnmounted(() => {
    if (player) {
        player.dispose();
    }
});
</script>

<style scoped>
.video-container {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    /* 16:9 Aspect Ratio */
}

.video-js {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    --vjs-theme-color: red;
    /* Override the theme color to red */
    text-align: left;
    /* Ensure text alignment is left for player controls */
}

.vjs-control-bar {
    background-color: red !important;
    /* Override control bar color */
    direction: ltr;
    /* Ensure control bar elements are in LTR order */
}

.vjs-button {
    color: white !important;
    /* Ensure button text is visible */
}

.vjs-play-progress,
.vjs-volume-level {
    background-color: red !important;
    /* Override progress and volume level colors */
}

.vjs-title {
    color: white;
    font-size: 1rem;
    padding: 0 10px;
    line-height: 30px;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
    .container {
        padding: 0;
    }

    .video-container {
        margin: 0;
    }

}
</style> -->
