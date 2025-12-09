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
    <div 
      class="apron-collapse-item__content"
      :style="{ height: contentHeight }"
    >
      <div class="apron-collapse-item__body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted, onUnmounted, watch } from 'vue'

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

const contentRef = ref<HTMLDivElement | null>(null)
const contentHeight = ref<string>('0px')

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

// 更新内容高度
const updateContentHeight = () => {
  if (contentRef.value) {
    contentHeight.value = isActive.value 
      ? `${contentRef.value.scrollHeight}px` 
      : '0px'
  }
}

// 监听活动状态变化
watch(isActive, updateContentHeight)

// 组件挂载后更新高度
onMounted(() => {
  updateContentHeight()
})

// 监听内容变化
watch(() => props.title, updateContentHeight)

defineExpose({
  itemKey: props.itemKey,
  isActive,
})
</script>

<style lang="less">
@import '../../styles/variables.less';

.apron-collapse-item {
  border-bottom: 1px solid var(--apron-collapse-border-color);
  
  &:last-child {
    border-bottom: none;
  }

  // ============================================
  // Header
  // ============================================
  &__header {
    position: relative;
    display: flex;
    align-items: center;
    padding: @spacing-3 @spacing-4;
    background-color: var(--apron-collapse-header-bg);
    color: var(--apron-collapse-header-color);
    cursor: pointer;
    transition: all @transition-slow;
    outline: none;

    &:hover:not(.apron-collapse-item--disabled &) {
      background-color: var(--apron-collapse-header-bg-hover);
    }

    .apron-collapse-item--disabled & {
      color: var(--apron-collapse-header-disabled-color);
      cursor: not-allowed;
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
    margin-right: @spacing-2;
    color: var(--apron-collapse-arrow-color);
    transition: transform @transition-slow;
    
    svg {
      width: 16px;
      height: 16px;
    }
    
    .apron-collapse-item--active & {
      transform: rotate(90deg);
    }
  }

  // ============================================
  // Title
  // ============================================
  &__title {
    flex: 1;
    font-size: @font-size-base;
    font-weight: @font-weight-medium;
    line-height: @line-height-normal;
  }

  // ============================================
  // Content
  // ============================================
  &__content {
    height: 0;
    overflow: hidden;
    transition: height @transition-slow ease-in-out;
  }

  // ============================================
  // Body
  // ============================================
  &__body {
    padding: 0 @spacing-4 @spacing-3;
    background-color: var(--apron-collapse-content-bg);
    font-size: @font-size-base;
    line-height: @line-height-normal;
    color: var(--apron-collapse-header-color);
  }
}
</style>
