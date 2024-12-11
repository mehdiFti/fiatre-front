<template>
  <div class="container">
    <div class="quote-container">
      <div class="quote-wrapper">
        <nuxt-icon name="quote-e" class="icon icon-left" />
        <p class="quote-text">{{ quote.text }}</p>
        <nuxt-icon name="quote-s" class="icon icon-right" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  quote: {
    text: string;
  };
}>();
</script>

<style lang="scss" scoped>
.quote-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: darken($light, 10);
  padding: 16px;

  .quote-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 800px;
    position: relative;

    .icon {
      font-size: 1.5rem;
      color: $dark;
      flex-shrink: 0;

      &.icon-left {
        margin-left: 5px;
      }

      &.icon-right {
        margin-right: 5px;
      }
    }

    .quote-text {
      font-size: 18px;
      color: $dark;
      text-align: center;
      font-style: italic;
      flex: 1 1 auto;
      margin: 0;
      padding: 0 16px;
    }
  }

  @media (max-width: 991px) {
    .quote-wrapper {
      flex-direction: column;

      .icon-left {
        align-self: flex-start;
        margin-bottom: 8px;
      }

      .icon-right {
        align-self: flex-end;
        margin-top: 8px;
      }

      .quote-text {
        padding: 8px 0;
      }
    }
  }
}
</style>