<template>
  <ImageHeader />

  <VideoDetails />

  <VideoEpisode />

  <VideoDescription />

  <CastCrew />

  <RelatedVideo />

  <CommentSection />
</template>

<script setup lang="ts">


import VideoDetails from '~/components/core/videos/VideoDetails.vue';
import VideoDescription from '~/components/core/videos/VideoDescription.vue';
import CastCrew from '~/components/core/videos/CastCrew.vue';
import RelatedVideo from '~/components/core/videos/RelatedVideo.vue';
import CommentSection from '~/components/core/CommentSection.vue';
import ImageHeader from '~/components/pages/series/ImageHeader.vue';
import VideoEpisode from '~/components/pages/series/VideoSeries.vue';
</script>

<style lang="scss">

</style>
