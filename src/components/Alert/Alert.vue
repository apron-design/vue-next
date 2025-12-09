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
// Alert Container (fixed position)
// ============================================
.apron-alert-root {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  pointer-events: none;
}

.apron-alert-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: @spacing-4;
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
  pointer-events: auto;
  box-sizing: border-box;

  // 默认情况下占满父容器宽度
  width: 100%;
  min-width: unset;
  max-width: unset;

  // Animation states
  opacity: 0;
  max-height: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
  overflow: hidden;
  transform: translateY(-20px);
  transition: 
    opacity 0.3s ease,
    transform 0.3s ease,
    max-height 0.3s ease,
    margin-bottom 0.3s ease,
    padding 0.3s ease;

  &--visible {
    opacity: 1;
    max-height: 200px;
    margin-bottom: @spacing-3;
    padding-top: @spacing-2;
    padding-bottom: @spacing-2;
    transform: translateY(0);
  }

  &--leaving {
    opacity: 0;
    max-height: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    transform: translateY(-10px);
  }

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
  
  // Message 中使用的 Alert 样式
  .apron-alert-container > & {
    // Message 中使用时限制宽度
    width: auto;
    min-width: 300px;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
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