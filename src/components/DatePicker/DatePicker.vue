<template>
  <div
    :class="classes"
    ref="containerRef"
    v-bind="$attrs"
    tabindex="0"
    role="combobox"
    :aria-expanded="isOpen"
    aria-haspopup="listbox"
    :aria-disabled="disabled"
    @keydown="handleKeyDown"
  >
    <!-- 选择器头部 -->
    <div class="apron-datepicker__trigger" @click="toggleDropdown">
      <span
        :class="[
          'apron-datepicker__value',
          { 'apron-datepicker__value--placeholder': !hasValue }
        ]"
      >
        {{ displayValue }}
      </span>
      <span class="apron-datepicker__suffix">
        <svg
          v-if="loading"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="apron-datepicker__loading-icon"
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
          :class="['apron-datepicker__arrow', { 'apron-datepicker__arrow--open': isOpen }]"
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
      class="apron-datepicker__dropdown"
      role="listbox"
    >
      <!-- 选项列表 -->
      <div class="apron-datepicker__options">
        <!-- Year Panel -->
        <template v-if="activeTab === 'year'">
          <div
            v-for="year in years"
            :key="year"
            :class="[
              'apron-datepicker__option',
              {
                'apron-datepicker__option--selected': currentValue.year === year
              }
            ]"
            role="option"
            :aria-selected="currentValue.year === year"
            @click="selectYear(year)"
          >
            {{ year }}
          </div>
        </template>

        <!-- Month Panel -->
        <template v-else-if="activeTab === 'month'">
          <div
            v-for="(month, index) in months"
            :key="month"
            :class="[
              'apron-datepicker__option',
              {
                'apron-datepicker__option--selected': currentValue.month === month,
                'apron-datepicker__option--disabled': !currentValue.year
              }
            ]"
            role="option"
            :aria-selected="currentValue.month === month"
            :aria-disabled="!currentValue.year"
            @click="!currentValue.year ? undefined : selectMonth(month)"
          >
            {{ monthLabels[index] }}
          </div>
        </template>

        <!-- Day Panel -->
        <template v-else-if="activeTab === 'day'">
          <div
            v-for="day in days"
            :key="day"
            :class="[
              'apron-datepicker__option',
              {
                'apron-datepicker__option--selected': currentValue.day === day,
                'apron-datepicker__option--disabled': !currentValue.year || !currentValue.month
              }
            ]"
            role="option"
            :aria-selected="currentValue.day === day"
            :aria-disabled="!currentValue.year || !currentValue.month"
            @click="(!currentValue.year || !currentValue.month) ? undefined : selectDay(day)"
          >
            {{ day }}
          </div>
        </template>
      </div>

      <!-- Tab 切换 -->
      <div class="apron-datepicker__tabs">
        <button
          type="button"
          class="apron-datepicker__tab"
          :class="{ 'apron-datepicker__tab--active': activeTab === 'year' }"
          @click="setActiveTab('year')"
        >
          {{ yearLabel }}
        </button>
        <button
          type="button"
          class="apron-datepicker__tab"
          :class="{ 'apron-datepicker__tab--active': activeTab === 'month' }"
          @click="setActiveTab('month')"
        >
          {{ monthLabel }}
        </button>
        <button
          type="button"
          class="apron-datepicker__tab"
          :class="{ 'apron-datepicker__tab--active': activeTab === 'day' }"
          @click="setActiveTab('day')"
        >
          {{ dayLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'

export interface DatePickerValue {
  year?: number
  month?: number
  day?: number
}

export interface DatePickerProps {
  /** 当前选中的值 */
  value?: DatePickerValue
  /** 默认选中的值（非受控） */
  defaultValue?: DatePickerValue
  /** 是否禁用 */
  disabled?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 是否使用 inflow 模式（撑开容器） */
  inflow?: boolean
  /** 选中值改变时的回调 */
  onChange?: (value: DatePickerValue) => void
  /** 自定义类名 */
  className?: string
  /** 下拉框展开/收起回调 */
  onOpenChange?: (open: boolean) => void
  /** 年份范围起始 */
  yearStart?: number
  /** 年份范围结束 */
  yearEnd?: number
  /** 年标签 */
  yearLabel?: string
  /** 月标签 */
  monthLabel?: string
  /** 日标签 */
  dayLabel?: string
  /** 月份标签列表 */
  monthLabels?: string[]
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  defaultValue: () => ({}),
  disabled: false,
  loading: false,
  inflow: false,
  yearStart: 2020,
  yearEnd: 2030,
  yearLabel: '年',
  monthLabel: '月',
  dayLabel: '日',
  monthLabels: () => ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
})

const emit = defineEmits<{
  (e: 'update:value', value: DatePickerValue): void
  (e: 'change', value: DatePickerValue): void
  (e: 'open-change', open: boolean): void
}>()

const containerRef = ref<HTMLDivElement | null>(null)
const isOpen = ref(false)
const activeTab = ref<'year' | 'month' | 'day'>('year')
const internalValue = ref<DatePickerValue>(props.defaultValue)

// 判断是否为受控模式
const isControlled = computed(() => props.value !== undefined)
const currentValue = computed(() => isControlled.value ? props.value! : internalValue.value)

const hasValue = computed(() => 
  currentValue.value.year !== undefined ||
  currentValue.value.month !== undefined ||
  currentValue.value.day !== undefined
)

const classes = computed(() => [
  'apron-datepicker',
  isActive.value && 'apron-datepicker--active',
  isOpen.value && 'apron-datepicker--open',
  props.disabled && 'apron-datepicker--disabled',
  props.loading && 'apron-datepicker--loading',
  props.inflow && 'apron-datepicker--inflow',
  props.className,
].filter(Boolean).join(' '))

// 获取显示的值
const displayValue = computed(() => {
  const year = currentValue.value.year ? String(currentValue.value.year) : '----'
  const month = currentValue.value.month ? String(currentValue.value.month).padStart(2, '0') : '--'
  const day = currentValue.value.day ? String(currentValue.value.day).padStart(2, '0') : '--'
  return `${year} / ${month} / ${day}`
})

const isActive = computed(() => isOpen.value || hasValue.value)

// 生成年份列表
const years = computed(() => {
  const list: number[] = []
  for (let i = props.yearStart; i <= props.yearEnd; i++) {
    list.push(i)
  }
  return list
})

// 生成月份列表
const months = computed(() => {
  return Array.from({ length: 12 }, (_, i) => i + 1)
})

// 获取某月的天数
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate()
}

