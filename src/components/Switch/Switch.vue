<template>
  <label
    :class="classNames"
    :for="switchId"
    :style="customStyle"
  >
    <input
      ref="inputRef"
      type="checkbox"
      role="switch"
      :id="switchId"
      class="apron-switch__input"
      :checked="isChecked"
      :disabled="disabled"
      @change="handleChange"
      :aria-checked="isChecked"
      v-bind="$attrs"
    />
    <span class="apron-switch__track">
      <span class="apron-switch__thumb" />
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref, computed, useId } from 'vue'
import type { SwitchProps } from './types'
import './Switch.less'

// 默认属性
const props = withDefaults(defineProps<SwitchProps & {
  modelValue?: boolean
}>(), {
  defaultChecked: false,
  disabled: false,
  size: 'default',
  variant: 'default',
  className: ''
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', checked: boolean): void
  (e: 'update:checked', checked: boolean): void
  (e: 'change', checked: boolean, event: Event): void
}>()

// 忽略原生属性透传（除了已定义的 props）
defineOptions({
  inheritAttrs: false,
})

// 获取输入引用
const inputRef = ref<HTMLInputElement | null>(null)

// 生成唯一ID
const autoId = useId()
const switchId = props.id || `apron-switch-${autoId}`

// 非受控模式下的内部状态
const internalChecked = ref(props.defaultChecked)

// 判断是否为受控模式（支持 v-model 和 v-model:checked）
const isControlled = computed(() => props.modelValue !== undefined || props.checked !== undefined)
const isChecked = computed(() => {
  if (props.modelValue !== undefined) {
    return props.modelValue
  }
  if (props.checked !== undefined) {
    return props.checked
  }
  return internalChecked.value
})

// 处理变化事件
const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (props.disabled) return

  // 非受控模式下更新内部状态
  if (!isControlled.value) {
    internalChecked.value = target.checked
  }

  // 触发事件（同时支持 v-model 和 v-model:checked）
  emit('update:modelValue', target.checked)
  emit('update:checked', target.checked)
  emit('change', target.checked, e)
}

// 计算类名
const classNames = computed(() => [
  'apron-switch',
  `apron-switch--${props.size}`,
  `apron-switch--${props.variant}`,
  props.disabled && 'apron-switch--disabled',
  isChecked.value && 'apron-switch--checked',
  props.className
].filter(Boolean).join(' '))

// 自定义颜色样式
const customStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.checkedColor && isChecked.value) {
    style['--apron-switch-checked-bg'] = props.checkedColor
  }
  if (props.uncheckedColor && !isChecked.value) {
    style['--apron-switch-unchecked-bg'] = props.uncheckedColor
  }
  return Object.keys(style).length > 0 ? style : undefined
})

// 暴露方法
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur()
})
</script>