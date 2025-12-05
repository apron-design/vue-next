<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue'
import { timelineContextKey } from './Timeline.vue'
import type { TimelineContext } from './Timeline.vue'

export interface TimelineItemProps {
  title?: string
  content?: string
  date?: string
  dotColor?: string
}

const props = defineProps<TimelineItemProps>()

const attrs = useAttrs()
const timelineContext = inject<TimelineContext | null>(timelineContextKey, null)

const itemClasses = computed(() => [
  'apron-timeline-item'
])

const dotStyle = computed(() => {
  if (props.dotColor) {
    return { '--timeline-dot-color': props.dotColor }
  }
  return {}
})
</script>

<template>
  <div :class="itemClasses" :style="dotStyle" v-bind="attrs">
    <div class="apron-timeline-item__line">
      <span class="apron-timeline-item__dot" />
    </div>
    <div class="apron-timeline-item__content">
      <div v-if="title" class="apron-timeline-item__title">
        {{ title }}
      </div>
      <div class="apron-timeline-item__text">
        <slot>{{ content }}</slot>
      </div>
      <div v-if="date" class="apron-timeline-item__date">
        {{ date }}
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import './Timeline.less';
</style>

