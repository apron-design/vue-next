<script setup lang="ts">
import { ref, computed, watch, useAttrs } from 'vue'

export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'

export interface InputProps {
  modelValue?: string
  type?: InputType
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  prepend?: string
  append?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  clearable: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
}>()

const attrs = useAttrs()
const inputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)
const isPasswordVisible = ref(false)

const internalValue = ref(props.modelValue ?? '')

watch(() => props.modelValue, (val) => {
  internalValue.value = val ?? ''
})

const inputType = computed(() => {
  if (props.type === 'password') {
    return isPasswordVisible.value ? 'text' : 'password'
  }
  return props.type
})

const showClear = computed(() => {
  return props.clearable && internalValue.value && !props.disabled
})

const showPasswordToggle = computed(() => {
  return props.type === 'password' && internalValue.value
})

const containerClasses = computed(() => [
  'apron-input',
  {
    'apron-input--focused': isFocused.value,
    'apron-input--disabled': props.disabled,
    'apron-input--with-prepend': props.prepend,
    'apron-input--with-append': props.append
  }
])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  internalValue.value = target.value
  emit('update:modelValue', target.value)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleClear = () => {
  internalValue.value = ''
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

const togglePassword = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

// Expose methods
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select()
})
</script>

<template>
  <div :class="containerClasses">
    <span v-if="prepend" class="apron-input__prepend">
      {{ prepend }}
    </span>
    <div class="apron-input__wrapper">
      <input
        ref="inputRef"
        :type="inputType"
        :value="internalValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="apron-input__inner"
        v-bind="attrs"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span v-if="showClear || showPasswordToggle" class="apron-input__suffix">
        <button
          v-if="showClear"
          type="button"
          class="apron-input__clear"
          @click="handleClear"
          tabindex="-1"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </button>
        <button
          v-if="showPasswordToggle"
          type="button"
          class="apron-input__password-toggle"
          @click="togglePassword"
          tabindex="-1"
        >
          <svg v-if="isPasswordVisible" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        </button>
      </span>
    </div>
    <span v-if="append" class="apron-input__append">
      {{ append }}
    </span>
  </div>
</template>

<style lang="less">
@import './Input.less';
</style>

