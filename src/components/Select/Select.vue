<template>
  <div
    ref="containerRef"
    :class="containerClasses"
    :tabindex="disabled || loading ? -1 : 0"
    role="combobox"
    :aria-expanded="isOpen"
    aria-haspopup="listbox"
    :aria-disabled="disabled"
    :aria-controls="`${selectId}-listbox`"
    @keydown="handleKeyDown"
  >
    <!-- 选择器头部 -->
    <div class="apron-select__trigger" @click="toggleDropdown">
      <span
        :class="[
          'apron-select__value',
          !hasValue ? 'apron-select__value--placeholder' : ''
        ]"
      >
        <template v-if="selectedOption">
          <component v-if="typeof selectedOption.label === 'function'" :is="selectedOption.label" />
          <component v-else-if="typeof selectedOption.label === 'object' && selectedOption.label !== null" :is="() => selectedOption.label" />
          <span v-else>{{ selectedOption.label }}</span>
        </template>
        <span v-else>{{ placeholder }}</span>
      </span>
      <span class="apron-select__suffix">
        <LoadingIcon v-if="loading" />
        <ArrowIcon v-else :is-open="isOpen" />
      </span>
    </div>

    <!-- 下拉选项 -->
    <div
      v-if="isOpen && !loading"
      :id="`${selectId}-listbox`"
      class="apron-select__dropdown"
      role="listbox"
    >
      <div class="apron-select__options">
        <div
          v-for="option in options"
          :key="option.value"
          :class="getOptionClasses(option)"
          role="option"
          :aria-selected="option.value === currentValue"
          :aria-disabled="option.disabled"
          @click="handleSelect(option)"
        >
          <component v-if="typeof option.label === 'function'" :is="option.label" />
          <component v-else-if="typeof option.label === 'object' && option.label !== null" :is="() => option.label" />
          <span v-else>{{ option.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, watch, h, useId, type VNode } from 'vue'
import './Select.less'

// 下拉箭头图标
const ArrowIcon = {
  name: 'ArrowIcon',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  setup(props: { isOpen: boolean }) {
    return () => h('svg', {
      width: '20',
      height: '20',
      viewBox: '0 0 20 20',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      class: `apron-select__arrow ${props.isOpen ? 'apron-select__arrow--open' : ''}`
    }, [
      h('path', {
        d: 'M5 7.5L10 12.5L15 7.5',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      })
    ])
  }
}

// Loading 图标
const LoadingIcon = {
  name: 'LoadingIcon',
  setup() {
    return () => h('svg', {
      width: '20',
      height: '20',
      viewBox: '0 0 20 20',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      class: 'apron-select__loading-icon'
    }, [
      h('path', {
        d: 'M10 2V5',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round'
      }),
      h('path', {
        d: 'M10 15V18',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round',
        opacity: '0.3'
      }),
      h('path', {
        d: 'M4.34 4.34L6.46 6.46',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round',
        opacity: '0.9'
      }),
      h('path', {
        d: 'M13.54 13.54L15.66 15.66',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round',
        opacity: '0.4'
      }),
      h('path', {
        d: 'M2 10H5',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round',
        opacity: '0.8'
      }),
      h('path', {
        d: 'M15 10H18',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round',
        opacity: '0.5'
      }),
      h('path', {
        d: 'M4.34 15.66L6.46 13.54',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round',
        opacity: '0.7'
      }),
      h('path', {
        d: 'M13.54 6.46L15.66 4.34',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round',
        opacity: '0.6'
      })
    ])
  }
}

export type SelectValueType = string | number

export interface SelectOption {
  label: string | VNode | (() => VNode)
  value: SelectValueType
  disabled?: boolean
}

export interface SelectProps {
  /** 当前选中的值（v-model） */
  modelValue?: SelectValueType
  /** 默认选中的值（非受控） */
  defaultValue?: SelectValueType
  /** 选项列表 */
  options?: SelectOption[]
  /** 占位文本 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 是否使用 inflow 模式（撑开容器） */
  inflow?: boolean
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  options: () => [],
  placeholder: 'Placeholder goes here',
  disabled: false,
  loading: false,
  inflow: false,
  class: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: SelectValueType): void
  (e: 'change', value: SelectValueType, option: SelectOption): void
  (e: 'open-change', open: boolean): void
}>()

// Refs
const containerRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const internalValue = ref<SelectValueType | undefined>(props.defaultValue)
const selectId = useId()

// Computed
const isControlled = computed(() => props.modelValue !== undefined)
const currentValue = computed(() => isControlled.value ? props.modelValue : internalValue.value)
const selectedOption = computed(() => props.options.find(opt => opt.value === currentValue.value))
const hasValue = computed(() => currentValue.value !== undefined)
const isActive = computed(() => isOpen.value || hasValue.value)

const containerClasses = computed(() => [
  'apron-select',
  isActive.value && 'apron-select--active',
  isOpen.value && 'apron-select--open',
  props.disabled && 'apron-select--disabled',
  props.loading && 'apron-select--loading',
  props.inflow && 'apron-select--inflow',
  props.class
].filter(Boolean).join(' '))

// Methods
const getOptionClasses = (option: SelectOption) => [
  'apron-select__option',
  option.value === currentValue.value && 'apron-select__option--selected',
  option.disabled && 'apron-select__option--disabled'
].filter(Boolean).join(' ')

// Toggle dropdown
const toggleDropdown = () => {
  if (props.disabled || props.loading) return
  const newOpen = !isOpen.value
  isOpen.value = newOpen
  emit('open-change', newOpen)
}

// Select option
const handleSelect = (option: SelectOption) => {
  if (option.disabled) return

  if (!isControlled.value) {
    internalValue.value = option.value
  }
  emit('update:modelValue', option.value)
  emit('change', option.value, option)
  isOpen.value = false
  emit('open-change', false)
}

// Keyboard navigation
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
      emit('open-change', false)
      break
    case 'ArrowDown':
      e.preventDefault()
      if (!isOpen.value) {
        isOpen.value = true
        emit('open-change', true)
      }
      break
    case 'ArrowUp':
      e.preventDefault()
      if (isOpen.value) {
        isOpen.value = false
        emit('open-change', false)
      }
      break
  }
}

// Click outside to close
const handleClickOutside = (event: MouseEvent) => {
  if (
    containerRef.value &&
    !containerRef.value.contains(event.target as Node)
  ) {
    isOpen.value = false
    emit('open-change', false)
  }
}

// Lifecycle - 只在 isOpen 为 true 时添加监听器
watch(isOpen, (newValue) => {
  if (newValue) {
    document.addEventListener('mousedown', handleClickOutside)
  } else {
    document.removeEventListener('mousedown', handleClickOutside)
  }
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

// Watch for modelValue changes
watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined) {
    internalValue.value = newValue
  }
})
</script>