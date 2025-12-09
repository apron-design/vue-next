<template>
  <teleport to="body">
    <div 
      v-if="visible" 
      class="apron-drawer-root"
      :class="[
        { 'apron-drawer-root--mobile': isMobile },
        props.open && !animating && 'apron-drawer-root--open',
        animating && (props.open ? 'apron-drawer-root--entering' : 'apron-drawer-root--leaving')
      ]"
    >
      <div 
        class="apron-drawer__overlay"
        @click="handleOverlayClick"
      />

      <div 
        ref="drawerRef"
        class="apron-drawer"
        :class="[
          `apron-drawer--${placement}`,
          visible && 'apron-drawer--visible',
          animating && 'apron-drawer--animating',
          isMobile && 'apron-drawer--mobile'
        ]"
        :style="drawerStyle"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? 'drawer-title' : undefined"
        :aria-describedby="title ? 'drawer-description' : undefined"
      >
        <template v-if="isMobile && (placement === 'bottom' || placement === 'top')">
          <!-- 移动端上下弹出 -->
          <div class="apron-drawer__header apron-drawer__header--mobile">
            <!-- 左侧：取消按钮或占位 -->
            <div class="apron-drawer__header-left">
              <AdButton
                v-if="showFooter && footer === null && showCancel"
                variant="default"
                size="sm"
                v-bind="cancelButtonProps"
                @click="onClose"
              >
                {{ cancelText }}
              </AdButton>
            </div>

            <!-- 中间：标题 -->
            <div id="drawer-title" class="apron-drawer__title">
              {{ title }}
            </div>

            <!-- 右侧：确认按钮或关闭按钮 -->
            <div class="apron-drawer__header-right">
              <AdButton
                v-if="showFooter && footer === null"
                variant="primary"
                size="sm"
                v-bind="okButtonProps"
                @click="handleOk"
              >
                {{ okText }}
              </AdButton>
              <button
                v-else-if="closable"
                type="button"
                class="apron-drawer__close apron-drawer__close--inline"
                @click="handleClose"
                :aria-label="'关闭'"
              >
                <CloseIcon />
              </button>
            </div>
          </div>
          
          <div class="apron-drawer__body">
            <slot />
          </div>
          
          <!-- 移动端自定义 footer -->
          <div 
            v-if="showFooter && footer !== null && footer !== undefined" 
            class="apron-drawer__footer apron-drawer__footer--mobile"
          >
            <slot name="footer" />
          </div>
        </template>
        
        <template v-else>
          <!-- PC端布局 或 移动端左右弹出 -->
          <!-- Close Button - 始终在右上角 -->
          <button
            v-if="closable"
            type="button"
            class="apron-drawer__close"
            @click="handleClose"
            :aria-label="'关闭'"
          >
            <CloseIcon />
          </button>

          <!-- Header -->
          <div v-if="title" class="apron-drawer__header">
            <div id="drawer-title" class="apron-drawer__title">
              {{ title }}
            </div>
          </div>

          <!-- Body -->
          <div class="apron-drawer__body">
            <slot />
          </div>

          <!-- Footer -->
          <div 
            v-if="showFooter && footer !== null" 
            :class="`apron-drawer__footer apron-drawer__footer--${placement}`"
          >
            <slot v-if="footer !== undefined" name="footer" />
            <template v-else>
              <template v-if="placement === 'right'">
                <AdButton
                  variant="primary"
                  v-bind="okButtonProps"
                  @click="handleOk"
                >
                  {{ okText }}
                </AdButton>
                <AdButton
                  v-if="showCancel"
                  variant="default"
                  v-bind="cancelButtonProps"
                  @click="onClose"
                >
                  {{ cancelText }}
                </AdButton>
              </template>
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
            </template>
          </div>
        </template>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted, nextTick, h } from 'vue'
import { AdButton } from '../Button'

export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left'

export interface ButtonProps {
  /** 按钮变体 */
  variant?: 'primary' | 'secondary' | 'default' | 'text' | 'link'
  /** 按钮尺寸 */
  size?: 'sm' | 'md'
  /** 是否为虚线边框 */
  dashed?: boolean
  /** 是否为危险按钮（红色） */
  danger?: boolean
  /** 是否为加载状态 */
  loading?: boolean
  /** 是否为块级按钮（宽度100%） */
  block?: boolean
  /** 是否禁用涟漪效果 */
  disableRipple?: boolean
  /** 是否禁用 */
  disabled?: boolean
}

