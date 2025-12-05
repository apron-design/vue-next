<script setup lang="ts">
import { useAttrs } from 'vue'

export interface TabListProps {
  extra?: string
}

const props = defineProps<TabListProps>()
const attrs = useAttrs()
</script>

<template>
  <div class="apron-tabs__list" role="tablist" v-bind="attrs">
    <div class="apron-tabs__nav">
      <slot />
    </div>
    <div v-if="extra || $slots.extra" class="apron-tabs__extra">
      <slot name="extra">{{ extra }}</slot>
    </div>
  </div>
</template>

<style lang="less">
@import './Tabs.less';
</style>

