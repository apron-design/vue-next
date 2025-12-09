<template>
  <div :class="classes" v-bind="$attrs">
    <div
      class="apron-collapse-item__header"
      @click="handleClick"
      :tabindex="disabled ? -1 : 0"
      :aria-expanded="isActive"
      :aria-disabled="disabled"
      @keydown="handleKeydown"
    >
      <span class="apron-collapse-item__arrow">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </span>
      <span class="apron-collapse-item__title">
        <slot name="title">{{ title }}</slot>
      </span>
    </div>
    <div class="apron-collapse-item__content">
      <div class="apron-collapse-item__body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'

export interface CollapseItemProps {
  /** 唯一标识 */
  itemKey: string
  /** 标题 */
  title?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<CollapseItemProps>(), {
  disabled: false,
})

// 注入上下文
const context = inject<{ 
  activeKeys: { value: string[] }, 
  toggleItem: (key: string) => void 
}>('collapseContext')

if (!context) {
  throw new Error('CollapseItem must be used within a Collapse component')
}

const { activeKeys, toggleItem } = context
const isActive = computed(() => activeKeys.value.includes(props.itemKey))

const classes = computed(() => [
  'apron-collapse-item',
  isActive.value && 'apron-collapse-item--active',
  props.disabled && 'apron-collapse-item--disabled',
  props.class,
].filter(Boolean).join(' '))

const handleClick = () => {
  if (!props.disabled) {
    toggleItem(props.itemKey)
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    handleClick()
  }
}

defineExpose({
  itemKey: props.itemKey,
  isActive,
})
</script>

<style lang="less">
@import '../../styles/variables.less';
@import '../../styles/mixins.less';

.apron-collapse-item {
  background-color: var(--apron-collapse-bg);
  transition: all @transition-slow;

  // 非第一个项目有上边框
  &:not(:first-child) {
    border-top: 1px solid var(--apron-collapse-border-color);
  }

  // ============================================
  // Header
  // ============================================
  &__header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 15px;
    cursor: pointer;
    user-select: none;
    transition: all @transition-slow;

    &:hover:not(.apron-collapse-item--disabled &) {
      background-color: rgba(0, 0, 0, 0.02);
    }

    &:focus-visible {
      .focus-ring();
      outline-offset: -2px;
    }

    .apron-collapse-item--disabled & {
      cursor: not-allowed;

      &:hover {
        background-color: transparent;
      }
    }
  }

  // ============================================
  // Arrow
  // ============================================
  &__arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    color: var(--apron-collapse-arrow-color);
    transition: transform @transition-slow;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }

  // ============================================
  // Title
  // ============================================
  &__title {
    font-family: var(--apron-font-family);
    font-size: @font-size-base;
    font-weight: @font-weight-semibold;
    color: var(--apron-collapse-title-color);
    line-height: @line-height-normal;
  }

  // ============================================
  // Content (展开区域容器)
  // ============================================
  &__content {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows @transition-slow;
  }

  // ============================================
  // Body (正文)
  // ============================================
  &__body {
    overflow: hidden;
    font-family: var(--apron-font-family);
    color: var(--apron-collapse-content-color);
    // 左边和标题对齐：箭头容器 20px + gap 10px + padding-left 15px = 45px
    padding: 0 15px 0 45px;
    transition: all @transition-slow;
  }

  // ============================================
  // Active State (展开状态)
  // ============================================
  &--active {
    .apron-collapse-item__arrow {
      transform: rotate(90deg);
    }

    .apron-collapse-item__content {
      grid-template-rows: 1fr;
    }

    .apron-collapse-item__body {
      padding: 15px 15px 15px 45px;
    }
  }

  // ============================================
  // Disabled State
  // ============================================
  &--disabled {
    background-color: var(--apron-collapse-disabled-bg);

    .apron-collapse-item__arrow {
      color: var(--apron-collapse-disabled-color);
    }

    .apron-collapse-item__title {
      color: var(--apron-collapse-disabled-color);
    }
  }
}
</style>
