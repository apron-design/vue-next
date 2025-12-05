<script setup lang="ts">
import { computed } from 'vue'
import type { VNode } from 'vue'

export interface BadgeProps {
  dot?: boolean
  count?: number
  overflowCount?: number
  content?: string | VNode
}

const props = withDefaults(defineProps<BadgeProps>(), {
  dot: false,
  overflowCount: 99
})

const slots = defineSlots<{
  default?: () => any
  content?: () => any
}>()

const displayCount = computed(() => {
  if (props.count === undefined) return null
  if (props.count > props.overflowCount) return `${props.overflowCount}+`
  return String(props.count)
})

const badgeClasses = computed(() => [
  'apron-badge',
  {
    'apron-badge--dot': props.dot,
    'apron-badge--standalone': !slots.default
  }
])

const showIndicator = computed(() => {
  return props.dot || props.count !== undefined || props.content || slots.content
})
</script>

<template>
  <span :class="badgeClasses">
    <slot />
    <sup v-if="showIndicator" class="apron-badge__indicator">
      <template v-if="dot">
        <span class="apron-badge__dot" />
      </template>
      <template v-else-if="count !== undefined">
        <span class="apron-badge__count" :class="{ 'apron-badge__count--multi': displayCount && displayCount.length > 1 }">
          {{ displayCount }}
        </span>
      </template>
      <template v-else>
        <span class="apron-badge__content">
          <slot name="content">{{ content }}</slot>
        </span>
      </template>
    </sup>
  </span>
</template>

<style lang="less">
@import './Badge.less';
</style>

