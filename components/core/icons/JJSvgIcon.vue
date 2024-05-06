<template>
  <i
    class="jj-svg-icon"
    v-html="svgIcon"
  />
</template>

<script setup lang="ts">
import getSvgIcon from '~/libs/get-svg-icon';
import type {Icons} from '~/libs/get-svg-icon';

type PropsDefinition = {
  icon: keyof Icons,
}

const props = defineProps<PropsDefinition>();

const svgIcon = computed(() => getSvgIcon(props.icon));
</script>

<style lang="scss">
@import "/assets/scss/components/core/icons/jj-svg-icon";
</style>
