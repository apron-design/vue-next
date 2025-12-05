<script setup lang="ts">
import { ref, computed, watch, useAttrs } from 'vue'

export interface TextareaProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  rows?: number
  clearable?: boolean
  max?: number
}

const props = withDefaults(defineProps<TextareaProps>(), {
  disabled: false,
  rows: 3,
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
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const isFocused = ref(false)

const internalValue = ref(props.modelValue ?? '')

watch(() => props.modelValue, (val) => {
  internalValue.value = val ?? ''
})

const showClear = computed(() => {
  return props.clearable && internalValue.value && !props.disabled
})

const charCount = computed(() => internalValue.value.length)

const containerClasses = computed(() => [
  'apron-textarea',
  {
    'apron-textarea--focused': isFocused.value,
    'apron-textarea--disabled': props.disabled,
    'apron-textarea--with-count': props.max !== undefined
  }
])

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  internalValue.value = target.value
  emit('update:modelValue', target.value)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
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
  textareaRef.value?.focus()
}

// Expose methods
defineExpose({
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur(),
  select: () => textareaRef.value?.select()
})
</script>

<template>
  <div :class="containerClasses">
    <textarea
      ref="textareaRef"
      :value="internalValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :maxlength="max"
      class="apron-textarea__inner"
      v-bind="attrs"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <div v-if="showClear || max !== undefined" class="apron-textarea__footer">
      <button
        v-if="showClear"
        type="button"
        class="apron-textarea__clear"
        @click="handleClear"
        tabindex="-1"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </button>
      <span v-if="max !== undefined" class="apron-textarea__count">
        {{ charCount }} / {{ max }}
      </span>
    </div>
  </div>
</template>

<style lang="less">
@import './Input.less';
</style>

