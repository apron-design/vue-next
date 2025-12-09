<template>
  <div :class="classes" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface CardProps {
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<CardProps>(), {})

const classes = computed(() => [
  'apron-card',
  props.class,
].filter(Boolean).join(' '))
</script>

<style lang="less">
@import '../../styles/variables.less';

// ============================================
// Card CSS Variables (Light Mode)
// ============================================
:root {
  --apron-card-bg: #ffffff;
  --apron-card-border-color: @color-neutral-200;
  --apron-card-header-title-color: @color-primary-900;
}

// ============================================
// Card CSS Variables (Dark Mode)
// ============================================
.dark,
[data-prefers-color='dark'] {
  --apron-card-bg: @color-neutral-800;
  --apron-card-border-color: @color-neutral-700;
  --apron-card-header-title-color: @color-neutral-100;
}

// ============================================
// Card Base Styles
// ============================================
.apron-card {
  background-color: var(--apron-card-bg);
  border: 1px solid var(--apron-card-border-color);
  border-radius: @radius-lg;
  overflow: hidden;
  transition: all @transition-slow;
}
</style>
