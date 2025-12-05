<script setup lang="ts">
import { ref, computed, provide, watch, useAttrs } from 'vue'
import type { InjectionKey } from 'vue'

export interface TabsContext {
  activeKey: string
  setActiveKey: (key: string) => void
}

export const tabsContextKey: InjectionKey<TabsContext> = Symbol('tabsContext')

export interface TabsProps {
  modelValue?: string
  defaultActiveKey?: string
  capsule?: boolean
}

const props = withDefaults(defineProps<TabsProps>(), {
  capsule: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const attrs = useAttrs()

const internalActiveKey = ref(props.modelValue ?? props.defaultActiveKey ?? '')

watch(() => props.modelValue, (val) => {
  if (val !== undefined) {
    internalActiveKey.value = val
  }
})

const setActiveKey = (key: string) => {
  internalActiveKey.value = key
  emit('update:modelValue', key)
  emit('change', key)
}

const context: TabsContext = {
  get activeKey() { return internalActiveKey.value },
  setActiveKey
}

provide(tabsContextKey, context)

const tabsClasses = computed(() => [
  'apron-tabs',
  {
    'apron-tabs--capsule': props.capsule
  }
])
</script>

<template>
  <div :class="tabsClasses" v-bind="attrs">
    <slot />
  </div>
</template>

<style lang="less">
@import './Tabs.less';
</style>

