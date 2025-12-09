<template>
  <div
    :class="classes"
    :style="{ width: typeof width === 'number' ? width + 'px' : width }"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface SkeletonTitleProps {
  /** 宽度 */
  width?: number | string
  /** 是否显示动画 */
  animated?: boolean
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<SkeletonTitleProps>(), {
  width: '40%',
  animated: true,
})

const classes = computed(() => [
  'apron-skeleton__title',
  props.animated && 'apron-skeleton__element--animated',
  props.class,
].filter(Boolean).join(' '))
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.apron-skeleton__title {
  height: 20px;
  background-color: var(--apron-skeleton-bg);
  border-radius: @radius-sm;
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
