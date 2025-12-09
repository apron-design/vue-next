<template>
  <div :class="classes" ref="containerRef" v-bind="$attrs">
    <div 
      class="apron-datepicker__input"
      :class="{ 
        'apron-datepicker__input--active': isActive,
        'apron-datepicker__input--disabled': disabled,
        'apron-datepicker__input--loading': loading
      }"
      @click="toggleDropdown"
    >
      <span v-if="displayValue" class="apron-datepicker__value">{{ displayValue }}</span>
      <span v-else class="apron-datepicker__placeholder">请选择日期</span>
      
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
    
    <!-- Dropdown -->
    <div 
      v-if="isOpen" 
      class="apron-datepicker__dropdown"
      :class="{ 'apron-datepicker__dropdown--inflow': inflow }"
    >
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
          v-if="currentValue.year"
          type="button"
          class="apron-datepicker__tab"
          :class="{ 'apron-datepicker__tab--active': activeTab === 'month' }"
          @click="setActiveTab('month')"
        >
          {{ monthLabel }}
        </button>
        <button 
          v-if="currentValue.year && currentValue.month"
          type="button"
          class="apron-datepicker__tab"
          :class="{ 'apron-datepicker__tab--active': activeTab === 'day' }"
          @click="setActiveTab('day')"
        >
          {{ dayLabel }}
        </button>
      </div>
      
      <div class="apron-datepicker__panel">
        <!-- Year Panel -->
        <div v-show="activeTab === 'year'" class="apron-datepicker__year-panel">
          <div 
            v-for="year in years" 
            :key="year"
            class="apron-datepicker__item"
            :class="{ 'apron-datepicker__item--selected': currentValue.year === year }"
            @click="selectYear(year)"
          >
            {{ year }}
          </div>
        </div>
        
        <!-- Month Panel -->
        <div v-show="activeTab === 'month'" class="apron-datepicker__month-panel">
          <div 
            v-for="(month, index) in months" 
            :key="month"
            class="apron-datepicker__item"
            :class="{ 'apron-datepicker__item--selected': currentValue.month === month }"
            @click="selectMonth(month)"
          >
            {{ monthLabels[index] }}
          </div>
        </div>
        
        <!-- Day Panel -->
        <div v-show="activeTab === 'day'" class="apron-datepicker__day-panel">
          <div 
            v-for="day in days" 
            :key="day"
            class="apron-datepicker__item"
            :class="{ 'apron-datepicker__item--selected': currentValue.day === day }"
            @click="selectDay(day)"
          >
            {{ day }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

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
  /** 自定义类名 */
  class?: string
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

const classes = computed(() => [
  'apron-datepicker',
  props.class,
].filter(Boolean).join(' '))

// 获取显示的值
const displayValue = computed(() => {
  const year = currentValue.value.year ? String(currentValue.value.year) : '----'
  const month = currentValue.value.month ? String(currentValue.value.month).padStart(2, '0') : '--'
  const day = currentValue.value.day ? String(currentValue.value.day).padStart(2, '0') : '--'
  return `${year} / ${month} / ${day}`
})

const isActive = computed(() => isOpen.value || 
  (currentValue.value.year !== undefined || 
   currentValue.value.month !== undefined || 
   currentValue.value.day !== undefined))

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
  isOpen.value = !isOpen.value
  emit('open-change', isOpen.value)
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
  
  // 关闭下拉框
  isOpen.value = false
  emit('open-change', false)
}

// 点击外部关闭
const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false
    emit('open-change', false)
  }
}

// 监听 isOpen 变化
watch(isOpen, (newVal) => {
  if (newVal) {
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
    emit('open-change', false)
  }
})
</script>

<style lang="less">
@import '../../styles/variables.less';

// ============================================
// DatePicker CSS Variables (Light Mode)
// ============================================
:root {
  --apron-datepicker-bg: #ffffff;
  --apron-datepicker-border-color: @color-neutral-300;
  --apron-datepicker-border-color-hover: @color-neutral-400;
  --apron-datepicker-border-color-focus: @color-primary-500;
  --apron-datepicker-placeholder-color: @color-neutral-500;
  --apron-datepicker-text-color: @color-primary-900;
  --apron-datepicker-disabled-bg: @color-neutral-100;
  --apron-datepicker-disabled-color: @color-neutral-400;
  --apron-datepicker-dropdown-bg: #ffffff;
  --apron-datepicker-tab-bg: @color-neutral-100;
  --apron-datepicker-tab-bg-active: @color-primary-500;
  --apron-datepicker-tab-color: @color-neutral-600;
  --apron-datepicker-tab-color-active: #ffffff;
  --apron-datepicker-item-hover-bg: @color-neutral-100;
  --apron-datepicker-item-selected-bg: @color-primary-500;
  --apron-datepicker-item-selected-color: #ffffff;
}

