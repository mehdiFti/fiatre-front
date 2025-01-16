<template>
  <div class="container mt-4" dir="rtl">
    <div class="video-details-wrapper" :class="{ 'is-series': isSeries }">
      <div v-if="!isSeries" class="video-details">
        <div class="video-detail-desc">
          <nuxt-icon name="daily-calendar" class="icon first" />
          سال انتشار: {{ details.releaseValue }}
        </div>
      </div>

      <div v-if="!isSeries" class="video-details">
        <div class="video-detail-desc">
          <nuxt-icon name="camera-movie" class="icon" />
          ژانر: {{ details.genreValue }}
        </div>
      </div>

      <div class="video-details" :class="{ 'series-item': isSeries }">
        <div class="video-detail-desc">
          <nuxt-icon name="category" class="icon first" />
          دسته بندی: {{ details.categoryValue }}
        </div>
      </div>

      <div class="video-details" :class="{ 'series-item': isSeries }">
        <div class="video-detail-desc">
          <nuxt-icon name="age-alt" class="icon" />
          رده بندی سنی: 15+
        </div>
      </div>

      <div class="video-details" :class="{ 'series-item': isSeries }">
        <div class="video-detail-desc">
          <nuxt-icon name="time" class="icon first" />
          مدت زمان: {{ details.durationValue }} دقیقه
        </div>
      </div>

      <div class="video-details" :class="{ 'series-item': isSeries }">
        <div class="video-detail-desc">
          <nuxt-icon name="earth" class="icon" />
          محصول: {{ details.productValue }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  details: {
    type: Object,
    required: true
  },
  isSeries: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss">
.video-details-wrapper {
  display: flex;
  border-radius: 5px;
  flex-wrap: wrap;
  
  justify-content: space-around;
  // align-items: center;
  background-color: $milky;
  padding-top: 4px;

}

.video-details {
  display: flex;
  gap: 10px;
  min-height: 2.6rem;
  overflow: hidden;
  padding-top: 0;

  @include media-breakpoint-down(lg) {
    width: calc(100%/3);

    [dir="rtl"] & {
      padding-right: 40px;
      padding-left: 0;
    }
  }

  @include media-breakpoint-down(md) {
    width: calc(100%/2);
  }

  &.series-item {

    @media (max-width: 1200px) and (min-width: 992px) {
      width: calc(50% - 50px);
      padding: 0 0 0 120px;
      // background-color: red;
    }

    @media (max-width: 992px) {
      width: calc(50% - 50px);
      justify-content: start;
      ;
      padding: 0 0 0 60px;
      // background-color: green;
    }

    @media (max-width: 769px) {
      width: calc(50% - 20px);
      padding: 0 0 0 40px;

      .icon {
        font-size: 1.3rem;
      }

      .video-detail-desc {
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      @media (max-width: 408px) {
        width: calc(100% - 10px);

      }
    }
  }



  @media (max-width: 1200px) and (min-width: 769px) {
    width: calc(33.33% - 20px);
    padding: 0 0 0 20px;
  }

  @media (max-width: 508px) {

    .icon {
      font-size: 1.4rem;
    }

    .video-detail-desc {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  @media (max-width: 420px) {
    align-items: center;
    padding: 0 0 0 20px;
    gap: 0;
    margin: 0;
    padding-top: 0;

    .icon {
      font-size: 1rem;
    }

    .video-detail-desc {
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.icon {
  font-size: 1.5rem;
  color: $dark;
}

.video-detail-desc {
  direction: ltr !important;
  font-size: 14px;
  color: $dark;
      text-overflow: ellipsis;
      white-space: nowrap;
  overflow: hidden;
  text-align: left;
}
</style>
