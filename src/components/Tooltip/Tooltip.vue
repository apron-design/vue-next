<script setup lang="ts">
import { ref, onBeforeUnmount, useAttrs, nextTick } from 'vue'

export interface TooltipProps {
  content?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<TooltipProps>(), {
  disabled: false
})

const attrs = useAttrs()
const triggerRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLDivElement | null>(null)
const isVisible = ref(false)
const position = ref({ top: 0, left: 0 })

let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

const updatePosition = () => {
  if (!triggerRef.value || !tooltipRef.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const tooltipRect = tooltipRef.value.getBoundingClientRect()

  let top = triggerRect.top - tooltipRect.height - 8
  let left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2

  // Boundary detection
  if (left < 8) left = 8
  if (left + tooltipRect.width > window.innerWidth - 8) {
    left = window.innerWidth - tooltipRect.width - 8
  }
  if (top < 8) {
    top = triggerRect.bottom + 8
  }

  position.value = { top, left }
}

const show = () => {
  if (props.disabled) return
  clearTimers()
  showTimer = setTimeout(() => {
    isVisible.value = true
    nextTick(updatePosition)
  }, 100)
}

const hide = () => {
  clearTimers()
  hideTimer = setTimeout(() => {
    isVisible.value = false
  }, 100)
}

const clearTimers = () => {
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
}

onBeforeUnmount(() => {
  clearTimers()
})
</script>

<template>
  <span 
    ref="triggerRef"
    class="apron-tooltip-trigger"
    @mouseenter="show"
    @mouseleave="hide"
    @focus="show"
    @blur="hide"
    v-bind="attrs"
  >
    <slot />
  </span>
  <Teleport to="body">
    <Transition name="apron-tooltip">
      <div
        v-if="isVisible"
        ref="tooltipRef"
        class="apron-tooltip"
        :style="{ top: `${position.top}px`, left: `${position.left}px` }"
        @mouseenter="show"
        @mouseleave="hide"
      >
        <div class="apron-tooltip__arrow" />
        <div class="apron-tooltip__content">
          <slot name="content">{{ content }}</slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="less">
@import './Tooltip.less';
</style>

