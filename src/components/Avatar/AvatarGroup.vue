<template>
  <div :class="classes" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface AvatarGroupProps {
  /** 自定义类名 */
  class?: string
}

const props = defineProps<AvatarGroupProps>()

const classes = computed(() => [
  'apron-avatar-group',
  props.class,
].filter(Boolean).join(' '))
</script>

