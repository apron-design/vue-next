<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue'
import { rowContextKey } from './Row.vue'
import type { RowContext } from './Row.vue'
import type { CSSProperties } from 'vue'

export interface ColSize {
  span?: number
  offset?: number
  order?: number
  push?: number
  pull?: number
}

export interface ColProps {
  span?: number
  offset?: number
  order?: number
  push?: number
  pull?: number
  flex?: string | number
  xs?: number | ColSize
  sm?: number | ColSize
  md?: number | ColSize
  lg?: number | ColSize
  xl?: number | ColSize
  xxl?: number | ColSize
}

const props = defineProps<ColProps>()
const attrs = useAttrs()
const rowContext = inject<RowContext | null>(rowContextKey, null)

const colStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  const gutter = rowContext?.gutter

  if (typeof gutter === 'number' && gutter > 0) {
    style.paddingLeft = `${gutter / 2}px`
    style.paddingRight = `${gutter / 2}px`
  } else if (Array.isArray(gutter) && gutter[0] > 0) {
    style.paddingLeft = `${gutter[0] / 2}px`
    style.paddingRight = `${gutter[0] / 2}px`
  }

  if (props.flex) {
    style.flex = typeof props.flex === 'number' ? `${props.flex} ${props.flex} auto` : props.flex
  }

  return style
})

const generateSizeClasses = (size: string, sizeValue: number | ColSize | undefined) => {
  if (sizeValue === undefined) return {}
  
  const classes: Record<string, boolean> = {}
  
  if (typeof sizeValue === 'number') {
    classes[`apron-col-${size}-${sizeValue}`] = true
  } else {
    if (sizeValue.span !== undefined) {
      classes[`apron-col-${size}-${sizeValue.span}`] = true
    }
    if (sizeValue.offset !== undefined) {
      classes[`apron-col-${size}-offset-${sizeValue.offset}`] = true
    }
    if (sizeValue.order !== undefined) {
      classes[`apron-col-${size}-order-${sizeValue.order}`] = true
    }
    if (sizeValue.push !== undefined) {
      classes[`apron-col-${size}-push-${sizeValue.push}`] = true
    }
    if (sizeValue.pull !== undefined) {
      classes[`apron-col-${size}-pull-${sizeValue.pull}`] = true
    }
  }
  
  return classes
}

const colClasses = computed(() => {
  const classes: Record<string, boolean> = {
    'apron-col': true
  }

  if (props.span !== undefined) {
    classes[`apron-col-${props.span}`] = true
  }
  if (props.offset !== undefined) {
    classes[`apron-col-offset-${props.offset}`] = true
  }
  if (props.order !== undefined) {
    classes[`apron-col-order-${props.order}`] = true
  }
  if (props.push !== undefined) {
    classes[`apron-col-push-${props.push}`] = true
  }
  if (props.pull !== undefined) {
    classes[`apron-col-pull-${props.pull}`] = true
  }

  return [
    classes,
    generateSizeClasses('xs', props.xs),
    generateSizeClasses('sm', props.sm),
    generateSizeClasses('md', props.md),
    generateSizeClasses('lg', props.lg),
    generateSizeClasses('xl', props.xl),
    generateSizeClasses('xxl', props.xxl)
  ]
})
</script>

<template>
  <div :class="colClasses" :style="colStyle" v-bind="attrs">
    <slot />
  </div>
</template>

<style lang="less">
@import './Grid.less';
</style>

