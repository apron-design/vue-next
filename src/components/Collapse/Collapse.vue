<script lang="ts">
import type { InjectionKey } from 'vue'

export interface CollapseContext {
  activeKeys: string[]
  toggleItem: (key: string) => void
}

export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContext')
</script>

<script setup lang="ts">
import { ref, computed, provide, watch, useAttrs } from 'vue'

export interface CollapseProps {
  modelValue?: string[]
  defaultActiveKeys?: string[]
  accordion?: boolean
}

const props = withDefaults(defineProps<CollapseProps>(), {
  defaultActiveKeys: () => [],
  accordion: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
  (e: 'change', value: string[]): void
}>()

const attrs = useAttrs()

const internalActiveKeys = ref<string[]>([...(props.modelValue ?? props.defaultActiveKeys)])

watch(() => props.modelValue, (val) => {
  if (val !== undefined) {
    internalActiveKeys.value = [...val]
  }
})

const toggleItem = (key: string) => {
  let newKeys: string[]
  
  if (props.accordion) {
    newKeys = internalActiveKeys.value.includes(key) ? [] : [key]
  } else {
    if (internalActiveKeys.value.includes(key)) {
      newKeys = internalActiveKeys.value.filter(k => k !== key)
    } else {
      newKeys = [...internalActiveKeys.value, key]
    }
  }
  
  internalActiveKeys.value = newKeys
  emit('update:modelValue', newKeys)
  emit('change', newKeys)
}

const context: CollapseContext = {
  get activeKeys() { return internalActiveKeys.value },
  toggleItem
}

provide(collapseContextKey, context)

const collapseClasses = computed(() => [
  'apron-collapse',
  {
    'apron-collapse--accordion': props.accordion
  }
])
</script>

<template>
  <div :class="collapseClasses" v-bind="attrs">
    <slot />
  </div>
</template>

<style lang="less">
@import './Collapse.less';
</style>

