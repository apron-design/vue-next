<template>
  <form :class="classes" @submit="handleSubmit">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { ref, computed, reactive, provide, watch, watchEffect } from 'vue'
import type { Ref } from 'vue'

export type FormLayout = 'horizontal' | 'vertical' | 'inline'

export interface FormInstance<T = Record<string, unknown>> {
  getFieldValue: (name: keyof T) => unknown
  getFieldsValue: () => T
  setFieldValue: (name: keyof T, value: unknown) => void
  setFieldsValue: (values: Partial<T>) => void
  resetFields: () => void
  validateFields: () => Promise<T>
  validateField: (name: keyof T) => Promise<unknown>
  getFieldError: (name: keyof T) => string | undefined
  getFieldsError: () => Record<keyof T, string | undefined>
  isFieldTouched: (name: keyof T) => boolean
  isFieldValidating: (name: keyof T) => boolean
  submit: () => void
}

export interface FormProps<T = Record<string, unknown>> {
  /** 表单实例 */
  form?: FormInstance<T>
  /** 初始值 */
  initialValues?: Partial<T>
  /** 表单布局 */
  layout?: FormLayout
  /** 是否使用浮动标签 */
  floatingLabel?: boolean
  /** 标签宽度（horizontal 布局时有效） */
  labelWidth?: number | string
  /** 标签对齐方式 */
  labelAlign?: 'left' | 'right'
  /** 是否禁用整个表单 */
  disabled?: boolean
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<FormProps>(), {
  layout: 'vertical',
  floatingLabel: false,
  labelAlign: 'right',
  disabled: false,
  initialValues: () => ({})
})

const emit = defineEmits<{
  (e: 'finish', values: Record<string, unknown>): void
  (e: 'finishFailed', errors: Record<string, string>): void
  (e: 'valuesChange', changedValues: Partial<Record<string, unknown>>, allValues: Record<string, unknown>): void
}>()

// 内部状态
const values = ref<Record<string, unknown>>({ ...props.initialValues }) as Ref<Record<string, unknown>>
const errors = reactive<Record<string, string | undefined>>({})
const touched = reactive<Record<string, boolean>>({})
const validating = reactive<Record<string, boolean>>({})
const fields = ref<Record<string, ValidationRule[]>>({})

// 验证规则
export interface ValidationRule {
  required?: boolean
  message?: string
  min?: number
  max?: number
  pattern?: RegExp
  validator?: (value: unknown) => Promise<void> | void
  type?: 'string' | 'number' | 'email' | 'url'
}

// 验证函数
const validateValue = async (
  value: unknown,
  rules: ValidationRule[]
): Promise<string | undefined> => {
  for (const rule of rules) {
    // Required
    if (rule.required) {
      if (value === undefined || value === null || value === '') {
        return rule.message || '此字段为必填项'
      }
    }

    // 如果值为空且不是 required，跳过后续验证
    if (value === undefined || value === null || value === '') {
      continue
    }

    // Min length
    if (rule.min !== undefined && typeof value === 'string') {
      if (value.length < rule.min) {
        return rule.message || `最少需要 ${rule.min} 个字符`
      }
    }

    // Max length
    if (rule.max !== undefined && typeof value === 'string') {
      if (value.length > rule.max) {
        return rule.message || `最多允许 ${rule.max} 个字符`
      }
    }

    // Pattern
    if (rule.pattern && typeof value === 'string') {
      if (!rule.pattern.test(value)) {
        return rule.message || '格式不正确'
      }
    }

    // Type validation
    if (rule.type) {
      switch (rule.type) {
        case 'email':
          if (typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return rule.message || '请输入有效的邮箱地址'
          }
          break
        case 'url':
          if (typeof value === 'string') {
            try {
              new URL(value)
            } catch {
              return rule.message || '请输入有效的 URL'
            }
          }
          break
        case 'number':
          if (isNaN(Number(value))) {
            return rule.message || '请输入数字'
          }
          break
      }
    }

    // Custom validator
    if (rule.validator) {
      try {
        await rule.validator(value)
      } catch (e) {
        return rule.message || (e instanceof Error ? e.message : '验证失败')
      }
    }
  }

  return undefined
}

// 获取字段值
const getFieldValue = (name: string) => values.value[name]

// 设置字段值
const setFieldValue = (name: string, value: unknown) => {
  const newValues = { ...values.value, [name]: value }
  values.value = newValues
  emit('valuesChange', { [name]: value }, newValues)
}

// 获取字段错误
const getFieldError = (name: string) => errors[name]

// 设置字段错误
const setFieldError = (name: string, error: string | undefined) => {
  errors[name] = error
}

// 设置字段已触摸
const setFieldTouched = (name: string, isTouched: boolean) => {
  touched[name] = isTouched
}

// 设置字段验证中
const setFieldValidating = (name: string, isValidating: boolean) => {
  validating[name] = isValidating
}

// 注册字段
const registerField = (name: string, rules?: ValidationRule[]) => {
  fields.value[name] = rules || []
}

