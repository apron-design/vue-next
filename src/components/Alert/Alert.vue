<template>
  <div :class="classes">
    <span class="apron-alert__icon">
      <component :is="iconComponent" />
    </span>
    <span class="apron-alert__message">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import { iconMap, type AlertType } from './icons'

const props = defineProps({
  /** 提示类型 */
  type: {
    type: String as PropType<AlertType>,
    default: 'info'
  },
  /** 自定义类名 */
  class: {
    type: String,
    default: ''
  }
})

const iconComponent = computed(() => iconMap[props.type])

const classes = computed(() => [
  'apron-alert',
  `apron-alert--${props.type}`,
  'apron-alert--static',
  props.class,
].filter(Boolean).join(' '))
</script>

<style lang="less">
@import '../../styles/variables.less';

// ============================================
// Alert CSS Variables (Light Mode)
// ============================================
:root {
  --apron-alert-bg: #ffffff;
  --apron-alert-border: @color-neutral-200;
  --apron-alert-text: @color-primary-500;

  // Type colors (for left border)
  --apron-alert-info-color: @color-secondary-500;
  --apron-alert-success-color: @color-success-500;
  --apron-alert-warning-color: @color-warning-500;
  --apron-alert-error-color: @color-error-500;
}

// ============================================
// Alert CSS Variables (Dark Mode)
// ============================================
.dark,
[data-prefers-color='dark'] {
  --apron-alert-bg: @color-primary-900;
  --apron-alert-border: @color-neutral-700;
  --apron-alert-text: @color-primary-200;

  --apron-alert-info-color: @color-secondary-400;
  --apron-alert-success-color: @color-success-500;
  --apron-alert-warning-color: @color-warning-500;
  --apron-alert-error-color: @color-error-500;
}

// ============================================
// Alert Base Styles
// ============================================
.apron-alert {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 40px;
  padding: @spacing-2 @spacing-4;
  margin-bottom: @spacing-3;
  background-color: var(--apron-alert-bg);
  border: 1px solid var(--apron-alert-border);
  border-radius: @radius-lg;
  font-family: var(--apron-font-family);
  font-size: @font-size-base;
  box-sizing: border-box;

  // Static display (no animation)
  &--static {
    opacity: 1;
    max-height: none;
    overflow: visible;
    transform: none;
    position: relative;
    margin-bottom: @spacing-3;
    padding: @spacing-2 @spacing-4;
    
    // 页面上静态展示时占满父容器宽度
    width: 100%;
    min-width: unset;
    max-width: unset;
  }

  // Icon
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-right: @spacing-3;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  // Message
  &__message {
    flex: 1;
    color: var(--apron-alert-text);
    line-height: 1.5;
    word-break: break-word;
  }
}
</style>