<script setup lang="ts">
import { computed, useAttrs, Teleport, Transition } from 'vue'
import type { Component } from 'vue'

export type SpinPlacement = 'top' | 'bottom' | 'left' | 'right' | 'center'

export interface SpinProps {
  loading?: boolean
  text?: string
  icon?: Component
  placement?: SpinPlacement
  fullscreen?: boolean
}

const props = withDefaults(defineProps<SpinProps>(), {
  loading: true,
  placement: 'center',
  fullscreen: false
})

const attrs = useAttrs()
const slots = defineSlots<{
  default?: () => any
  icon?: () => any
}>()

const hasChildren = computed(() => !!slots.default)

const spinClasses = computed(() => [
  'apron-spin',
  `apron-spin--${props.placement}`,
  {
    'apron-spin--loading': props.loading,
    'apron-spin--fullscreen': props.fullscreen,
    'apron-spin--wrapper': hasChildren.value
  }
])

const defaultIcon = `<svg viewBox="0 0 24 24" fill="none">
  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="31.4 31.4"/>
</svg>`
</script>

<template>
  <template v-if="fullscreen">
    <Teleport to="body">
      <Transition name="apron-spin-fullscreen">
        <div v-if="loading" class="apron-spin-root">
          <div class="apron-spin__overlay" />
          <div :class="spinClasses" v-bind="attrs">
            <span class="apron-spin__icon">
              <slot name="icon">
                <component v-if="icon" :is="icon" />
                <span v-else v-html="defaultIcon" />
              </slot>
            </span>
            <span v-if="text" class="apron-spin__text">{{ text }}</span>
          </div>
        </div>
      </Transition>
    </Teleport>
  </template>
  <template v-else-if="hasChildren">
    <div :class="spinClasses" v-bind="attrs">
      <div class="apron-spin__content" :class="{ 'apron-spin__content--blur': loading }">
        <slot />
      </div>
      <Transition name="apron-spin-fade">
        <div v-if="loading" class="apron-spin__indicator">
          <span class="apron-spin__icon">
            <slot name="icon">
              <component v-if="icon" :is="icon" />
              <span v-else v-html="defaultIcon" />
            </slot>
          </span>
          <span v-if="text" class="apron-spin__text">{{ text }}</span>
        </div>
      </Transition>
    </div>
  </template>
  <template v-else>
    <div :class="spinClasses" v-bind="attrs">
      <span class="apron-spin__icon">
        <slot name="icon">
          <component v-if="icon" :is="icon" />
          <span v-else v-html="defaultIcon" />
        </slot>
      </span>
      <span v-if="text" class="apron-spin__text">{{ text }}</span>
    </div>
  </template>
</template>

<style lang="less">
@import './Spin.less';
</style>

