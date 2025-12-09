<template>
  <div ref="timelineRef" :class="classNames">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, computed } from 'vue'
import type { TimelineProps, TimelineSide } from './types'
import './Timeline.less'

// 默认属性
const props = withDefaults(defineProps<TimelineProps>(), {
  side: 'right',
  className: ''
})

// 引用
const timelineRef = ref<HTMLDivElement | null>(null)

// 计算类名
const classNames = computed(() => [
  'apron-timeline',
  `apron-timeline--${props.side}`,
  props.className
].filter(Boolean).join(' '))

// 提供上下文
provide('timelineContext', {
  side: props.side
})

// 暴露方法
defineExpose({
  timelineRef
})
</script>