<script lang="ts">
import type { InjectionKey } from 'vue'

export interface CheckboxGroupContext {
  value: string[]
  disabled: boolean
  labelClickable: boolean
  onChange: (val: string, checked: boolean) => void
}

export const checkboxGroupKey: InjectionKey<CheckboxGroupContext | null> = Symbol('checkboxGroup')
</script>

<script setup lang="ts">
import { ref, computed, watch, inject, useAttrs } from 'vue'

export interface CheckboxProps {
  modelValue?: boolean
  value?: string
  disabled?: boolean
  indeterminate?: boolean
  labelClickable?: boolean
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  disabled: false,
  indeterminate: false,
  labelClickable: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const attrs = useAttrs()
const checkboxGroup = inject(checkboxGroupKey, null)

const internalChecked = ref(props.modelValue ?? false)

watch(() => props.modelValue, (val) => {
  internalChecked.value = val ?? false
})

const isChecked = computed(() => {
  if (checkboxGroup && props.value !== undefined) {
    return checkboxGroup.value.includes(props.value)
  }
  return internalChecked.value
})

const isDisabled = computed(() => {
  return props.disabled || checkboxGroup?.disabled
})

const isLabelClickable = computed(() => {
  return checkboxGroup?.labelClickable ?? props.labelClickable
})

const checkboxClasses = computed(() => [
  'apron-checkbox',
  {
    'apron-checkbox--checked': isChecked.value,
    'apron-checkbox--disabled': isDisabled.value,
    'apron-checkbox--indeterminate': props.indeterminate,
    'apron-checkbox--label-clickable': isLabelClickable.value
  }
])

const handleChange = (event: Event) => {
  if (isDisabled.value) return

  const target = event.target as HTMLInputElement
  const checked = target.checked

  if (checkboxGroup && props.value !== undefined) {
    checkboxGroup.onChange(props.value, checked)
  } else {
    internalChecked.value = checked
    emit('update:modelValue', checked)
    emit('change', checked)
  }
}

const handleLabelClick = () => {
  if (isDisabled.value || !isLabelClickable.value) return
  const newChecked = !isChecked.value
  
  if (checkboxGroup && props.value !== undefined) {
    checkboxGroup.onChange(props.value, newChecked)
  } else {
    internalChecked.value = newChecked
    emit('update:modelValue', newChecked)
    emit('change', newChecked)
  }
}
</script>

<template>
  <label :class="checkboxClasses" v-bind="attrs">
    <span class="apron-checkbox__input">
      <input
        type="checkbox"
        class="apron-checkbox__native"
        :checked="isChecked"
        :disabled="isDisabled"
        :value="value"
        @change="handleChange"
      />
      <span class="apron-checkbox__box">
        <svg v-if="indeterminate" class="apron-checkbox__indeterminate" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <svg v-else class="apron-checkbox__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    </span>
    <span 
      v-if="$slots.default"
      class="apron-checkbox__label" 
      @click.prevent="handleLabelClick"
    >
      <slot />
    </span>
  </label>
</template>

<style lang="less">
@import './Checkbox.less';
</style>

