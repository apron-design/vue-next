<template>
  <div ref="tabsRef" :class="classNames">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, computed, useSlots } from 'vue'
import type { TabsProps } from './types'

// 默认属性
const props = withDefaults(defineProps<TabsProps>(), {
  defaultActiveKey: '',
  capsule: false,
  className: ''
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:activeKey', key: string): void
}>()

// 内部状态
const activeKey = ref(props.defaultActiveKey)
const tabsRef = ref<HTMLDivElement | null>(null)

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
  capsule: props.capsule
})

// 暴露方法
defineExpose({
  tabsRef
})
</script>