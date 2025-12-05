<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { CSSProperties } from 'vue'

export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch'
export type SpaceOrientation = 'horizontal' | 'vertical'
export type SpaceSize = 'small' | 'middle' | 'large' | number

export interface SpaceProps {
  align?: SpaceAlign
  orientation?: SpaceOrientation
  size?: SpaceSize
  wrap?: boolean
}

const props = withDefaults(defineProps<SpaceProps>(), {
  align: 'center',
  orientation: 'horizontal',
  size: 'middle',
  wrap: false
})

const attrs = useAttrs()

const sizeMap = {
  small: 8,
  middle: 16,
  large: 24
}

const gapSize = computed(() => {
  if (typeof props.size === 'number') return props.size
  return sizeMap[props.size]
})

const spaceStyle = computed<CSSProperties>(() => ({
  '--apron-space-gap': `${gapSize.value}px`
}))

const spaceClasses = computed(() => [
  'apron-space',
  `apron-space--${props.orientation}`,
  `apron-space--align-${props.align}`,
  {
    'apron-space--wrap': props.wrap
  }
])
</script>

<template>
  <div :class="spaceClasses" :style="spaceStyle" v-bind="attrs">
    <slot />
  </div>
</template>

<style lang="less">
@import './Space.less';
</style>

