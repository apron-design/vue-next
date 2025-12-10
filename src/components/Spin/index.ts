import AdSpin from './Spin.vue'
import type { SpinProps, SpinPlacement } from './types'
import { createApp, ref, h, watch, onUnmounted, defineComponent, type PropType, type VNode } from 'vue'

export type { SpinProps, SpinPlacement }
export { AdSpin }

// 导入样式
import './Spin.less'

// 全局实例管理（与组件内部保持一致）
let spinContainer: HTMLDivElement | null = null
let spinInstance: any = null

// 默认加载动画图标（与组件内部保持一致）
const DefaultSpinIcon = defineComponent({
  name: 'DefaultSpinIcon',
  setup() {
    return () =>
      h(
        'svg',
        {
          class: 'apron-spin__icon-svg',
          width: '32',
          height: '32',
          viewBox: '0 0 32 32',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg'
        },
        [
          h('circle', {
            cx: '16',
            cy: '16',
            r: '14',
            stroke: 'currentColor',
            'stroke-width': '3',
            'stroke-linecap': 'round',
            opacity: '0.25'
          }),
          h('path', {
            d: 'M16 2C8.268 2 2 8.268 2 16',
            stroke: 'currentColor',
            'stroke-width': '3',
            'stroke-linecap': 'round'
          })
        ]
      )
  }
})

// Spin 内容组件（与组件内部保持一致）
const SpinContent = defineComponent({
  name: 'SpinContent',
  props: {
    icon: [Object, Function] as PropType<VNode | (() => VNode)>,
    text: {
      type: String,
      default: ''
    },
    placement: {
      type: String as PropType<SpinPlacement>,
      default: 'center'
    }
  },
  setup(props) {
    const isCenter = props.placement === 'center'

    return () => {
      const contentClasses = [
        'apron-spin__content',
        `apron-spin__content--${props.placement}`,
        {
          'apron-spin__content--vertical': isCenter,
          'apron-spin__content--horizontal': !isCenter
        }
      ]

      return h(
        'div',
        {
          class: contentClasses
        },
        [
          h('span', { class: 'apron-spin__icon' }, [
            props.icon
              ? typeof props.icon === 'function'
                ? props.icon()
                : props.icon
              : h(DefaultSpinIcon)
          ]),
          props.text &&
            h('span', { class: 'apron-spin__text' }, props.text)
        ].filter(Boolean)
      )
    }
  }
})

// FullscreenSpin 组件（与组件内部保持一致）
const FullscreenSpinWrapper = defineComponent({
  name: 'FullscreenSpinWrapper',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    options: {
      type: Object as PropType<Omit<SpinProps, 'loading' | 'children'>>,
      default: () => ({})
    }
  },
  setup(props) {
    const isVisible = ref(false)
    const isAnimating = ref(false)

    let timer: number | null = null

    const updateVisibility = () => {
      if (props.visible) {
        // 如果已经可见，先关闭再打开以重新触发动画
        if (isVisible.value) {
          isAnimating.value = true
          if (timer) clearTimeout(timer)
          timer = window.setTimeout(() => {
            isVisible.value = false
            isAnimating.value = false
            // 立即重新打开
            requestAnimationFrame(() => {
              isVisible.value = true
              isAnimating.value = true
              document.body.style.overflow = 'hidden'
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  isAnimating.value = false
                })
              })
            })
          }, 300) as unknown as number
        } else {
          // 首次打开
          isVisible.value = true
          isAnimating.value = true
          document.body.style.overflow = 'hidden'
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              isAnimating.value = false
            })
          })
        }
      } else {
        // 关闭
        if (isVisible.value) {
          isAnimating.value = true
          if (timer) clearTimeout(timer)
          timer = window.setTimeout(() => {
            isVisible.value = false
            isAnimating.value = false
            document.body.style.overflow = ''
          }, 300) as unknown as number
        }
      }
    }

    watch(() => props.visible, updateVisibility, { immediate: true })

    onUnmounted(() => {
      if (timer) clearTimeout(timer)
      document.body.style.overflow = ''
    })

    return () => {
      if (!isVisible.value) return null

      const classNames = [
        'apron-spin',
        'apron-spin--fullscreen',
        props.visible && !isAnimating.value && 'apron-spin--visible',
        isAnimating.value &&
          (props.visible ? 'apron-spin--entering' : 'apron-spin--leaving'),
        props.options?.className
      ]
        .filter(Boolean)
        .join(' ')

      const overlayClassNames = [
        'apron-spin__overlay',
        props.visible && !isAnimating.value && 'apron-spin__overlay--visible',
        isAnimating.value &&
          (props.visible
            ? 'apron-spin__overlay--entering'
            : 'apron-spin__overlay--leaving')
      ]
        .filter(Boolean)
        .join(' ')

      return h(
        'div',
        { class: classNames },
        h(
          'div',
          { class: overlayClassNames },
          h(SpinContent, {
            icon: props.options?.icon,
            text: props.options?.text,
            placement: props.options?.placement
          })
        )
      )
    }
  }
})

