<template>
  <div :ref="(el) => { if (el) triggerRef = el.firstElementChild as HTMLElement }" :data-popover-trigger="popoverId">
    <slot 
      name="trigger" 
      :open="open" 
      :close="close" 
      :visible="visible" 
      :trigger-ref="triggerRef"
      :handle-click="handleTriggerClick"
    />
  </div>
  <Teleport to="body">
    <div
      v-if="visible"
      ref="popoverRef"
      :class="containerClasses"
      :style="{ top: position.top + 'px', left: position.left + 'px' }"
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
        <div class="apron-popover__footer">
          <button
            :class="['apron-popover__btn', `apron-popover__btn--${cancelVariant}`]"
            @click="handleCancel"
          >
            {{ cancelText }}
          </button>
          <button
            :class="['apron-popover__btn', `apron-popover__btn--${confirmVariant}`]"
            @click="handleConfirm"
          >
            {{ confirmText }}
          </button>
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
const generatePopoverId = () => `popover-confirm-${++popoverIdCounter}`

export type ButtonVariant = 'primary' | 'secondary' | 'default' | 'text' | 'link'

export interface PopoverConfirmProps {
  /** 标题 */
  title?: string | VNode | (() => VNode)
  /** 内容 */
  content?: string | VNode | (() => VNode)
  /** 取消按钮文字 */
  cancelText?: string
  /** 确定按钮文字 */
  confirmText?: string
  /** 取消按钮变种 */
  cancelVariant?: ButtonVariant
  /** 确定按钮变种 */
  confirmVariant?: ButtonVariant
  /** 取消回调 */
  onCancel?: () => void
  /** 确定回调 */
  onConfirm?: () => void
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<PopoverConfirmProps>(), {
  title: undefined,
  content: undefined,
  cancelText: '取消',
  confirmText: '确定',
  cancelVariant: 'default',
  confirmVariant: 'primary',
  onCancel: undefined,
  onConfirm: undefined,
  class: ''
})

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'open'): void
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'confirm'): void
}>()

const visible = defineModel<boolean>('visible', { default: false })

const popoverRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const popoverId = generatePopoverId()
const position = ref({ top: 0, left: 0 })

const containerClasses = computed(() => [
  'apron-popover',
  'apron-popover--confirm',
  props.class
].filter(Boolean).join(' '))

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

// Handle click on trigger element
const handleTriggerClick = () => {
  if (visible.value) {
    close()
  } else {
    open()
  }
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

// Handle cancel
const handleCancel = () => {
  close()
  emit('cancel')
  props.onCancel?.()
}

// Handle confirm
const handleConfirm = () => {
  close()
  emit('confirm')
  props.onConfirm?.()
}

// Register/unregister
onMounted(() => {
  registerPopover(popoverId, close)
})

onUnmounted(() => {
  unregisterPopover(popoverId)
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

// Click outside to close (always enabled)
const handleClickOutside = (e: MouseEvent) => {
  if (visible.value) {
    const triggerEl = getTriggerElement()
    // Check if click is outside both trigger and popover
    const isOutsideTrigger = triggerEl && !triggerEl.contains(e.target as Node)
    const isOutsidePopover = popoverRef.value && !popoverRef.value.contains(e.target as Node)
    
    if (isOutsideTrigger && isOutsidePopover) {
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
</script>

