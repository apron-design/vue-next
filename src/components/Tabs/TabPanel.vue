<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue'
import { tabsContextKey } from './Tabs.vue'
import type { TabsContext } from './Tabs.vue'

export interface TabPanelProps {
  tabKey: string
}

const props = defineProps<TabPanelProps>()
const attrs = useAttrs()
const tabsContext = inject<TabsContext | null>(tabsContextKey, null)

const isActive = computed(() => tabsContext?.activeKey === props.tabKey)

const panelClasses = computed(() => [
  'apron-tabs__panel',
  {
    'apron-tabs__panel--active': isActive.value
  }
])
</script>

<template>
  <div
    v-show="isActive"
    :class="panelClasses"
    role="tabpanel"
    v-bind="attrs"
  >
    <slot />
  </div>
</template>

<style lang="less">
@import './Tabs.less';
</style>

