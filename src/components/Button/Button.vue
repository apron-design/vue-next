<template>
  <button
    ref="buttonRef"
    :class="classes"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="apron-button__spinner">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-dasharray="31.4 31.4"
        />
      </svg>
    </span>
    <span v-if="!loading && iconLeft" class="apron-button__icon apron-button__icon--left">
      <slot name="iconLeft" />
    </span>
    <span v-if="slots.default" class="apron-button__content">
      <slot />
    </span>
    <span v-if="!loading && iconRight" class="apron-button__icon apron-button__icon--right">
      <slot name="iconRight" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue'
import type { PropType } from 'vue'

type ButtonVariant = 'primary' | 'secondary' | 'default' | 'text' | 'link'
type ButtonSize = 'sm' | 'md'

const props = defineProps({
  /** 按钮变体 */
  variant: {
    type: String as PropType<ButtonVariant>,
    default: 'primary'
  },
  /** 按钮尺寸 */
  size: {
    type: String as PropType<ButtonSize>,
    default: 'md'
  },
  /** 是否为虚线边框 */
  dashed: {
    type: Boolean,
    default: false
  },
  /** 是否为危险按钮（红色） */
  danger: {
    type: Boolean,
    default: false
  },
  /** 是否为加载状态 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 是否为块级按钮（宽度100%） */
  block: {
    type: Boolean,
    default: false
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 左侧图标 */
  iconLeft: {
    type: Boolean,
    default: false
  },
  /** 右侧图标 */
  iconRight: {
    type: Boolean,
    default: false
  },
  /** 是否禁用涟漪效果 */
  disableRipple: {
    type: Boolean,
    default: false
  },
  /** 自定义类名 */
  class: {
    type: String,
    default: ''
  }
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const slots = useSlots()
const buttonRef = ref<HTMLButtonElement | null>(null)

const classes = computed(() => [
  'apron-button',
  `apron-button--${props.variant}`,
  `apron-button--${props.size}`,
  props.dashed && 'apron-button--dashed',
  props.danger && 'apron-button--danger',
  props.block && 'apron-button--block',
  props.loading && 'apron-button--loading',
  props.class
].filter(Boolean).join(' '))

// 创建涟漪效果
const createRipple = (event: MouseEvent) => {
  const button = buttonRef.value
  if (!button || props.disableRipple || props.disabled || props.loading) return

  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  const ripple = document.createElement('span')
  ripple.className = 'apron-button__ripple'
  ripple.style.width = ripple.style.height = `${size}px`
  ripple.style.left = `${x}px`
  ripple.style.top = `${y}px`

  button.appendChild(ripple)

  // 动画结束后移除涟漪
  ripple.addEventListener('animationend', () => {
    ripple.remove()
  })
}

const handleClick = (event: MouseEvent) => {
  createRipple(event)
  emit('click', event)
}
</script>

<style lang="less">
@import '../../styles/variables.less';

// ============================================
// Button CSS Variables (Light Mode)
// ============================================
:root {
  // Primary type (hover-active 颜色逐渐变深)
  --apron-button-primary-bg: @color-primary-500;
  --apron-button-primary-bg-hover: @color-primary-600;
  --apron-button-primary-bg-active: @color-primary-700;
  --apron-button-primary-text: #FFFFFF;
  --apron-button-primary-border: @color-primary-500;

  // Secondary type (hover-active 颜色逐渐变深)
  --apron-button-secondary-bg: transparent;
  --apron-button-secondary-text: @color-secondary-500;
  --apron-button-secondary-text-hover: @color-secondary-600;
  --apron-button-secondary-text-active: @color-secondary-700;
  --apron-button-secondary-border: @color-secondary-500;
  --apron-button-secondary-border-hover: @color-secondary-600;
  --apron-button-secondary-border-active: @color-secondary-700;

  // Default type (hover-active 颜色逐渐变深)
  --apron-button-default-bg: transparent;
  --apron-button-default-text: @color-primary-500;
  --apron-button-default-text-hover: @color-primary-600;
  --apron-button-default-text-active: @color-primary-700;
  --apron-button-default-border: @color-primary-500;
  --apron-button-default-border-hover: @color-primary-600;
  --apron-button-default-border-active: @color-primary-700;

  // Text type (hover-active 背景逐渐变深)
  --apron-button-text-bg: #FFFFFF;
  --apron-button-text-bg-hover: @color-primary-100;
  --apron-button-text-bg-active: @color-primary-200;

  // Danger
  --apron-button-danger-color: @color-error-500;

  // Disabled
  --apron-button-disabled-bg: @color-neutral-100;
  --apron-button-disabled-text: @color-neutral-400;
  --apron-button-disabled-border: @color-neutral-300;
}

// ============================================
// Button CSS Variables (Dark Mode)
// ============================================
[data-prefers-color='dark'] {
  // Primary type (hover-active 颜色逐渐变亮，暗色模式下"强调"体现为更亮)
  --apron-button-primary-bg: @color-primary-200;
  --apron-button-primary-bg-hover: @color-primary-100;
  --apron-button-primary-bg-active: @color-primary-50;
  --apron-button-primary-text: @color-primary-900;
  --apron-button-primary-border: @color-primary-200;

  // Secondary type (hover-active 颜色逐渐变亮)
  --apron-button-secondary-bg: transparent;
  --apron-button-secondary-text: @color-secondary-400;
  --apron-button-secondary-text-hover: @color-secondary-300;
  --apron-button-secondary-text-active: @color-secondary-200;
  --apron-button-secondary-border: @color-secondary-400;
  --apron-button-secondary-border-hover: @color-secondary-300;
  --apron-button-secondary-border-active: @color-secondary-200;

  // Default type (hover-active 颜色逐渐变亮)
  --apron-button-default-bg: transparent;
  --apron-button-default-text: @color-primary-200;
  --apron-button-default-text-hover: @color-primary-100;
  --apron-button-default-text-active: @color-primary-50;
  --apron-button-default-border: @color-primary-200;
  --apron-button-default-border-hover: @color-primary-100;
  --apron-button-default-border-active: @color-primary-50;

  // Text type (hover-active 背景逐渐变亮)
  --apron-button-text-bg: @color-neutral-800;
  --apron-button-text-bg-hover: @color-neutral-700;
  --apron-button-text-bg-active: @color-neutral-600;

  // Danger
  --apron-button-danger-color: @color-error-500;

  // Disabled
  --apron-button-disabled-bg: @color-neutral-800;
  --apron-button-disabled-text: @color-neutral-600;
  --apron-button-disabled-border: @color-neutral-700;
}

// ============================================
// Button Base Styles
// ============================================
.apron-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: @spacing-2;
  font-family: var(--apron-font-family);
  font-weight: @font-weight-medium;
  line-height: 1;
  transition: all @transition-slow;
  white-space: nowrap;
  border-style: solid;
  border-width: 1px;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  background: transparent;
  padding: 0;
  margin: 0;
  border: 1px solid transparent;

  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(67, 90, 111, 0.3);
  }

  // ============================================
  // Ripple Effect
  // ============================================
  &__ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.35);
    transform: scale(0);
    animation: apron-button-ripple 0.6s ease-out forwards;
    pointer-events: none;
  }

  // ============================================
  // Sizes
  // ============================================
  &--sm {
    height: 30px;
    padding: 0 @spacing-4;
    font-size: @font-size-sm;
    border-radius: 15px;
  }

  &--md {
    height: 40px;
    padding: 0 @spacing-5;
    font-size: @font-size-base;
    border-radius: 20px;
  }

  // ============================================
  // Primary Type (实心填充按钮)
  // ============================================
  &--primary {
    background-color: var(--apron-button-primary-bg);
    border-color: var(--apron-button-primary-border);
    color: var(--apron-button-primary-text);

    &:hover:not(:disabled) {
      background-color: var(--apron-button-primary-bg-hover);
      border-color: var(--apron-button-primary-bg-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--apron-button-primary-bg-active);
      border-color: var(--apron-button-primary-bg-active);
    }

    &:disabled {
      background-color: var(--apron-button-disabled-bg);
      border-color: var(--apron-button-disabled-border);
      color: var(--apron-button-disabled-text);
      cursor: not-allowed;
    }

    // Primary + Danger (hover-active 颜色逐渐变深)
    &.apron-button--danger {
      background-color: var(--apron-button-danger-color);
      border-color: var(--apron-button-danger-color);
      color: #FFFFFF;

      &:hover:not(:disabled) {
        background-color: @color-error-600;
        border-color: @color-error-600;
      }

      &:active:not(:disabled) {
        background-color: @color-error-700;
        border-color: @color-error-700;
      }
    }
  }

  // ============================================
  // Secondary Type (透明背景，边框按钮)
  // ============================================
  &--secondary {
    background-color: var(--apron-button-secondary-bg);
    border-color: var(--apron-button-secondary-border);
    color: var(--apron-button-secondary-text);

    .apron-button__ripple {
      background-color: rgba(@color-secondary-500, 0.2);
    }

    &:hover:not(:disabled) {
      border-color: var(--apron-button-secondary-border-hover);
      color: var(--apron-button-secondary-text-hover);
    }

    &:active:not(:disabled) {
      border-color: var(--apron-button-secondary-border-active);
      color: var(--apron-button-secondary-text-active);
    }

    &:disabled {
      background-color: transparent;
      border-color: var(--apron-button-disabled-border);
      color: var(--apron-button-disabled-text);
      cursor: not-allowed;
    }

    // Secondary + Danger (hover-active 颜色逐渐变深)
    &.apron-button--danger {
      border-color: var(--apron-button-danger-color);
      color: var(--apron-button-danger-color);

      .apron-button__ripple {
        background-color: rgba(@color-error-500, 0.2);
      }

      &:hover:not(:disabled) {
        border-color: @color-error-600;
        color: @color-error-600;
      }

      &:active:not(:disabled) {
        border-color: @color-error-700;
        color: @color-error-700;
      }
    }
  }

  // ============================================
  // Default Type (边框按钮，primary 颜色)
  // ============================================
  &--default {
    background-color: var(--apron-button-default-bg);
    border-color: var(--apron-button-default-border);
    color: var(--apron-button-default-text);

    .apron-button__ripple {
      background-color: rgba(@color-primary-500, 0.2);
    }

    &:hover:not(:disabled) {
      border-color: var(--apron-button-default-border-hover);
      color: var(--apron-button-default-text-hover);
    }

    &:active:not(:disabled) {
      border-color: var(--apron-button-default-border-active);
      color: var(--apron-button-default-text-active);
    }

    &:disabled {
      background-color: transparent;
      border-color: var(--apron-button-disabled-border);
      color: var(--apron-button-disabled-text);
      cursor: not-allowed;
    }

    // Default + Danger (hover-active 颜色逐渐变深)
    &.apron-button--danger {
      border-color: var(--apron-button-danger-color);
      color: var(--apron-button-danger-color);

      .apron-button__ripple {
        background-color: rgba(@color-error-500, 0.2);
      }

      &:hover:not(:disabled) {
        border-color: @color-error-600;
        color: @color-error-600;
      }

      &:active:not(:disabled) {
        border-color: @color-error-700;
        color: @color-error-700;
      }
    }
  }

  // ============================================
  // Text Type (无边框，有底色)
  // ============================================
  &--text {
    background-color: var(--apron-button-text-bg);
    border-color: transparent;
    color: var(--apron-button-default-text);

    .apron-button__ripple {
      background-color: rgba(@color-primary-500, 0.15);
    }

    &:hover:not(:disabled) {
      background-color: var(--apron-button-text-bg-hover);
      color: var(--apron-button-default-text-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--apron-button-text-bg-active);
      color: var(--apron-button-default-text-active);
    }

    &:disabled {
      background-color: var(--apron-button-disabled-bg);
      color: var(--apron-button-disabled-text);
      cursor: not-allowed;
    }

    // Text + Danger (hover-active 颜色逐渐变深)
    &.apron-button--danger {
      color: var(--apron-button-danger-color);

      .apron-button__ripple {
        background-color: rgba(@color-error-500, 0.15);
      }

      &:hover:not(:disabled) {
        background-color: rgba(@color-error-500, 0.08);
        color: @color-error-600;
      }

      &:active:not(:disabled) {
        background-color: rgba(@color-error-500, 0.15);
        color: @color-error-700;
      }
    }
  }

  // ============================================
  // Link Type (无边框，无背景，secondary 颜色)
  // ============================================
  &--link {
    background-color: transparent;
    border-color: transparent;
    color: var(--apron-button-secondary-text);
    padding: 0;
    height: auto;
    overflow: visible;
    text-decoration: none;

    .apron-button__ripple {
      display: none;
    }

    &:hover:not(:disabled) {
      color: var(--apron-button-secondary-text-hover);
      text-decoration: underline;
    }

    &:active:not(:disabled) {
      color: var(--apron-button-secondary-text-active);
    }

    &:disabled {
      color: var(--apron-button-disabled-text);
      cursor: not-allowed;
      text-decoration: none;
    }

    // Link + Danger (hover-active 颜色逐渐变深)
    &.apron-button--danger {
      color: var(--apron-button-danger-color);

      &:hover:not(:disabled) {
        color: @color-error-600;
      }

      &:active:not(:disabled) {
        color: @color-error-700;
      }
    }
  }

  // ============================================
  // Dashed (虚线边框修饰符)
  // ============================================
  &--dashed {
    border-style: dashed;
  }

  // ============================================
  // Block
  // ============================================
  &--block {
    width: 100%;
  }

  // ============================================
  // Loading
  // ============================================
  &--loading {
    pointer-events: none;
  }

  // ============================================
  // Icon
  // ============================================
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 1em;
      height: 1em;
    }
  }

  // ============================================
  // Spinner
  // ============================================
  &__spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    animation: apron-button-spin 1s linear infinite;

    svg {
      width: 1em;
      height: 1em;
    }
  }

  // ============================================
  // Content
  // ============================================
  &__content {
    display: inline-flex;
    align-items: center;
  }
}

@keyframes apron-button-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes apron-button-ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
</style>