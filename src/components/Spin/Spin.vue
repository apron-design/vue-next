<template>
  <!-- 包裹模式 -->
  <div v-if="$slots.default" class="apron-spin-wrapper" :class="className">
    <slot></slot>
    <SpinOverlay
      :visible="loading"
      :icon="icon"
      :text="text"
      :placement="placement"
    />
  </div>

  <!-- 独立模式 -->
  <div
    v-else-if="loading"
    class="apron-spin"
    :class="[className, { 'apron-spin--fullscreen': fullscreen }]"
  >
    <SpinContent
      :icon="icon"
      :text="text"
      :placement="placement"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, h, defineComponent, type PropType, type VNode } from 'vue'
import type { SpinPlacement } from './types'

// 定义组件属性
interface SpinProps {
  /** 是否显示加载中 */
  loading?: boolean
  /** 自定义图标 */
  icon?: VNode | (() => VNode)
  /** 提示文字 */
  text?: string
  /** 位置 */
  placement?: SpinPlacement
  /** 自定义类名 */
  className?: string
  /** 是否全屏 */
  fullscreen?: boolean
}

// 默认属性
const props = withDefaults(defineProps<SpinProps>(), {
  loading: true,
  text: '加载中',
  placement: 'center',
  className: '',
  fullscreen: false
})

// 定义自定义图标组件
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

// Spin 内容组件
const SpinContent = defineComponent({
  name: 'SpinContent',
  props: {
    icon: [Object, Function] as PropType<VNode | (() => VNode)>,
    text: {
      type: String,
      default: '加载中'
    },
    placement: {
      type: String as PropType<SpinPlacement>,
      default: 'center'
    }
  },
  setup(props) {
    const isCenter = props.placement === 'center'

    return () =>
      h(
        'div',
        {
          class: [
            'apron-spin__content',
            `apron-spin__content--${props.placement}`,
            {
              'apron-spin__content--vertical': isCenter,
              'apron-spin__content--horizontal': !isCenter
            }
          ]
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
})

// Spin Overlay 组件（带动画）
const SpinOverlay = defineComponent({
  name: 'SpinOverlay',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    icon: [Object, Function] as PropType<VNode | (() => VNode)>,
    text: String,
    placement: {
      type: String as PropType<SpinPlacement>,
      default: 'center'
    }
  },
  setup(props) {
    const isVisible = ref(false)
    const isAnimating = ref(false)

    let timer: number | null = null

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
        if (timer) clearTimeout(timer)
        timer = window.setTimeout(() => {
          isVisible.value = false
          isAnimating.value = false
        }, 300) as unknown as number
      }
    }

    // 监听 visible 变化
    watch(() => props.visible, updateVisibility, { immediate: true })

    onUnmounted(() => {
      if (timer) clearTimeout(timer)
    })

    return () => {
      if (!isVisible.value) return null

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
        { class: overlayClassNames },
        h(SpinContent, {
          icon: props.icon,
          text: props.text,
          placement: props.placement
        })
      )
    }
  }
})

// 全局实例管理
let spinContainer: HTMLDivElement | null = null
let spinInstance: any = null
let currentOptions: Omit<SpinProps, 'loading' | 'children'> = {}

// 创建全屏 Spin 组件
const FullscreenSpin = defineComponent({
  name: 'FullscreenSpin',
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
        isVisible.value = true
        isAnimating.value = true
        document.body.style.overflow = 'hidden'
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            isAnimating.value = false
          })
        })
      } else {
        isAnimating.value = true
        if (timer) clearTimeout(timer)
        timer = window.setTimeout(() => {
          isVisible.value = false
          isAnimating.value = false
          document.body.style.overflow = ''
        }, 300) as unknown as number
      }
    }

    // 监听 visible 变化
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
    const { createApp } = require('vue')
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
          }
        }
        
        return () =>
          h(FullscreenSpin, {
            visible: visible.value,
            options: options.value
          })
      }
    })
    
    spinInstance = app.mount(spinContainer)
  }
}

// 显示全屏 Spin
const show = (options: Omit<SpinProps, 'loading' | 'children'> = {}) => {
  ensureContainer()
  currentOptions = options
  
  // 设置选项和可见性
  setTimeout(() => {
    if ((window as any).__APRON_SPIN__) {
      (window as any).__APRON_SPIN__.setOptions(options)
      ;(window as any).__APRON_SPIN__.setVisible(true)
    }
  }, 0)
}

// 关闭全屏 Spin
const close = () => {
  if ((window as any).__APRON_SPIN__) {
    (window as any).__APRON_SPIN__.setVisible(false)
  }
}

// 暴露方法
defineExpose({
  show,
  close
})
</script>