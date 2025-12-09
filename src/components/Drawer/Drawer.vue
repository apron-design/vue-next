<template>
  <teleport to="body">
    <div 
      v-if="visible" 
      class="apron-drawer-root"
      :class="{ 'apron-drawer-root--mobile': isMobile }"
    >
      <div 
        class="apron-drawer-overlay"
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
          <div class="apron-drawer__mobile-header">
            <div class="apron-drawer__drag-handle" />
            
            <div class="apron-drawer__header-content">
              <div id="drawer-title" class="apron-drawer__title">
                {{ title }}
              </div>

              <!-- 右侧：确认按钮或关闭按钮 -->
              <div class="apron-drawer__header-right">
                <AdButton
                  v-if="hasFooter"
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
            <div v-else class="apron-drawer__footer-buttons">
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
            </div>
          </div>
        </template>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick, h } from 'vue'
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
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('path', {
        d: 'M18 6L6 18M6 6L18 18',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      })
    ])
  }
} as any

// 引用
const drawerRef = ref<HTMLDivElement | null>(null)

// 内部状态
const visible = ref(props.open)
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
    
    // 触发进入动画
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        animating.value = false
      })
    })
  } else {
    animating.value = true
    
    // 延迟隐藏以完成退出动画
    setTimeout(() => {
      visible.value = false
      animating.value = false
    }, 300)
  }
}

// 监听open属性变化
watch(() => props.open, updateVisibility, { immediate: true })

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

// ============================================
// Drawer CSS Variables (Light Mode)
// ============================================
:root {
  --apron-drawer-bg: #ffffff;
  --apron-drawer-overlay-bg: rgba(0, 0, 0, 0.45);
  --apron-drawer-header-bg: #ffffff;
  --apron-drawer-footer-bg: #ffffff;
  --apron-drawer-border-color: @color-neutral-200;
  --apron-drawer-title-color: @color-primary-900;
  --apron-drawer-text-color: @color-primary-700;
}

// ============================================
// Drawer CSS Variables (Dark Mode)
// ============================================
.dark,
[data-prefers-color='dark'] {
  --apron-drawer-bg: @color-neutral-800;
  --apron-drawer-overlay-bg: rgba(0, 0, 0, 0.65);
  --apron-drawer-header-bg: @color-neutral-800;
  --apron-drawer-footer-bg: @color-neutral-800;
  --apron-drawer-border-color: @color-neutral-700;
  --apron-drawer-title-color: @color-neutral-100;
  --apron-drawer-text-color: @color-neutral-300;
}

// ============================================
// Drawer Root
// ============================================
.apron-drawer-root {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  pointer-events: none;

  // Overlay
  .apron-drawer__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--apron-drawer-overlay-bg);
    opacity: 0;
    transition: opacity @transition-slow;
  }

  // Drawer
  .apron-drawer {
    position: absolute;
    background-color: var(--apron-drawer-bg);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    transition: transform @transition-slow;
  }

  // Entering state
  &--entering {
    pointer-events: auto;

    .apron-drawer__overlay {
      opacity: 1;
    }
  }

  // Leaving state
  &--leaving {
    pointer-events: auto;

    .apron-drawer__overlay {
      opacity: 0;
    }
  }

  // Open state
  &--open {
    pointer-events: auto;

    .apron-drawer__overlay {
      opacity: 1;
    }
  }
}

// ============================================
// Drawer Positions
// ============================================
.apron-drawer {
  // Right
  &--right {
    top: 0;
    right: 0;
    height: 100%;
    transform: translateX(100%);

    .apron-drawer-root--open &,
    .apron-drawer-root--entering & {
      transform: translateX(0);
    }

    .apron-drawer-root--leaving & {
      transform: translateX(100%);
    }
  }

  // Left
  &--left {
    top: 0;
    left: 0;
    height: 100%;
    transform: translateX(-100%);

    .apron-drawer-root--open &,
    .apron-drawer-root--entering & {
      transform: translateX(0);
    }

    .apron-drawer-root--leaving & {
      transform: translateX(-100%);
    }
  }

  // Top
  &--top {
    top: 0;
    left: 0;
    right: 0;
    transform: translateY(-100%);

    .apron-drawer-root--open &,
    .apron-drawer-root--entering & {
      transform: translateY(0);
    }

    .apron-drawer-root--leaving & {
      transform: translateY(-100%);
    }
  }

  // Bottom
  &--bottom {
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(100%);

    .apron-drawer-root--open &,
    .apron-drawer-root--entering & {
      transform: translateY(0);
    }

    .apron-drawer-root--leaving & {
      transform: translateY(100%);
    }
  }
}

// ============================================
// Drawer Mobile Layout
// ============================================
.apron-drawer--mobile {
  .apron-drawer__header--mobile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: @spacing-4 @spacing-5;
    background-color: var(--apron-drawer-header-bg);
    border-bottom: 1px solid var(--apron-drawer-border-color);

    .apron-drawer__header-left,
    .apron-drawer__header-right {
      display: flex;
      align-items: center;
      flex: 1;
    }

    .apron-drawer__header-right {
      justify-content: flex-end;
    }

    .apron-drawer__title {
      flex: 1;
      text-align: center;
      font-weight: @font-weight-medium;
      color: var(--apron-drawer-title-color);
    }
  }

  .apron-drawer__footer--mobile {
    padding: @spacing-4 @spacing-5;
    background-color: var(--apron-drawer-footer-bg);
    border-top: 1px solid var(--apron-drawer-border-color);
  }
}

// ============================================
// Drawer Header
// ============================================
.apron-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: @spacing-5;
  background-color: var(--apron-drawer-header-bg);
  border-bottom: 1px solid var(--apron-drawer-border-color);

  .apron-drawer__title {
    flex: 1;
    font-size: @font-size-lg;
    font-weight: @font-weight-medium;
    color: var(--apron-drawer-title-color);
  }
}

// ============================================
// Drawer Close Button
// ============================================
.apron-drawer__close {
  position: absolute;
  top: @spacing-4;
  right: @spacing-4;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: @color-neutral-500;
  cursor: pointer;
  transition: color @transition-fast;

  &:hover {
    color: @color-neutral-700;
  }

  // Inline close button (mobile)
  &--inline {
    position: static;
  }

  svg {
    width: 20px;
    height: 20px;
  }
}

// ============================================
// Drawer Body
// ============================================
.apron-drawer__body {
  flex: 1;
  padding: @spacing-5;
  overflow: auto;
  color: var(--apron-drawer-text-color);
}

// ============================================
// Drawer Footer
// ============================================
.apron-drawer__footer {
  display: flex;
  align-items: center;
  padding: @spacing-4 @spacing-5;
  background-color: var(--apron-drawer-footer-bg);
  border-top: 1px solid var(--apron-drawer-border-color);

  // Right placement footer
  &--right {
    justify-content: flex-start;
    gap: @spacing-3;
  }

  // Left placement footer
  &--left {
    justify-content: flex-end;
    gap: @spacing-3;
  }

  // Top placement footer
  &--top {
    justify-content: flex-end;
    gap: @spacing-3;
  }

  // Bottom placement footer
  &--bottom {
    justify-content: flex-end;
    gap: @spacing-3;
  }

  // Footer buttons container
  &-buttons {
    display: flex;
    gap: @spacing-3;
  }
}
</style>