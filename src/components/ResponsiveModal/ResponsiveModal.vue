<template>
  <AdDrawer
    v-if="isMobile"
    v-model:open="localOpen"
    v-bind="sharedProps"
    :placement="drawerPlacement"
    :height="height"
    :is-mobile="true"
    @close="handleClose"
    @ok="handleOk"
    @after-open-change="handleAfterOpenChange"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </AdDrawer>
  <AdModal
    v-else
    v-model:open="localOpen"
    v-bind="sharedProps"
    :width="width"
    @close="handleClose"
    @ok="handleOk"
    @after-open-change="handleAfterOpenChange"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </AdModal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, type VNode } from 'vue'
import { AdModal } from '../Modal'
import { AdDrawer } from '../Drawer'

export interface ResponsiveModalProps {
  /** 是否显示 */
  open?: boolean
  /** 标题 */
  title?: string | VNode | (() => VNode)
  /** 是否显示关闭按钮 */
  closable?: boolean
  /** 点击蒙层是否可以关闭 */
  closeByOverlay?: boolean
  /** Modal 宽度（PC端） */
  width?: number | string
  /** Drawer 高度（移动端上下弹出时） */
  height?: number | string
  /** 自定义 footer，设置为 null 则不显示 */
  footer?: VNode | (() => VNode) | null
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
  /** 自定义类名 */
  class?: string
  /** 响应式断点，小于此值使用 Drawer，大于等于此值使用 Modal */
  breakpoint?: number
  /** 移动端 Drawer 弹出方向 */
  drawerPlacement?: 'top' | 'right' | 'bottom' | 'left'
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
  class: '',
  breakpoint: 1024,
  drawerPlacement: 'bottom'
})

const emit = defineEmits<{
  (e: 'update:open', open: boolean): void
  (e: 'close'): void
  (e: 'ok'): void
  (e: 'afterOpenChange', open: boolean): void
}>()

const isMobile = ref(false)
const localOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
})

// Check screen size
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < props.breakpoint
}

// Handle close
const handleClose = () => {
  emit('close')
  emit('update:open', false)
}

// Handle ok
const handleOk = () => {
  emit('ok')
}

// Handle afterOpenChange
const handleAfterOpenChange = (open: boolean) => {
  emit('afterOpenChange', open)
}

// Shared props for both Modal and Drawer
const sharedProps = computed(() => ({
  title: props.title,
  closable: props.closable,
  closeByOverlay: props.closeByOverlay,
  footer: props.footer,
  showFooter: props.showFooter,
  okText: props.okText,
  cancelText: props.cancelText,
  okButtonProps: props.okButtonProps,
  cancelButtonProps: props.cancelButtonProps,
  showCancel: props.showCancel,
  class: props.class
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