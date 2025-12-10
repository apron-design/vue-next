<template>
  <div :class="classes">
    <div class="apron-textarea__wrapper">
      <textarea
        ref="textareaRef"
        class="apron-textarea__inner"
        :rows="rows"
        :value="textareaValue"
        :disabled="disabled"
        :maxlength="max"
        @input="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        v-bind="$attrs"
      />
    </div>
    <div v-if="showFooter" class="apron-textarea__footer">
      <span v-if="max !== undefined" class="apron-textarea__count">
        {{ currentLength }}/{{ max }}
      </span>
      <button
        v-if="showClear"
        type="button"
        class="apron-textarea__clear-btn"
        @click="handleClear"
        tabindex="-1"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 18.75C5.175 18.75 1.25 14.825 1.25 10C1.25 5.175 5.175 1.25 10 1.25C14.825 1.25 18.75 5.175 18.75 10C18.75 14.825 14.825 18.75 10 18.75ZM10 2.50562C5.8675 2.50562 2.50562 5.8675 2.50562 10C2.50562 14.1319 5.8675 17.4944 10 17.4944C14.1319 17.4944 17.4944 14.1319 17.4944 10C17.4944 5.8675 14.1319 2.50562 10 2.50562Z" fill="currentColor"/>
          <path d="M10.8799 10.0269L13.5824 7.35376C13.828 7.11126 13.8299 6.71563 13.5874 6.47001C13.3449 6.22438 12.9486 6.22251 12.7036 6.46501L9.99739 9.14125L7.33238 6.46813C7.08801 6.22376 6.69301 6.22251 6.44863 6.46688C6.20426 6.71063 6.20363 7.10626 6.44738 7.35063L9.10864 10.02L6.42551 12.6744C6.17988 12.9175 6.17801 13.3125 6.42051 13.5581C6.54301 13.6819 6.70363 13.7437 6.86488 13.7437C7.02363 13.7437 7.18238 13.6831 7.30426 13.5631L9.99114 10.9056L12.6999 13.6231C12.8218 13.7456 12.9818 13.8069 13.1424 13.8069C13.3024 13.8069 13.4618 13.7456 13.5836 13.6244C13.828 13.3806 13.8286 12.9856 13.5849 12.7406L10.8799 10.0269Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useTemplateRef } from 'vue'

export interface TextareaProps {
  /** 默认行数 */
  rows?: number
  /** 是否显示清除按钮 */
  clearable?: boolean
  /** 清除时的回调 */
  onClear?: () => void
  /** 是否禁用 */
  disabled?: boolean
  /** 最大字数限制，设置后显示字数计数 */
  max?: number
  /** 当前值 */
  value?: string
  /** 默认值 */
  defaultValue?: string
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<TextareaProps>(), {
  rows: 3,
  clearable: false,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:value', value: string): void
  (e: 'change', event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
}>()

// 忽略原生属性透传
defineOptions({
  inheritAttrs: false,
})

const textareaRef = useTemplateRef<HTMLTextAreaElement>('textarea')
const isFocused = ref(false)
const internalValue = ref(props.defaultValue ?? '')

const isControlled = computed(() => props.value !== undefined)
const textareaValue = computed(() => isControlled.value ? props.value! : internalValue.value)
const hasValue = computed(() => String(textareaValue.value).length > 0)
const isActive = computed(() => isFocused.value || hasValue.value)
const currentLength = computed(() => String(textareaValue.value).length)

const classes = computed(() => [
  'apron-textarea',
  isActive.value && 'apron-textarea--active',
  props.disabled && 'apron-textarea--disabled',
  props.class,
].filter(Boolean).join(' '))

const showClear = computed(() => props.clearable && hasValue.value && !props.disabled)
const showFooter = computed(() => showClear.value || props.max !== undefined)

const handleChange = (e: Event) => {
  const target = e.target as HTMLTextAreaElement
  
  if (!isControlled.value) {
    internalValue.value = target.value
  }
  
  emit('update:value', target.value)
  emit('change', e)
}

const handleFocus = (e: FocusEvent) => {
  isFocused.value = true
  emit('focus', e)
}

const handleBlur = (e: FocusEvent) => {
  isFocused.value = false
  emit('blur', e)
}

const handleClear = () => {
  if (!isControlled.value) {
    internalValue.value = ''
  }
  
  // 触发原生 input 事件
  if (textareaRef.value) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      'value'
    )?.set
    nativeInputValueSetter?.call(textareaRef.value, '')
    const event = new Event('input', { bubbles: true })
    textareaRef.value.dispatchEvent(event)
  }
  
  emit('update:value', '')
  emit('clear')
  textareaRef.value?.focus()
}

defineExpose({
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur(),
})
</script>

<style lang="less">
@import '../../styles/variables.less';
@import '../../styles/mixins.less';

// ============================================
// Textarea Base Styles
// ============================================
.apron-textarea {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--apron-input-bg);
  border: 1px solid var(--apron-input-border);
  border-radius: 20px;
  font-family: var(--apron-font-family);
  font-size: @font-size-base;
  transition: all @transition-fast;
  position: relative;

  // Wrapper (滚动容器，滚动条占满高度)
  &__wrapper {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 20px 20px 0 0;

    // 当没有 footer 时，底部也有圆角
    &:last-child {
      border-radius: 20px;
    }
  }

  // Native textarea
  &__inner {
    display: block;
    width: 100%;
    min-height: calc(@line-height-normal * 3em + @spacing-3 * 2);
    padding: @spacing-3 @spacing-4;
    border: none;
    background: transparent;
    color: var(--apron-input-text);
    font-family: inherit;
    font-size: inherit;
    line-height: @line-height-normal;
    outline: none;
    resize: none;
    overflow: hidden;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;

    &::placeholder {
      color: var(--apron-input-placeholder);
    }
  }

  // Footer (计数 + 清除按钮)
  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: @spacing-2;
    padding: @spacing-2 @spacing-3;
    flex-shrink: 0;
  }

  // Count
  &__count {
    font-size: @font-size-sm;
    color: var(--apron-input-icon-color);
  }

  // Clear button
  &__clear-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--apron-input-icon-color);
    cursor: pointer;
    border-radius: @radius-full;
    transition: all @transition-fast;

    &:hover {
      color: var(--apron-input-icon-hover-color);
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }

  // Active state
  &--active {
    background-color: var(--apron-input-active-bg);
    border-color: var(--apron-input-active-border);

    .apron-textarea__inner {
      color: var(--apron-input-active-text);
    }

    .apron-textarea__count {
      color: var(--apron-input-active-text);
    }
  }

  // Disabled state
  &--disabled {
    background-color: var(--apron-input-disabled-bg);
    border-color: var(--apron-input-disabled-border);
    cursor: not-allowed;

    .apron-textarea__inner {
      color: var(--apron-input-disabled-text);
      cursor: not-allowed;

      &::placeholder {
        color: var(--apron-input-disabled-text);
      }
    }

    .apron-textarea__count {
      color: var(--apron-input-disabled-text);
    }
  }
}
</style>

