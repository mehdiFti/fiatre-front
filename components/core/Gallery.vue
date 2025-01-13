<template>
    <div class="container">
        <div class="gallery">
            <div class="gallery-grid">
                <div v-for="(image, index) in props.images" :key="index" class="gallery-item" @click="enlargeImage(image)">
                    <img :src="image.url" :alt="image.alt" />
                </div>
            </div>
        </div>
        <div v-if="selectedImage" class="enlarged-image-container" @click="closeImage">
            <div class="enlarged-image-wrapper" @click.stop>
                <button class="close-button" @click="closeImage">X</button>
                <img :src="selectedImage.url" :alt="selectedImage.alt" class="enlarged-image" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps<{ images: { url: string; alt: string }[] }>();

const selectedImage = ref<{ url: string; alt: string } | null>(null);

const enlargeImage = (image: { url: string; alt: string }) => {
    selectedImage.value = image;
};

const closeImage = () => {
    selectedImage.value = null;
};
</script>

<style scoped lang="scss">
.gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .gallery-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        .gallery-item {
            flex: 1 1 calc(33.33% - 10px);
            box-sizing: border-box;
            cursor: pointer;

            img {
                width: 100%;
                border-radius: 5px;
                transition: transform 0.3s ease;
            }
        }
    }
}


@media (max-width: 768px) {
    .gallery .gallery-grid .gallery-item {
        flex: 1 1 calc(50% - 10px);
    }
}

.enlarged-image-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.enlarged-image-wrapper {
    position: relative;
    max-width: 90%;
    max-height: 90%;
}

.close-button {
    position: absolute;
    border: none;
    padding: 5px;
    cursor: pointer;
    font-size: 26px;
    color: $primary;
    background: transparent; 
}

.enlarged-image {
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
}
</style>