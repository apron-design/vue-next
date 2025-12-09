<template>
  <div :class="classes" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface SkeletonButtonProps {
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg'
  /** 形状 */
  shape?: 'default' | 'circle' | 'round'
  /** 是否块级 */
  block?: boolean
  /** 是否显示动画 */
  animated?: boolean
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<SkeletonButtonProps>(), {
  size: 'md',
  shape: 'default',
  block: false,
  animated: true,
})

const classes = computed(() => [
  'apron-skeleton__button',
  `apron-skeleton__button--${props.size}`,
  `apron-skeleton__button--${props.shape}`,
  props.block && 'apron-skeleton__button--block',
  props.animated && 'apron-skeleton__element--animated',
  props.class,
].filter(Boolean).join(' '))
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.apron-skeleton__button {
  display: inline-block;
  background-color: var(--apron-skeleton-bg);

  &--sm {
    width: 64px;
    height: 32px;
  }

  &--md {
    width: 80px;
    height: 40px;
  }

  &--lg {
    width: 96px;
    height: 48px;
  }

  &--default {
    border-radius: @radius-md;
  }

  &--circle {
    border-radius: 50%;
    
    &.apron-skeleton__button--sm {
      width: 32px;
    }

    &.apron-skeleton__button--md {
      width: 40px;
    }

    &.apron-skeleton__button--lg {
      width: 48px;
    }
  }

  &--round {
    border-radius: 9999px;
  }

  &--block {
    display: block;
    width: 100%;
  }
}

.apron-skeleton__element--animated {
  background: var(--apron-skeleton-gradient);
  background-size: 400% 100%;
  animation: apron-skeleton-loading 1.5s ease infinite;
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
