<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue'
import type { Component } from 'vue'

export type ButtonVariant = 'primary' | 'secondary' | 'default' | 'text' | 'link'
export type ButtonSize = 'small' | 'middle' | 'large'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  dashed?: boolean
  danger?: boolean
  loading?: boolean
  disabled?: boolean
  block?: boolean
  iconLeft?: Component
  iconRight?: Component
  disableRipple?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  size: 'middle',
  dashed: false,
  danger: false,
  loading: false,
  disabled: false,
  block: false,
  disableRipple: false,
  type: 'button'
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const attrs = useAttrs()

const ripples = ref<Array<{ id: number; x: number; y: number; size: number }>>([])
let rippleCounter = 0

const buttonClasses = computed(() => [
  'apron-button',
  `apron-button--${props.variant}`,
  `apron-button--${props.size}`,
  {
    'apron-button--dashed': props.dashed,
    'apron-button--danger': props.danger,
    'apron-button--loading': props.loading,
    'apron-button--block': props.block,
    'apron-button--disabled': props.disabled || props.loading
  }
])

const isDisabled = computed(() => props.disabled || props.loading)

const handleClick = (event: MouseEvent) => {
  if (isDisabled.value) return

  // Create ripple effect
  if (!props.disableRipple && props.variant !== 'text' && props.variant !== 'link') {
    const button = event.currentTarget as HTMLButtonElement
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    const rippleId = rippleCounter++
    ripples.value.push({ id: rippleId, x, y, size })

    // Remove ripple after animation
    setTimeout(() => {
      ripples.value = ripples.value.filter(r => r.id !== rippleId)
    }, 600)
  }

  emit('click', event)
}
</script>

<template>
  <button
    :class="buttonClasses"
    :type="type"
    :disabled="isDisabled"
    v-bind="attrs"
    @click="handleClick"
  >
    <span v-if="loading" class="apron-button__spinner">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-dasharray="31.4 31.4"
        />
      </svg>
    </span>
    <component v-else-if="iconLeft" :is="iconLeft" class="apron-button__icon apron-button__icon--left" />
    
    <span class="apron-button__content">
      <slot />
    </span>
    
    <component v-if="iconRight && !loading" :is="iconRight" class="apron-button__icon apron-button__icon--right" />

    <!-- Ripple effects -->
    <span
      v-for="ripple in ripples"
      :key="ripple.id"
      class="apron-button__ripple"
      :style="{
        left: `${ripple.x}px`,
        top: `${ripple.y}px`,
        width: `${ripple.size}px`,
        height: `${ripple.size}px`
      }"
    />
  </button>
</template>

<style lang="less">
@import './Button.less';
</style>

