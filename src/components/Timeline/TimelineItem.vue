<template>
  <div ref="timelineItemRef" :class="classNames">
    <!-- both 模式下，内容区域的位置由 CSS :nth-child 控制 -->
    <template v-if="side === 'both'">
      <div class="apron-timeline-item__left">
        <div class="apron-timeline-item__content">
          <div v-if="title" class="apron-timeline-item__title">{{ title }}</div>
          <div v-if="content || slots.default" class="apron-timeline-item__text">
            <slot>{{ content }}</slot>
          </div>
          <div v-if="date" class="apron-timeline-item__date">{{ date }}</div>
        </div>
      </div>
      <div class="apron-timeline-item__dot"></div>
      <div class="apron-timeline-item__right">
        <div class="apron-timeline-item__content">
          <div v-if="title" class="apron-timeline-item__title">{{ title }}</div>
          <div v-if="content || slots.default" class="apron-timeline-item__text">
            <slot>{{ content }}</slot>
          </div>
          <div v-if="date" class="apron-timeline-item__date">{{ date }}</div>
        </div>
      </div>
    </template>
    
    <!-- 默认模式 -->
    <template v-else>
      <div class="apron-timeline-item__dot"></div>
      <div class="apron-timeline-item__content">
        <div v-if="title" class="apron-timeline-item__title">{{ title }}</div>
        <div v-if="content || slots.default" class="apron-timeline-item__text">
          <slot>{{ content }}</slot>
        </div>
        <div v-if="date" class="apron-timeline-item__date">{{ date }}</div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, useSlots } from 'vue'
import type { TimelineItemProps, TimelineDotColor } from './types'

// 属性
const props = withDefaults(defineProps<TimelineItemProps>(), {
  dotColor: 'default',
  className: ''
})

// 插槽
const slots = useSlots()

// 引用
const timelineItemRef = ref<HTMLDivElement | null>(null)

// 从上下文获取side属性
const context = inject<any>('timelineContext')
const side = context?.side || 'right'

// 计算类名
const classNames = computed(() => [
  'apron-timeline-item',
  `apron-timeline-item--dot-${props.dotColor}`,
  props.className
].filter(Boolean).join(' '))

// 暴露方法
defineExpose({
  timelineItemRef
})
</script>