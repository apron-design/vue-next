<script setup lang="ts">
import { computed, useAttrs } from 'vue'

export interface AvatarGroupProps {
  max?: number
}

defineProps<AvatarGroupProps>()
const attrs = useAttrs()

const groupClasses = computed(() => [
  'apron-avatar-group'
])
</script>

<template>
  <div :class="groupClasses" v-bind="attrs">
    <slot />
  </div>
</template>

<style lang="less">
@import './Avatar.less';
</style>

