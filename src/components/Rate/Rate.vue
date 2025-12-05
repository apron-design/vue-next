<script setup lang="ts">
import { ref, computed, watch, useAttrs } from 'vue'

export interface RateProps {
  modelValue?: number
  count?: number
  disabled?: boolean
  allowHalf?: boolean
  allowClear?: boolean
}

const props = withDefaults(defineProps<RateProps>(), {
  modelValue: 0,
  count: 5,
  disabled: false,
  allowHalf: false,
  allowClear: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}>()

const attrs = useAttrs()
const hoverValue = ref<number | null>(null)
const internalValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  internalValue.value = val
})

const displayValue = computed(() => {
  return hoverValue.value !== null ? hoverValue.value : internalValue.value
})

const rateClasses = computed(() => [
  'apron-rate',
  {
    'apron-rate--disabled': props.disabled
  }
])

const getStarClass = (index: number) => {
  const value = displayValue.value
  const starIndex = index + 1

  if (value >= starIndex) {
    return 'apron-rate__star--full'
  } else if (props.allowHalf && value >= starIndex - 0.5) {
    return 'apron-rate__star--half'
  }
  return ''
}

const handleMouseEnter = (index: number, isHalf: boolean = false) => {
  if (props.disabled) return
  hoverValue.value = props.allowHalf && isHalf ? index + 0.5 : index + 1
}

const handleMouseLeave = () => {
  if (props.disabled) return
  hoverValue.value = null
}

const handleClick = (index: number, isHalf: boolean = false) => {
  if (props.disabled) return
  
  let newValue = props.allowHalf && isHalf ? index + 0.5 : index + 1
  
  // Allow clear
  if (props.allowClear && newValue === internalValue.value) {
    newValue = 0
  }
  
  internalValue.value = newValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

const starIcon = `<svg viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
</svg>`
</script>

<template>
  <div :class="rateClasses" @mouseleave="handleMouseLeave" v-bind="attrs">
    <div
      v-for="(_, index) in count"
      :key="index"
      class="apron-rate__star"
      :class="getStarClass(index)"
    >
      <span
        v-if="allowHalf"
        class="apron-rate__star-half apron-rate__star-half--first"
        @mouseenter="handleMouseEnter(index, true)"
        @click="handleClick(index, true)"
        v-html="starIcon"
      />
      <span
        class="apron-rate__star-half apron-rate__star-half--second"
        @mouseenter="handleMouseEnter(index, false)"
        @click="handleClick(index, false)"
        v-html="starIcon"
      />
    </div>
  </div>
</template>

<style lang="less">
@import './Rate.less';
</style>

