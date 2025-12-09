<template>
  <Teleport to="body">
    <div
      v-if="visible"
      ref="popoverRef"
      :class="containerClasses"
      :style="{ top: position.top + 'px', left: position.left + 'px' }"
      @mouseenter="handlePopoverMouseEnter"
      @mouseleave="handlePopoverMouseLeave"
    >
      <div class="apron-popover__arrow" />
      <div class="apron-popover__content">
        <div v-if="title" class="apron-popover__title">{{ title }}</div>
        <div v-if="content" class="apron-popover__body">{{ content }}</div>
      </div>
    </div>
  </Teleport>
  <slot name="trigger" :open="open" :close="close" :visible="visible" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import './Popover.less'

// Global state management: only one Popover shown at a time
let activePopoverId: string | null = null
const popoverCloseCallbacks = new Map<string, () => void>()

const registerPopover = (id: string, closeCallback: () => void) => {
  popoverCloseCallbacks.set(id, closeCallback)
}

const unregisterPopover = (id: string) => {
  popoverCloseCallbacks.delete(id)
}

const closeOtherPopovers = (currentId: string) => {
  popoverCloseCallbacks.forEach((callback, id) => {
    if (id !== currentId) {
      callback()
    }
  })
  activePopoverId = currentId
}

// Generate unique ID
let popoverIdCounter = 0
const generatePopoverId = () => `popover-${++popoverIdCounter}`

export type PopoverMode = 'click' | 'hover'

export interface PopoverProps {
  /** 触发方式 */
  mode?: PopoverMode
  /** 标题 */
  title?: string
  /** 内容 */
  content?: string
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<PopoverProps>(), {
  mode: 'click',
  title: undefined,
  content: undefined,
  class: ''
})

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'open'): void
  (e: 'close'): void
}>()

const visible = defineModel<boolean>('visible', { default: false })

const popoverRef = ref<HTMLElement | null>(null)
const popoverId = generatePopoverId()
const hoverTimeout = ref<number | null>(null)
const position = ref({ top: 0, left: 0 })

const containerClasses = computed(() => [
  'apron-popover',
  props.class
].filter(Boolean).join(' '))

// Calculate position (Popover above trigger element, arrow pointing down)
const updatePosition = () => {
  const triggerEl = getTriggerElement()
  if (!triggerEl || !popoverRef.value) return

  const triggerRect = triggerEl.getBoundingClientRect()
  const popoverRect = popoverRef.value.getBoundingClientRect()

  const top = triggerRect.top - popoverRect.height - 8 + window.scrollY
  let left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2 + window.scrollX

  // Boundary detection
  if (left < 8) left = 8
  if (left + popoverRect.width > window.innerWidth - 8) {
    left = window.innerWidth - popoverRect.width - 8
  }

  position.value = { top, left }
}

// Get trigger element (the element before the popover in the DOM)
const getTriggerElement = (): HTMLElement | null => {
  const el = popoverRef.value
  if (!el) return null
  
  // Find the previous sibling element (the trigger)
  let sibling = el.previousElementSibling
  while (sibling && sibling.nodeType !== Node.ELEMENT_NODE) {
    sibling = sibling.previousElementSibling
  }
  
  return sibling as HTMLElement | null
}

// Open Popover
const open = () => {
  closeOtherPopovers(popoverId)
  visible.value = true
  emit('open')
}

// Close Popover
const close = () => {
  visible.value = false
  if (activePopoverId === popoverId) {
    activePopoverId = null
  }
  emit('close')
}

// Register/unregister
onMounted(() => {
  registerPopover(popoverId, close)
})

onUnmounted(() => {
  unregisterPopover(popoverId)
  if (hoverTimeout.value) {
    window.clearTimeout(hoverTimeout.value)
  }
})

// Update position when visible
watch(visible, (newVisible) => {
  if (newVisible) {
    nextTick(() => {
      updatePosition()
      window.addEventListener('resize', updatePosition)
      window.addEventListener('scroll', updatePosition, true)
    })
  } else {
    window.removeEventListener('resize', updatePosition)
    window.removeEventListener('scroll', updatePosition, true)
  }
})

// Click outside to close (click mode)
const handleClickOutside = (e: MouseEvent) => {
  if (props.mode === 'click' && visible.value) {
    const triggerEl = getTriggerElement()
    if (
      triggerEl &&
      !triggerEl.contains(e.target as Node) &&
      popoverRef.value &&
      !popoverRef.value.contains(e.target as Node)
    ) {
      close()
    }
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

// Handle hover events
const handlePopoverMouseEnter = () => {
  if (props.mode === 'hover' && hoverTimeout.value) {
    window.clearTimeout(hoverTimeout.value)
  }
}

const handlePopoverMouseLeave = () => {
  if (props.mode === 'hover') {
    hoverTimeout.value = window.setTimeout(() => {
      close()
    }, 100) as unknown as number
  }
}
</script>