// 确保全局容器存在
const ensureContainer = () => {
  if (!spinContainer) {
    spinContainer = document.createElement('div')
    spinContainer.className = 'apron-spin-root'
    document.body.appendChild(spinContainer)
    
    // 创建 Vue 应用实例
    const app = createApp({
      setup() {
        const visible = ref(false)
        const options = ref<Omit<SpinProps, 'loading' | 'children'>>({})
        
        // 暴露方法供外部调用
        ;(window as any).__APRON_SPIN__ = {
          setVisible: (v: boolean) => {
            visible.value = v
          },
          setOptions: (opts: Omit<SpinProps, 'loading' | 'children'>) => {
            options.value = opts
          },
          getVisible: () => visible.value // 用于检查当前可见状态
        }
        
        return () =>
          h(FullscreenSpinWrapper, {
            visible: visible.value,
            options: options.value
          })
      }
    })
    
    spinInstance = app.mount(spinContainer)
  }
}

// 静态方法：显示全屏 Spin
const show = (options: Omit<SpinProps, 'loading' | 'children'> = {}) => {
  ensureContainer()
  
  // 设置选项和可见性
  setTimeout(() => {
    if ((window as any).__APRON_SPIN__) {
      // 先设置选项
      ;(window as any).__APRON_SPIN__.setOptions(options)
      // 如果当前已经可见，先关闭再打开以重新触发动画和更新选项
      const currentVisible = (window as any).__APRON_SPIN__.getVisible()
      if (currentVisible) {
        // 先关闭
        ;(window as any).__APRON_SPIN__.setVisible(false)
        // 等待关闭动画完成后再打开
        setTimeout(() => {
          ;(window as any).__APRON_SPIN__.setVisible(true)
        }, 350) // 等待关闭动画完成（300ms + 50ms 缓冲）
      } else {
        // 直接打开
        ;(window as any).__APRON_SPIN__.setVisible(true)
      }
    } else {
      // 如果全局实例不存在，等待容器初始化
      const checkInterval = setInterval(() => {
        if ((window as any).__APRON_SPIN__) {
          ;(window as any).__APRON_SPIN__.setOptions(options)
          ;(window as any).__APRON_SPIN__.setVisible(true)
          clearInterval(checkInterval)
        }
      }, 10)
      
      // 如果 1 秒后仍然没有初始化，清除定时器
      setTimeout(() => {
        clearInterval(checkInterval)
      }, 1000)
    }
  }, 0)
}

// 静态方法：关闭全屏 Spin
const close = () => {
  if ((window as any).__APRON_SPIN__) {
    ;(window as any).__APRON_SPIN__.setVisible(false)
  }
}

// 将静态方法附加到组件上，以保持与 React 版本 API 一致
;(AdSpin as any).show = show
;(AdSpin as any).close = close

export default AdSpin