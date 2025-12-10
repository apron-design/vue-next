<template>
  <div
    :class="classes"
    ref="containerRef"
    v-bind="$attrs"
    :tabindex="disabled || loading ? -1 : 0"
    role="combobox"
    :aria-expanded="isOpen"
    aria-haspopup="listbox"
    :aria-disabled="disabled"
    @keydown="handleKeyDown"
  >
    <!-- 选择器头部 -->
    <div class="apron-cascader__trigger" @click="toggleDropdown">
      <span
        :class="[
          'apron-cascader__value',
          { 'apron-cascader__value--placeholder': !hasValue }
        ]"
      >
        {{ displayValue || placeholder }}
      </span>
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

    <!-- 下拉选项 -->
    <div
      v-if="isOpen && !loading"
      class="apron-cascader__dropdown"
      role="listbox"
    >
      <div class="apron-cascader__columns">
        <div
          v-for="(columnOptions, columnIndex) in columnsOptions"
          :key="columnIndex"
          class="apron-cascader__column"
        >
          <div class="apron-cascader__options">
            <div
              v-for="option in columnOptions"
              :key="option.value"
              :class="[
                'apron-cascader__option',
                {
                  'apron-cascader__option--expanded': expandedPath[columnIndex] === option.value,
                  'apron-cascader__option--selected': isFinalSelected(option, columnIndex),
                  'apron-cascader__option--disabled': option.disabled
                }
              ]"
              role="option"
              :aria-selected="expandedPath[columnIndex] === option.value"
              :aria-disabled="option.disabled"
              @click="handleSelect(option, columnIndex)"
            >
              <span class="apron-cascader__option-label">
                {{ option.label }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'

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
  /** 选中值改变时的回调 */
  onChange?: (value: CascaderValueType, selectedOptions: CascaderOption[]) => void
  /** 自定义类名 */
  className?: string
  /** 下拉框展开/收起回调 */
  onOpenChange?: (open: boolean) => void
  /** 值分隔符，用于显示 */
  separator?: string
  /** 是否在选择过程中触发 onChange（而非只在选择叶子节点时） */
  changeOnSelect?: boolean
}

const props = withDefaults(defineProps<CascaderProps>(), {
  options: () => [],
  placeholder: 'Placeholder goes here',
  separator: ' / ',
  changeOnSelect: false,
})

const emit = defineEmits<{
  (e: 'update:value', value: CascaderValueType): void
  (e: 'change', value: CascaderValueType, selectedOptions: CascaderOption[]): void
  (e: 'openChange', open: boolean): void
}>()

const containerRef = ref<HTMLDivElement | null>(null)
const isOpen = ref(false)
const internalValue = ref<CascaderValueType>(props.defaultValue || [])
const expandedPath = ref<CascaderValueType>([])

// 判断是否为受控模式
const isControlled = computed(() => props.value !== undefined)
const currentValue = computed(() => isControlled.value ? props.value! : internalValue.value)

const hasValue = computed(() => currentValue.value.length > 0)
const isActive = computed(() => isOpen.value || hasValue.value)

const classes = computed(() => [
  'apron-cascader',
  isActive.value && 'apron-cascader--active',
  isOpen.value && 'apron-cascader--open',
  props.disabled && 'apron-cascader--disabled',
  props.loading && 'apron-cascader--loading',
  props.inflow && 'apron-cascader--inflow',
  props.className,
].filter(Boolean).join(' '))

// 根据值路径获取选中的选项
const getSelectedOptions = (
  options: CascaderOption[],
  valuePath: CascaderValueType
): CascaderOption[] => {
  const result: CascaderOption[] = []
  let currentOptions = options

  for (const val of valuePath) {
    const found = currentOptions.find((opt) => opt.value === val)
    if (found) {
      result.push(found)
      currentOptions = found.children || []
    } else {
      break
    }
  }

  return result
}

// 获取各层级的选项列表
const getColumnsOptions = (
  options: CascaderOption[],
  expandedPath: CascaderValueType
): CascaderOption[][] => {
  const columns: CascaderOption[][] = [options]
  let currentOptions = options

  for (const val of expandedPath) {
    const found = currentOptions.find((opt) => opt.value === val)
    if (found?.children && found.children.length > 0) {
      columns.push(found.children)
      currentOptions = found.children
    } else {
      break
    }
  }

  return columns
}

// 获取选中的选项
const selectedOptions = computed(() => 
  getSelectedOptions(props.options || [], currentValue.value)
)

// 获取显示的值
const displayValue = computed(() => {
  if (selectedOptions.value.length === 0) return ''
  return selectedOptions.value.map((opt) => opt.label).join(props.separator)
})

// 获取各列的选项
const columnsOptions = computed(() => 
  getColumnsOptions(props.options || [], expandedPath.value)
)

// 切换下拉框
const toggleDropdown = () => {
  if (props.disabled || props.loading) return
  const newOpen = !isOpen.value
  isOpen.value = newOpen
  props.onOpenChange?.(newOpen)
  emit('openChange', newOpen)
}

