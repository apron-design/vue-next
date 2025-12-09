<template>
  <label 
    :class="classes"
    :for="checkboxId"
  >
    <span class="apron-checkbox__input-wrapper">
      <input
        ref="inputRef"
        type="checkbox"
        :id="checkboxId"
        class="apron-checkbox__input"
        :checked="isChecked"
        :disabled="disabled"
        :value="value"
        @change="handleChange"
        v-bind="$attrs"
      />
      <span class="apron-checkbox__box">
        <svg
          v-if="indeterminate"
          class="apron-checkbox__icon apron-checkbox__icon--indeterminate"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="6"
            y1="12"
            x2="18"
            y2="12"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
        <svg
          v-else
          class="apron-checkbox__icon apron-checkbox__icon--check"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12.5L10 17.5L19 6.5"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </span>
    <span 
      v-if="$slots.default"
      class="apron-checkbox__label" 
      @click="handleLabelClick"
    >
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref, computed, useId, useAttrs } from 'vue'

export interface CheckboxProps {
  /** 是否选中 */
  checked?: boolean
  /** 默认是否选中（非受控） */
  defaultChecked?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 是否为半选状态 */
  indeterminate?: boolean
  /** 复选框的值 */
  value?: string | number
  /** 标签文本 */
  label?: string
  /** 点击文字部分是否可以激活复选框，默认为 false（仅方框可点击） */
  labelClickable?: boolean
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  defaultChecked: false,
  disabled: false,
  indeterminate: false,
  labelClickable: false,
})

const emit = defineEmits<{
  (e: 'update:checked', checked: boolean): void
  (e: 'change', checked: boolean, event: Event): void
}>()

// 忽略原生属性透传
defineOptions({
  inheritAttrs: false,
})

const inputRef = ref<HTMLInputElement | null>(null)
const autoId = useId()
const checkboxId = `apron-checkbox-${autoId}`

// 非受控模式下的内部状态
const internalChecked = ref(props.defaultChecked)

// 判断是否为受控模式
const isControlled = computed(() => props.checked !== undefined)
const isChecked = computed(() => isControlled.value ? props.checked! : internalChecked.value)

const classes = computed(() => [
  'apron-checkbox',
  props.disabled && 'apron-checkbox--disabled',
  isChecked.value && 'apron-checkbox--checked',
  props.indeterminate && 'apron-checkbox--indeterminate',
  !props.labelClickable && 'apron-checkbox--label-not-clickable',
  props.class,
].filter(Boolean).join(' '))

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  
  if (props.disabled) return
  
  // 非受控模式下更新内部状态
  if (!isControlled.value) {
    internalChecked.value = target.checked
  }
  
  emit('update:checked', target.checked)
  emit('change', target.checked, e)
}

// 阻止 label 点击事件（当 labelClickable 为 false 时）
// 但如果点击的是链接，则允许链接正常跳转
const handleLabelClick = (e: MouseEvent) => {
  if (!props.labelClickable) {
    // 检查点击目标是否是链接或链接的子元素
    const target = e.target as HTMLElement
    const isLink = target.tagName === 'A' || target.closest('a')
    
    // 如果不是链接，阻止 label 的默认行为（触发 checkbox）
    if (!isLink) {
      e.preventDefault()
    }
    // 如果是链接，让链接正常工作，同时阻止冒泡到 label
    else {
      e.stopPropagation()
    }
  }
}

// 暴露方法给父组件
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  checked: isChecked,
})
</script>

<style lang="less">
@import '../../styles/variables.less';

// ============================================
// Checkbox CSS Variables (Light Mode)
// ============================================
:root {
  --apron-checkbox-size: 16px;
  --apron-checkbox-border-color: @color-neutral-400;
  --apron-checkbox-border-color-hover: @color-neutral-500;
  --apron-checkbox-border-color-checked: @color-primary-500;
  --apron-checkbox-bg: #ffffff;
  --apron-checkbox-bg-checked: @color-primary-500;
  --apron-checkbox-icon-color: #ffffff;
  --apron-checkbox-label-color: @color-primary-900;
  --apron-checkbox-disabled-opacity: 0.5;
  --apron-checkbox-disabled-bg: @color-neutral-100;
  --apron-checkbox-disabled-border: @color-neutral-300;
  --apron-checkbox-disabled-label: @color-neutral-500;
}

// ============================================
// Checkbox CSS Variables (Dark Mode)
// ============================================
.dark,
[data-prefers-color='dark'] {
  --apron-checkbox-border-color: @color-neutral-500;
  --apron-checkbox-border-color-hover: @color-neutral-400;
  --apron-checkbox-border-color-checked: @color-primary-400;
  --apron-checkbox-bg: @color-neutral-800;
  --apron-checkbox-bg-checked: @color-primary-400;
  --apron-checkbox-label-color: @color-neutral-100;
  --apron-checkbox-disabled-bg: @color-neutral-700;
  --apron-checkbox-disabled-border: @color-neutral-600;
  --apron-checkbox-disabled-label: @color-neutral-500;
}

// ============================================
// Checkbox Base Styles
// ============================================
.apron-checkbox {
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  font-family: var(--apron-font-family);
  cursor: pointer;
  transition: all @transition-slow;

  // ============================================
  // Disabled State
  // ============================================
  &--disabled {
    cursor: not-allowed;
    opacity: var(--apron-checkbox-disabled-opacity);

    .apron-checkbox__input-wrapper {
      cursor: not-allowed;
    }

    .apron-checkbox__label {
      color: var(--apron-checkbox-disabled-label);
      cursor: not-allowed;
    }
  }

  // ============================================
  // Label Not Clickable
  // ============================================
  &--label-not-clickable {
    .apron-checkbox__label {
      pointer-events: none;
    }
  }

  // ============================================
  // Input Wrapper
  // ============================================
  &__input-wrapper {
    position: relative;
    display: inline-block;
    width: var(--apron-checkbox-size);
    height: var(--apron-checkbox-size);
    flex-shrink: 0;
    margin-top: 2px;
    cursor: pointer;
  }

  // ============================================
  // Input (Hidden)
  // ============================================
  &__input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: inherit;
  }

  // ============================================
  // Box
  // ============================================
  &__box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--apron-checkbox-bg);
    border: 1px solid var(--apron-checkbox-border-color);
    border-radius: @radius-sm;
    transition: all @transition-slow;
    display: flex;
    align-items: center;
    justify-content: center;

    .apron-checkbox:hover:not(.apron-checkbox--disabled) & {
      border-color: var(--apron-checkbox-border-color-hover);
    }

    .apron-checkbox--checked &,
    .apron-checkbox--indeterminate & {
      background-color: var(--apron-checkbox-bg-checked);
      border-color: var(--apron-checkbox-border-color-checked);
    }
  }

  // ============================================
  // Icons
  // ============================================
  &__icon {
    width: 12px;
    height: 12px;
    color: var(--apron-checkbox-icon-color);
    opacity: 0;
    transform: scale(0.5);
    transition: all @transition-slow;

    .apron-checkbox--checked &,
    .apron-checkbox--indeterminate & {
      opacity: 1;
      transform: scale(1);
    }

    &--check {
      stroke-width: 3;
    }

    &--indeterminate {
      stroke-width: 3;
    }
  }

  // ============================================
  // Label
  // ============================================
  &__label {
    margin-left: @spacing-2;
    color: var(--apron-checkbox-label-color);
    font-size: @font-size-base;
    line-height: @line-height-normal;
    cursor: pointer;
    transition: all @transition-slow;
  }
}
</style>
