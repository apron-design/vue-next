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
import { ref, computed, useId } from 'vue'

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
@import '../../styles/mixins.less';

// ============================================
// Checkbox CSS Variables (Light Mode)
// ============================================
:root {
  // Unchecked state
  --apron-checkbox-bg: #ffffff;
  --apron-checkbox-border: @color-neutral-300;
  --apron-checkbox-border-hover: @color-neutral-400;

  // Checked state
  --apron-checkbox-checked-bg: @color-success-500;
  --apron-checkbox-checked-border: @color-success-500;
  --apron-checkbox-checked-icon: #ffffff;

  // Indeterminate state
  --apron-checkbox-indeterminate-bg: @color-success-500;
  --apron-checkbox-indeterminate-border: @color-success-500;
  --apron-checkbox-indeterminate-icon: #ffffff;

  // Disabled state
  --apron-checkbox-disabled-bg: @color-neutral-100;
  --apron-checkbox-disabled-border: @color-neutral-200;
  --apron-checkbox-disabled-checked-bg: @color-neutral-200;
  --apron-checkbox-disabled-icon: @color-neutral-400;
  --apron-checkbox-disabled-text: @color-neutral-400;

  // Label
  --apron-checkbox-label-color: @color-primary-500;
}

// ============================================
// Checkbox CSS Variables (Dark Mode)
// ============================================
.dark,
[data-prefers-color='dark'] {
  // Unchecked state
  --apron-checkbox-bg: @color-neutral-800;
  --apron-checkbox-border: @color-neutral-600;
  --apron-checkbox-border-hover: @color-neutral-500;

  // Checked state
  --apron-checkbox-checked-bg: @color-success-500;
  --apron-checkbox-checked-border: @color-success-500;
  --apron-checkbox-checked-icon: #ffffff;

  // Indeterminate state
  --apron-checkbox-indeterminate-bg: @color-success-500;
  --apron-checkbox-indeterminate-border: @color-success-500;
  --apron-checkbox-indeterminate-icon: #ffffff;

  // Disabled state
  --apron-checkbox-disabled-bg: @color-neutral-800;
  --apron-checkbox-disabled-border: @color-neutral-700;
  --apron-checkbox-disabled-checked-bg: @color-neutral-700;
  --apron-checkbox-disabled-icon: @color-neutral-600;
  --apron-checkbox-disabled-text: @color-neutral-600;

  // Label
  --apron-checkbox-label-color: @color-primary-200;
}

// ============================================
// Checkbox Base Styles
// ============================================
.apron-checkbox {
  display: inline-flex;
  align-items: flex-start;
  cursor: pointer;
  user-select: none;
  font-family: var(--apron-font-family);
  font-size: @font-size-base;

  // Input wrapper
  &__input-wrapper {
    position: relative;
    flex-shrink: 0;
    width: 25px;
    height: 25px;
  }

  // Hidden native input
  &__input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    margin: 0;
    padding: 0;
    cursor: inherit;
    z-index: 1;
  }

  // Custom checkbox box
  &__box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    background-color: var(--apron-checkbox-bg);
    border: 1.5px solid var(--apron-checkbox-border);
    border-radius: @radius-md;
    transition: all @transition-fast;
  }

  // Checkmark / Indeterminate icon
  &__icon {
    width: 20px;
    height: 20px;
    color: var(--apron-checkbox-checked-icon);
    opacity: 0;
    transform: scale(0.5);
    transition: all @transition-fast;

    &--check,
    &--indeterminate {
      position: absolute;
    }
  }

  // Label text
  &__label {
    margin-left: 10px;
    line-height: 25px;
    color: var(--apron-checkbox-label-color);
  }

  // Label not clickable
  &--label-not-clickable {
    .apron-checkbox__label {
      cursor: default;
    }
  }

  // Hover state (only for unchecked state)
  &:hover:not(.apron-checkbox--disabled):not(.apron-checkbox--checked):not(.apron-checkbox--indeterminate) {
    .apron-checkbox__box {
      border-color: var(--apron-checkbox-border-hover);
    }
  }

  // Focus state
  &__input:focus-visible + .apron-checkbox__box {
    .focus-ring();
  }

  // ============================================
  // Checked State
  // ============================================
  &--checked:not(.apron-checkbox--indeterminate) {
    .apron-checkbox__box {
      background-color: var(--apron-checkbox-checked-bg);
      border-color: var(--apron-checkbox-checked-border);
    }

    .apron-checkbox__icon--check {
      opacity: 1;
      transform: scale(1);
    }
  }

  // ============================================
  // Indeterminate State
  // ============================================
  &--indeterminate {
    .apron-checkbox__box {
      background-color: var(--apron-checkbox-indeterminate-bg);
      border-color: var(--apron-checkbox-indeterminate-border);
    }

    .apron-checkbox__icon--indeterminate {
      opacity: 1;
      transform: scale(1);
    }
  }

  // ============================================
  // Disabled State
  // ============================================
  &--disabled {
    cursor: not-allowed;

    .apron-checkbox__box {
      background-color: var(--apron-checkbox-disabled-bg);
      border-color: var(--apron-checkbox-disabled-border);
    }

    .apron-checkbox__label {
      color: var(--apron-checkbox-disabled-text);
    }

    // Disabled + Checked
    &.apron-checkbox--checked:not(.apron-checkbox--indeterminate) {
      .apron-checkbox__box {
        background-color: var(--apron-checkbox-disabled-checked-bg);
        border-color: var(--apron-checkbox-disabled-border);
      }

      .apron-checkbox__icon {
        color: var(--apron-checkbox-disabled-icon);
      }
    }

    // Disabled + Indeterminate
    &.apron-checkbox--indeterminate {
      .apron-checkbox__box {
        background-color: var(--apron-checkbox-disabled-checked-bg);
        border-color: var(--apron-checkbox-disabled-border);
      }

      .apron-checkbox__icon {
        color: var(--apron-checkbox-disabled-icon);
      }
    }
  }
}
</style>
