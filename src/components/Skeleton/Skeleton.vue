<script setup lang="ts">
import { computed, useAttrs } from 'vue'

export interface SkeletonProps {
  loading?: boolean
  animated?: boolean
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  loading: true,
  animated: true
})

const attrs = useAttrs()
const slots = defineSlots<{
  default?: () => any
  template?: () => any
}>()

const skeletonClasses = computed(() => [
  'apron-skeleton',
  {
    'apron-skeleton--animated': props.animated
  }
])
</script>

<template>
  <div :class="skeletonClasses" v-bind="attrs">
    <template v-if="loading">
      <slot name="template">
        <div class="apron-skeleton__content">
          <div class="apron-skeleton__avatar apron-skeleton-element apron-skeleton-element--circular" />
          <div class="apron-skeleton__info">
            <div class="apron-skeleton-element apron-skeleton-element--text" style="width: 40%" />
            <div class="apron-skeleton-element apron-skeleton-element--text" />
            <div class="apron-skeleton-element apron-skeleton-element--text" style="width: 60%" />
          </div>
        </div>
      </slot>
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<style lang="less">
@import './Skeleton.less';
</style>

