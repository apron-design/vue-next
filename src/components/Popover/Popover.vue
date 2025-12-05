<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, useAttrs, nextTick } from 'vue'

export type PopoverMode = 'click' | 'hover'

export interface PopoverProps {
  title?: string
  content?: string
  mode?: PopoverMode
  disabled?: boolean
}

const props = withDefaults(defineProps<PopoverProps>(), {
  mode: 'click',
  disabled: false
})

const emit = defineEmits<{
  (e: 'openChange', open: boolean): void
}>()

const attrs = useAttrs()
const triggerRef = ref<HTMLElement | null>(null)
const popoverRef = ref<HTMLDivElement | null>(null)
const isVisible = ref(false)
const position = ref({ top: 0, left: 0 })

let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

const updatePosition = () => {
  if (!triggerRef.value || !popoverRef.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const popoverRect = popoverRef.value.getBoundingClientRect()

  let top = triggerRect.bottom + 8
  let left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2

  // Boundary detection
  if (left < 8) left = 8
  if (left + popoverRect.width > window.innerWidth - 8) {
    left = window.innerWidth - popoverRect.width - 8
  }
  if (top + popoverRect.height > window.innerHeight - 8) {
    top = triggerRect.top - popoverRect.height - 8
  }

  position.value = { top, left }
}

const show = () => {
  if (props.disabled) return
  clearTimers()
  showTimer = setTimeout(() => {
    isVisible.value = true
    emit('openChange', true)
    nextTick(updatePosition)
  }, props.mode === 'hover' ? 100 : 0)
}

const hide = () => {
  clearTimers()
  hideTimer = setTimeout(() => {
    isVisible.value = false
    emit('openChange', false)
  }, props.mode === 'hover' ? 100 : 0)
}

const toggle = () => {
  if (isVisible.value) {
    hide()
  } else {
    show()
  }
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

const handleClickOutside = (event: MouseEvent) => {
  if (props.mode !== 'click') return
  if (
    triggerRef.value?.contains(event.target as Node) ||
    popoverRef.value?.contains(event.target as Node)
  ) {
    return
  }
  hide()
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  clearTimers()
  document.removeEventListener('click', handleClickOutside)
})

const triggerEvents = computed(() => {
  if (props.mode === 'hover') {
    return {
      onMouseenter: show,
      onMouseleave: hide,
      onFocus: show,
      onBlur: hide
    }
  }
  return {
    onClick: toggle
  }
})

const popoverEvents = computed(() => {
  if (props.mode === 'hover') {
    return {
      onMouseenter: show,
      onMouseleave: hide
    }
  }
  return {}
})
</script>

<template>
  <span 
    ref="triggerRef"
    class="apron-popover-trigger"
    v-bind="{ ...attrs, ...triggerEvents }"
  >
    <slot />
  </span>
  <Teleport to="body">
    <Transition name="apron-popover">
      <div
        v-if="isVisible"
        ref="popoverRef"
        class="apron-popover"
        :style="{ top: `${position.top}px`, left: `${position.left}px` }"
        v-bind="popoverEvents"
      >
        <div class="apron-popover__arrow" />
        <div v-if="title || $slots.title" class="apron-popover__title">
          <slot name="title">{{ title }}</slot>
        </div>
        <div class="apron-popover__content">
          <slot name="content">{{ content }}</slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="less">
@import './Popover.less';
</style>

