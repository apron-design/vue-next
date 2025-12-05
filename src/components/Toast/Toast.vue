<script setup lang="ts">
import { ref, computed, watch, onMounted, useAttrs } from 'vue'
import type { Component } from 'vue'

export type ToastType = 'success' | 'fail' | 'danger' | 'loading'

export interface ToastProps {
  visible?: boolean
  type?: ToastType
  text?: string
  icon?: Component
  duration?: number
}

const props = withDefaults(defineProps<ToastProps>(), {
  visible: false,
  type: 'success',
  duration: 2000
})

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'close'): void
}>()

const attrs = useAttrs()

const isVisible = ref(props.visible)
let timer: ReturnType<typeof setTimeout> | null = null

watch(() => props.visible, (val) => {
  isVisible.value = val
  if (val && props.type !== 'loading' && props.duration > 0) {
    clearTimer()
    timer = setTimeout(() => {
      close()
    }, props.duration)
  }
})

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

const close = () => {
  isVisible.value = false
  emit('update:visible', false)
  emit('close')
}

onMounted(() => {
  if (props.visible && props.type !== 'loading' && props.duration > 0) {
    timer = setTimeout(() => {
      close()
    }, props.duration)
  }
})

const icons = {
  success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>`,
  fail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>`,
  danger: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>`,
  loading: `<svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="31.4 31.4"/>
  </svg>`
}

const toastClasses = computed(() => [
  'apron-toast',
  `apron-toast--${props.type}`
])
</script>

<template>
  <Teleport to="body">
    <Transition name="apron-toast">
      <div v-if="isVisible" class="apron-toast-root">
        <div class="apron-toast__overlay" />
        <div :class="toastClasses" v-bind="attrs">
          <span class="apron-toast__icon">
            <component v-if="icon" :is="icon" />
            <span v-else v-html="icons[type]" />
          </span>
          <span v-if="text" class="apron-toast__text">{{ text }}</span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="less">
@import './Toast.less';
</style>

