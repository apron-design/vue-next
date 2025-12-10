<template>
  <Radio
    :value="value"
    :disabled="isDisabled"
    :label-clickable="groupContext?.labelClickable ?? true"
    :checked="isChecked"
    :name="groupContext?.name"
    @change="handleChange"
  >
    <slot />
  </Radio>
</template>

<script setup lang="ts">
import { computed, inject, onMounted } from 'vue'
import Radio from './Radio.vue'
import type { RadioValueType } from './RadioGroup.vue'

export interface RadioGroupItemProps {
  /** 单选框的值 */
  value: RadioValueType
  /** 是否禁用 */
  disabled?: boolean
}

const props = defineProps<RadioGroupItemProps>()

interface RadioGroupContextValue {
  value: RadioValueType | undefined
  disabled: boolean
  labelClickable: boolean
  name?: string
  onChange: (optionValue: RadioValueType) => void
}

const groupContext = inject<RadioGroupContextValue | null>('radioGroupContext', null)

onMounted(() => {
  if (!groupContext) {
    console.warn('RadioGroupItem must be used within a RadioGroup')
  }
})

const isChecked = computed(() => groupContext?.value === props.value)
const isDisabled = computed(() => props.disabled || groupContext?.disabled || false)

const handleChange = (checked: boolean) => {
  if (checked && groupContext) {
    groupContext.onChange(props.value)
  }
}
</script>

