<template>
  <div :class="classes">
    <div
      v-for="(_, index) in Array.from({ length: rows })"
      :key="index"
      :class="rowClasses"
      :style="{
        width: typeof getRowWidth(index) === 'number'
          ? getRowWidth(index) + 'px'
          : getRowWidth(index)
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface SkeletonParagraphProps {
  /** 行数 */
  rows?: number
  /** 每行宽度，可以是数组 */
  width?: number | string | (number | string)[]
  /** 是否显示动画 */
  animated?: boolean
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<SkeletonParagraphProps>(), {
  rows: 3,
  animated: true,
})

const getRowWidth = (index: number): string | number => {
  if (Array.isArray(props.width)) {
    return props.width[index] ?? '100%'
  }
  // 最后一行默认 60%
  if (index === props.rows - 1) {
    return props.width ?? '60%'
  }
  return '100%'
}

const classes = computed(() => [
  'apron-skeleton__paragraph',
  props.class,
].filter(Boolean).join(' '))

const rowClasses = computed(() => [
  'apron-skeleton__row',
  props.animated && 'apron-skeleton__element--animated',
].filter(Boolean).join(' '))
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.apron-skeleton__paragraph {
  display: flex;
  flex-direction: column;
  gap: @spacing-2;
}

.apron-skeleton__row {
  height: 16px;
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