// 生成日期列表
const days = computed(() => {
  const year = currentValue.value.year || new Date().getFullYear()
  const month = currentValue.value.month || 1
  const daysInMonth = getDaysInMonth(year, month)
  return Array.from({ length: daysInMonth }, (_, i) => i + 1)
})

// 切换下拉框
const toggleDropdown = () => {
  if (props.disabled || props.loading) return
  const newOpen = !isOpen.value
  isOpen.value = newOpen
  props.onOpenChange?.(newOpen)
  emit('open-change', newOpen)
}

// 设置活动标签页
const setActiveTab = (tab: 'year' | 'month' | 'day') => {
  activeTab.value = tab
}

// 选择年份
const selectYear = (year: number) => {
  const newValue = { ...currentValue.value, year }
  
  if (!isControlled.value) {
    internalValue.value = newValue
  }
  
  emit('update:value', newValue)
  emit('change', newValue)
  props.onChange?.(newValue)
  
  // 自动切换到月份选择
  activeTab.value = 'month'
}

// 选择月份
const selectMonth = (month: number) => {
  const newValue = { ...currentValue.value, month }
  
  if (!isControlled.value) {
    internalValue.value = newValue
  }
  
  emit('update:value', newValue)
  emit('change', newValue)
  props.onChange?.(newValue)
  
  // 自动切换到日期选择
  activeTab.value = 'day'
}

// 选择日期
const selectDay = (day: number) => {
  const newValue = { ...currentValue.value, day }
  
  if (!isControlled.value) {
    internalValue.value = newValue
  }
  
  emit('update:value', newValue)
  emit('change', newValue)
  props.onChange?.(newValue)
  
  // 关闭下拉框
  isOpen.value = false
  props.onOpenChange?.(false)
  emit('open-change', false)
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
      emit('open-change', false)
      break
    case 'ArrowDown':
      e.preventDefault()
      if (!isOpen.value) {
        isOpen.value = true
        props.onOpenChange?.(true)
        emit('open-change', true)
      }
      break
    case 'ArrowUp':
      e.preventDefault()
      if (isOpen.value) {
        isOpen.value = false
        props.onOpenChange?.(false)
        emit('open-change', false)
      }
      break
  }
}

// 点击外部关闭
const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false
    props.onOpenChange?.(false)
    emit('open-change', false)
  }
}


