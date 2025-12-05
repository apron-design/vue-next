<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { CSSProperties } from 'vue'

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded'

export interface SkeletonElementProps {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
  animated?: boolean
}

const props = withDefaults(defineProps<SkeletonElementProps>(), {
  variant: 'text',
  animated: true
})

const attrs = useAttrs()

const elementStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return style
})

const elementClasses = computed(() => [
  'apron-skeleton-element',
  `apron-skeleton-element--${props.variant}`,
  {
    'apron-skeleton--animated': props.animated
  }
])
</script>

<template>
  <div :class="elementClasses" :style="elementStyle" v-bind="attrs" />
</template>

<style lang="less">
@import './Skeleton.less';
</style>

