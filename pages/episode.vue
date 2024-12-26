<template>
  <VideoHeader />

  <VideoDetails />

  <VideoDescription />

  <CastCrew />

  <RelatedVideo />

  <CommentSection />
</template>

<script setup lang="ts">

import VideoHeader from '~/components/pages/episode/VideoHeader.vue';
import VideoDetails from '~/components/core/videos/VideoDetails.vue';
import VideoDescription from '~/components/core/videos/VideoDescription.vue';
import CastCrew from '~/components/core/videos/CastCrew.vue';
import RelatedVideo from '~/components/core/videos/RelatedVideo.vue';
import CommentSection from '~/components/core/CommentSection.vue';
</script>

<style lang="scss">


</style>
