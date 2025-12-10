<template>
  <a :class="classes" v-bind="$attrs">
    <slot>{{ children }}</slot>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type LinkVariant = 'primary' | 'secondary'
export type LinkUnderline = 'always' | 'hover' | 'never'

export interface LinkProps {
  /** 链接变种 */
  variant?: LinkVariant
  /** 下划线显示方式 */
  underline?: LinkUnderline
  /** 是否为危险链接（红色） */
  danger?: boolean
  /** 子元素 */
  children?: string
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<LinkProps>(), {
  variant: 'secondary',
  underline: 'never',
  danger: false,
})

// 忽略原生属性透传
defineOptions({
  inheritAttrs: false,
})

const classes = computed(() => {
  const cls = [
    'apron-link',
    `apron-link--${props.variant}`,
    `apron-link--underline-${props.underline}`,
    props.danger && 'apron-link--danger',
    props.class,
  ]
  return cls.filter(Boolean).join(' ')
})
</script>

<style lang="less">
@import '../../styles/variables.less';
@import '../../styles/mixins.less';

// ============================================
// Link CSS Variables (Light Mode)
// ============================================
:root {
  // Primary variant
  --apron-link-primary-color: @color-primary-500;
  --apron-link-primary-color-hover: @color-primary-400;
  --apron-link-primary-color-active: @color-primary-900;

  // Secondary variant
  --apron-link-secondary-color: @color-secondary-500;
  --apron-link-secondary-color-hover: @color-secondary-600;
  --apron-link-secondary-color-active: @color-secondary-700;

  // Danger
  --apron-link-danger-color: @color-error-600;
  --apron-link-danger-color-hover: @color-error-500;
  --apron-link-danger-color-active: @color-error-600;
}

// ============================================
// Link CSS Variables (Dark Mode)
// ============================================
[data-prefers-color='dark'] {
  // Primary variant
  --apron-link-primary-color: @color-primary-200;
  --apron-link-primary-color-hover: @color-primary-100;
  --apron-link-primary-color-active: @color-primary-50;

  // Secondary variant
  --apron-link-secondary-color: @color-secondary-400;
  --apron-link-secondary-color-hover: @color-secondary-300;
  --apron-link-secondary-color-active: @color-secondary-200;

  // Danger
  --apron-link-danger-color: @color-error-500;
  --apron-link-danger-color-hover: @color-error-500;
  --apron-link-danger-color-active: @color-error-600;
}

// ============================================
// Link Base Styles
// ============================================
.apron-link {
  font-family: var(--apron-font-family);
  font-size: inherit;
  line-height: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: all @transition-slow;

  &:focus-visible {
    .focus-ring();
    outline-offset: 2px;
    border-radius: @radius-sm;
  }

  // ============================================
  // Primary Variant
  // ============================================
  &--primary {
    color: var(--apron-link-primary-color);

    &:hover {
      color: var(--apron-link-primary-color-hover);
    }

    &:active {
      color: var(--apron-link-primary-color-active);
    }
  }

  // ============================================
  // Secondary Variant
  // ============================================
  &--secondary {
    color: var(--apron-link-secondary-color);

    &:hover {
      color: var(--apron-link-secondary-color-hover);
    }

    &:active {
      color: var(--apron-link-secondary-color-active);
    }
  }

  // ============================================
  // Underline: always
  // ============================================
  &--underline-always {
    text-decoration: underline;

    &:hover {
      text-decoration: underline;
    }
  }

  // ============================================
  // Underline: hover
  // ============================================
  &--underline-hover {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  // ============================================
  // Underline: never
  // ============================================
  &--underline-never {
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }

  // ============================================
  // Danger
  // ============================================
  &--danger {
    color: var(--apron-link-danger-color);

    &:hover {
      color: var(--apron-link-danger-color-hover);
    }

    &:active {
      color: var(--apron-link-danger-color-active);
    }
  }
}
</style>
