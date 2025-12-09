import { createApp, h, ref, watch } from 'vue'
import type { ToastType, ToastOptions } from './types.ts'

// 成功图标
const SuccessIcon = () => h('svg', {
  width: '64',
  height: '64',
  viewBox: '0 0 64 64',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg'
}, [
  h('circle', {
    cx: '32',
    cy: '32',
    r: '30',
    fill: '#22c55e'
  }),
  h('path', {
    d: 'M20 32L28 40L44 24',
    stroke: 'white',
    'stroke-width': '4',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round'
  })
])

// 失败图标
const FailIcon = () => h('svg', {
  width: '64',
  height: '64',
  viewBox: '0 0 64 64',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg'
}, [
  h('circle', {
    cx: '32',
    cy: '32',
    r: '30',
    fill: '#dc2626'
  }),
  h('path', {
    d: 'M22 22L42 42M42 22L22 42',
    stroke: 'white',
    'stroke-width': '4',
    'stroke-linecap': 'round'
  })
])

// 危险图标
const DangerIcon = () => h('svg', {
  width: '64',
  height: '64',
  viewBox: '0 0 64 64',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg'
}, [
  h('path', {
    d: 'M32 6L60 56H4L32 6Z',
    fill: '#eab308',
    stroke: '#eab308',
    'stroke-width': '2',
    'stroke-linejoin': 'round'
  }),
  h('path', {
    d: 'M32 26V38',
    stroke: 'white',
    'stroke-width': '4',
    'stroke-linecap': 'round'
  }),
  h('circle', {
    cx: '32',
    cy: '46',
    r: '2.5',
    fill: 'white'
  })
])

// 加载图标
const LoadingIcon = () => h('svg', {
  width: '64',
  height: '64',
  viewBox: '0 0 64 64',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  class: 'apron-toast__loading-icon'
}, [
  h('path', {
    d: 'M32 8C18.745 8 8 18.745 8 32',
    stroke: '#1d4ed8',
    'stroke-width': '6',
    'stroke-linecap': 'round'
  })
])

const iconMap: Record<ToastType, () => any> = {
  success: SuccessIcon,
  fail: FailIcon,
  danger: DangerIcon,
  loading: LoadingIcon
}

// Toast 内容组件
const ToastContent = (props: { type: ToastType; text?: string; icon?: any }) => {
  return h('div', { class: 'apron-toast__content' }, [
    h('div', { class: 'apron-toast__icon' }, [
      props.icon || h(iconMap[props.type])
    ]),
    props.text && h('div', { class: 'apron-toast__text' }, props.text)
  ])
}

// Toast 容器组件
const ToastContainer = (props: { visible: boolean; options: ToastOptions }) => {
  const isVisible = ref(false)
  const isAnimating = ref(false)

  // 监听visible变化
  const updateVisibility = () => {
    if (props.visible) {
      isVisible.value = true
      isAnimating.value = true
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isAnimating.value = false
        })
      })
    } else {
      isAnimating.value = true
      setTimeout(() => {
        isVisible.value = false
        isAnimating.value = false
      }, 300)
    }
  }

  // 监听props.visible变化
  watch(() => props.visible, updateVisibility, { immediate: true })

  return () => {
    if (!isVisible.value) return null

    const classNames = [
      'apron-toast',
      props.visible && !isAnimating.value && 'apron-toast--visible',
      isAnimating.value && (props.visible ? 'apron-toast--entering' : 'apron-toast--leaving')
    ].filter(Boolean).join(' ')

    return h('div', { class: 'apron-toast__overlay' }, [
      h('div', { class: classNames }, [
        h(ToastContent({
          type: props.options.type || 'success',
          text: props.options.text,
          icon: props.options.icon
        }))
      ])
    ])
  }
}

// 全局状态管理
let toastContainer: HTMLDivElement | null = null
let toastApp: any = null
let setGlobalVisible: ((visible: boolean) => void) | null = null
let setGlobalOptions: ((options: ToastOptions) => void) | null = null
let autoCloseTimer: ReturnType<typeof setTimeout> | null = null

const GlobalToastManager = () => {
  const visible = ref(false)
  const options = ref<ToastOptions>({})

  setGlobalVisible = (val: boolean) => {
    visible.value = val
  }

  setGlobalOptions = (opts: ToastOptions) => {
    options.value = opts
  }

  return h(ToastContainer({
    visible: visible.value,
    options: options.value
  }))
}

// SSR 检查
const canUseDOM = typeof window !== 'undefined' && typeof document !== 'undefined'

// 确保容器存在
const ensureContainer = () => {
  if (!canUseDOM) return

  if (!toastContainer) {
    toastContainer = document.createElement('div')
    toastContainer.className = 'apron-toast-root'
    document.body.appendChild(toastContainer)
    toastApp = createApp(GlobalToastManager)
    toastApp.mount(toastContainer)
  }
}

// 显示 Toast
const showToast = (options: ToastOptions) => {
  ensureContainer()

  // 清除之前的自动关闭定时器
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
    autoCloseTimer = null
  }

  setTimeout(() => {
    if (setGlobalOptions) {
      setGlobalOptions(options)
    }
    if (setGlobalVisible) {
      setGlobalVisible(true)
    }

    // 自动关闭（loading 类型默认不自动关闭）
    const duration = options.duration ?? (options.type === 'loading' ? 0 : 2000)
    if (duration > 0) {
      autoCloseTimer = setTimeout(() => {
        if (setGlobalVisible) {
          setGlobalVisible(false)
        }
      }, duration)
    }
  }, 0)
}

// 关闭 Toast
const closeToast = () => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
    autoCloseTimer = null
  }
  if (setGlobalVisible) {
    setGlobalVisible(false)
  }
}

// 解析参数
const parseArgs = (
  textOrOptions?: string | ToastOptions,
  type?: ToastType
): ToastOptions => {
  if (typeof textOrOptions === 'string') {
    return { text: textOrOptions, type }
  }
  return { ...textOrOptions, type: textOrOptions?.type ?? type }
}

// 导出的 Toast 对象
export const Toast = {
  show: (options: ToastOptions) => showToast(options),
  close: closeToast,
  success: (textOrOptions?: string | Omit<ToastOptions, 'type'>) =>
    showToast(parseArgs(textOrOptions as string | ToastOptions, 'success')),
  fail: (textOrOptions?: string | Omit<ToastOptions, 'type'>) =>
    showToast(parseArgs(textOrOptions as string | ToastOptions, 'fail')),
  danger: (textOrOptions?: string | Omit<ToastOptions, 'type'>) =>
    showToast(parseArgs(textOrOptions as string | ToastOptions, 'danger')),
  loading: (textOrOptions?: string | Omit<ToastOptions, 'type'>) =>
    showToast(parseArgs(textOrOptions as string | ToastOptions, 'loading'))
}