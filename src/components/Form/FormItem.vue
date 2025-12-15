<template>
  <div :class="classes">
    <!-- 标签 -->
    <label
      v-if="!noLabel && label && !useFloatingLabel"
      :for="itemId"
      class="apron-form-item__label"
      :style="labelStyle"
    >
      {{ label }}
      <span v-if="isRequired" class="apron-form-item__required">*</span>
    </label>

    <!-- 控件容器 -->
    <div class="apron-form-item__control">
      <!-- 浮动标签 -->
      <label
        v-if="useFloatingLabel && label"
        :for="itemId"
        class="apron-form-item__floating-label"
      >
        {{ label }}
        <span v-if="isRequired" class="apron-form-item__required">*</span>
      </label>

      <!-- 子元素 -->
      <div class="apron-form-item__content">
        <slot />
      </div>

      <!-- 错误信息 -->
      <div v-if="error" class="apron-form-item__error">{{ error }}</div>

      <!-- 帮助文本 -->
      <div v-else-if="help" class="apron-form-item__help">{{ help }}</div>

      <!-- 额外提示 -->
      <div v-if="extra" class="apron-form-item__extra">{{ extra }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted, onUnmounted, watch } from 'vue'
import type { Ref } from 'vue'

interface FormContext {
  layout: string
  floatingLabel: boolean
  labelWidth?: number | string
  labelAlign: 'left' | 'right'
  disabled: boolean
  values: Record<string, unknown>
  errors: Record<string, string | undefined>
  touched: Record<string, boolean>
  validating: Record<string, boolean>
  getFieldValue: (name: string) => unknown
  setFieldValue: (name: string, value: unknown) => void
  getFieldError: (name: string) => string | undefined
  setFieldError: (name: string, error: string | undefined) => void
  setFieldTouched: (name: string, touched: boolean) => void
  setFieldValidating: (name: string, validating: boolean) => void
  registerField: (name: string, rules?: ValidationRule[]) => void
  unregisterField: (name: string) => void
  validateField: (name: string) => Promise<unknown>
}

export interface ValidationRule {
  required?: boolean
  message?: string
  min?: number
  max?: number
  pattern?: RegExp
  validator?: (value: unknown) => Promise<void> | void
  type?: 'string' | 'number' | 'email' | 'url'
}

export interface FormItemProps {
  /** 字段名 */
  name?: string
  /** 标签文本 */
  label?: string
  /** 是否必填（显示红色星号） */
  required?: boolean
  /** 验证规则 */
  rules?: ValidationRule[]
  /** 是否使用浮动标签（覆盖 Form 级别设置） */
  floatingLabel?: boolean
  /** 帮助文本 */
  help?: string
  /** 额外提示 */
  extra?: string
  /** 是否隐藏标签 */
  noLabel?: boolean
  /** 自定义类名 */
  class?: string
  /** 标签宽度（覆盖 Form 级别设置） */
  labelWidth?: number | string
  /** 值属性名 */
  valuePropName?: string
  /** 触发方式 */
  trigger?: string
  /** 验证触发方式 */
  validateTrigger?: string | string[]
}

const props = withDefaults(defineProps<FormItemProps>(), {
  rules: () => [],
  valuePropName: 'value',
  trigger: 'onChange',
  validateTrigger: 'onBlur'
})

// 获取表单上下文
const formContext = inject<FormContext>('formContext')

if (!formContext) {
  throw new Error('FormItem must be used within a Form')
}

// 生成唯一ID
const itemId = ref(`form-item-${Math.random().toString(36).substr(2, 9)}`)
const isFocused = ref(false)

// 确定是否使用浮动标签
const useFloatingLabel = computed(() => props.floatingLabel ?? formContext.floatingLabel)

// 确定标签宽度
const labelWidth = computed(() => props.labelWidth ?? formContext.labelWidth)

// 合并 required 规则
const mergedRules = computed(() => {
  if (props.required && !props.rules.some((r) => r.required)) {
    return [{ required: true, message: `${props.label || props.name} 是必填项` }, ...props.rules]
  }
  return props.rules
})

// 是否有必填规则
const isRequired = computed(() => props.required || mergedRules.value.some((r) => r.required))

// 注册/注销字段
onMounted(() => {
  if (props.name) {
    formContext.registerField(props.name, mergedRules.value)
  }
})

onUnmounted(() => {
  if (props.name) {
    formContext.unregisterField(props.name)
  }
})

// 获取字段值和错误
const value = computed(() => props.name ? formContext.getFieldValue(props.name) : undefined)
const error = computed(() => props.name ? formContext.getFieldError(props.name) : undefined)

// 是否有值
const hasValue = computed(() => value.value !== undefined && value.value !== null && value.value !== '')

// 处理值变化
const handleChange = (newValue: unknown) => {
  if (props.name) {
    formContext.setFieldValue(props.name, newValue)
    formContext.setFieldTouched(props.name, true)

    // 如果 validateTrigger 包含 onChange，则触发验证
    const triggers = Array.isArray(props.validateTrigger) ? props.validateTrigger : [props.validateTrigger]
    if (triggers.includes('onChange')) {
      formContext.validateField(props.name).catch(() => {})
    }
  }
}

