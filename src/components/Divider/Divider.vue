<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'

export type DividerAlign = 'left' | 'center' | 'right'

export interface DividerProps {
  dashed?: boolean
  align?: DividerAlign
}

const props = withDefaults(defineProps<DividerProps>(), {
  dashed: false,
  align: 'center'
})

const attrs = useAttrs()
const slots = useSlots()

const hasContent = computed(() => !!slots.default)

const dividerClasses = computed(() => [
  'apron-divider',
  {
    'apron-divider--dashed': props.dashed,
    'apron-divider--with-text': hasContent.value,
    [`apron-divider--${props.align}`]: hasContent.value
  }
])
</script>

<template>
  <div :class="dividerClasses" role="separator" v-bind="attrs">
    <template v-if="hasContent">
      <span class="apron-divider__line apron-divider__line--left" />
      <span class="apron-divider__text">
        <slot />
      </span>
      <span class="apron-divider__line apron-divider__line--right" />
    </template>
    <span v-else class="apron-divider__line" />
  </div>
</template>

<style lang="less">
@import './Divider.less';
</style>