// 注销字段
const unregisterField = (name: string) => {
  delete fields.value[name]
  delete values.value[name]
  delete errors[name]
  delete touched[name]
  delete validating[name]
}

// 验证单个字段
const validateField = async (name: string): Promise<unknown> => {
  const rules = fields.value[name] || []
  if (rules.length === 0) return values.value[name]

  setFieldValidating(name, true)
  const error = await validateValue(values.value[name], rules)
  setFieldError(name, error)
  setFieldValidating(name, false)

  if (error) {
    throw new Error(error)
  }
  return values.value[name]
}

// 验证所有字段
const validateFields = async (): Promise<Record<string, unknown>> => {
  const fieldNames = Object.keys(fields.value)
  const newErrors: Record<string, string | undefined> = {}
  let hasError = false

  for (const name of fieldNames) {
    const rules = fields.value[name] || []
    if (rules.length > 0) {
      setFieldValidating(name, true)
      const error = await validateValue(values.value[name], rules)
      newErrors[name] = error
      setFieldValidating(name, false)
      if (error) hasError = true
    }
  }

  Object.assign(errors, newErrors)

  if (hasError) {
    throw newErrors
  }

  return values.value
}

// 重置表单
const resetFields = () => {
  values.value = { ...props.initialValues }
  Object.keys(errors).forEach(key => delete errors[key])
  Object.keys(touched).forEach(key => delete touched[key])
}

// 提交表单
const handleSubmit = async (e: Event) => {
  e.preventDefault()
  try {
    const validatedValues = await validateFields()
    emit('finish', validatedValues)
  } catch (err) {
    emit('finishFailed', err as Record<string, string>)
  }
}

// Context 值
provide('formContext', {
  layout: props.layout,
  floatingLabel: props.floatingLabel,
  labelWidth: props.labelWidth,
  labelAlign: props.labelAlign,
  disabled: props.disabled,
  values: values.value,
  errors,
  touched,
  validating,
  getFieldValue,
  setFieldValue,
  getFieldError,
  setFieldError,
  setFieldTouched,
  setFieldValidating,
  registerField,
  unregisterField,
  validateField,
})

// 如果提供了外部 form 实例，则同步方法
watchEffect(() => {
  if (props.form) {
    Object.assign(props.form, {
      getFieldValue,
      getFieldsValue: () => values.value,
      setFieldValue,
      setFieldsValue: (newValues: Partial<Record<string, unknown>>) => {
        values.value = { ...values.value, ...newValues }
      },
      resetFields,
      validateFields,
      validateField,
      getFieldError,
      getFieldsError: () => errors,
      isFieldTouched: (name: string) => touched[name] || false,
      isFieldValidating: (name: string) => validating[name] || false,
      submit: () => handleSubmit(new Event('submit')),
    })
  }
})

const classes = computed(() => [
  'apron-form',
  `apron-form--${props.layout}`,
  props.floatingLabel && 'apron-form--floating-label',
  props.disabled && 'apron-form--disabled',
  props.class,
].filter(Boolean).join(' '))
</script>

<style lang="less">
@import '../../styles/variables.less';

// ============================================
// Form CSS Variables (Light Mode)
// ============================================
:root {
  --apron-form-label-color: @color-primary-500;
  --apron-form-label-required-color: @color-error-500;
  --apron-form-help-color: @color-neutral-500;
  --apron-form-error-color: @color-error-500;
  --apron-form-extra-color: @color-neutral-400;

  // Floating label
  --apron-form-floating-label-color: @color-primary-300;
  --apron-form-floating-label-active-color: @color-primary-500;
  --apron-form-floating-label-bg: #ffffff;
}

// ============================================
// Form CSS Variables (Dark Mode)
// ============================================
.dark,
[data-prefers-color='dark'] {
  --apron-form-label-color: @color-primary-200;
  --apron-form-label-required-color: @color-error-500;
  --apron-form-help-color: @color-neutral-400;
  --apron-form-error-color: @color-error-500;
  --apron-form-extra-color: @color-neutral-500;

  // Floating label
  --apron-form-floating-label-color: @color-neutral-500;
  --apron-form-floating-label-active-color: @color-primary-200;
  --apron-form-floating-label-bg: @color-neutral-900;
}

// ============================================
// Form Base Styles
// ============================================
.apron-form {
  font-family: var(--apron-font-family);
  font-size: @font-size-base;

  // Vertical layout (default)
  &--vertical {
    .apron-form-item {
      display: flex;
      flex-direction: column;
    }
  }

  // Horizontal layout
  &--horizontal {
    .apron-form-item {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
    }

    .apron-form-item__label {
      flex-shrink: 0;
      padding-top: 8px; // 对齐输入框
      padding-right: @spacing-3;
    }

    .apron-form-item__control {
      flex: 1;
    }
  }

  // Inline layout
  &--inline {
    display: flex;
    flex-wrap: wrap;
    gap: @spacing-4;

    .apron-form-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 0;
    }

    .apron-form-item__label {
      padding-right: @spacing-2;
      margin-bottom: 0;
    }
  }

  // Disabled state
  &--disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}
</style>