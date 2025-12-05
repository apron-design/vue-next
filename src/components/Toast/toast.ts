import { createApp, h, ref, type App, type Component } from 'vue'
import ToastComponent from './Toast.vue'

export type ToastType = 'success' | 'fail' | 'danger' | 'loading'

export interface ToastOptions {
  type?: ToastType
  text?: string
  icon?: Component
  duration?: number
}

let toastInstance: App | null = null
let toastContainer: HTMLDivElement | null = null

const visible = ref(false)
const currentOptions = ref<ToastOptions>({})

const createToast = () => {
  if (toastInstance) return

  toastContainer = document.createElement('div')
  document.body.appendChild(toastContainer)

  toastInstance = createApp({
    render() {
      return h(ToastComponent, {
        visible: visible.value,
        type: currentOptions.value.type || 'success',
        text: currentOptions.value.text,
        icon: currentOptions.value.icon,
        duration: currentOptions.value.duration || 2000,
        'onUpdate:visible': (val: boolean) => {
          visible.value = val
        }
      })
    }
  })

  toastInstance.mount(toastContainer)
}

const show = (options: ToastOptions | string) => {
  createToast()
  
  if (typeof options === 'string') {
    currentOptions.value = { text: options }
  } else {
    currentOptions.value = options
  }
  
  visible.value = true
}

const close = () => {
  visible.value = false
}

const success = (text: string, duration?: number) => {
  show({ type: 'success', text, duration })
}

const fail = (text: string, duration?: number) => {
  show({ type: 'fail', text, duration })
}

const danger = (text: string, duration?: number) => {
  show({ type: 'danger', text, duration })
}

const loading = (text?: string) => {
  show({ type: 'loading', text: text || '加载中...', duration: 0 })
}

export const Toast = {
  show,
  close,
  success,
  fail,
  danger,
  loading
}

export default Toast

