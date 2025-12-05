<script setup lang="ts">
import { ref, computed, provide, watch, useAttrs } from 'vue'
import { checkboxGroupKey } from './Checkbox.vue'
import type { CheckboxGroupContext } from './Checkbox.vue'

export type CheckboxDirection = 'horizontal' | 'vertical'

export interface CheckboxOption {
  label: string
  value: string
  disabled?: boolean
}

export interface CheckboxGroupProps {
  modelValue?: string[]
  options?: CheckboxOption[]
  disabled?: boolean
  direction?: CheckboxDirection
  labelClickable?: boolean
}

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  modelValue: () => [],
  disabled: false,
  direction: 'horizontal',
  labelClickable: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
  (e: 'change', value: string[]): void
}>()

const attrs = useAttrs()

const internalValue = ref<string[]>([...props.modelValue])

watch(() => props.modelValue, (val) => {
  internalValue.value = [...(val ?? [])]
})

const handleChange = (value: string, checked: boolean) => {
  const newValue = [...internalValue.value]
  if (checked) {
    if (!newValue.includes(value)) {
      newValue.push(value)
    }
  } else {
    const index = newValue.indexOf(value)
    if (index !== -1) {
      newValue.splice(index, 1)
    }
  }
  internalValue.value = newValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

const context: CheckboxGroupContext = {
  get value() { return internalValue.value },
  get disabled() { return props.disabled },
  get labelClickable() { return props.labelClickable },
  onChange: handleChange
}

provide(checkboxGroupKey, context)

const groupClasses = computed(() => [
  'apron-checkbox-group',
  `apron-checkbox-group--${props.direction}`
])
</script>

<template>
  <div :class="groupClasses" role="group" v-bind="attrs">
    <slot />
  </div>
</template>

<style lang="less">
@import './Checkbox.less';
</style>

