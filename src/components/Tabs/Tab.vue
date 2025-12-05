<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue'
import { tabsContextKey } from './Tabs.vue'
import type { TabsContext } from './Tabs.vue'

export interface TabProps {
  tabKey: string
  disabled?: boolean
}

const props = withDefaults(defineProps<TabProps>(), {
  disabled: false
})

const attrs = useAttrs()
const tabsContext = inject<TabsContext | null>(tabsContextKey, null)

const isActive = computed(() => tabsContext?.activeKey === props.tabKey)

const tabClasses = computed(() => [
  'apron-tabs__tab',
  {
    'apron-tabs__tab--active': isActive.value,
    'apron-tabs__tab--disabled': props.disabled
  }
])

const handleClick = () => {
  if (props.disabled) return
  tabsContext?.setActiveKey(props.tabKey)
}
</script>

<template>
  <button
    type="button"
    :class="tabClasses"
    role="tab"
    :aria-selected="isActive"
    :tabindex="isActive ? 0 : -1"
    @click="handleClick"
    v-bind="attrs"
  >
    <slot />
  </button>
</template>

<style lang="less">
@import './Tabs.less';
</style>

