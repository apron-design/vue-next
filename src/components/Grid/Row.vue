<script setup lang="ts">
import { computed, provide, useAttrs } from 'vue'
import type { InjectionKey, CSSProperties } from 'vue'

export type Gutter = number | [number, number] | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number; xxl?: number }
export type Justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
export type Align = 'top' | 'middle' | 'bottom' | 'stretch'

export interface RowContext {
  gutter: Gutter
}

export const rowContextKey: InjectionKey<RowContext> = Symbol('rowContext')

export interface RowProps {
  gutter?: Gutter
  justify?: Justify
  align?: Align
  wrap?: boolean
}

const props = withDefaults(defineProps<RowProps>(), {
  gutter: 0,
  justify: 'start',
  align: 'top',
  wrap: true
})

const attrs = useAttrs()

const context: RowContext = {
  get gutter() { return props.gutter }
}

provide(rowContextKey, context)

const rowStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  const g = props.gutter
  
  if (typeof g === 'number' && g > 0) {
    style.marginLeft = `-${g / 2}px`
    style.marginRight = `-${g / 2}px`
  } else if (Array.isArray(g)) {
    if (g[0] > 0) {
      style.marginLeft = `-${g[0] / 2}px`
      style.marginRight = `-${g[0] / 2}px`
    }
    if (g[1] > 0) {
      style.rowGap = `${g[1]}px`
    }
  }
  
  return style
})

const rowClasses = computed(() => [
  'apron-row',
  `apron-row--justify-${props.justify}`,
  `apron-row--align-${props.align}`,
  {
    'apron-row--wrap': props.wrap,
    'apron-row--no-wrap': !props.wrap
  }
])
</script>

<template>
  <div :class="rowClasses" :style="rowStyle" v-bind="attrs">
    <slot />
  </div>
</template>

<style lang="less">
@import './Grid.less';
</style>

