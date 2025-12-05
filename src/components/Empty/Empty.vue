<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { Component } from 'vue'

export interface EmptyProps {
  icon?: Component
  description?: string
}

withDefaults(defineProps<EmptyProps>(), {
  description: '暂无数据'
})

const attrs = useAttrs()

const emptyClasses = computed(() => ['apron-empty'])

const defaultIcon = `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4" opacity="0.3"/>
  <path d="M24 28C24 26.8954 24.8954 26 26 26H38C39.1046 26 40 26.8954 40 28V40C40 41.1046 39.1046 42 38 42H26C24.8954 42 24 41.1046 24 40V28Z" stroke="currentColor" stroke-width="2" opacity="0.5"/>
  <path d="M28 34L30 36L36 30" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
</svg>`
</script>

<template>
  <div :class="emptyClasses" v-bind="attrs">
    <div class="apron-empty__icon">
      <slot name="icon">
        <component v-if="icon" :is="icon" />
        <span v-else v-html="defaultIcon" />
      </slot>
    </div>
    <div class="apron-empty__description">
      <slot>{{ description }}</slot>
    </div>
  </div>
</template>

<style lang="less">
@import './Empty.less';
</style>

