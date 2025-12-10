<template>
  <div :class="classes" role="group">
    <template v-if="options">
      <ad-checkbox
        v-for="option in normalizedOptions"
        :key="String(option.value)"
        :value="option.value"
        :checked="mergedValue.includes(option.value)"
        :disabled="disabled || option.disabled"
        :label-clickable="labelClickable"
        @change="(checked) => handleChange(option.value, checked)"
      >
        {{ option.label }}
      </ad-checkbox>
    </template>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide } from 'vue'
import AdCheckbox from './Checkbox.vue'

export type CheckboxValueType = string | number

export interface CheckboxOptionType {
  label: string
  value: CheckboxValueType
  disabled?: boolean
}

export interface CheckboxGroupProps {
  /** 当前选中的值数组（受控） */
  value?: CheckboxValueType[]
  /** 默认选中的值数组（非受控） */
  defaultValue?: CheckboxValueType[]
  /** 选项配置 */
  options?: (CheckboxOptionType | string | number)[]
  /** 是否禁用整组 */
  disabled?: boolean
  /** 排列方向 */
  direction?: 'horizontal' | 'vertical'
  /** 选中值改变时的回调 */
  onChange?: (checkedValues: CheckboxValueType[]) => void
  /** 自定义类名 */
  class?: string
  /** 点击文字部分是否可以激活复选框，默认为 true */
  labelClickable?: boolean
}

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  defaultValue: () => [],
  disabled: false,
  direction: 'horizontal',
  labelClickable: true,
})

const emit = defineEmits<{
  (e: 'update:value', value: CheckboxValueType[]): void
  (e: 'change', checkedValues: CheckboxValueType[]): void
}>()

// 非受控模式下的内部状态
const internalValue = ref<CheckboxValueType[]>(props.defaultValue || [])

// 判断是否为受控模式
const isControlled = computed(() => props.value !== undefined)
const mergedValue = computed(() => 
  isControlled.value ? props.value! : internalValue.value
)

const classes = computed(() => [
  'apron-checkbox-group',
  `apron-checkbox-group--${props.direction}`,
  props.class,
].filter(Boolean).join(' '))

// 标准化选项
const normalizedOptions = computed(() => {
  if (!props.options) return []
  
  return props.options.map((option) => {
    if (typeof option === 'string' || typeof option === 'number') {
      return { label: String(option), value: option }
    }
    return option
  })
})

// 处理选项变化
const handleChange = (optionValue: CheckboxValueType, checked: boolean) => {
  let newValue: CheckboxValueType[]

  if (checked) {
    newValue = [...mergedValue.value, optionValue]
  } else {
    newValue = mergedValue.value.filter((v) => v !== optionValue)
  }

  if (!isControlled.value) {
    internalValue.value = newValue
  }
  
  emit('update:value', newValue)
  emit('change', newValue)
  props.onChange?.(newValue)
}

// 提供 context 给子组件使用
provide('checkboxGroup', {
  value: mergedValue,
  disabled: computed(() => props.disabled),
  labelClickable: computed(() => props.labelClickable),
  onChange: handleChange,
})
</script>

<style lang="less">
@import '../../styles/variables.less';

// ============================================
// Checkbox Group Styles
// ============================================
.apron-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: @spacing-4;

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
  }
}
</style>