// 处理失焦
const handleBlur = () => {
  isFocused.value = false
  if (props.name) {
    formContext.setFieldTouched(props.name, true)

    // 如果 validateTrigger 包含 onBlur，则触发验证
    const triggers = Array.isArray(props.validateTrigger) ? props.validateTrigger : [props.validateTrigger]
    if (triggers.includes('onBlur')) {
      formContext.validateField(props.name).catch(() => {})
    }
  }
}

// 处理聚焦
const handleFocus = () => {
  isFocused.value = true
}

const classes = computed(() => [
  'apron-form-item',
  `apron-form-item--${formContext.layout}`,
  useFloatingLabel.value && 'apron-form-item--floating-label',
  useFloatingLabel.value && (isFocused.value || hasValue.value) && 'apron-form-item--floating-active',
  error.value && 'apron-form-item--error',
  isRequired.value && 'apron-form-item--required',
  formContext.disabled && 'apron-form-item--disabled',
  props.class,
].filter(Boolean).join(' '))

const labelStyle = computed(() => {
  const style: Record<string, string> = {}
  if (labelWidth.value && formContext.layout === 'horizontal') {
    style.width = typeof labelWidth.value === 'number' ? `${labelWidth.value}px` : String(labelWidth.value)
    style.textAlign = formContext.labelAlign
  }
  return style
})

// 暴露方法给父组件
defineExpose({
  focus: handleFocus,
  blur: handleBlur,
  validate: () => props.name ? formContext.validateField(props.name) : Promise.resolve()
})
</script>

<style lang="less">
@import '../../styles/variables.less';
@import '../../styles/mixins.less';

// ============================================
// Form Item Base Styles
// ============================================
.apron-form-item {
  margin-bottom: @spacing-5;

  // Label
  &__label {
    display: inline-flex;
    align-items: center;
    margin-bottom: 10px;
    color: var(--apron-form-label-color);
    font-weight: @font-weight-semibold;
    font-size: @font-size-base;
    line-height: 1.5;
  }

  // Required asterisk
  &__required {
    color: var(--apron-form-label-required-color);
    margin-left: 4px;
  }

  // Control container
  &__control {
    position: relative;
    flex: 1;
  }

  // Content (holds the actual input)
  &__content {
    position: relative;
  }

  // Error message
  &__error {
    margin-top: @spacing-1;
    color: var(--apron-form-error-color);
    font-size: @font-size-sm;
    line-height: 1.5;
  }

  // Help text
  &__help {
    margin-top: @spacing-1;
    color: var(--apron-form-help-color);
    font-size: @font-size-sm;
    line-height: 1.5;
  }

  // Extra text
  &__extra {
    margin-top: @spacing-1;
    color: var(--apron-form-extra-color);
    font-size: @font-size-sm;
    line-height: 1.5;
  }

  // Error state
  &--error {
    .apron-input,
    .apron-select__trigger,
    .apron-textarea {
      border-color: var(--apron-form-error-color) !important;
    }
  }

  // ============================================
  // Floating Label Mode
  // ============================================
  &--floating-label {
    .apron-form-item__control {
      position: relative;
    }

    .apron-form-item__floating-label {
      position: absolute;
      top: 50%;
      left: @spacing-4;
      transform: translateY(-50%);
      color: var(--apron-form-floating-label-color);
      font-size: @font-size-base;
      font-weight: @font-weight-normal;
      pointer-events: none;
      transition: all @transition-fast;
      z-index: 1;
      background-color: transparent;
      padding: 0 4px;
      margin-left: -4px;
    }

    .apron-form-item__required {
      color: var(--apron-form-label-required-color);
      margin-left: 2px;
    }

    // 当激活时（focus 或有值）
    &.apron-form-item--floating-active {
      .apron-form-item__floating-label {
        top: 0;
        transform: translateY(-50%);
        font-size: @font-size-xs;
        font-weight: @font-weight-medium;
        color: var(--apron-form-floating-label-active-color);
        background-color: var(--apron-form-floating-label-bg);
      }
    }

    // 错误状态下的浮动标签
    &.apron-form-item--error {
      .apron-form-item__floating-label {
        color: var(--apron-form-error-color);
      }
    }

    // 隐藏原本的 placeholder
    .apron-input__inner::placeholder,
    .apron-textarea__inner::placeholder,
    .apron-select__value--placeholder {
      opacity: 0;
    }

    // 激活时显示 placeholder（如果需要）
    &.apron-form-item--floating-active {
      .apron-input__inner::placeholder,
      .apron-textarea__inner::placeholder {
        opacity: 1;
      }
    }
  }

  // Disabled state
  &--disabled {
    .apron-form-item__label,
    .apron-form-item__floating-label {
      opacity: 0.6;
    }
  }
}

// ============================================
// Adjustments for different form controls
// ============================================

// Input with floating label
.apron-form-item--floating-label {
  // 确保输入框在浮动标签模式下有正确的样式
  .apron-input,
  .apron-select__trigger {
    // 激活状态时保持白色背景
    &:focus-within {
      background-color: var(--apron-form-floating-label-bg);
    }
  }
}
</style>