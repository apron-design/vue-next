<script setup lang="ts">
import { ref, computed, provide, watch, useAttrs } from 'vue'
import { radioGroupKey } from './Radio.vue'
import type { RadioGroupContext } from './Radio.vue'

export type RadioDirection = 'horizontal' | 'vertical'

export interface RadioOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface RadioGroupProps {
  modelValue?: string | number
  options?: RadioOption[]
  disabled?: boolean
  direction?: RadioDirection
  labelClickable?: boolean
  name?: string
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  disabled: false,
  direction: 'horizontal',
  labelClickable: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}>()

const attrs = useAttrs()

const internalValue = ref<string | number | undefined>(props.modelValue)

watch(() => props.modelValue, (val) => {
  internalValue.value = val
})

const handleChange = (value: string | number) => {
  internalValue.value = value
  emit('update:modelValue', value)
  emit('change', value)
}

const context: RadioGroupContext = {
  get value() { return internalValue.value },
  get name() { return props.name },
  get disabled() { return props.disabled },
  get labelClickable() { return props.labelClickable },
  onChange: handleChange
}

provide(radioGroupKey, context)

const groupClasses = computed(() => [
  'apron-radio-group',
  `apron-radio-group--${props.direction}`
])
</script>

<template>
  <div :class="groupClasses" role="radiogroup" v-bind="attrs">
    <slot />
  </div>
</template>

<style lang="less">
@import './Radio.less';
</style>

