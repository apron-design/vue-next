<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue'
import { collapseContextKey } from './Collapse.vue'
import type { CollapseContext } from './Collapse.vue'

export interface CollapseItemProps {
  itemKey: string
  title?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<CollapseItemProps>(), {
  disabled: false
})

const attrs = useAttrs()
const collapseContext = inject<CollapseContext | null>(collapseContextKey, null)

const isActive = computed(() => {
  return collapseContext?.activeKeys.includes(props.itemKey) ?? false
})

const itemClasses = computed(() => [
  'apron-collapse-item',
  {
    'apron-collapse-item--active': isActive.value,
    'apron-collapse-item--disabled': props.disabled
  }
])

const handleClick = () => {
  if (props.disabled) return
  collapseContext?.toggleItem(props.itemKey)
}
</script>

<template>
  <div :class="itemClasses" v-bind="attrs">
    <div class="apron-collapse-item__header" @click="handleClick">
      <svg class="apron-collapse-item__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
      <span class="apron-collapse-item__title">
        <slot name="title">{{ title }}</slot>
      </span>
    </div>
    <div class="apron-collapse-item__content">
      <div class="apron-collapse-item__body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import './Collapse.less';
</style>

