<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, useAttrs, nextTick } from 'vue'
import Button from '../Button/Button.vue'

export interface PopoverConfirmProps {
  title?: string
  content?: string
  okText?: string
  cancelText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<PopoverConfirmProps>(), {
  okText: '确定',
  cancelText: '取消',
  disabled: false
})

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'openChange', open: boolean): void
}>()

const attrs = useAttrs()
const triggerRef = ref<HTMLElement | null>(null)
const popoverRef = ref<HTMLDivElement | null>(null)
const isVisible = ref(false)
const position = ref({ top: 0, left: 0 })

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
  isVisible.value = true
  emit('openChange', true)
  nextTick(updatePosition)
}

const hide = () => {
  isVisible.value = false
  emit('openChange', false)
}

const toggle = () => {
  if (isVisible.value) {
    hide()
  } else {
    show()
  }
}

const handleConfirm = () => {
  emit('confirm')
  hide()
}

const handleCancel = () => {
  emit('cancel')
  hide()
}

const handleClickOutside = (event: MouseEvent) => {
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
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <span 
    ref="triggerRef"
    class="apron-popover-trigger"
    @click="toggle"
    v-bind="attrs"
  >
    <slot />
  </span>
  <Teleport to="body">
    <Transition name="apron-popover">
      <div
        v-if="isVisible"
        ref="popoverRef"
        class="apron-popover apron-popover-confirm"
        :style="{ top: `${position.top}px`, left: `${position.left}px` }"
      >
        <div class="apron-popover__arrow" />
        <div v-if="title || $slots.title" class="apron-popover__title">
          <slot name="title">{{ title }}</slot>
        </div>
        <div class="apron-popover__content">
          <slot name="content">{{ content }}</slot>
        </div>
        <div class="apron-popover__footer">
          <Button size="small" @click="handleCancel">{{ cancelText }}</Button>
          <Button size="small" variant="primary" @click="handleConfirm">{{ okText }}</Button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="less">
@import './Popover.less';
</style>

