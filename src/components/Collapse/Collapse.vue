<template>
  <div :class="classes" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, computed } from 'vue'

export interface CollapseProps {
  /** 是否为手风琴模式（每次只能展开一个） */
  accordion?: boolean
  /** 默认展开的项目 key 数组 */
  defaultActiveKeys?: string[]
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<CollapseProps>(), {
  accordion: false,
  defaultActiveKeys: () => [],
})

const activeKeys = ref<string[]>(props.defaultActiveKeys)

const toggleItem = (key: string) => {
  activeKeys.value = props.accordion
    ? activeKeys.value.includes(key) ? [] : [key]
    : activeKeys.value.includes(key)
      ? activeKeys.value.filter(k => k !== key)
      : [...activeKeys.value, key]
}

const classes = computed(() => [
  'apron-collapse',
  props.class,
].filter(Boolean).join(' '))

// 提供上下文给子组件
provide('collapseContext', {
  activeKeys,
  toggleItem,
})

defineExpose({
  activeKeys,
  toggleItem,
})
</script>

<style lang="less">
@import '../../styles/variables.less';

// ============================================
// Collapse CSS Variables (Light Mode)
// ============================================
:root {
  --apron-collapse-bg: #ffffff;
  --apron-collapse-border-color: @color-neutral-200;
  --apron-collapse-title-color: @color-primary-900;
  --apron-collapse-content-color: @color-primary-900;
  --apron-collapse-arrow-color: @color-neutral-500;
  --apron-collapse-disabled-color: @color-neutral-400;
  --apron-collapse-disabled-bg: @color-neutral-50;
}

// ============================================
// Collapse CSS Variables (Dark Mode)
// ============================================
.dark,
[data-prefers-color='dark'] {
  --apron-collapse-bg: @color-neutral-800;
  --apron-collapse-border-color: @color-neutral-700;
  --apron-collapse-title-color: @color-neutral-100;
  --apron-collapse-content-color: @color-primary-100;
  --apron-collapse-arrow-color: @color-neutral-400;
  --apron-collapse-disabled-color: @color-neutral-600;
  --apron-collapse-disabled-bg: @color-neutral-900;
}

// ============================================
// Collapse Base Styles
// ============================================
.apron-collapse {
  border: 1px solid var(--apron-collapse-border-color);
  border-radius: @radius-lg;
  overflow: hidden;
  transition: all @transition-slow;
}
</style>
