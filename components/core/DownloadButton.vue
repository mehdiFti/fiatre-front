<template>
  <button @click="downloadVideo" class="download-button">
    <nuxt-icon name="download" />
    دانلود
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  videoUrl: string; // Accept the video URL as a prop
}>();

const downloadVideo = () => {
  const link = document.createElement('a');
  link.href = props.videoUrl; // Use the video URL from props
  link.target = '_blank'; // Open the link in a new tab
  link.download = 'video.mp4'; // Set the download attribute to suggest downloading
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style lang="scss" scoped>
.download-button {
  background-color: $third;
  color: white;
  border: none;
  padding: 8px 8px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s, transform 0.3s;

  &:active {
    background: darken($red, 10%);
  }
}
</style>