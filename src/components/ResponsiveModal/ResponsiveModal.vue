<template>
  <Drawer
    v-if="isMobile"
    v-bind="sharedProps"
    :placement="drawerPlacement"
    :height="height"
    :is-mobile="true"
  />
  <Modal
    v-else
    v-bind="sharedProps"
    :width="width"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Modal } from '../Modal'
import { Drawer } from '../Drawer'

export interface ResponsiveModalProps {
  /** 是否显示 */
  open?: boolean
  /** 标题 */
  title?: string
  /** 是否显示关闭按钮 */
  closable?: boolean
  /** 点击蒙层是否可以关闭 */
  closeByOverlay?: boolean
  /** 关闭时的回调 */
  onClose?: () => void
  /** 点击确认按钮的回调 */
  onOk?: () => void
  /** Modal 宽度（PC端） */
  width?: number | string
  /** Drawer 高度（移动端上下弹出时） */
  height?: number | string
  /** 自定义 footer，设置为 null 则不显示 */
  footer?: string | null
  /** 是否显示 footer */
  showFooter?: boolean
  /** 确认按钮文字 */
  okText?: string
  /** 取消按钮文字 */
  cancelText?: string
  /** 确认按钮属性 */
  okButtonProps?: Record<string, any>
  /** 取消按钮属性 */
  cancelButtonProps?: Record<string, any>
  /** 是否显示取消按钮 */
  showCancel?: boolean
  /** 子元素（正文内容） */
  children?: string
  /** 自定义类名 */
  class?: string
  /** 响应式断点，小于此值使用 Drawer，大于等于此值使用 Modal */
  breakpoint?: number
  /** 移动端 Drawer 弹出方向 */
  drawerPlacement?: 'top' | 'right' | 'bottom' | 'left'
  /** 打开/关闭动画完成后的回调 */
  afterOpenChange?: (open: boolean) => void
}

const props = withDefaults(defineProps<ResponsiveModalProps>(), {
  open: false,
  title: undefined,
  closable: true,
  closeByOverlay: true,
  width: 520,
  height: 'auto',
  footer: undefined,
  showFooter: true,
  okText: '确定',
  cancelText: '取消',
  okButtonProps: () => ({}),
  cancelButtonProps: () => ({}),
  showCancel: true,
  children: undefined,
  class: '',
  breakpoint: 1024,
  drawerPlacement: 'bottom',
  afterOpenChange: undefined
})

const emit = defineEmits<{
  (e: 'update:open', open: boolean): void
}>()

const isMobile = ref(false)

// Check screen size
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < props.breakpoint
}

// Shared props for both Modal and Drawer
const sharedProps = computed(() => ({
  open: props.open,
  title: props.title,
  closable: props.closable,
  closeByOverlay: props.closeByOverlay,
  onClose: props.onClose,
  onOk: props.onOk,
  footer: props.footer,
  showFooter: props.showFooter,
  okText: props.okText,
  cancelText: props.cancelText,
  okButtonProps: props.okButtonProps,
  cancelButtonProps: props.cancelButtonProps,
  showCancel: props.showCancel,
  children: props.children,
  class: props.class,
  afterOpenChange: props.afterOpenChange,
  'onUpdate:open': (open: boolean) => emit('update:open', open)
}))

// Watch for screen size changes
onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>