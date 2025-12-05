<script setup lang="ts">
import { ref, computed, watch, useAttrs } from 'vue'

export type SwitchSize = 'default' | 'small' | 'mini'
export type SwitchVariant = 'default' | 'primary' | 'secondary'

export interface SwitchProps {
  modelValue?: boolean
  disabled?: boolean
  size?: SwitchSize
  variant?: SwitchVariant
  checkedColor?: string
  uncheckedColor?: string
}

const props = withDefaults(defineProps<SwitchProps>(), {
  disabled: false,
  size: 'default',
  variant: 'default'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const attrs = useAttrs()

const internalChecked = ref(props.modelValue ?? false)

watch(() => props.modelValue, (val) => {
  internalChecked.value = val ?? false
})

const switchClasses = computed(() => [
  'apron-switch',
  `apron-switch--${props.size}`,
  `apron-switch--${props.variant}`,
  {
    'apron-switch--checked': internalChecked.value,
    'apron-switch--disabled': props.disabled
  }
])

const customStyles = computed(() => {
  const styles: Record<string, string> = {}
  if (props.checkedColor && internalChecked.value) {
    styles['--switch-checked-bg'] = props.checkedColor
  }
  if (props.uncheckedColor && !internalChecked.value) {
    styles['--switch-bg'] = props.uncheckedColor
  }
  return styles
})

const handleChange = () => {
  if (props.disabled) return

  const newValue = !internalChecked.value
  internalChecked.value = newValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<template>
  <label :class="switchClasses" :style="customStyles" v-bind="attrs">
    <input
      type="checkbox"
      class="apron-switch__native"
      :checked="internalChecked"
      :disabled="disabled"
      @change="handleChange"
    />
    <span class="apron-switch__track">
      <span class="apron-switch__thumb" />
    </span>
  </label>
</template>

<style lang="less">
@import './Switch.less';
</style>

