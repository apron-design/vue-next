<template>
  <div
    v-if="isActive"
    ref="tabPanelRef"
    :class="classNames"
    role="tabpanel"
    :aria-hidden="!isActive"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import type { TabPanelProps } from './types'

// 属性
const props = withDefaults(defineProps<TabPanelProps>(), {
  className: ''
})

// 引用
const tabPanelRef = ref<HTMLDivElement | null>(null)

// 从上下文获取激活key
const context = inject<any>('tabsContext')
if (!context) {
  throw new Error('TabPanel must be used within a Tabs component')
}

const { activeKey } = context
const isActive = computed(() => activeKey.value === props.tabKey)

// 计算类名
const classNames = computed(() => [
  'apron-tabs__panel',
  props.className
].filter(Boolean).join(' '))

// 暴露方法
defineExpose({
  tabPanelRef
})
</script>