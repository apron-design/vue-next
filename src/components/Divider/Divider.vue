<template>
  <div
    ref="dividerRef"
    :class="classes"
    role="separator"
  >
    <!-- 没有文字时，渲染简单的分割线 -->
    <template v-if="!slots.default">
      <span class="apron-divider__line" />
    </template>
    
    <!-- 有文字时，渲染带文字的分割线 -->
    <template v-else>
      <span class="apron-divider__line apron-divider__line--left" />
      <span class="apron-divider__text">
        <slot />
      </span>
      <span class="apron-divider__line apron-divider__line--right" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue'
import type { PropType } from 'vue'

type DividerAlign = 'left' | 'center' | 'right'

const props = defineProps({
  /** 是否为虚线 */
  dashed: {
    type: Boolean,
    default: false
  },
  /** 文字对齐方式 */
  align: {
    type: String as PropType<DividerAlign>,
    default: 'left'
  },
  /** 自定义类名 */
  class: {
    type: String,
    default: ''
  }
})

const slots = useSlots()
const dividerRef = ref<HTMLDivElement | null>(null)

const classes = computed(() => [
  'apron-divider',
  props.dashed && 'apron-divider--dashed',
  slots.default && 'apron-divider--with-text',
  slots.default && `apron-divider--${props.align}`,
  props.class
].filter(Boolean).join(' '))
</script>

<style lang="less">
@import '../../styles/variables.less';

// ============================================
// Divider CSS Variables (Light Mode)
// ============================================
:root {
  --apron-divider-color: @color-neutral-300;
  --apron-divider-text-color: @color-neutral-500;
}

// ============================================
// Divider CSS Variables (Dark Mode)
// ============================================
[data-prefers-color='dark'] {
  --apron-divider-color: @color-neutral-600;
  --apron-divider-text-color: @color-neutral-400;
}

// ============================================
// Divider Base Styles
// ============================================
.apron-divider {
  display: flex;
  align-items: center;
  width: 100%;
  margin: @spacing-4 0;
  font-family: var(--apron-font-family);
  transition: all @transition-slow;

  // ============================================
  // Line (无文字时的完整线)
  // ============================================
  &__line {
    flex: 1;
    height: 1px;
    background-color: var(--apron-divider-color);
    transition: all @transition-slow;
  }

  // ============================================
  // Dashed 修饰符
  // ============================================
  &--dashed &__line {
    background: none;
    border-top: 1px dashed var(--apron-divider-color);
    height: 0;
  }

  // ============================================
  // 有文字时的样式
  // ============================================
  &--with-text {
    .apron-divider__line {
      flex: none;
    }

    .apron-divider__line--left,
    .apron-divider__line--right {
      flex: 1;
    }
  }

  // ============================================
  // Text 文字样式
  // ============================================
  &__text {
    flex-shrink: 0;
    padding: 0 @spacing-3;
    font-size: @font-size-sm;
    color: var(--apron-divider-text-color);
    line-height: @line-height-normal;
    transition: all @transition-slow;
  }

  // ============================================
  // Align Left (左边留40px线，右边撑满)
  // ============================================
  &--left {
    .apron-divider__line--left {
      flex: none;
      width: 40px;
    }

    .apron-divider__line--right {
      flex: 1;
    }
  }

  // ============================================
  // Align Center (左右等分)
  // ============================================
  &--center {
    .apron-divider__line--left,
    .apron-divider__line--right {
      flex: 1;
    }
  }

  // ============================================
  // Align Right (右边留40px线，左边撑满)
  // ============================================
  &--right {
    .apron-divider__line--left {
      flex: 1;
    }

    .apron-divider__line--right {
      flex: none;
      width: 40px;
    }
  }
}
</style>
