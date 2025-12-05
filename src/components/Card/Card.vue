<script setup lang="ts">
import { computed, useAttrs } from 'vue'

export interface CardProps {
  bordered?: boolean
}

const props = withDefaults(defineProps<CardProps>(), {
  bordered: true
})

const attrs = useAttrs()

const cardClasses = computed(() => [
  'apron-card',
  {
    'apron-card--bordered': props.bordered
  }
])
</script>

<template>
  <div :class="cardClasses" v-bind="attrs">
    <slot />
  </div>
</template>

<style lang="less">
@import './Card.less';
</style>

