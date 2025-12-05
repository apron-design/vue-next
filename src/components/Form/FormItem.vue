<script setup lang="ts">
import { computed, inject, onMounted, onBeforeUnmount, watch, useSlots, useAttrs } from 'vue'
import { formContextKey } from './Form.vue'
import type { FormRule, FormContext } from './Form.vue'

export interface FormItemProps {
  name?: string
  label?: string
  required?: boolean
  rules?: FormRule[]
  help?: string
  extra?: string
  valuePropName?: string
  trigger?: string
  validateTrigger?: string | string[]
}

const props = withDefaults(defineProps<FormItemProps>(), {
  valuePropName: 'modelValue',
  trigger: 'update:modelValue',
  validateTrigger: 'blur'
})

const attrs = useAttrs()
const slots = useSlots()
const formContext = inject<FormContext | null>(formContextKey, null)

const fieldValue = computed(() => {
  if (!formContext || !props.name) return undefined
  return formContext.values[props.name]
})

const fieldError = computed(() => {
  if (!formContext || !props.name) return ''
  return formContext.errors[props.name] || ''
})

const isValidating = computed(() => {
  if (!formContext || !props.name) return false
  return formContext.validating[props.name] || false
})

const isRequired = computed(() => {
  if (props.required) return true
  return props.rules?.some(rule => rule.required) || false
})

const isFloating = computed(() => {
  return formContext?.floatingLabel || false
})

const hasValue = computed(() => {
  return fieldValue.value !== undefined && fieldValue.value !== null && fieldValue.value !== ''
})

const labelStyle = computed(() => {
  if (!formContext?.labelWidth) return {}
  const width = typeof formContext.labelWidth === 'number' 
    ? `${formContext.labelWidth}px` 
    : formContext.labelWidth
  return {
    width,
    textAlign: formContext.labelAlign
  }
})

const itemClasses = computed(() => [
  'apron-form-item',
  {
    'apron-form-item--error': !!fieldError.value,
    'apron-form-item--validating': isValidating.value,
    'apron-form-item--required': isRequired.value,
    'apron-form-item--floating': isFloating.value,
    'apron-form-item--has-value': hasValue.value,
    'apron-form-item--focused': false // Will be managed by child
  }
])

const mergedRules = computed<FormRule[]>(() => {
  const rules: FormRule[] = []
  if (props.required) {
    rules.push({ required: true, message: `${props.label || props.name}为必填项` })
  }
  if (props.rules) {
    rules.push(...props.rules)
  }
  return rules
})

onMounted(() => {
  if (formContext && props.name) {
    formContext.registerField(props.name, mergedRules.value)
  }
})

onBeforeUnmount(() => {
  if (formContext && props.name) {
    formContext.unregisterField(props.name)
  }
})

watch(mergedRules, (newRules) => {
  if (formContext && props.name) {
    formContext.registerField(props.name, newRules)
  }
})
</script>

<template>
  <div :class="itemClasses" v-bind="attrs">
    <label v-if="label || isFloating" class="apron-form-item__label" :style="labelStyle">
      <span v-if="isRequired" class="apron-form-item__required">*</span>
      {{ label }}
    </label>
    <div class="apron-form-item__control">
      <div class="apron-form-item__content">
        <slot />
      </div>
      <div v-if="fieldError" class="apron-form-item__error">
        {{ fieldError }}
      </div>
      <div v-else-if="help" class="apron-form-item__help">
        {{ help }}
      </div>
      <div v-if="extra" class="apron-form-item__extra">
        {{ extra }}
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import './Form.less';
</style>

