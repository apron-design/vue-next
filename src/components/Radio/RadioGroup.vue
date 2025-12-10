<template>
  <div :class="classes" role="radiogroup">
    <slot v-if="!options" />
    <template v-else>
      <Radio
        v-for="option in normalizedOptions"
        :key="option.value.toString()"
        :value="option.value"
        :name="name"
        :checked="mergedValue === option.value"
        :disabled="disabled || option.disabled"
        :label-clickable="labelClickable"
        @change="() => handleChange(option.value)"
      >
        {{ option.label }}
      </Radio>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide, useId } from 'vue'
import Radio from './Radio.vue'

export type RadioValueType = string | number

export interface RadioOptionType {
  label: string
  value: RadioValueType
  disabled?: boolean
}

export interface RadioGroupProps {
  /** 当前选中的值 */
  value?: RadioValueType
  /** 默认选中的值（非受控） */
  defaultValue?: RadioValueType
  /** 选项配置 */
  options?: (RadioOptionType | string | number)[]
  /** 是否禁用整组 */
  disabled?: boolean
  /** 排列方向 */
  direction?: 'horizontal' | 'vertical'
  /** RadioGroup 的 name 属性 */
  name?: string
  /** 点击文字部分是否可以激活单选框，默认为 true */
  labelClickable?: boolean
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  disabled: false,
  direction: 'horizontal',
  labelClickable: true,
})

const emit = defineEmits<{
  (e: 'update:value', value: RadioValueType): void
  (e: 'change', value: RadioValueType): void
}>()

const autoId = useId()
const groupName = props.name || `apron-radio-group-${autoId}`

const internalValue = ref<RadioValueType | undefined>(props.defaultValue)
const mergedValue = computed(() => props.value !== undefined ? props.value : internalValue.value)

const handleChange = (optionValue: RadioValueType) => {
  if (props.value === undefined) {
    internalValue.value = optionValue
  }
  emit('update:value', optionValue)
  emit('change', optionValue)
}

const classes = computed(() => [
  'apron-radio-group',
  `apron-radio-group--${props.direction}`,
  props.class,
].filter(Boolean).join(' '))

const normalizedOptions = computed(() => {
  if (!props.options) return []
  
  return props.options.map(option => {
    if (typeof option === 'string' || typeof option === 'number') {
      return { label: option.toString(), value: option }
    }
    return option
  })
})

// 提供上下文给子组件
const radioGroupContext = {
  value: mergedValue,
  disabled: props.disabled,
  labelClickable: props.labelClickable,
  name: groupName,
  onChange: handleChange,
}

provide('radioGroupContext', radioGroupContext)

defineExpose({
  value: mergedValue,
})
</script>

<style lang="less">
@import '../../styles/variables.less';

// ============================================
// RadioGroup CSS Variables (Light Mode)
// ============================================
:root {
  --apron-radio-group-gap: @spacing-4;
}

// ============================================
// RadioGroup Base Styles
// ============================================
.apron-radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--apron-radio-group-gap);

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
  }
}
</style>
