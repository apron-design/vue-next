<template>
  <div :class="classes" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface CardBodyProps {
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<CardBodyProps>(), {})

const classes = computed(() => [
  'apron-card__body',
  props.class,
].filter(Boolean).join(' '))
</script>

<style lang="less">
@import '../../styles/variables.less';
@import '../../styles/mixins.less';

.apron-card__body {
  padding: 10px 15px;
  font-family: var(--apron-font-family);
  transition: all @transition-slow;
}
</style>
