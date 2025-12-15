<template>
  <div :ref="(el) => { if (el) triggerRef = el.firstElementChild as HTMLElement }" :data-popover-trigger="popoverId">
    <slot 
      name="trigger" 
      :open="open" 
      :close="close" 
      :visible="visible" 
      :trigger-ref="triggerRef"
      :handle-click="handleTriggerClick"
      :handle-mouse-enter="handleTriggerMouseEnter"
      :handle-mouse-leave="handleTriggerMouseLeave"
    />
  </div>
  <Teleport to="body">
    <!-- Bridge area to connect trigger and popover for hover mode -->
    <div
      v-if="visible && props.mode === 'hover'"
      :data-popover-bridge="popoverId"
      class="apron-popover__bridge"
      :style="bridgeStyle"
      @mouseenter="handlePopoverMouseEnter"
    />
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
        <div v-if="title" class="apron-popover__title">
          <component v-if="typeof title === 'function'" :is="title" />
          <component v-else-if="typeof title === 'object'" :is="() => title" />
          <span v-else>{{ title }}</span>
        </div>
        <div v-if="content || $slots.default" class="apron-popover__body">
          <slot>
            <component v-if="typeof content === 'function'" :is="content" />
            <component v-else-if="typeof content === 'object'" :is="() => content" />
            <span v-else>{{ content }}</span>
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch, type VNode } from 'vue'
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
  title?: string | VNode | (() => VNode)
  /** 内容 */
  content?: string | VNode | (() => VNode)
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
const triggerRef = ref<HTMLElement | null>(null)
const popoverId = generatePopoverId()
const hoverTimeout = ref<number | null>(null)
const position = ref({ top: 0, left: 0 })

const containerClasses = computed(() => [
  'apron-popover',
  props.class
].filter(Boolean).join(' '))

// Bridge area style for hover mode (invisible area connecting trigger and popover)
const bridgeStyle = computed(() => {
  if (props.mode !== 'hover' || !visible.value) return { display: 'none' }
  
  const triggerEl = getTriggerElement()
  if (!triggerEl || !popoverRef.value) return { display: 'none' }
  
  const triggerRect = triggerEl.getBoundingClientRect()
  const popoverRect = popoverRef.value.getBoundingClientRect()
  
  // Calculate bridge area between trigger and popover
  const gap = 4
  const bridgeTop = triggerRect.top - gap + window.scrollY
  const bridgeHeight = gap
  const bridgeLeft = Math.min(triggerRect.left, popoverRect.left) + window.scrollX
  const bridgeRight = Math.max(triggerRect.right, popoverRect.right) + window.scrollX
  const bridgeWidth = bridgeRight - bridgeLeft
  
  return {
    position: 'absolute',
    top: `${bridgeTop}px`,
    left: `${bridgeLeft}px`,
    width: `${bridgeWidth}px`,
    height: `${bridgeHeight}px`,
    zIndex: '9999',
    pointerEvents: 'auto'
  }
})

// Calculate position (Popover above trigger element, arrow pointing down)
const updatePosition = () => {
  const triggerEl = getTriggerElement()
  if (!triggerEl || !popoverRef.value) return

  const triggerRect = triggerEl.getBoundingClientRect()
  const popoverRect = popoverRef.value.getBoundingClientRect()

  // Reduce gap from 8px to 4px to make it easier to move from trigger to popover
  const gap = 4
  const top = triggerRect.top - popoverRect.height - gap + window.scrollY
  let left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2 + window.scrollX

  // Boundary detection
  if (left < 8) left = 8
  if (left + popoverRect.width > window.innerWidth - 8) {
    left = window.innerWidth - popoverRect.width - 8
  }

  position.value = { top, left }
}

// Get trigger element
const getTriggerElement = (): HTMLElement | null => {
  // First try to use triggerRef
  if (triggerRef.value) {
    return triggerRef.value
  }
  // Fallback: try to find trigger element in the DOM
  // This is a fallback for backward compatibility
  const slotEl = document.querySelector(`[data-popover-trigger="${popoverId}"]`)
  return slotEl as HTMLElement | null
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

// Click outside to close (both click and hover mode)
const handleClickOutside = (e: MouseEvent) => {
  if (visible.value) {
    const triggerEl = getTriggerElement()
    // Check if click is outside both trigger and popover
    const isOutsideTrigger = triggerEl && !triggerEl.contains(e.target as Node)
    const isOutsidePopover = popoverRef.value && !popoverRef.value.contains(e.target as Node)
    // Also check bridge area (for hover mode)
    const bridgeEl = document.querySelector(`[data-popover-bridge="${popoverId}"]`)
    const isOutsideBridge = !bridgeEl || !bridgeEl.contains(e.target as Node)
    
    if (isOutsideTrigger && isOutsidePopover && isOutsideBridge) {
      // Clear hover timeout if in hover mode
      if (props.mode === 'hover' && hoverTimeout.value) {
        window.clearTimeout(hoverTimeout.value)
        hoverTimeout.value = null
      }
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

// Handle click on trigger element
const handleTriggerClick = () => {
  if (props.mode === 'click') {
    if (visible.value) {
      close()
    } else {
      open()
    }
  }
}

// Handle hover events on trigger element
const handleTriggerMouseEnter = () => {
  if (props.mode === 'hover') {
    // Clear any pending close timeout when mouse enters trigger
    if (hoverTimeout.value) {
      window.clearTimeout(hoverTimeout.value)
      hoverTimeout.value = null
    }
    open()
  }
}

const handleTriggerMouseLeave = () => {
  if (props.mode === 'hover') {
    // Set timeout to close when mouse leaves trigger
    // Increase delay to 300ms to allow time for mouse to move to popover
    // This gives users enough time to move from trigger to popover
    hoverTimeout.value = window.setTimeout(() => {
      close()
      hoverTimeout.value = null
    }, 300) as unknown as number
  }
}

// Handle hover events on popover
const handlePopoverMouseEnter = () => {
  if (props.mode === 'hover') {
    // Clear any pending close timeout when mouse enters popover
    if (hoverTimeout.value) {
      window.clearTimeout(hoverTimeout.value)
      hoverTimeout.value = null
    }
  }
}

const handlePopoverMouseLeave = () => {
  if (props.mode === 'hover') {
    // Set timeout to close when mouse leaves popover
    hoverTimeout.value = window.setTimeout(() => {
      close()
      hoverTimeout.value = null
    }, 300) as unknown as number
  }
}
</script>