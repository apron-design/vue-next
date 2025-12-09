<template>
  <div ref="tabListRef" :class="classNames" role="tablist">
    <div class="apron-tabs__list-items">
      <slot></slot>
    </div>
    <div v-if="extra" class="apron-tabs__list-extra">
      <component :is="extra" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import type { TabListProps } from './types'

// 属性
const props = withDefaults(defineProps<TabListProps>(), {
  className: ''
})

// 引用
const tabListRef = ref<HTMLDivElement | null>(null)

// 从上下文获取胶囊模式
const context = inject<any>('tabsContext')
const capsule = context?.capsule || false

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