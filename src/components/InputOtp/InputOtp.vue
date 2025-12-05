<script setup lang="ts">
import { ref, computed, watch, nextTick, useAttrs } from 'vue'

export interface InputOtpProps {
  modelValue?: string
  length?: number
  disabled?: boolean
  password?: boolean
}

const props = withDefaults(defineProps<InputOtpProps>(), {
  modelValue: '',
  length: 6,
  disabled: false,
  password: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'complete', value: string): void
}>()

const attrs = useAttrs()
const inputRefs = ref<(HTMLInputElement | null)[]>([])
const values = ref<string[]>(Array(props.length).fill(''))

watch(() => props.modelValue, (val) => {
  const chars = (val || '').split('').slice(0, props.length)
  values.value = [...chars, ...Array(props.length - chars.length).fill('')]
}, { immediate: true })

const inputClasses = computed(() => [
  'apron-input-otp',
  {
    'apron-input-otp--disabled': props.disabled
  }
])

const focusInput = (index: number) => {
  nextTick(() => {
    inputRefs.value[index]?.focus()
  })
}

const handleInput = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement
  const value = target.value.slice(-1)
  
  values.value[index] = value
  
  const newValue = values.value.join('')
  emit('update:modelValue', newValue)
  emit('change', newValue)
  
  if (value && index < props.length - 1) {
    focusInput(index + 1)
  }
  
  if (newValue.length === props.length && !values.value.includes('')) {
    emit('complete', newValue)
  }
}

const handleKeydown = (event: KeyboardEvent, index: number) => {
  if (event.key === 'Backspace') {
    if (!values.value[index] && index > 0) {
      focusInput(index - 1)
    }
  } else if (event.key === 'ArrowLeft' && index > 0) {
    focusInput(index - 1)
  } else if (event.key === 'ArrowRight' && index < props.length - 1) {
    focusInput(index + 1)
  }
}

const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault()
  const pasteData = event.clipboardData?.getData('text') || ''
  const chars = pasteData.replace(/\D/g, '').split('').slice(0, props.length)
  
  chars.forEach((char, i) => {
    values.value[i] = char
  })
  
  const newValue = values.value.join('')
  emit('update:modelValue', newValue)
  emit('change', newValue)
  
  const nextIndex = Math.min(chars.length, props.length - 1)
  focusInput(nextIndex)
  
  if (newValue.length === props.length && !values.value.includes('')) {
    emit('complete', newValue)
  }
}

const setInputRef = (el: HTMLInputElement | null, index: number) => {
  inputRefs.value[index] = el
}
</script>

<template>
  <div :class="inputClasses" v-bind="attrs">
    <input
      v-for="(_, index) in length"
      :key="index"
      :ref="(el) => setInputRef(el as HTMLInputElement | null, index)"
      :type="password ? 'password' : 'text'"
      :value="values[index]"
      :disabled="disabled"
      class="apron-input-otp__input"
      maxlength="1"
      inputmode="numeric"
      autocomplete="one-time-code"
      @input="handleInput($event, index)"
      @keydown="handleKeydown($event, index)"
      @paste="handlePaste"
    />
  </div>
</template>

<style lang="less">
@import './InputOtp.less';
</style>

