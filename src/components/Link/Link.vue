<script setup lang="ts">
import { computed, useAttrs } from 'vue'

export type LinkVariant = 'primary' | 'secondary'
export type LinkUnderline = 'always' | 'hover' | 'never'

export interface LinkProps {
  variant?: LinkVariant
  underline?: LinkUnderline
  danger?: boolean
  href?: string
  target?: string
}

const props = withDefaults(defineProps<LinkProps>(), {
  variant: 'primary',
  underline: 'hover',
  danger: false
})

const attrs = useAttrs()

const linkClasses = computed(() => [
  'apron-link',
  `apron-link--${props.variant}`,
  `apron-link--underline-${props.underline}`,
  {
    'apron-link--danger': props.danger
  }
])
</script>

<template>
  <a
    :class="linkClasses"
    :href="href"
    :target="target"
    v-bind="attrs"
  >
    <slot />
  </a>
</template>

<style lang="less">
@import './Link.less';
</style>

