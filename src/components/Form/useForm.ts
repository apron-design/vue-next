import { ref, type Ref } from 'vue'
import type { FormInstance } from './Form.vue'

export function useForm(): [Ref<FormInstance | null>, FormInstance] {
  const formRef = ref<FormInstance | null>(null)

  const formInstance: FormInstance = {
    validate: () => {
      if (!formRef.value) return Promise.resolve(false)
      return formRef.value.validate()
    },
    validateField: (name: string) => {
      if (!formRef.value) return Promise.resolve(false)
      return formRef.value.validateField(name)
    },
    resetFields: () => {
      formRef.value?.resetFields()
    },
    clearValidate: (names?: string | string[]) => {
      formRef.value?.clearValidate(names)
    },
    getFieldValue: (name: string) => {
      return formRef.value?.getFieldValue(name)
    },
    getFieldsValue: () => {
      return formRef.value?.getFieldsValue() ?? {}
    },
    setFieldValue: (name: string, value: any) => {
      formRef.value?.setFieldValue(name, value)
    },
    setFieldsValue: (values: Record<string, any>) => {
      formRef.value?.setFieldsValue(values)
    }
  }

  return [formRef, formInstance]
}