// 打开时初始化活动标签
watch(isOpen, (newVal) => {
  if (newVal) {
    // 根据当前值确定初始标签
    if (!currentValue.value.year) {
      activeTab.value = 'year'
    } else if (!currentValue.value.month) {
      activeTab.value = 'month'
    } else if (!currentValue.value.day) {
      activeTab.value = 'day'
    } else {
      activeTab.value = 'year'
    }
    document.addEventListener('mousedown', handleClickOutside)
  } else {
    document.removeEventListener('mousedown', handleClickOutside)
  }
})

// 组件卸载时清理事件监听器
onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

// 暴露方法
defineExpose({
  close: () => {
    isOpen.value = false
    props.onOpenChange?.(false)
    emit('open-change', false)
  }
})
</script>

<style lang="less">
@import '../../styles/variables.less';
@import '../../styles/mixins.less';

// ============================================
// DatePicker CSS Variables (Light Mode)
// ============================================
:root {
  // Inactive state
  --apron-datepicker-bg: @color-primary-50;
  --apron-datepicker-border: @color-primary-50;
  --apron-datepicker-text: @color-primary-300;
  --apron-datepicker-placeholder: @color-primary-300;

  // Active state
  --apron-datepicker-active-bg: #ffffff;
  --apron-datepicker-active-border: @color-primary-500;
  --apron-datepicker-active-text: @color-primary-500;

  // Disabled state
  --apron-datepicker-disabled-bg: @color-neutral-100;
  --apron-datepicker-disabled-border: @color-neutral-200;
  --apron-datepicker-disabled-text: @color-neutral-400;

  // Dropdown
  --apron-datepicker-dropdown-bg: #ffffff;
  --apron-datepicker-dropdown-border: @color-neutral-200;
  --apron-datepicker-dropdown-shadow: @shadow-lg;

  // Option
  --apron-datepicker-option-text: @color-primary-500;
  --apron-datepicker-option-hover-bg: @color-neutral-100;
  --apron-datepicker-option-selected-text: @color-secondary-500;
  --apron-datepicker-option-disabled-text: @color-neutral-300;

  // Tab
  --apron-datepicker-tab-bg: transparent;
  --apron-datepicker-tab-text: @color-primary-300;
  --apron-datepicker-tab-active-bg: @color-primary-500;
  --apron-datepicker-tab-active-text: #ffffff;

  // Icon
  --apron-datepicker-icon-color: @color-primary-300;
}

// ============================================
// DatePicker CSS Variables (Dark Mode)
// ============================================
.dark,
[data-prefers-color='dark'] {
  // Inactive state
  --apron-datepicker-bg: @color-neutral-800;
  --apron-datepicker-border: @color-neutral-700;
  --apron-datepicker-text: @color-neutral-400;
  --apron-datepicker-placeholder: @color-neutral-500;

  // Active state
  --apron-datepicker-active-bg: @color-neutral-900;
  --apron-datepicker-active-border: @color-primary-200;
  --apron-datepicker-active-text: @color-primary-200;

  // Disabled state
  --apron-datepicker-disabled-bg: @color-neutral-800;
  --apron-datepicker-disabled-border: @color-neutral-700;
  --apron-datepicker-disabled-text: @color-neutral-600;

  // Dropdown
  --apron-datepicker-dropdown-bg: @color-neutral-800;
  --apron-datepicker-dropdown-border: @color-neutral-700;
  --apron-datepicker-dropdown-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.3);

  // Option
  --apron-datepicker-option-text: @color-primary-200;
  --apron-datepicker-option-hover-bg: @color-neutral-700;
  --apron-datepicker-option-selected-text: @color-secondary-400;
  --apron-datepicker-option-disabled-text: @color-neutral-600;

  // Tab
  --apron-datepicker-tab-bg: transparent;
  --apron-datepicker-tab-text: @color-neutral-500;
  --apron-datepicker-tab-active-bg: @color-primary-300;
  --apron-datepicker-tab-active-text: @color-neutral-900;

  // Icon
  --apron-datepicker-icon-color: @color-neutral-500;
}

