<script setup lang="ts">
import { ref, computed, watch, inject, useAttrs } from 'vue'
import type { InjectionKey } from 'vue'

export interface RadioGroupContext {
  value: string | number | undefined
  name: string | undefined
  disabled: boolean
  labelClickable: boolean
  onChange: (val: string | number) => void
}

export const radioGroupKey: InjectionKey<RadioGroupContext | null> = Symbol('radioGroup')

export interface RadioProps {
  modelValue?: boolean
  value?: string | number
  disabled?: boolean
  labelClickable?: boolean
  name?: string
}

const props = withDefaults(defineProps<RadioProps>(), {
  disabled: false,
  labelClickable: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const attrs = useAttrs()
const radioGroup = inject(radioGroupKey, null)

const internalChecked = ref(props.modelValue ?? false)

watch(() => props.modelValue, (val) => {
  internalChecked.value = val ?? false
})

const isChecked = computed(() => {
  if (radioGroup && props.value !== undefined) {
    return radioGroup.value === props.value
  }
  return internalChecked.value
})

const isDisabled = computed(() => {
  return props.disabled || radioGroup?.disabled
})

const isLabelClickable = computed(() => {
  return radioGroup?.labelClickable ?? props.labelClickable
})

const radioName = computed(() => {
  return radioGroup?.name ?? props.name
})

const radioClasses = computed(() => [
  'apron-radio',
  {
    'apron-radio--checked': isChecked.value,
    'apron-radio--disabled': isDisabled.value,
    'apron-radio--label-clickable': isLabelClickable.value
  }
])

const handleChange = () => {
  if (isDisabled.value) return

  if (radioGroup && props.value !== undefined) {
    radioGroup.onChange(props.value)
  } else {
    internalChecked.value = true
    emit('update:modelValue', true)
    emit('change', true)
  }
}

const handleLabelClick = () => {
  if (isDisabled.value || !isLabelClickable.value || isChecked.value) return
  handleChange()
}
</script>

<template>
  <label :class="radioClasses" v-bind="attrs">
    <span class="apron-radio__input">
      <input
        type="radio"
        class="apron-radio__native"
        :checked="isChecked"
        :disabled="isDisabled"
        :value="value"
        :name="radioName"
        @change="handleChange"
      />
      <span class="apron-radio__circle">
        <span class="apron-radio__dot" />
      </span>
    </span>
    <span 
      v-if="$slots.default"
      class="apron-radio__label" 
      @click.prevent="handleLabelClick"
    >
      <slot />
    </span>
  </label>
</template>

<style lang="less">
@import './Radio.less';
</style>

