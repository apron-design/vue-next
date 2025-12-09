<template>
  <div :class="classes" ref="containerRef" v-bind="$attrs">
    <div 
      class="apron-cascader__input"
      :class="{ 
        'apron-cascader__input--active': isActive,
        'apron-cascader__input--disabled': disabled,
        'apron-cascader__input--loading': loading
      }"
      @click="toggleDropdown"
    >
      <span v-if="displayValue" class="apron-cascader__value">{{ displayValue }}</span>
      <span v-else class="apron-cascader__placeholder">{{ placeholder }}</span>
      
      <span class="apron-cascader__suffix">
        <svg
          v-if="loading"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="apron-cascader__loading-icon"
        >
          <path d="M10 2V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          <path d="M10 15V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.3" />
          <path d="M4.34 4.34L6.46 6.46" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.9" />
          <path d="M13.54 13.54L15.66 15.66" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4" />
          <path d="M2 10H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.8" />
          <path d="M15 10H18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5" />
          <path d="M4.34 15.66L6.46 13.54" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.7" />
          <path d="M13.54 6.46L15.66 4.34" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.6" />
        </svg>
        
        <svg
          v-else
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          :class="['apron-cascader__arrow', { 'apron-cascader__arrow--open': isOpen }]"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </div>
    
    <!-- Dropdown (简化版) -->
    <div 
      v-if="isOpen" 
      class="apron-cascader__dropdown"
      :class="{ 'apron-cascader__dropdown--inflow': inflow }"
    >
      <div class="apron-cascader__columns">
        <div class="apron-cascader__column">
          <div 
            v-for="option in options" 
            :key="option.value"
            class="apron-cascader__option"
            :class="{ 
              'apron-cascader__option--selected': isSelected(option),
              'apron-cascader__option--disabled': option.disabled
            }"
            @click="handleOptionClick(option)"
          >
            {{ option.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

export type CascaderValueType = (string | number)[]
export interface CascaderOption {
  label: string
  value: string | number
  disabled?: boolean
  children?: CascaderOption[]
}

export interface CascaderProps {
  /** 当前选中的值路径 */
  value?: CascaderValueType
  /** 默认选中的值路径（非受控） */
  defaultValue?: CascaderValueType
  /** 选项列表 */
  options?: CascaderOption[]
  /** 占位文本 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 是否使用 inflow 模式（撑开容器） */
  inflow?: boolean
  /** 值分隔符，用于显示 */
  separator?: string
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<CascaderProps>(), {
  options: () => [],
  placeholder: '请选择',
  separator: ' / ',
})

const emit = defineEmits<{
  (e: 'update:value', value: CascaderValueType): void
  (e: 'change', value: CascaderValueType, selectedOptions: CascaderOption[]): void
}>()

const containerRef = ref<HTMLDivElement | null>(null)
const isOpen = ref(false)
const internalValue = ref<CascaderValueType>(props.defaultValue || [])
const expandedPath = ref<CascaderValueType>([])

// 判断是否为受控模式
const isControlled = computed(() => props.value !== undefined)
const currentValue = computed(() => isControlled.value ? props.value! : internalValue.value)

const classes = computed(() => [
  'apron-cascader',
  props.class,
].filter(Boolean).join(' '))

// 获取选中的选项
const selectedOptions = computed(() => {
  const result: CascaderOption[] = []
  let currentOptions = props.options || []
  
  for (const val of currentValue.value) {
    const found = currentOptions.find((opt) => opt.value === val)
    if (found) {
      result.push(found)
      currentOptions = found.children || []
    } else {
      break
    }
  }
  
  return result
})

// 获取显示的值
const displayValue = computed(() => {
  if (selectedOptions.value.length === 0) return ''
  return selectedOptions.value.map((opt) => opt.label).join(props.separator)
})

const isActive = computed(() => isOpen.value || currentValue.value.length > 0)

const toggleDropdown = () => {
  if (props.disabled || props.loading) return
  isOpen.value = !isOpen.value
}

const isSelected = (option: CascaderOption) => {
  return currentValue.value.includes(option.value)
}

const handleOptionClick = (option: CascaderOption) => {
  if (option.disabled) return
  
  const newValue = [...currentValue.value, option.value]
  
  if (!isControlled.value) {
    internalValue.value = newValue
  }
  
  emit('update:value', newValue)
  emit('change', newValue, [...selectedOptions.value, option])
  
  // 如果是叶子节点，则关闭下拉框
  if (!option.children || option.children.length === 0) {
    isOpen.value = false
  }
}

// 点击外部关闭
const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

watch(isOpen, (newVal) => {
  if (newVal) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

// 清理事件监听器
defineExpose({
  close: () => {
    isOpen.value = false
  }
})
</script>

<style lang="less">
@import '../../styles/variables.less';

// ============================================
// Cascader CSS Variables (Light Mode)
// ============================================
:root {
  --apron-cascader-bg: #ffffff;
  --apron-cascader-border-color: @color-neutral-300;
  --apron-cascader-border-color-hover: @color-neutral-400;
  --apron-cascader-border-color-focus: @color-primary-500;
  --apron-cascader-placeholder-color: @color-neutral-500;
  --apron-cascader-text-color: @color-primary-900;
  --apron-cascader-disabled-bg: @color-neutral-100;
  --apron-cascader-disabled-color: @color-neutral-400;
  --apron-cascader-dropdown-bg: #ffffff;
  --apron-cascader-option-hover-bg: @color-neutral-100;
  --apron-cascader-option-selected-bg: @color-primary-50;
  --apron-cascader-option-selected-color: @color-primary-500;
  --apron-cascader-option-disabled-color: @color-neutral-400;
}

// ============================================
// Cascader CSS Variables (Dark Mode)
// ============================================
.dark,
[data-prefers-color='dark'] {
  --apron-cascader-bg: @color-neutral-800;
  --apron-cascader-border-color: @color-neutral-600;
  --apron-cascader-border-color-hover: @color-neutral-500;
  --apron-cascader-border-color-focus: @color-primary-400;
  --apron-cascader-placeholder-color: @color-neutral-400;
  --apron-cascader-text-color: @color-neutral-100;
  --apron-cascader-disabled-bg: @color-neutral-700;
  --apron-cascader-disabled-color: @color-neutral-500;
  --apron-cascader-dropdown-bg: @color-neutral-800;
  --apron-cascader-option-hover-bg: @color-neutral-700;
  --apron-cascader-option-selected-bg: @color-primary-900;
  --apron-cascader-option-selected-color: @color-primary-300;
  --apron-cascader-option-disabled-color: @color-neutral-500;
}

// ============================================
// Cascader Base Styles
// ============================================
.apron-cascader {
  position: relative;
  display: inline-block;
  width: 100%;
  font-family: var(--apron-font-family);
  transition: all @transition-slow;

  // ============================================
  // Input
  // ============================================
  &__input {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 40px;
    padding: 0 @spacing-4;
    background-color: var(--apron-cascader-bg);
    border: 1px solid var(--apron-cascader-border-color);
    border-radius: @radius-md;
    cursor: pointer;
    transition: all @transition-slow;

    &:hover:not(&--disabled, &--loading) {
      border-color: var(--apron-cascader-border-color-hover);
    }

    &--active:not(&--disabled, &--loading) {
      border-color: var(--apron-cascader-border-color-focus);
      box-shadow: 0 0 0 2px rgba(67, 90, 111, 0.15);
    }

    &--disabled {
      background-color: var(--apron-cascader-disabled-bg);
      color: var(--apron-cascader-disabled-color);
      cursor: not-allowed;
    }

    &--loading {
      cursor: wait;
    }
  }

  // ============================================
  // Value
  // ============================================
  &__value {
    flex: 1;
    color: var(--apron-cascader-text-color);
    font-size: @font-size-base;
    line-height: @line-height-normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  // ============================================
  // Placeholder
  // ============================================
  &__placeholder {
    flex: 1;
    color: var(--apron-cascader-placeholder-color);
    font-size: @font-size-base;
    line-height: @line-height-normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  // ============================================
  // Suffix
  // ============================================
  &__suffix {
    display: flex;
    align-items: center;
    margin-left: @spacing-2;
    color: var(--apron-cascader-placeholder-color);
    transition: all @transition-slow;
  }

  // ============================================
  // Arrow
  // ============================================
  &__arrow {
    transition: transform @transition-slow;
    
    &--open {
      transform: rotate(180deg);
    }
  }

  // ============================================
  // Loading Icon
  // ============================================
  &__loading-icon {
    animation: apron-cascader-spin 1s linear infinite;
  }

  @keyframes apron-cascader-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  // ============================================
  // Dropdown
  // ============================================
  &__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    margin-top: @spacing-1;
    background-color: var(--apron-cascader-dropdown-bg);
    border: 1px solid var(--apron-cascader-border-color);
    border-radius: @radius-md;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all @transition-slow;

    &--inflow {
      position: static;
      margin-top: 0;
    }
  }

  // ============================================
  // Columns
  // ============================================
  &__columns {
    display: flex;
    max-height: 200px;
    overflow-y: auto;
  }

  // ============================================
  // Column
  // ============================================
  &__column {
    min-width: 120px;
    border-right: 1px solid var(--apron-cascader-border-color);
    
    &:last-child {
      border-right: none;
    }
  }

  // ============================================
  // Option
  // ============================================
  &__option {
    padding: @spacing-2 @spacing-4;
    color: var(--apron-cascader-text-color);
    font-size: @font-size-base;
    line-height: @line-height-normal;
    cursor: pointer;
    transition: all @transition-slow;

    &:hover:not(&--disabled) {
      background-color: var(--apron-cascader-option-hover-bg);
    }

    &--selected {
      background-color: var(--apron-cascader-option-selected-bg);
      color: var(--apron-cascader-option-selected-color);
      font-weight: @font-weight-medium;
    }

    &--disabled {
      color: var(--apron-cascader-option-disabled-color);
      cursor: not-allowed;
    }
  }
}
</style>
