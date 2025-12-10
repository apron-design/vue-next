<template>
  <Teleport to="body">
    <div v-if="isVisible" :class="rootClasses">
      <div class="apron-modal__overlay" @click="handleOverlayClick" />
      <div class="apron-modal__wrapper" @click="handleOverlayClick">
        <div
          ref="modalRef"
          :class="modalClasses"
          :style="modalStyle"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? 'modal-title' : undefined"
          @click.stop
        >
          <!-- Close Button - 始终在右上角 -->
          <button
            v-if="closable"
            type="button"
            class="apron-modal__close"
            @click="handleClose"
            aria-label="关闭"
          >
            <CloseIcon />
          </button>

          <!-- Header -->
          <div v-if="title" class="apron-modal__header">
            <div id="modal-title" class="apron-modal__title">
              {{ title }}
            </div>
          </div>

          <!-- Body -->
          <div class="apron-modal__body">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="showFooter && footer !== null" class="apron-modal__footer">
            <slot v-if="footer !== undefined" name="footer" />
            <template v-else>
              <AdButton
                v-if="showCancel"
                variant="default"
                v-bind="cancelButtonProps"
                @click="onClose"
              >
                {{ cancelText }}
              </AdButton>
              <AdButton
                variant="primary"
                v-bind="okButtonProps"
                @click="handleOk"
              >
                {{ okText }}
              </AdButton>
            </template>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick, h } from 'vue'
import type { CSSProperties, Ref } from 'vue'
import { AdButton } from '../Button'

// 关闭图标组件
const CloseIcon = {
  name: 'CloseIcon',
  setup() {
    return () => h('svg', {
      width: '20',
      height: '20',
      viewBox: '0 0 20 20',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('path', {
        d: 'M5 5L15 15M15 5L5 15',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round'
      })
    ])
  }
}

export interface ModalProps {
  /** 是否显示对话框 */
  open?: boolean
  /** 标题 */
  title?: string
  /** 是否显示关闭按钮 */
  closable?: boolean
  /** 点击蒙层是否可以关闭 */
  closeByOverlay?: boolean
  /** 对话框宽度 */
  width?: number | string
  /** 自定义 footer，设置为 null 则不显示 */
  footer?: undefined | null
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
  /** 是否居中显示 */
  centered?: boolean
}

const props = withDefaults(defineProps<ModalProps>(), {
  open: false,
  closable: true,
  closeByOverlay: true,
  width: 520,
  showFooter: true,
  okText: '确定',
  cancelText: '取消',
  showCancel: true,
  centered: true
})

const emit = defineEmits<{
  (e: 'update:open', open: boolean): void
  (e: 'close'): void
  (e: 'ok'): void
  (e: 'afterOpenChange', open: boolean): void
}>()

const modalRef: Ref<HTMLElement | null> = ref(null)
const isVisible = ref(false)
const isAnimating = ref(false)

// 处理打开/关闭
watch(() => props.open, (newOpen) => {
  if (newOpen) {
    isVisible.value = true
    isAnimating.value = true
    // 禁用页面滚动
    document.body.style.overflow = 'hidden'
    // 等待 DOM 更新后触发动画
    nextTick(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isAnimating.value = false
        })
      })
    })
  } else {
    isAnimating.value = true
    // 等待动画完成后隐藏
    setTimeout(() => {
      isVisible.value = false
      isAnimating.value = false
      // 恢复页面滚动
      document.body.style.overflow = ''
      emit('afterOpenChange', false)
    }, 300)
  }
}, { immediate: true })

// 通知打开完成
watch([() => props.open, isAnimating, isVisible], ([open, animating, visible]) => {
  if (open && !animating && visible) {
    emit('afterOpenChange', true)
  }
})

// 处理 ESC 键关闭
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.open && props.closable) {
    handleClose()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  // 清理：组件卸载时恢复滚动
  document.body.style.overflow = ''
})

// 点击蒙层
const handleOverlayClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget && props.closeByOverlay && props.closable) {
    handleClose()
  }
}

// 点击关闭按钮
const handleClose = () => {
  emit('update:open', false)
  emit('close')
}

// 点击确认按钮
const handleOk = () => {
  emit('ok')
}

const modalStyle = computed<CSSProperties>(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width
}))

const rootClasses = computed(() => [
  'apron-modal-root',
  props.open && !isAnimating.value && 'apron-modal-root--open',
  isAnimating.value && (props.open ? 'apron-modal-root--entering' : 'apron-modal-root--leaving'),
  props.class
].filter(Boolean).join(' '))

const modalClasses = computed(() => [
  'apron-modal',
  props.centered && 'apron-modal--centered'
].filter(Boolean).join(' '))
</script>

<style lang="less">
@import './Modal.less';
</style>