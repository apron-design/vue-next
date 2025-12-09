<template>
  <div ref="tabListRef" :class="classNames" role="tablist">
    <div class="apron-tabs__list-items">
      <slot></slot>
    </div>
    <div v-if="hasExtra" class="apron-tabs__list-extra">
      <slot name="extra">
        <component v-if="extra" :is="extra" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, useSlots } from 'vue'
import type { TabListProps } from './types'

// 属性
const props = withDefaults(defineProps<TabListProps>(), {
  className: ''
})

// 引用
const tabListRef = ref<HTMLDivElement | null>(null)
const slots = useSlots()

// 从上下文获取胶囊模式和 extra
const context = inject<any>('tabsContext')
if (!context) {
  throw new Error('TabList must be used within a Tabs component')
}

const capsule = context?.capsule || false
const extra = context?.extra

// 检查是否有 extra 插槽或 extra 内容
const hasExtra = computed(() => !!slots.extra || !!extra)

// 计算类名
const classNames = computed(() => [
  'apron-tabs__list',
  props.className
].filter(Boolean).join(' '))

// 暴露方法
defineExpose({
  tabListRef
})
</script>