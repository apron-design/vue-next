<template>
  <div
    :class="classes"
    :style="{ width: actualSize + 'px', height: actualSize + 'px' }"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface SkeletonAvatarProps {
  /** 尺寸 */
  size?: number | 'sm' | 'md' | 'lg'
  /** 形状 */
  shape?: 'circle' | 'square'
  /** 是否显示动画 */
  animated?: boolean
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<SkeletonAvatarProps>(), {
  size: 'md',
  shape: 'circle',
  animated: true,
})

const sizeMap = {
  sm: 32,
  md: 40,
  lg: 48,
}

const actualSize = computed(() => typeof props.size === 'number' ? props.size : sizeMap[props.size])

const classes = computed(() => [
  'apron-skeleton__avatar',
  `apron-skeleton__avatar--${props.shape}`,
  props.animated && 'apron-skeleton__element--animated',
  props.class,
].filter(Boolean).join(' '))
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.apron-skeleton__avatar {
  flex-shrink: 0;
  background-color: var(--apron-skeleton-bg);

  &--circle {
    border-radius: 50%;
  }

  &--square {
    border-radius: @radius-md;
  }
}
</style>