export interface DrawerProps {
  /** 是否显示抽屉 */
  open?: boolean
  /** 标题 */
  title?: string
  /** 抽屉方向 */
  placement?: DrawerPlacement
  /** 是否显示关闭按钮 */
  closable?: boolean
  /** 点击蒙层是否可以关闭 */
  closeByOverlay?: boolean
  /** 抽屉宽度（左右方向时有效） */
  width?: number | string
  /** 抽屉高度（上下方向时有效） */
  height?: number | string
  /** 自定义 footer，设置为 null 则不显示 */
  footer?: unknown | null
  /** 是否显示 footer */
  showFooter?: boolean
  /** 确认按钮文字 */
  okText?: string
  /** 取消按钮文字 */
  cancelText?: string
  /** 确认按钮属性 */
  okButtonProps?: Partial<ButtonProps>
  /** 取消按钮属性 */
  cancelButtonProps?: Partial<ButtonProps>
  /** 是否显示取消按钮 */
  showCancel?: boolean
  /** 是否为移动端模式 */
  isMobile?: boolean
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<DrawerProps>(), {
  open: false,
  placement: 'right',
  closable: true,
  closeByOverlay: true,
  width: 378,
  height: 378,
  showFooter: true,
  okText: '确定',
  cancelText: '取消',
  showCancel: true,
  isMobile: false,
})

const emit = defineEmits<{
  (e: 'update:open', open: boolean): void
  (e: 'close'): void
  (e: 'ok'): void
  (e: 'afterOpenChange', open: boolean): void
}>()

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
} as any

// 引用
const drawerRef = ref<HTMLDivElement | null>(null)

// 内部状态
const visible = ref(false)
const animating = ref(false)

// 计算样式
const drawerStyle = computed(() => {
  const style: Record<string, string> = {}
  
  if (props.placement === 'left' || props.placement === 'right') {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  } else {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  
  return style
})

// 处理可见性变化
const updateVisibility = () => {
  if (props.open) {
    visible.value = true
    animating.value = true
    // 禁用页面滚动
    document.body.style.overflow = 'hidden'
    
    // 触发进入动画
    nextTick(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          animating.value = false
          emit('afterOpenChange', true)
        })
      })
    })
  } else {
    if (visible.value) {
      animating.value = true
      
      // 延迟隐藏以完成退出动画
      setTimeout(() => {
        visible.value = false
        animating.value = false
        // 恢复页面滚动
        document.body.style.overflow = ''
        emit('afterOpenChange', false)
      }, 300)
    }
  }
}

// 监听open属性变化
watch(() => props.open, updateVisibility, { immediate: true })

// 处理 ESC 键关闭
let escapeHandler: ((e: KeyboardEvent) => void) | null = null

watch(() => props.open, (newOpen) => {
  // 清理之前的事件监听器
  if (escapeHandler) {
    document.removeEventListener('keydown', escapeHandler)
    escapeHandler = null
  }
  
  if (newOpen && props.closable) {
    escapeHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    document.addEventListener('keydown', escapeHandler)
  }
})

// 组件卸载时清理
onUnmounted(() => {
  if (escapeHandler) {
    document.removeEventListener('keydown', escapeHandler)
    escapeHandler = null
  }
})

// 清理：组件卸载时恢复滚动
onUnmounted(() => {
  document.body.style.overflow = ''
})

// 监听可见性变化后触发事件
watch([visible, animating], ([newVisible, newAnimating], [oldVisible]) => {
  if (newVisible !== oldVisible) {
    nextTick(() => {
      emit('afterOpenChange', newVisible)
    })
  }
})

// 处理关闭
const handleClose = () => {
  emit('update:open', false)
  emit('close')
}

// 处理确认
const handleOk = () => {
  emit('ok')
}

// 处理取消
const onClose = () => {
  handleClose()
}

// 处理蒙层点击
const handleOverlayClick = () => {
  if (props.closeByOverlay) {
    handleClose()
  }
}

// 暴露方法
defineExpose({
  drawerRef
})
</script>

<style lang="less">
@import '../../styles/variables.less';
@import '../../styles/mixins.less';

// ============================================
// Drawer CSS Variables (Light Mode)
// ============================================
:root {
  --apron-drawer-bg: #ffffff;
  --apron-drawer-border-color: @color-neutral-200;
  --apron-drawer-title-color: @color-primary-900;
  --apron-drawer-text-color: @color-primary-500;
  --apron-drawer-close-color: @color-neutral-400;
  --apron-drawer-close-hover-color: @color-neutral-600;
  --apron-drawer-overlay-bg: rgba(0, 0, 0, 0.45);
}

// ============================================
// Drawer CSS Variables (Dark Mode)
// ============================================
.dark,
[data-prefers-color='dark'] {
  --apron-drawer-bg: @color-neutral-800;
  --apron-drawer-border-color: @color-neutral-700;
  --apron-drawer-title-color: @color-neutral-100;
  --apron-drawer-text-color: @color-primary-200;
  --apron-drawer-close-color: @color-neutral-500;
  --apron-drawer-close-hover-color: @color-neutral-300;
  --apron-drawer-overlay-bg: rgba(0, 0, 0, 0.65);
}

