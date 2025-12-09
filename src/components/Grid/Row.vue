<template>
  <div ref="rowRef" :class="classes" :style="rowStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide } from 'vue'

export type Gutter = number | [number, number]

export interface RowProps {
  /** 栅格间隔，可以是数字或数组 [水平间距, 垂直间距] */
  gutter?: Gutter | { xs?: Gutter; sm?: Gutter; md?: Gutter; lg?: Gutter; xl?: Gutter; xxl?: Gutter }
  /** 水平排列方式 */
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
  /** 垂直对齐方式 */
  align?: 'top' | 'middle' | 'bottom' | 'stretch'
  /** 是否自动换行 */
  wrap?: boolean
  /** 自定义类名 */
  class?: string
  /** 自定义样式 */
  style?: Record<string, any>
}

const props = withDefaults(defineProps<RowProps>(), {
  gutter: 0,
  justify: 'start',
  align: 'top',
  wrap: true
})

const rowRef = ref<HTMLDivElement | null>(null)

// 处理 gutter
const normalizeGutter = (gutter: Gutter | undefined): [number, number] => {
  if (gutter === undefined) return [0, 0]
  if (typeof gutter === 'number') return [gutter, 0]
  return gutter
}

let gutterValue: [number, number] = [0, 0]

if (typeof props.gutter === 'object' && !Array.isArray(props.gutter)) {
  // 响应式 gutter，这里简化处理，实际应该根据屏幕宽度选择
  // 在 SSR 环境中默认使用最小断点
  const responsiveGutter = props.gutter as { xs?: Gutter; sm?: Gutter; md?: Gutter; lg?: Gutter; xl?: Gutter; xxl?: Gutter }
  gutterValue = normalizeGutter(
    responsiveGutter.xs || responsiveGutter.sm || responsiveGutter.md || 
    responsiveGutter.lg || responsiveGutter.xl || responsiveGutter.xxl
  )
} else {
  gutterValue = normalizeGutter(props.gutter as Gutter)
}

const [horizontalGutter, verticalGutter] = gutterValue

const classes = computed(() => [
  'apron-row',
  props.justify !== 'start' && `apron-row--justify-${props.justify}`,
  props.align !== 'top' && `apron-row--align-${props.align}`,
  !props.wrap && 'apron-row--no-wrap',
  props.class,
].filter(Boolean).join(' '))

const rowStyle = computed(() => {
  const style: Record<string, any> = { ...props.style }
  
  if (horizontalGutter > 0) {
    style.marginLeft = -horizontalGutter / 2
    style.marginRight = -horizontalGutter / 2
  }
  
  if (verticalGutter > 0) {
    style.rowGap = verticalGutter
  }
  
  return style
})

// 提供 Row 上下文
provide('rowContext', {
  gutter: gutterValue
})
</script>

<style lang="less">
@import '../../styles/variables.less';

// Row 样式
.apron-row {
  display: flex;
  flex-flow: row wrap;
  min-width: 0;

  // justify 对齐
  &--justify-start {
    justify-content: flex-start;
  }

  &--justify-end {
    justify-content: flex-end;
  }

  &--justify-center {
    justify-content: center;
  }

  &--justify-space-around {
    justify-content: space-around;
  }

  &--justify-space-between {
    justify-content: space-between;
  }

  &--justify-space-evenly {
    justify-content: space-evenly;
  }

  // align 对齐
  &--align-top {
    align-items: flex-start;
  }

  &--align-middle {
    align-items: center;
  }

  &--align-bottom {
    align-items: flex-end;
  }

  &--align-stretch {
    align-items: stretch;
  }

  // 不换行
  &--no-wrap {
    flex-wrap: nowrap;
  }
}
</style>