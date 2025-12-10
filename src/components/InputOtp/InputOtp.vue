<template>
  <div :class="containerClasses" @click="handleContainerClick">
    <!-- 隐藏的实际输入框 -->
    <input
      ref="inputRef"
      :type="inputType"
      :inputmode="inputMode"
      :pattern="pattern"
      class="apron-input-otp__hidden-input"
      :value="inputValue"
      @input="handleChange"
      @keydown="handleKeyDown"
      @focus="handleFocus"
      @blur="handleBlur"
      :disabled="disabled"
      autocomplete="one-time-code"
      v-bind="inputAttrs"
    />
    <!-- 展示框 -->
    <div class="apron-input-otp__display">
      <template v-for="(slot, idx) in formatInfo.slots" :key="idx">
        <span v-if="slot.type === 'separator'" class="apron-input-otp__separator">
          {{ slot.char }}
        </span>
        <span
          v-else
          :class="[
            'apron-input-otp__slot',
            isActiveSlot(slot.index!) && 'apron-input-otp__slot--active',
            isFilledSlot(slot.index!) && 'apron-input-otp__slot--filled',
          ]"
        >
          {{ getCharAt(slot.index!) }}
          <span
            v-if="isActiveSlot(slot.index!) && !isFilledSlot(slot.index!)"
            class="apron-input-otp__cursor"
          />
        </span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, useAttrs } from 'vue'

export type InputOtpSize = 'default' | 'small'
export type InputOtpStatus = 'default' | 'success' | 'error'

export interface InputOtpProps {
  /** 格式：* 表示输入位，其他字符直接渲染，如 "****" 或 "***-***" */
  format?: string
  /** 尺寸 */
  size?: InputOtpSize
  /** 是否为正方形（以宽为准） */
  square?: boolean
  /** 输入类型，影响移动端键盘 */
  type?: 'number' | 'text'
  /** 当前值 */
  value?: string
  /** 默认值 */
  defaultValue?: string
  /** 状态：success 显示成功样式，error 显示错误样式 */
  status?: InputOtpStatus
  /** 值改变时的回调 */
  onChange?: (value: string) => void
  /** 输入完成时的回调（满足长度时自动触发） */
  onFinish?: (value: string) => void
  /** 输入完成时的回调（同 onFinish） */
  onComplete?: (value: string) => void
  /** error 状态下按退格键重置时的回调 */
  onStatusReset?: () => void
  /** 是否禁用 */
  disabled?: boolean
  /** 是否自动聚焦 */
  autoFocus?: boolean
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<InputOtpProps>(), {
  format: '******',
  size: 'default',
  square: false,
  type: 'number',
  defaultValue: '',
  status: 'default',
  disabled: false,
  autoFocus: false,
})

const emit = defineEmits<{
  (e: 'update:value', value: string): void
  (e: 'change', value: string): void
  (e: 'finish', value: string): void
  (e: 'complete', value: string): void
  (e: 'status-reset'): void
}>()

const attrs = useAttrs()
const inputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)
const internalValue = ref(props.defaultValue)

// 过滤掉不需要透传到 input 的属性
const inputAttrs = computed(() => {
  const { type, size, onChange, class: _, ...rest } = attrs
  return rest
})

// 暴露 ref 和常用方法
defineExpose({
  $el: inputRef,
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})

// 自动聚焦
onMounted(() => {
  if (props.autoFocus && inputRef.value) {
    inputRef.value.focus()
  }
})

const isControlled = computed(() => props.value !== undefined)
const inputValue = computed(() => (isControlled.value ? props.value || '' : internalValue.value || ''))

// 解析 format，获取输入位数量和结构
const formatInfo = computed(() => {
  const slots: Array<{ type: 'input' | 'separator'; char?: string; index?: number }> = []
  let inputIndex = 0

  for (const char of props.format) {
    if (char === '*') {
      slots.push({ type: 'input', index: inputIndex })
      inputIndex++
    } else {
      slots.push({ type: 'separator', char })
    }
  }

  return {
    slots,
    inputCount: inputIndex,
  }
})

// 计算输入类型相关属性
const inputType = computed(() => (props.type === 'number' ? 'tel' : 'text'))
const inputMode = computed(() => (props.type === 'number' ? 'numeric' : 'text'))
const pattern = computed(() => (props.type === 'number' ? '[0-9]*' : undefined))

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  let newValue = target.value

  // 如果是数字类型，只允许数字
  if (props.type === 'number') {
    newValue = newValue.replace(/\D/g, '')
  }

  // 限制长度
  newValue = newValue.slice(0, formatInfo.value.inputCount)

  if (!isControlled.value) {
    internalValue.value = newValue
  }
  
  // 触发事件
  emit('update:value', newValue)
  emit('change', newValue)
  props.onChange?.(newValue)

  // 检查是否输入完成
  if (newValue.length === formatInfo.value.inputCount) {
    emit('finish', newValue)
    emit('complete', newValue)
    props.onFinish?.(newValue)
    props.onComplete?.(newValue)
  }
}

// 处理键盘事件（error 状态下按退格键清空所有内容）
const handleKeyDown = (e: KeyboardEvent) => {
  if (props.status === 'error' && e.key === 'Backspace') {
    e.preventDefault()
    // 清空所有内容
    const newValue = ''
    if (!isControlled.value) {
      internalValue.value = newValue
    }
    emit('update:value', newValue)
    emit('change', newValue)
    props.onChange?.(newValue)
    // 通知外部重置状态
    emit('status-reset')
    props.onStatusReset?.()
  }
}

const handleFocus = () => {
  isFocused.value = true
}

const handleBlur = () => {
  isFocused.value = false
}

const handleContainerClick = () => {
  if (!props.disabled && inputRef.value) {
    inputRef.value.focus()
  }
}

// 获取当前光标应该在哪个位置
const cursorIndex = computed(() => Math.min(inputValue.value.length, formatInfo.value.inputCount - 1))

// 判断是否为活动槽位
const isActiveSlot = (index: number) => {
  return isFocused.value && index === cursorIndex.value
}

// 判断是否为已填充槽位
const isFilledSlot = (index: number) => {
  return !!inputValue.value[index]
}

// 获取指定位置的字符
const getCharAt = (index: number) => {
  return inputValue.value[index] || ''
}

const containerClasses = computed(() => [
  'apron-input-otp',
  `apron-input-otp--${props.size}`,
  props.square && 'apron-input-otp--square',
  isFocused.value && 'apron-input-otp--focused',
  props.disabled && 'apron-input-otp--disabled',
  props.status !== 'default' && `apron-input-otp--${props.status}`,
  props.class,
].filter(Boolean).join(' '))
</script>

<style lang="less">
@import './InputOtp.less';
</style>