// ============================================
// Drawer Root (Portal container)
// ============================================
.apron-drawer-root {
  position: fixed;
  inset: 0;
  z-index: @z-index-modal;
  pointer-events: none;

  // 进入状态
  &--entering {
    .apron-drawer__overlay {
      opacity: 0;
    }

    .apron-drawer--right {
      transform: translateX(100%);
    }

    .apron-drawer--left {
      transform: translateX(-100%);
    }

    .apron-drawer--top {
      transform: translateY(-100%);
    }

    .apron-drawer--bottom {
      transform: translateY(100%);
    }
  }

  // 打开状态
  &--open {
    pointer-events: auto;

    .apron-drawer__overlay {
      opacity: 1;
    }

    .apron-drawer {
      transform: translate(0, 0);
    }
  }

  // 离开状态
  &--leaving {
    pointer-events: none;

    .apron-drawer__overlay {
      opacity: 0;
    }

    .apron-drawer--right {
      transform: translateX(100%);
    }

    .apron-drawer--left {
      transform: translateX(-100%);
    }

    .apron-drawer--top {
      transform: translateY(-100%);
    }

    .apron-drawer--bottom {
      transform: translateY(100%);
    }
  }
}

// ============================================
// Drawer Overlay (蒙层)
// ============================================
.apron-drawer__overlay {
  position: absolute;
  inset: 0;
  background-color: var(--apron-drawer-overlay-bg);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: opacity 0.3s ease;
  pointer-events: auto;
}

// ============================================
// Drawer Content
// ============================================
.apron-drawer {
  position: absolute;
  background-color: var(--apron-drawer-bg);
  display: flex;
  flex-direction: column;
  font-family: var(--apron-font-family);
  box-shadow: @shadow-xl;
  transition: transform 0.3s ease;
  pointer-events: auto;

  // ============================================
  // Placement Variants
  // ============================================
  &--right {
    top: 0;
    right: 0;
    bottom: 0;
    border-left: 1px solid var(--apron-drawer-border-color);
    transform: translateX(100%);
    // 移动端左右弹出不加圆角
  }

  &--left {
    top: 0;
    left: 0;
    bottom: 0;
    border-right: 1px solid var(--apron-drawer-border-color);
    transform: translateX(-100%);
    // 移动端左右弹出不加圆角
  }

  &--top {
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid var(--apron-drawer-border-color);
    transform: translateY(-100%);

    &.apron-drawer--mobile {
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
    }
  }

  &--bottom {
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid var(--apron-drawer-border-color);
    transform: translateY(100%);

    &.apron-drawer--mobile {
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
    }
  }

  // ============================================
  // Drawer Header
  // ============================================
  &__header {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    padding-right: 48px; // 为关闭按钮留出空间
    border-bottom: 1px solid var(--apron-drawer-border-color);
    flex-shrink: 0;

    // 移动端 header：三列布局
    &--mobile {
      padding-right: 15px;
      justify-content: space-between;
    }
  }

  &__header-left,
  &__header-right {
    min-width: 60px;
    display: flex;
    align-items: center;
  }

  &__header-left {
    justify-content: flex-start;
  }

  &__header-right {
    justify-content: flex-end;
  }

  &__title {
    flex: 1;
    font-size: @font-size-base;
    font-weight: @font-weight-semibold;
    color: var(--apron-drawer-title-color);
    line-height: @line-height-normal;

    // 移动端标题居中
    .apron-drawer__header--mobile & {
      text-align: center;
    }
  }

  // ============================================
  // Drawer Close Button
  // ============================================
  &__close {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--apron-drawer-close-color);
    cursor: pointer;
    border-radius: 50%;
    transition: all @transition-fast;
    z-index: 1;

    &:hover {
      color: var(--apron-drawer-close-hover-color);
      background-color: rgba(0, 0, 0, 0.04);
    }

    &:focus-visible {
      .focus-ring();
    }

    // Inline close button (mobile)
    &--inline {
      position: static;
      width: 28px;
      height: 28px;
    }

    svg {
      width: 14px;
      height: 14px;
    }
  }

  // ============================================
  // Drawer Body
  // ============================================
  &__body {
    padding: 10px 15px;
    color: var(--apron-drawer-text-color);
    font-size: @font-size-base;
    line-height: @line-height-normal;
    overflow: auto;
    flex: 1;
  }

  // ============================================
  // Drawer Footer
  // ============================================
  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: @spacing-2;
    padding: 10px 15px;
    border-top: 1px solid var(--apron-drawer-border-color);
    flex-shrink: 0;

    // PC端：右侧弹出时，左对齐
    &--right {
      justify-content: flex-start;
    }

    // PC端：左、上、下弹出时，右对齐
    &--left,
    &--top,
    &--bottom {
      justify-content: flex-end;
    }

    // 移动端自定义 footer
    &--mobile {
      justify-content: center;
    }
  }
}

</style>