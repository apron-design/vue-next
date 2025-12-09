<template>
  <div :class="classes" :style="elementStyle" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface SkeletonElementProps {
  /** 形状 */
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  /** 宽度 */
  width?: number | string
  /** 高度 */
  height?: number | string
  /** 是否显示动画 */
  animated?: boolean
  /** 自定义类名 */
  class?: string
  /** 自定义样式 */
  style?: Record<string, string | number>
}

const props = withDefaults(defineProps<SkeletonElementProps>(), {
  variant: 'text',
  animated: true,
})

const classes = computed(() => [
  'apron-skeleton__element',
  `apron-skeleton__element--${props.variant}`,
  props.animated && 'apron-skeleton__element--animated',
  props.class,
].filter(Boolean).join(' '))

const elementStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  ...props.style,
}))
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.apron-skeleton__element {
  background-color: var(--apron-skeleton-bg);

  &--text {
    height: 16px;
    border-radius: @radius-sm;
  }

  &--circular {
    border-radius: 50%;
  }

  &--rectangular {
    border-radius: 0;
  }

  &--rounded {
    border-radius: @radius-md;
  }

  &--animated {
    background: var(--apron-skeleton-gradient);
    background-size: 400% 100%;
    animation: apron-skeleton-loading 1.5s ease infinite;
  }
}

@keyframes apron-skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