// ============================================
// DatePicker Base Styles
// ============================================
.apron-datepicker {
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
    background-color: var(--apron-datepicker-bg);
    border: 1px solid var(--apron-datepicker-border);
    border-radius: 20px;
    cursor: pointer;
    transition: all @transition-fast;
  }

  // Value / Placeholder
  &__value {
    flex: 1;
    color: var(--apron-datepicker-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &--placeholder {
      color: var(--apron-datepicker-placeholder);
    }
  }

  // Suffix (arrow / loading)
  &__suffix {
    display: flex;
    align-items: center;
    margin-left: @spacing-2;
    color: var(--apron-datepicker-icon-color);
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
    animation: apron-datepicker-spin 1s linear infinite;
  }

  // Dropdown
  &__dropdown {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    background-color: var(--apron-datepicker-dropdown-bg);
    border: 1px solid var(--apron-datepicker-dropdown-border);
    border-radius: 20px;
    box-shadow: var(--apron-datepicker-dropdown-shadow);
    z-index: @z-index-dropdown;
    overflow: hidden;
    // Animation
    animation: apron-datepicker-dropdown-open @transition-fast forwards;
    transform-origin: top center;
  }

  // Options container (scrollable)
  &__options {
    max-height: calc(40px * 5 + 1px); // 5 rows max + 1px for border
    overflow-y: auto;
    border-top: 1px solid var(--apron-datepicker-dropdown-border);
  }

  // Single option
  &__option {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 @spacing-4;
    color: var(--apron-datepicker-option-text);
    cursor: pointer;
    transition: background-color @transition-fast;

    &:hover:not(.apron-datepicker__option--disabled) {
      background-color: var(--apron-datepicker-option-hover-bg);
    }

    &--selected {
      color: var(--apron-datepicker-option-selected-text);
      font-weight: @font-weight-medium;
    }

    &--disabled {
      color: var(--apron-datepicker-option-disabled-text);
      cursor: not-allowed;
    }
  }

  // Tabs container
  &__tabs {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: @spacing-3 @spacing-4;
    gap: @spacing-2;
    border-top: 1px solid var(--apron-datepicker-dropdown-border);
  }

  // Single tab
  &__tab {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 48px;
    height: 32px;
    padding: 0 @spacing-3;
    border: none;
    border-radius: 16px;
    background-color: var(--apron-datepicker-tab-bg);
    color: var(--apron-datepicker-tab-text);
    font-family: inherit;
    font-size: @font-size-sm;
    cursor: pointer;
    transition: all @transition-fast;

    &:hover:not(.apron-datepicker__tab--active) {
      background-color: var(--apron-datepicker-option-hover-bg);
    }

    &--active {
      background-color: var(--apron-datepicker-tab-active-bg);
      color: var(--apron-datepicker-tab-active-text);
    }
  }

  // ============================================
  // States
  // ============================================

  // Focus state
  &:focus-visible {
    .apron-datepicker__trigger {
      .focus-ring();
    }
  }

  // Active state (有值或展开)
  &--active {
    .apron-datepicker__trigger {
      background-color: var(--apron-datepicker-active-bg);
      border-color: var(--apron-datepicker-active-border);
    }

    .apron-datepicker__value {
      color: var(--apron-datepicker-active-text);

      &--placeholder {
        color: var(--apron-datepicker-placeholder);
      }
    }
  }

  // Open state
  &--open {
    .apron-datepicker__trigger {
      background-color: var(--apron-datepicker-active-bg);
      border-color: var(--apron-datepicker-active-border);
    }
  }

  // Disabled state
  &--disabled {
    .apron-datepicker__trigger {
      background-color: var(--apron-datepicker-disabled-bg);
      border-color: var(--apron-datepicker-disabled-border);
      cursor: not-allowed;
    }

    .apron-datepicker__value {
      color: var(--apron-datepicker-disabled-text);
    }

    .apron-datepicker__suffix {
      color: var(--apron-datepicker-disabled-text);
    }
  }

  // Loading state
  &--loading {
    .apron-datepicker__trigger {
      cursor: wait;
    }
  }

  // ============================================
  // Inflow Mode (撑开容器)
  // ============================================
  &--inflow {
    .apron-datepicker__dropdown {
      position: relative;
      top: 0;
      margin-top: 0;
      border-top: none;
      border-radius: 0 0 20px 20px;
      box-shadow: none;
    }

    &.apron-datepicker--open {
      .apron-datepicker__trigger {
        border-radius: 20px 20px 0 0;
        border-bottom-color: transparent;
      }

      .apron-datepicker__dropdown {
        border-color: var(--apron-datepicker-active-border);
        border-top: none;
      }
    }
  }
}

// Loading animation
@keyframes apron-datepicker-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// Dropdown open animation
@keyframes apron-datepicker-dropdown-open {
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
