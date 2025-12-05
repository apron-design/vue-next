<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, useAttrs } from 'vue'

export interface DateValue {
  year?: number
  month?: number
  day?: number
}

export interface DatePickerProps {
  modelValue?: DateValue
  disabled?: boolean
  loading?: boolean
  inflow?: boolean
  yearStart?: number
  yearEnd?: number
  yearLabel?: string
  monthLabel?: string
  dayLabel?: string
  monthLabels?: string[]
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  disabled: false,
  loading: false,
  inflow: false,
  yearStart: 1900,
  yearEnd: 2100,
  yearLabel: '年',
  monthLabel: '月',
  dayLabel: '日',
  monthLabels: () => ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: DateValue): void
  (e: 'change', value: DateValue): void
  (e: 'openChange', open: boolean): void
}>()

const attrs = useAttrs()
const pickerRef = ref<HTMLDivElement | null>(null)
const isOpen = ref(false)
const activeTab = ref<'year' | 'month' | 'day'>('year')
const internalValue = ref<DateValue>({ ...(props.modelValue ?? {}) })

watch(() => props.modelValue, (val) => {
  internalValue.value = { ...(val ?? {}) }
})

const years = computed(() => {
  const arr = []
  for (let y = props.yearStart; y <= props.yearEnd; y++) {
    arr.push(y)
  }
  return arr
})

const months = computed(() => {
  return props.monthLabels.map((label, index) => ({
    label,
    value: index + 1
  }))
})

const days = computed(() => {
  const year = internalValue.value.year || new Date().getFullYear()
  const month = internalValue.value.month || 1
  const daysInMonth = new Date(year, month, 0).getDate()
  return Array.from({ length: daysInMonth }, (_, i) => i + 1)
})

const displayValue = computed(() => {
  const parts: string[] = []
  if (internalValue.value.year) {
    parts.push(`${internalValue.value.year}${props.yearLabel}`)
  }
  if (internalValue.value.month) {
    parts.push(`${internalValue.value.month}${props.monthLabel}`)
  }
  if (internalValue.value.day) {
    parts.push(`${internalValue.value.day}${props.dayLabel}`)
  }
  return parts.join('')
})

const pickerClasses = computed(() => [
  'apron-datepicker',
  {
    'apron-datepicker--open': isOpen.value,
    'apron-datepicker--disabled': props.disabled,
    'apron-datepicker--loading': props.loading,
    'apron-datepicker--inflow': props.inflow,
    'apron-datepicker--has-value': displayValue.value.length > 0
  }
])

const toggleOpen = () => {
  if (props.disabled || props.loading) return
  isOpen.value = !isOpen.value
  emit('openChange', isOpen.value)
}

const closeDropdown = () => {
  if (isOpen.value) {
    isOpen.value = false
    emit('openChange', false)
  }
}

const selectYear = (year: number) => {
  internalValue.value.year = year
  activeTab.value = 'month'
  emitChange()
}

const selectMonth = (month: number) => {
  internalValue.value.month = month
  activeTab.value = 'day'
  emitChange()
}

const selectDay = (day: number) => {
  internalValue.value.day = day
  emitChange()
  closeDropdown()
}

const emitChange = () => {
  const value = { ...internalValue.value }
  emit('update:modelValue', value)
  emit('change', value)
}

const handleClickOutside = (event: MouseEvent) => {
  if (pickerRef.value && !pickerRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="pickerRef" :class="pickerClasses" v-bind="attrs">
    <div class="apron-datepicker__trigger" @click="toggleOpen" tabindex="0">
      <span v-if="displayValue" class="apron-datepicker__value">
        {{ displayValue }}
      </span>
      <span v-else class="apron-datepicker__placeholder">
        请选择日期
      </span>
      <span class="apron-datepicker__suffix">
        <span v-if="loading" class="apron-datepicker__loading">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="31.4 31.4" />
          </svg>
        </span>
        <svg v-else class="apron-datepicker__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>
    </div>
    <Transition name="apron-datepicker-dropdown">
      <div v-if="isOpen" class="apron-datepicker__dropdown">
        <div class="apron-datepicker__tabs">
          <button
            type="button"
            :class="['apron-datepicker__tab', { 'apron-datepicker__tab--active': activeTab === 'year' }]"
            @click="activeTab = 'year'"
          >
            {{ yearLabel }}
          </button>
          <button
            type="button"
            :class="['apron-datepicker__tab', { 'apron-datepicker__tab--active': activeTab === 'month' }]"
            @click="activeTab = 'month'"
          >
            {{ monthLabel }}
          </button>
          <button
            type="button"
            :class="['apron-datepicker__tab', { 'apron-datepicker__tab--active': activeTab === 'day' }]"
            @click="activeTab = 'day'"
          >
            {{ dayLabel }}
          </button>
        </div>
        <div class="apron-datepicker__panel">
          <div v-if="activeTab === 'year'" class="apron-datepicker__options">
            <button
              v-for="year in years"
              :key="year"
              type="button"
              class="apron-datepicker__option"
              :class="{ 'apron-datepicker__option--selected': internalValue.year === year }"
              @click="selectYear(year)"
            >
              {{ year }}
            </button>
          </div>
          <div v-else-if="activeTab === 'month'" class="apron-datepicker__options apron-datepicker__options--grid">
            <button
              v-for="month in months"
              :key="month.value"
              type="button"
              class="apron-datepicker__option"
              :class="{ 'apron-datepicker__option--selected': internalValue.month === month.value }"
              @click="selectMonth(month.value)"
            >
              {{ month.label }}
            </button>
          </div>
          <div v-else class="apron-datepicker__options apron-datepicker__options--grid">
            <button
              v-for="day in days"
              :key="day"
              type="button"
              class="apron-datepicker__option"
              :class="{ 'apron-datepicker__option--selected': internalValue.day === day }"
              @click="selectDay(day)"
            >
              {{ day }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="less">
@import './DatePicker.less';
</style>

