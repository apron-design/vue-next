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
import { computed, h } from 'vue'
import type { PropType } from 'vue'

export type AlertType = 'info' | 'success' | 'warning' | 'error'

// 图标组件
const InfoIcon = {
  name: 'InfoIcon',
  setup() {
    return () => h('svg', {
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('circle', {
        cx: '12',
        cy: '12',
        r: '10',
        fill: '#4C9EEA'
      }),
      h('text', {
        x: '12',
        y: '16',
        'text-anchor': 'middle',
        fill: 'white',
        'font-size': '14',
        'font-weight': '600'
      }, 'i')
    ])
  }
}

const SuccessIcon = {
  name: 'SuccessIcon',
  setup() {
    return () => h('svg', {
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('circle', {
        cx: '12',
        cy: '12',
        r: '10',
        fill: '#22c55e'
      }),
      h('path', {
        d: 'M8 12L11 15L16 9',
        stroke: 'white',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      })
    ])
  }
}

const WarningIcon = {
  name: 'WarningIcon',
  setup() {
    return () => h('svg', {
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('circle', {
        cx: '12',
        cy: '12',
        r: '10',
        fill: '#f59e0b'
      }),
      h('path', {
        d: 'M12 8V13',
        stroke: 'white',
        'stroke-width': '2',
        'stroke-linecap': 'round'
      }),
      h('circle', {
        cx: '12',
        cy: '16',
        r: '1',
        fill: 'white'
      })
    ])
  }
}

const ErrorIcon = {
  name: 'ErrorIcon',
  setup() {
    return () => h('svg', {
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('circle', {
        cx: '12',
        cy: '12',
        r: '10',
        fill: '#ef4444'
      }),
      h('path', {
        d: 'M9 9L15 15M15 9L9 15',
        stroke: 'white',
        'stroke-width': '2',
        'stroke-linecap': 'round'
      })
    ])
  }
}

const iconMap = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
}

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
  --apron-alert-info-bg: #e3f2fd;
  --apron-alert-success-bg: #dcfce7;
  --apron-alert-warning-bg: #fef3c7;
  --apron-alert-error-bg: #fee2e2;
  --apron-alert-text-color: rgba(0, 0, 0, 0.85);
}

// ============================================
// Alert CSS Variables (Dark Mode)
// ============================================
[data-prefers-color='dark'] {
  --apron-alert-info-bg: #1e3a8a;
  --apron-alert-success-bg: #166534;
  --apron-alert-warning-bg: #854d0e;
  --apron-alert-error-bg: #7f1d1d;
  --apron-alert-text-color: rgba(255, 255, 255, 0.85);
}

// ============================================
// Alert Base Styles
// ============================================
.apron-alert {
  display: flex;
  align-items: flex-start;
  padding: @spacing-3;
  border-radius: @radius-md; /* 修复：使用正确的变量名 @radius-md */
  font-family: var(--apron-font-family);
  transition: all @transition-slow;

  // ============================================
  // Type Variants
  // ============================================
  &--info {
    background-color: var(--apron-alert-info-bg);
  }

  &--success {
    background-color: var(--apron-alert-success-bg);
  }

  &--warning {
    background-color: var(--apron-alert-warning-bg);
  }

  &--error {
    background-color: var(--apron-alert-error-bg);
  }

  // ============================================
  // Static Modifier
  // ============================================
  &--static {
    box-shadow: none;
    border: none;
  }

  // ============================================
  // Icon
  // ============================================
  &__icon {
    flex-shrink: 0;
    margin-right: @spacing-2;
    line-height: 1;
  }

  // ============================================
  // Message
  // ============================================
  &__message {
    flex: 1;
    color: var(--apron-alert-text-color);
    font-size: @font-size-base;
    line-height: @line-height-normal;
  }
}
</style>