// 选择选项
const handleSelect = (option: CascaderOption, columnIndex: number) => {
  if (option.disabled) return

  // 构建新的值路径
  const newPath = [...expandedPath.value.slice(0, columnIndex), option.value]
  expandedPath.value = newPath

  const newSelectedOptions = getSelectedOptions(props.options || [], newPath)
  const hasChildren = option.children && option.children.length > 0

  // 如果是叶子节点或 changeOnSelect 为 true，则触发 onChange
  if (!hasChildren || props.changeOnSelect) {
    if (!isControlled.value) {
      internalValue.value = newPath
    }
    emit('update:value', newPath)
    emit('change', newPath, newSelectedOptions)
    props.onChange?.(newPath, newSelectedOptions)

    // 如果是叶子节点，关闭下拉框
    if (!hasChildren) {
      isOpen.value = false
      props.onOpenChange?.(false)
      emit('openChange', false)
    }
  }
}

// 判断是否为最终选中的选项
const isFinalSelected = (option: CascaderOption, columnIndex: number) => {
  return (
    currentValue.value[columnIndex] === option.value &&
    columnIndex === currentValue.value.length - 1
  )
}

// 键盘导航
const handleKeyDown = (e: KeyboardEvent) => {
  if (props.disabled || props.loading) return

  switch (e.key) {
    case 'Enter':
    case ' ':
      e.preventDefault()
      toggleDropdown()
      break
    case 'Escape':
      isOpen.value = false
      props.onOpenChange?.(false)
      emit('openChange', false)
      break
    case 'ArrowDown':
      e.preventDefault()
      if (!isOpen.value) {
        isOpen.value = true
        props.onOpenChange?.(true)
        emit('openChange', true)
      }
      break
    case 'ArrowUp':
      e.preventDefault()
      if (isOpen.value) {
        isOpen.value = false
        props.onOpenChange?.(false)
        emit('openChange', false)
      }
      break
  }
}

// 点击外部关闭
const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false
    props.onOpenChange?.(false)
    emit('openChange', false)
  }
}

// 打开时初始化展开路径
watch(isOpen, (newVal) => {
  if (newVal) {
    expandedPath.value = currentValue.value
    document.addEventListener('mousedown', handleClickOutside)
  } else {
    document.removeEventListener('mousedown', handleClickOutside)
  }
})

// 清理事件监听器
onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

defineExpose({
  close: () => {
    isOpen.value = false
    props.onOpenChange?.(false)
    emit('openChange', false)
  }
})
</script>

<style lang="less">
@import '../../styles/variables.less';
@import '../../styles/mixins.less';

// ============================================
// Cascader CSS Variables (Light Mode)
// ============================================
:root {
  // Inactive state
  --apron-cascader-bg: @color-primary-50;
  --apron-cascader-border: @color-primary-50;
  --apron-cascader-text: @color-primary-300;
  --apron-cascader-placeholder: @color-primary-300;

  // Active state
  --apron-cascader-active-bg: #ffffff;
  --apron-cascader-active-border: @color-primary-500;
  --apron-cascader-active-text: @color-primary-500;

  // Disabled state
  --apron-cascader-disabled-bg: @color-neutral-100;
  --apron-cascader-disabled-border: @color-neutral-200;
  --apron-cascader-disabled-text: @color-neutral-400;

  // Dropdown
  --apron-cascader-dropdown-bg: #ffffff;
  --apron-cascader-dropdown-border: @color-neutral-200;
  --apron-cascader-dropdown-shadow: @shadow-lg;

  // Option
  --apron-cascader-option-text: @color-primary-500;
  --apron-cascader-option-hover-bg: @color-neutral-100;
  --apron-cascader-option-selected-text: @color-secondary-500;
  --apron-cascader-option-disabled-text: @color-neutral-300;

  // Column divider
  --apron-cascader-column-divider: @color-neutral-200;

  // Icon
  --apron-cascader-icon-color: @color-primary-300;
}

// ============================================
// Cascader CSS Variables (Dark Mode)
// ============================================
.dark,
[data-prefers-color='dark'] {
  // Inactive state
  --apron-cascader-bg: @color-neutral-800;
  --apron-cascader-border: @color-neutral-700;
  --apron-cascader-text: @color-neutral-400;
  --apron-cascader-placeholder: @color-neutral-500;

  // Active state
  --apron-cascader-active-bg: @color-neutral-900;
  --apron-cascader-active-border: @color-primary-200;
  --apron-cascader-active-text: @color-primary-200;

  // Disabled state
  --apron-cascader-disabled-bg: @color-neutral-800;
  --apron-cascader-disabled-border: @color-neutral-700;
  --apron-cascader-disabled-text: @color-neutral-600;

  // Dropdown
  --apron-cascader-dropdown-bg: @color-neutral-800;
  --apron-cascader-dropdown-border: @color-neutral-700;
  --apron-cascader-dropdown-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.3);

  // Option
  --apron-cascader-option-text: @color-primary-200;
  --apron-cascader-option-hover-bg: @color-neutral-700;
  --apron-cascader-option-selected-text: @color-secondary-400;
  --apron-cascader-option-disabled-text: @color-neutral-600;

  // Column divider
  --apron-cascader-column-divider: @color-neutral-700;

  // Icon
  --apron-cascader-icon-color: @color-neutral-500;
}

