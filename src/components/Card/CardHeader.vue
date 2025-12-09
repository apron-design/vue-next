<template>
  <div :class="classes" v-bind="$attrs">
    <div v-if="title || $slots.title" class="apron-card__header-title">
      <slot name="title">{{ title }}</slot>
    </div>
    <slot />
    <div v-if="extra || $slots.extra" class="apron-card__header-extra">
      <slot name="extra">{{ extra }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

export interface CardHeaderProps {
  /** 标题 */
  title?: string
  /** 右侧额外内容 */
  extra?: string
  /** 自定义类名 */
  class?: string
}

const slots = useSlots()

const props = withDefaults(defineProps<CardHeaderProps>(), {})

const classes = computed(() => [
  'apron-card__header',
  props.class,
].filter(Boolean).join(' '))
</script>

<style lang="less">
@import '../../styles/variables.less';
@import '../../styles/mixins.less';

.apron-card__header {
  .flex-center();

  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px solid var(--apron-card-border-color);
  transition: all @transition-slow;

  &-title {
    font-family: var(--apron-font-family);
    font-size: @font-size-base;
    font-weight: @font-weight-semibold;
    color: var(--apron-card-header-title-color);
    line-height: @line-height-normal;
  }

  &-extra {
    margin-left: auto;
  }
}
</style>
