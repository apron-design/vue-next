<template>
  <div :class="classes" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface CardFooterProps {
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<CardFooterProps>(), {})

const classes = computed(() => [
  'apron-card__footer',
  props.class,
].filter(Boolean).join(' '))
</script>

<style lang="less">
@import '../../styles/variables.less';
@import '../../styles/mixins.less';

.apron-card__footer {
  padding: 10px 15px;
  border-top: 1px solid var(--apron-card-border-color);
  font-family: var(--apron-font-family);
  transition: all @transition-slow;
}
</style>
