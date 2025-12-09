<template>
  <div :class="classes" :style="mergedStyle" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline'
export type SpaceOrientation = 'horizontal' | 'vertical'
export type SpaceSize = 'small' | 'middle' | 'large' | number

export interface SpaceProps {
  /** 对齐方式 */
  align?: SpaceAlign
  /** 间距方向 */
  orientation?: SpaceOrientation
  /** 间距大小 */
  size?: SpaceSize
  /** 是否自动换行（仅 horizontal 时有效） */
  wrap?: boolean
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<SpaceProps>(), {
  orientation: 'horizontal',
  size: 'middle',
  wrap: false,
})

// 预设间距大小映射（单位：px）
const SIZE_MAP: Record<'small' | 'middle' | 'large', number> = {
  small: 8,
  middle: 16,
  large: 24,
}

const classes = computed(() => [
  'apron-space',
  `apron-space--${props.orientation}`,
  props.align && `apron-space--align-${props.align}`,
  props.wrap && props.orientation === 'horizontal' && 'apron-space--wrap',
  props.class,
].filter(Boolean).join(' '))

// 计算间距值
const gapValue = computed(() => typeof props.size === 'number' ? props.size : SIZE_MAP[props.size])

const mergedStyle = computed(() => ({
  '--apron-space-gap': `${gapValue.value}px`,
}))
</script>

<style lang="less">
@import '../../styles/variables.less';

// ============================================
// Space Base Styles
// ============================================
.apron-space {
  display: inline-flex;
  gap: var(--apron-space-gap, @spacing-4);
  transition: all @transition-slow;

  // ============================================
  // Orientation
  // ============================================
  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
  }

  // ============================================
  // Wrap (仅 horizontal 有效)
  // ============================================
  &--wrap {
    flex-wrap: wrap;
  }

  // ============================================
  // Align
  // ============================================
  &--align-start {
    align-items: flex-start;
  }

  &--align-end {
    align-items: flex-end;
  }

  &--align-center {
    align-items: center;
  }

  &--align-baseline {
    align-items: baseline;
  }
}
</style>
