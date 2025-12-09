<template>
  <button
    ref="tabRef"
    :class="classNames"
    role="tab"
    :aria-selected="isActive"
    :aria-disabled="disabled"
    :tabindex="disabled ? -1 : 0"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import type { TabProps } from './types'

// 属性
const props = withDefaults(defineProps<TabProps>(), {
  disabled: false,
  className: ''
})

// 引用
const tabRef = ref<HTMLButtonElement | null>(null)

// 从上下文获取激活key和设置方法
const context = inject<any>('tabsContext')
if (!context) {
  throw new Error('Tab must be used within a Tabs component')
}

const { activeKey, setActiveKey } = context
const isActive = computed(() => activeKey.value === props.tabKey)

// 处理点击事件
const handleClick = () => {
  if (!props.disabled) {
    setActiveKey(props.tabKey)
  }
}

// 计算类名
const classNames = computed(() => [
  'apron-tabs__tab',
  isActive.value && 'apron-tabs__tab--active',
  props.disabled && 'apron-tabs__tab--disabled',
  props.className
].filter(Boolean).join(' '))

// 暴露方法
defineExpose({
  tabRef
})
</script>