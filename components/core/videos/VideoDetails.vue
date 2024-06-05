<template>
  <div class="container">
    <div class="video-details-wrapper">
      <div class="video-details">
        <nuxt-icon name="daily-calendar" class="icon" />

        <div class="video-detail-desc">
          سال انتشار: {{ details.releaseValue }}
        </div>
      </div>

      <div class="video-details">
        <nuxt-icon name="camera-movie" class="icon" />

        <div class="video-detail-desc">
          ژانر: {{ details.genreValue }}
        </div>
      </div>

      <div class="video-details">
        <nuxt-icon name="category" class="icon" />

        <div class="video-detail-desc">
          دسته بندی: {{ details.categoryValue }}
        </div>
      </div>

      <div class="video-details">
        <nuxt-icon name="age-alt" class="icon" />

        <div class="video-detail-desc">
          رده بندی سنی: {{ details.ageValue }}
        </div>
      </div>

      <div class="video-details">
        <nuxt-icon name="time" class="icon" />

        <div class="video-detail-desc">
          مدت زمان: {{ details.durationValue }}
        </div>
      </div>

      <div class="video-details">
        <nuxt-icon name="earth" class="icon" />

        <div class="video-detail-desc">
          محصول: {{ details.productValue }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const details = {
  releaseValue: '2001',
  genreValue: 'sci-fi',
  categoryValue: 'فیلم تئاتر',
  ageValue: '15+',
  productValue: 'آمریکا',
  durationValue: '1:30',
};
</script>

<style lang="scss">
.video-details-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background: $light;
  padding: 8px 0;
}

.video-details {
  display: flex;
  align-items: center;
  padding: 8px;
  gap: 10px;
  height: 2.6rem;
  overflow: hidden;

  @include media-breakpoint-down(lg) {
    width: calc(100%/3);
  }

}

.icon {
  font-size: 1.5rem; /* Adjust size of the icon */
  color: $dark; /* Set color to $dark */
}

.video-detail-desc {
  font-size: 16px; /* Set font size */
  color: $dark; /* Set color to $dark */
  overflow: hidden; /* Hide overflow */
}
</style>
