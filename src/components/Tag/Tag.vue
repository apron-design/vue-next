<script setup lang="ts">
import { computed, useAttrs } from 'vue'

export type TagVariant = 'primary' | 'default'

export interface TagProps {
  variant?: TagVariant
  closable?: boolean
}

const props = withDefaults(defineProps<TagProps>(), {
  variant: 'default',
  closable: false
})

const emit = defineEmits<{
  (e: 'close', event: MouseEvent): void
}>()

const attrs = useAttrs()

const tagClasses = computed(() => [
  'apron-tag',
  `apron-tag--${props.variant}`,
  {
    'apron-tag--closable': props.closable
  }
])

const handleClose = (event: MouseEvent) => {
  event.stopPropagation()
  emit('close', event)
}
</script>

<template>
  <span :class="tagClasses" v-bind="attrs">
    <span class="apron-tag__content">
      <slot />
    </span>
    <button
      v-if="closable"
      type="button"
      class="apron-tag__close"
      @click="handleClose"
      aria-label="Close"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </span>
</template>

<style lang="less">
@import './Tag.less';
</style>

