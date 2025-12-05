<script setup lang="ts">
import { computed, useAttrs } from 'vue'

export type StepStatus = 'completed' | 'current' | 'pending' | 'error'
export type LabelPlacement = 'top' | 'bottom' | 'both'

export interface StepItem {
  title: string
  subtitle?: string
  status?: StepStatus
}

export interface StepsProps {
  items: StepItem[]
  current?: number
  labelPlacement?: LabelPlacement
}

const props = withDefaults(defineProps<StepsProps>(), {
  current: 0,
  labelPlacement: 'bottom'
})

const attrs = useAttrs()

const getStepStatus = (index: number): StepStatus => {
  const item = props.items[index]
  if (item.status) return item.status
  if (index < props.current) return 'completed'
  if (index === props.current) return 'current'
  return 'pending'
}

const stepsClasses = computed(() => [
  'apron-steps',
  `apron-steps--label-${props.labelPlacement}`
])

const icons = {
  completed: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>`,
  error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>`
}
</script>

<template>
  <div :class="stepsClasses" v-bind="attrs">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="apron-steps__step"
      :class="`apron-steps__step--${getStepStatus(index)}`"
    >
      <div class="apron-steps__content">
        <div class="apron-steps__icon">
          <span v-if="getStepStatus(index) === 'completed'" v-html="icons.completed" />
          <span v-else-if="getStepStatus(index) === 'error'" v-html="icons.error" />
          <span v-else>{{ index + 1 }}</span>
        </div>
        <div v-if="index < items.length - 1" class="apron-steps__line" />
      </div>
      <div class="apron-steps__label">
        <div class="apron-steps__title">{{ item.title }}</div>
        <div v-if="item.subtitle" class="apron-steps__subtitle">{{ item.subtitle }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import './Steps.less';
</style>

