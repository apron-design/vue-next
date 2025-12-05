<script setup lang="ts">
import { useAttrs } from 'vue'

export interface CardHeaderProps {
  title?: string
  extra?: string
}

defineProps<CardHeaderProps>()
const attrs = useAttrs()
</script>

<template>
  <div class="apron-card__header" v-bind="attrs">
    <div class="apron-card__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div v-if="extra || $slots.extra" class="apron-card__extra">
      <slot name="extra">{{ extra }}</slot>
    </div>
  </div>
</template>

<style lang="less">
@import './Card.less';
</style>

