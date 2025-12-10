<template>
  <div ref="tabsRef" :class="classNames">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, computed, useSlots } from 'vue'
import type { TabsProps } from './types'

// 默认属性
const props = withDefaults(defineProps<TabsProps>(), {
  defaultActiveKey: '',
  capsule: false,
  extra: undefined,
  className: ''
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:activeKey', key: string): void
}>()

// 内部状态
const activeKey = ref(props.defaultActiveKey)
const tabsRef = ref<HTMLDivElement | null>(null)
const slots = useSlots()

// 计算类名
const classNames = computed(() => [
  'apron-tabs',
  props.capsule && 'apron-tabs--capsule',
  props.className
].filter(Boolean).join(' '))

// 设置激活的key
const setActiveKey = (key: string) => {
  activeKey.value = key
  emit('update:activeKey', key)
}

// 提供上下文
provide('tabsContext', {
  activeKey: computed(() => activeKey.value),
  setActiveKey,
  capsule: props.capsule,
  extra: props.extra || slots.extra
})

// 暴露方法
defineExpose({
  tabsRef
})
</script>

<style lang="less">
@import '../../styles/variables.less';
@import '../../styles/mixins.less';

// ============================================
// Tabs CSS Variables (Light Mode)
// ============================================
:root {
  --apron-tabs-text-color: @color-primary-300;
  --apron-tabs-text-active-color: @color-primary-900;
  --apron-tabs-capsule-bg: @color-primary-900;
  --apron-tabs-capsule-text: #ffffff;
  --apron-tabs-border-color: @color-neutral-200;
  --apron-tabs-disabled-color: @color-neutral-400;
}

// ============================================
// Tabs CSS Variables (Dark Mode)
// ============================================
[data-prefers-color='dark'] {
  --apron-tabs-text-color: @color-primary-300;
  --apron-tabs-text-active-color: @color-primary-100;
  --apron-tabs-capsule-bg: #ffffff;
  --apron-tabs-capsule-text: @color-primary-900;
  --apron-tabs-border-color: @color-neutral-700;
  --apron-tabs-disabled-color: @color-neutral-600;
}

// ============================================
// Tabs Base Styles
// ============================================
.apron-tabs {
  display: flex;
  flex-direction: column;
  font-family: var(--apron-font-family);
  transition: all @transition-slow;

  // ============================================
  // TabList
  // ============================================
  &__list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--apron-tabs-border-color);
    transition: all @transition-slow;
  }

  &__list-items {
    display: flex;
    align-items: center;
    gap: 0;
  }

  &__list-extra {
    margin-left: auto;
    flex-shrink: 0;
  }

  // ============================================
  // Tab (默认模式)
  // ============================================
  &__tab {
    .button-reset();

    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 15px;
    font-size: @font-size-base;
    font-weight: @font-weight-normal;
    color: var(--apron-tabs-text-color);
    background: transparent;
    cursor: pointer;
    transition: all @transition-slow;
    white-space: nowrap;

    &:hover:not(&--disabled) {
      color: var(--apron-tabs-text-active-color);
    }

    &:focus-visible {
      .focus-ring();
      outline-offset: -2px;
    }

    &--active {
      color: var(--apron-tabs-text-active-color);
      font-weight: @font-weight-semibold;
    }

    &--disabled {
      color: var(--apron-tabs-disabled-color);
      cursor: not-allowed;
    }
  }

  // ============================================
  // TabPanel (默认模式)
  // ============================================
  &__panel {
    margin-top: 10px;
    padding: 15px;
    transition: all @transition-slow;
  }

  // ============================================
  // Capsule 模式
  // ============================================
  &--capsule {
    .apron-tabs__list {
      border-bottom: none;
    }

    .apron-tabs__tab {
      padding: 0 20px;
      border-radius: 20px;
      transition: background-color @transition-slow;

      // Active 状态在 hover 时保持颜色不变
      &--active {
        background-color: var(--apron-tabs-capsule-bg);
        color: var(--apron-tabs-capsule-text);
        font-weight: @font-weight-normal;

        &:hover:not(&--disabled) {
          background-color: var(--apron-tabs-capsule-bg);
          color: var(--apron-tabs-capsule-text);
        }
      }
    }

    .apron-tabs__panel {
      padding: 0;
    }
  }
}
</style>