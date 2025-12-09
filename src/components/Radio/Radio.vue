<template>
  <label :class="classes" :for="radioId">
    <span class="apron-radio__input-wrapper">
      <input
        ref="inputRef"
        type="radio"
        :id="radioId"
        :name="name"
        class="apron-radio__input"
        :checked="isChecked"
        :disabled="disabled"
        :value="value"
        @change="handleChange"
        v-bind="$attrs"
      />
      <span class="apron-radio__circle">
        <span class="apron-radio__dot" />
      </span>
    </span>
    <span 
      v-if="$slots.default"
      class="apron-radio__label" 
      @click="handleLabelClick"
    >
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref, computed, useId } from 'vue'

export interface RadioProps {
  /** 是否选中 */
  checked?: boolean
  /** 默认是否选中（非受控） */
  defaultChecked?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 单选框的值 */
  value?: string | number
  /** 标签文本 */
  label?: string
  /** 点击文字部分是否可以激活单选框，默认为 false（仅圆圈可点击） */
  labelClickable?: boolean
  /** name 属性 */
  name?: string
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<RadioProps>(), {
  defaultChecked: false,
  disabled: false,
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
const radioId = `apron-radio-${autoId}`

// 非受控模式下的内部状态
const internalChecked = ref(props.defaultChecked)

// 判断是否为受控模式
const isControlled = computed(() => props.checked !== undefined)
const isChecked = computed(() => isControlled.value ? props.checked! : internalChecked.value)

const classes = computed(() => [
  'apron-radio',
  props.disabled && 'apron-radio--disabled',
  isChecked.value && 'apron-radio--checked',
  !props.labelClickable && 'apron-radio--label-not-clickable',
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
    
    // 如果不是链接，阻止 label 的默认行为（触发 radio）
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
// Radio CSS Variables (Light Mode)
// ============================================
:root {
  --apron-radio-size: 16px;
  --apron-radio-border-color: @color-neutral-400;
  --apron-radio-border-color-hover: @color-neutral-500;
  --apron-radio-border-color-checked: @color-primary-500;
  --apron-radio-bg: #ffffff;
  --apron-radio-dot-bg: @color-primary-500;
  --apron-radio-label-color: @color-primary-900;
  --apron-radio-disabled-opacity: 0.5;
  --apron-radio-disabled-bg: @color-neutral-100;
  --apron-radio-disabled-border: @color-neutral-300;
  --apron-radio-disabled-label: @color-neutral-500;
}

// ============================================
// Radio CSS Variables (Dark Mode)
// ============================================
.dark,
[data-prefers-color='dark'] {
  --apron-radio-border-color: @color-neutral-500;
  --apron-radio-border-color-hover: @color-neutral-400;
  --apron-radio-border-color-checked: @color-primary-400;
  --apron-radio-bg: @color-neutral-800;
  --apron-radio-dot-bg: @color-primary-400;
  --apron-radio-label-color: @color-neutral-100;
  --apron-radio-disabled-bg: @color-neutral-700;
  --apron-radio-disabled-border: @color-neutral-600;
  --apron-radio-disabled-label: @color-neutral-500;
}

// ============================================
// Radio Base Styles
// ============================================
.apron-radio {
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
    opacity: var(--apron-radio-disabled-opacity);

    .apron-radio__input-wrapper {
      cursor: not-allowed;
    }

    .apron-radio__label {
      color: var(--apron-radio-disabled-label);
      cursor: not-allowed;
    }
  }

  // ============================================
  // Label Not Clickable
  // ============================================
  &--label-not-clickable {
    .apron-radio__label {
      pointer-events: none;
    }
  }

  // ============================================
  // Input Wrapper
  // ============================================
  &__input-wrapper {
    position: relative;
    display: inline-block;
    width: var(--apron-radio-size);
    height: var(--apron-radio-size);
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
  // Circle
  // ============================================
  &__circle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--apron-radio-bg);
    border: 1px solid var(--apron-radio-border-color);
    border-radius: 50%;
    transition: all @transition-slow;
    display: flex;
    align-items: center;
    justify-content: center;

    .apron-radio:hover:not(.apron-radio--disabled) & {
      border-color: var(--apron-radio-border-color-hover);
    }

    .apron-radio--checked & {
      border-color: var(--apron-radio-border-color-checked);
    }
  }

  // ============================================
  // Dot
  // ============================================
  &__dot {
    width: 8px;
    height: 8px;
    background-color: var(--apron-radio-dot-bg);
    border-radius: 50%;
    opacity: 0;
    transform: scale(0.5);
    transition: all @transition-slow;

    .apron-radio--checked & {
      opacity: 1;
      transform: scale(1);
    }
  }

  // ============================================
  // Label
  // ============================================
  &__label {
    margin-left: @spacing-2;
    color: var(--apron-radio-label-color);
    font-size: @font-size-base;
    line-height: @line-height-normal;
    cursor: pointer;
    transition: all @transition-slow;
  }
}
</style>
