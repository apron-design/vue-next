<script setup lang="ts">
import { computed, provide, useAttrs } from 'vue'
import type { InjectionKey } from 'vue'

export type TimelineSide = 'left' | 'right' | 'both'

export interface TimelineContext {
  side: TimelineSide
}

export const timelineContextKey: InjectionKey<TimelineContext> = Symbol('timelineContext')

export interface TimelineProps {
  side?: TimelineSide
}

const props = withDefaults(defineProps<TimelineProps>(), {
  side: 'left'
})

const attrs = useAttrs()

const context: TimelineContext = {
  get side() { return props.side }
}

provide(timelineContextKey, context)

const timelineClasses = computed(() => [
  'apron-timeline',
  `apron-timeline--${props.side}`
])
</script>

<template>
  <div :class="timelineClasses" v-bind="attrs">
    <slot />
  </div>
</template>

<style lang="less">
@import './Timeline.less';
</style>

