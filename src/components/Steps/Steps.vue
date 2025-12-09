<template>
  <div :class="classNames">
    <Step
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      :status="getStatus(index)"
      :is-first="index === 0"
      :is-last="index === items.length - 1"
      :next-status="index < items.length - 1 ? getStatus(index + 1) : undefined"
      :label-placement="labelPlacement"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { StepsProps, StepItem, StepStatus, StepLabelPlacement } from './types'
import Step from './Step.vue'
import './Steps.less'

// 默认属性
const props = withDefaults(defineProps<StepsProps>(), {
  current: 0,
  labelPlacement: 'bottom',
  className: ''
})

// 根据 current 计算每个步骤的状态
const getStatus = (index: number): StepStatus => {
  if (props.items[index].status) {
    return props.items[index].status!
  }
  if (index < props.current) return 'completed'
  if (index === props.current) return 'current'
  return 'pending'
}

// 计算容器类名
const classNames = computed(() => [
  'apron-steps',
  `apron-steps--label-${props.labelPlacement}`,
  props.className
].filter(Boolean).join(' '))
</script>