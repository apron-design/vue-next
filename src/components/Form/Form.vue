<script lang="ts">
import type { InjectionKey } from 'vue'


export type FormLayout = 'horizontal' | 'vertical' | 'inline'
export type LabelAlign = 'left' | 'right'

export interface FormRule {
  required?: boolean
  message?: string
  min?: number
  max?: number
  pattern?: RegExp
  validator?: (value: any) => boolean | Promise<boolean>
}

export interface FormInstance {
  validate: () => Promise<boolean>
  validateField: (name: string) => Promise<boolean>
  resetFields: () => void
  clearValidate: (names?: string | string[]) => void
  getFieldValue: (name: string) => any
  getFieldsValue: () => Record<string, any>
  setFieldValue: (name: string, value: any) => void
  setFieldsValue: (values: Record<string, any>) => void
}

export interface FormContext {
  values: Record<string, any>
  errors: Record<string, string>
  touched: Record<string, boolean>
  validating: Record<string, boolean>
  layout: FormLayout
  floatingLabel: boolean
  labelWidth: string | number | undefined
  labelAlign: LabelAlign
  disabled: boolean
  setFieldValue: (name: string, value: any) => void
  setFieldTouched: (name: string, touched: boolean) => void
  validateField: (name: string, rules?: FormRule[]) => Promise<boolean>
  clearFieldError: (name: string) => void
  registerField: (name: string, rules?: FormRule[]) => void
  unregisterField: (name: string) => void
}

export const formContextKey: InjectionKey<FormContext> = Symbol('formContext')

export interface FormProps {
  layout?: FormLayout
  floatingLabel?: boolean
  labelWidth?: string | number
  labelAlign?: LabelAlign
  disabled?: boolean
  initialValues?: Record<string, any>
}
</script>

<script setup lang="ts">
import { ref, computed, provide, reactive, useAttrs } from 'vue'

const props = withDefaults(defineProps<FormProps>(), {
  layout: 'vertical',
  floatingLabel: false,
  labelAlign: 'right',
  disabled: false,
  initialValues: () => ({})
})

const emit = defineEmits<{
  (e: 'finish', values: Record<string, any>): void
  (e: 'finishFailed', errors: Record<string, string>): void
  (e: 'valuesChange', changedValues: Record<string, any>, allValues: Record<string, any>): void
}>()

const attrs = useAttrs()

const values = reactive<Record<string, any>>({ ...props.initialValues })
const errors = reactive<Record<string, string>>({})
const touched = reactive<Record<string, boolean>>({})
const validating = reactive<Record<string, boolean>>({})
const fieldRules = ref<Record<string, FormRule[]>>({})

const validateValue = async (value: any, rules: FormRule[]): Promise<string | null> => {
  for (const rule of rules) {
    if (rule.required && (value === undefined || value === null || value === '')) {
      return rule.message || '此字段为必填项'
    }
    if (rule.min !== undefined && typeof value === 'string' && value.length < rule.min) {
      return rule.message || `最少需要 ${rule.min} 个字符`
    }
    if (rule.max !== undefined && typeof value === 'string' && value.length > rule.max) {
      return rule.message || `最多允许 ${rule.max} 个字符`
    }
    if (rule.pattern && !rule.pattern.test(String(value))) {
      return rule.message || '格式不正确'
    }
    if (rule.validator) {
      try {
        const result = await rule.validator(value)
        if (!result) {
          return rule.message || '验证失败'
        }
      } catch {
        return rule.message || '验证失败'
      }
    }
  }
  return null
}

const setFieldValue = (name: string, value: any) => {
  const oldValue = values[name]
  values[name] = value
  if (oldValue !== value) {
    emit('valuesChange', { [name]: value }, { ...values })
  }
}

const setFieldTouched = (name: string, isTouched: boolean) => {
  touched[name] = isTouched
}

const validateField = async (name: string, rules?: FormRule[]): Promise<boolean> => {
  const fieldRulesList = rules || fieldRules.value[name] || []
  if (fieldRulesList.length === 0) return true

  validating[name] = true
  const error = await validateValue(values[name], fieldRulesList)
  validating[name] = false

  if (error) {
    errors[name] = error
    return false
  } else {
    delete errors[name]
    return true
  }
}

const clearFieldError = (name: string) => {
  delete errors[name]
}

const registerField = (name: string, rules?: FormRule[]) => {
  if (rules) {
    fieldRules.value[name] = rules
  }
}

const unregisterField = (name: string) => {
  delete fieldRules.value[name]
  delete errors[name]
  delete touched[name]
  delete validating[name]
}

const validate = async (): Promise<boolean> => {
  const names = Object.keys(fieldRules.value)
  const results = await Promise.all(names.map(name => validateField(name)))
  return results.every(Boolean)
}

const resetFields = () => {
  Object.keys(values).forEach(key => {
    values[key] = props.initialValues[key]
  })
  Object.keys(errors).forEach(key => delete errors[key])
  Object.keys(touched).forEach(key => delete touched[key])
}

const clearValidate = (names?: string | string[]) => {
  if (!names) {
    Object.keys(errors).forEach(key => delete errors[key])
  } else {
    const nameList = Array.isArray(names) ? names : [names]
    nameList.forEach(name => delete errors[name])
  }
}

const getFieldValue = (name: string) => values[name]
const getFieldsValue = () => ({ ...values })
const setFieldsValue = (newValues: Record<string, any>) => {
  Object.entries(newValues).forEach(([name, value]) => {
    setFieldValue(name, value)
  })
}

const context: FormContext = {
  values,
  errors,
  touched,
  validating,
  get layout() { return props.layout },
  get floatingLabel() { return props.floatingLabel },
  get labelWidth() { return props.labelWidth },
  get labelAlign() { return props.labelAlign },
  get disabled() { return props.disabled },
  setFieldValue,
  setFieldTouched,
  validateField,
  clearFieldError,
  registerField,
  unregisterField
}

provide(formContextKey, context)

const formInstance: FormInstance = {
  validate,
  validateField,
  resetFields,
  clearValidate,
  getFieldValue,
  getFieldsValue,
  setFieldValue,
  setFieldsValue
}

const handleSubmit = async (event: Event) => {
  event.preventDefault()
  const isValid = await validate()
  if (isValid) {
    emit('finish', { ...values })
  } else {
    emit('finishFailed', { ...errors })
  }
}

const formClasses = computed(() => [
  'apron-form',
  `apron-form--${props.layout}`,
  {
    'apron-form--floating-label': props.floatingLabel,
    'apron-form--disabled': props.disabled
  }
])

defineExpose(formInstance)
</script>

<template>
  <form :class="formClasses" @submit="handleSubmit" v-bind="attrs">
    <slot />
  </form>
</template>

<style lang="less">
@import './Form.less';
</style>