// ============================================
// DatePicker CSS Variables (Dark Mode)
// ============================================
.dark,
[data-prefers-color='dark'] {
  --apron-datepicker-bg: @color-neutral-800;
  --apron-datepicker-border-color: @color-neutral-600;
  --apron-datepicker-border-color-hover: @color-neutral-500;
  --apron-datepicker-border-color-focus: @color-primary-400;
  --apron-datepicker-placeholder-color: @color-neutral-400;
  --apron-datepicker-text-color: @color-neutral-100;
  --apron-datepicker-disabled-bg: @color-neutral-700;
  --apron-datepicker-disabled-color: @color-neutral-500;
  --apron-datepicker-dropdown-bg: @color-neutral-800;
  --apron-datepicker-tab-bg: @color-neutral-700;
  --apron-datepicker-tab-bg-active: @color-primary-400;
  --apron-datepicker-tab-color: @color-neutral-300;
  --apron-datepicker-tab-color-active: @color-neutral-100;
  --apron-datepicker-item-hover-bg: @color-neutral-700;
  --apron-datepicker-item-selected-bg: @color-primary-400;
  --apron-datepicker-item-selected-color: @color-neutral-100;
}

// ============================================
// DatePicker Base Styles
// ============================================
.apron-datepicker {
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
    background-color: var(--apron-datepicker-bg);
    border: 1px solid var(--apron-datepicker-border-color);
    border-radius: @radius-md;
    cursor: pointer;
    transition: all @transition-slow;

    &:hover:not(&--disabled, &--loading) {
      border-color: var(--apron-datepicker-border-color-hover);
    }

    &--active:not(&--disabled, &--loading) {
      border-color: var(--apron-datepicker-border-color-focus);
      box-shadow: 0 0 0 2px rgba(67, 90, 111, 0.15);
    }

    &--disabled {
      background-color: var(--apron-datepicker-disabled-bg);
      color: var(--apron-datepicker-disabled-color);
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
    color: var(--apron-datepicker-text-color);
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
    color: var(--apron-datepicker-placeholder-color);
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
    color: var(--apron-datepicker-placeholder-color);
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
    animation: apron-datepicker-spin 1s linear infinite;
  }

  @keyframes apron-datepicker-spin {
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
    background-color: var(--apron-datepicker-dropdown-bg);
    border: 1px solid var(--apron-datepicker-border-color);
    border-radius: @radius-md;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all @transition-slow;

    &--inflow {
      position: static;
      margin-top: 0;
    }
  }

  // ============================================
  // Tabs
  // ============================================
  &__tabs {
    display: flex;
    border-bottom: 1px solid var(--apron-datepicker-border-color);
  }

  // ============================================
  // Tab
  // ============================================
  &__tab {
    flex: 1;
    padding: @spacing-2 @spacing-3;
    background-color: var(--apron-datepicker-tab-bg);
    color: var(--apron-datepicker-tab-color);
    border: none;
    font-size: @font-size-sm;
    font-weight: @font-weight-medium;
    cursor: pointer;
    transition: all @transition-slow;

    &:hover:not(&--active) {
      background-color: var(--apron-datepicker-item-hover-bg);
    }

    &--active {
      background-color: var(--apron-datepicker-tab-bg-active);
      color: var(--apron-datepicker-tab-color-active);
    }
  }

  // ============================================
  // Panel
  // ============================================
  &__panel {
    padding: @spacing-2;
    max-height: 200px;
    overflow-y: auto;
  }

  // ============================================
  // Item
  // ============================================
  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: @spacing-2;
    margin: @spacing-1;
    border-radius: @radius-sm;
    font-size: @font-size-base;
    cursor: pointer;
    transition: all @transition-slow;

    &:hover:not(&--selected) {
      background-color: var(--apron-datepicker-item-hover-bg);
    }

    &--selected {
      background-color: var(--apron-datepicker-item-selected-bg);
      color: var(--apron-datepicker-item-selected-color);
      font-weight: @font-weight-medium;
    }
  }
}
</style>