// ============================================
// Cascader Base Styles
// ============================================
.apron-cascader {
  position: relative;
  display: inline-block;
  width: 100%;
  font-family: var(--apron-font-family);
  font-size: @font-size-base;
  outline: none;
  box-sizing: border-box;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  // Trigger (选择器头部)
  &__trigger {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 0 @spacing-4;
    background-color: var(--apron-cascader-bg);
    border: 1px solid var(--apron-cascader-border);
    border-radius: 20px;
    cursor: pointer;
    transition: all @transition-fast;
  }

  // Value / Placeholder
  &__value {
    flex: 1;
    color: var(--apron-cascader-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &--placeholder {
      color: var(--apron-cascader-placeholder);
    }
  }

  // Suffix (arrow / loading)
  &__suffix {
    display: flex;
    align-items: center;
    margin-left: @spacing-2;
    color: var(--apron-cascader-icon-color);
    flex-shrink: 0;
  }

  // Arrow icon
  &__arrow {
    transition: transform @transition-fast;

    &--open {
      transform: rotate(180deg);
    }
  }

  // Loading icon
  &__loading-icon {
    animation: apron-cascader-spin 1s linear infinite;
  }

  // Dropdown
  &__dropdown {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    min-width: 100%;
    background-color: var(--apron-cascader-dropdown-bg);
    border: 1px solid var(--apron-cascader-dropdown-border);
    border-radius: 20px;
    box-shadow: var(--apron-cascader-dropdown-shadow);
    z-index: @z-index-dropdown;
    overflow: hidden;
    // Animation
    animation: apron-cascader-dropdown-open @transition-fast forwards;
    transform-origin: top center;
  }

  // Columns container
  &__columns {
    display: flex;
    border-top: 1px solid var(--apron-cascader-column-divider);
  }

  // Single column
  &__column {
    min-width: 150px;
    flex-shrink: 0;

    &:not(:last-child) {
      border-right: 1px solid var(--apron-cascader-column-divider);
    }
  }

  // Options container (scrollable)
  &__options {
    max-height: calc(40px * 5 + 1px); // 5 rows max + 1px for border
    overflow-y: auto;
  }

  // Single option
  &__option {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 @spacing-4;
    color: var(--apron-cascader-option-text);
    cursor: pointer;
    transition: background-color @transition-fast;

    &:hover:not(.apron-cascader__option--disabled) {
      background-color: var(--apron-cascader-option-hover-bg);
    }

    &--expanded {
      background-color: var(--apron-cascader-option-hover-bg);
    }

    &--selected {
      color: var(--apron-cascader-option-selected-text);
      font-weight: @font-weight-medium;
    }

    &--disabled {
      color: var(--apron-cascader-option-disabled-text);
      cursor: not-allowed;
    }
  }

  &__option-label {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  // ============================================
  // States
  // ============================================

  // Focus state
  &:focus-visible {
    .apron-cascader__trigger {
      .focus-ring();
    }
  }

  // Active state (有值或展开)
  &--active {
    .apron-cascader__trigger {
      background-color: var(--apron-cascader-active-bg);
      border-color: var(--apron-cascader-active-border);
    }

    .apron-cascader__value {
      color: var(--apron-cascader-active-text);

      &--placeholder {
        color: var(--apron-cascader-placeholder);
      }
    }
  }

  // Open state
  &--open {
    .apron-cascader__trigger {
      background-color: var(--apron-cascader-active-bg);
      border-color: var(--apron-cascader-active-border);
    }
  }

  // Disabled state
  &--disabled {
    .apron-cascader__trigger {
      background-color: var(--apron-cascader-disabled-bg);
      border-color: var(--apron-cascader-disabled-border);
      cursor: not-allowed;
    }

    .apron-cascader__value {
      color: var(--apron-cascader-disabled-text);
    }

    .apron-cascader__suffix {
      color: var(--apron-cascader-disabled-text);
    }
  }

  // Loading state
  &--loading {
    .apron-cascader__trigger {
      cursor: wait;
    }
  }

  // ============================================
  // Inflow Mode (撑开容器)
  // ============================================
  &--inflow {
    .apron-cascader__dropdown {
      position: relative;
      top: 0;
      margin-top: 0;
      border-top: none;
      border-radius: 0 0 20px 20px;
      box-shadow: none;
    }

    &.apron-cascader--open {
      .apron-cascader__trigger {
        border-radius: 20px 20px 0 0;
        border-bottom-color: transparent;
      }

      .apron-cascader__dropdown {
        border-color: var(--apron-cascader-active-border);
        border-top: none;
      }

      .apron-cascader__columns {
        border-top-color: var(--apron-cascader-column-divider);
      }
    }
  }
}

// Loading animation
@keyframes apron-cascader-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// Dropdown open animation
@keyframes apron-cascader-dropdown-open {
  from {
    opacity: 0;
    transform: scaleY(0.9) translateY(-4px);
  }
  to {
    opacity: 1;
    transform: scaleY(1) translateY(0);
  }
}
</style>

