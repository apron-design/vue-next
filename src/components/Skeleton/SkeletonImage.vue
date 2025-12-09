<template>
  <div
    :class="classes"
    :style="{
      width: typeof width === 'number' ? width + 'px' : width,
      height: typeof height === 'number' ? height + 'px' : height,
    }"
  >
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      width="48"
      height="48"
      opacity="0.3"
    >
      <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zM338 304c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm513.9 437.1a8.11 8.11 0 0 1-5.2 1.9H177.2c-4.4 0-8-3.6-8-8 0-1.9.7-3.7 1.9-5.2l170.3-202c2.8-3.4 7.9-3.8 11.3-1 .3.3.7.6 1 1l99.4 118 158.1-187.5c2.8-3.4 7.9-3.8 11.3-1 .3.3.7.6 1 1l게 227.1z" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface SkeletonImageProps {
  /** 宽度 */
  width?: number | string
  /** 高度 */
  height?: number | string
  /** 是否显示动画 */
  animated?: boolean
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<SkeletonImageProps>(), {
  width: 200,
  height: 200,
  animated: true,
})

const classes = computed(() => [
  'apron-skeleton__image',
  props.animated && 'apron-skeleton__element--animated',
  props.class,
].filter(Boolean).join(' '))
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.apron-skeleton__image {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--apron-skeleton-bg);
  border-radius: @radius-md;
  color: var(--apron-skeleton-bg);
}
</style>
