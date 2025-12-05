<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, useAttrs } from 'vue'

export interface CascaderOption {
  label: string
  value: string | number
  disabled?: boolean
  children?: CascaderOption[]
}

export interface CascaderProps {
  modelValue?: (string | number)[]
  options?: CascaderOption[]
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  inflow?: boolean
  separator?: string
  changeOnSelect?: boolean
}

const props = withDefaults(defineProps<CascaderProps>(), {
  options: () => [],
  placeholder: '请选择',
  disabled: false,
  loading: false,
  inflow: false,
  separator: ' / ',
  changeOnSelect: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: (string | number)[]): void
  (e: 'change', value: (string | number)[], selectedOptions: CascaderOption[]): void
  (e: 'openChange', open: boolean): void
}>()

const attrs = useAttrs()
const cascaderRef = ref<HTMLDivElement | null>(null)
const isOpen = ref(false)
const internalValue = ref<(string | number)[]>([...(props.modelValue ?? [])])
const expandedPath = ref<(string | number)[]>([])

watch(() => props.modelValue, (val) => {
  internalValue.value = [...(val ?? [])]
  expandedPath.value = [...(val ?? [])]
})

const getOptionsByPath = (options: CascaderOption[], path: (string | number)[]): CascaderOption[][] => {
  const columns: CascaderOption[][] = [options]
  let currentOptions = options

  for (const value of path) {
    const found = currentOptions.find(opt => opt.value === value)
    if (found?.children) {
      columns.push(found.children)
      currentOptions = found.children
    } else {
      break
    }
  }

  return columns
}

const columns = computed(() => getOptionsByPath(props.options, expandedPath.value))

const selectedOptions = computed(() => {
  const result: CascaderOption[] = []
  let currentOptions = props.options

  for (const value of internalValue.value) {
    const found = currentOptions.find(opt => opt.value === value)
    if (found) {
      result.push(found)
      currentOptions = found.children ?? []
    }
  }

  return result
})

const displayValue = computed(() => {
  return selectedOptions.value.map(opt => opt.label).join(props.separator)
})

const cascaderClasses = computed(() => [
  'apron-cascader',
  {
    'apron-cascader--open': isOpen.value,
    'apron-cascader--disabled': props.disabled,
    'apron-cascader--loading': props.loading,
    'apron-cascader--inflow': props.inflow,
    'apron-cascader--has-value': internalValue.value.length > 0
  }
])

const toggleOpen = () => {
  if (props.disabled || props.loading) return
  isOpen.value = !isOpen.value
  emit('openChange', isOpen.value)
  if (isOpen.value) {
    expandedPath.value = [...internalValue.value]
  }
}

const closeDropdown = () => {
  if (isOpen.value) {
    isOpen.value = false
    emit('openChange', false)
  }
}

const handleSelect = (option: CascaderOption, level: number) => {
  if (option.disabled) return

  const newPath = [...expandedPath.value.slice(0, level), option.value]
  expandedPath.value = newPath

  if (!option.children || option.children.length === 0 || props.changeOnSelect) {
    internalValue.value = newPath
    emit('update:modelValue', newPath)
    
    const options = getSelectedOptions(newPath)
    emit('change', newPath, options)

    if (!option.children || option.children.length === 0) {
      closeDropdown()
    }
  }
}

const getSelectedOptions = (path: (string | number)[]): CascaderOption[] => {
  const result: CascaderOption[] = []
  let currentOptions = props.options

  for (const value of path) {
    const found = currentOptions.find(opt => opt.value === value)
    if (found) {
      result.push(found)
      currentOptions = found.children ?? []
    }
  }

  return result
}

const handleClickOutside = (event: MouseEvent) => {
  if (cascaderRef.value && !cascaderRef.value.contains(event.target as Node)) {
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
  <div ref="cascaderRef" :class="cascaderClasses" v-bind="attrs">
    <div class="apron-cascader__trigger" @click="toggleOpen" tabindex="0">
      <span v-if="displayValue" class="apron-cascader__value">
        {{ displayValue }}
      </span>
      <span v-else class="apron-cascader__placeholder">
        {{ placeholder }}
      </span>
      <span class="apron-cascader__suffix">
        <span v-if="loading" class="apron-cascader__loading">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="31.4 31.4" />
          </svg>
        </span>
        <svg v-else class="apron-cascader__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>
    </div>
    <Transition name="apron-cascader-dropdown">
      <div v-if="isOpen" class="apron-cascader__dropdown">
        <div class="apron-cascader__columns">
          <div
            v-for="(column, colIndex) in columns"
            :key="colIndex"
            class="apron-cascader__column"
          >
            <div
              v-for="option in column"
              :key="option.value"
              class="apron-cascader__option"
              :class="{
                'apron-cascader__option--expanded': expandedPath[colIndex] === option.value,
                'apron-cascader__option--selected': internalValue[colIndex] === option.value,
                'apron-cascader__option--disabled': option.disabled
              }"
              @click="handleSelect(option, colIndex)"
            >
              <span>{{ option.label }}</span>
              <svg v-if="option.children?.length" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="less">
@import './Cascader.less';
</style>

