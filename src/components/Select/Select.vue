<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, useAttrs } from 'vue'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface SelectProps {
  modelValue?: string | number
  options?: SelectOption[]
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  inflow?: boolean
}

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
  placeholder: '请选择',
  disabled: false,
  loading: false,
  inflow: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | undefined): void
  (e: 'change', value: string | number | undefined): void
  (e: 'openChange', open: boolean): void
}>()

const attrs = useAttrs()
const selectRef = ref<HTMLDivElement | null>(null)
const isOpen = ref(false)

const internalValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  internalValue.value = val
})

const selectedOption = computed(() => {
  return props.options.find(opt => opt.value === internalValue.value)
})

const displayValue = computed(() => {
  return selectedOption.value?.label ?? ''
})

const selectClasses = computed(() => [
  'apron-select',
  {
    'apron-select--open': isOpen.value,
    'apron-select--disabled': props.disabled,
    'apron-select--loading': props.loading,
    'apron-select--inflow': props.inflow,
    'apron-select--has-value': internalValue.value !== undefined
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

const handleSelect = (option: SelectOption) => {
  if (option.disabled) return
  internalValue.value = option.value
  emit('update:modelValue', option.value)
  emit('change', option.value)
  closeDropdown()
}

const handleClickOutside = (event: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
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
  <div ref="selectRef" :class="selectClasses" v-bind="attrs">
    <div class="apron-select__trigger" @click="toggleOpen" tabindex="0">
      <span v-if="displayValue" class="apron-select__value">
        {{ displayValue }}
      </span>
      <span v-else class="apron-select__placeholder">
        {{ placeholder }}
      </span>
      <span class="apron-select__suffix">
        <span v-if="loading" class="apron-select__loading">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="31.4 31.4" />
          </svg>
        </span>
        <svg v-else class="apron-select__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>
    </div>
    <Transition name="apron-select-dropdown">
      <div v-if="isOpen" class="apron-select__dropdown">
        <div class="apron-select__options">
          <div
            v-for="option in options"
            :key="option.value"
            class="apron-select__option"
            :class="{
              'apron-select__option--selected': option.value === internalValue,
              'apron-select__option--disabled': option.disabled
            }"
            @click="handleSelect(option)"
          >
            {{ option.label }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="less">
@import './Select.less';
</style>

