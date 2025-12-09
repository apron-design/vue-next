<template>
  <teleport to="body">
    <div v-if="isVisible" :class="rootClasses">
      <div class="apron-drawer__overlay" @click="handleOverlayClick" />
      <div
        ref="drawerRef"
        :class="drawerClasses"
        :style="drawerStyle"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? 'drawer-title' : undefined"
      >
        <template v-if="useMobileLayout">
          <!-- 移动端上下弹出布局：header 和 footer 合并 -->
          <div class="apron-drawer__header apron-drawer__header--mobile">
            <!-- 左侧：取消按钮或占位 -->
            <div class="apron-drawer__header-left">
              <Button
                v-if="hasFooter && showCancel"
                variant="default"
                size="sm"
                v-bind="cancelButtonProps"
                @click="onClose"
              >
                {{ cancelText }}
              </Button>
            </div>

            <!-- 中间：标题 -->
            <div id="drawer-title" class="apron-drawer__title">
              {{ title }}
            </div>

            <!-- 右侧：确认按钮或关闭按钮 -->
            <div class="apron-drawer__header-right">
              <Button
                v-if="hasFooter"
                variant="primary"
                size="sm"
                v-bind="okButtonProps"
                @click="handleOk"
              >
                {{ okText }}
              </Button>
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
            <div v-else class="apron-drawer__footer-buttons">
              <template v-if="placement === 'right'">
                <Button
                  variant="primary"
                  v-bind="okButtonProps"
                  @click="handleOk"
                >
                  {{ okText }}
                </Button>
                <Button
                  v-if="showCancel"
                  variant="default"
                  v-bind="cancelButtonProps"
                  @click="onClose"
                >
                  {{ cancelText }}
                </Button>
              </template>
              <template v-else>
                <Button
                  v-if="showCancel"
                  variant="default"
                  v-bind="cancelButtonProps"
                  @click="onClose"
                >
                  {{ cancelText }}
                </Button>
                <Button
                  variant="primary"
                  v-bind="okButtonProps"
                  @click="handleOk"
                >
                  {{ okText }}
                </Button>
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
import { Button } from '../Button'

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
}

const drawerRef = ref<HTMLDivElement | null>(null)
const isVisible = ref(false)
const isAnimating = ref(false)

// 计算属性
const isHorizontal = computed(() => props.placement === 'left' || props.placement === 'right')
const hasFooter = computed(() => props.showFooter && props.footer !== null)
const useMobileLayout = computed(() => props.isMobile && (props.placement === 'top' || props.placement === 'bottom'))

const drawerStyle = computed(() => {
  if (isHorizontal.value) {
    return { width: typeof props.width === 'number' ? `${props.width}px` : props.width }
  } else {
    return { height: typeof props.height === 'number' ? `${props.height}px` : props.height }
  }
})

const rootClasses = computed(() => [
  'apron-drawer-root',
  props.open && !isAnimating.value && 'apron-drawer-root--open',
  isAnimating.value && (props.open ? 'apron-drawer-root--entering' : 'apron-drawer-root--leaving'),
  props.class,
].filter(Boolean).join(' '))

const drawerClasses = computed(() => [
  'apron-drawer',
  `apron-drawer--${props.placement}`,
  useMobileLayout.value && 'apron-drawer--mobile',
].filter(Boolean).join(' '))

// 处理打开/关闭
watch(() => props.open, (newOpen) => {
  if (newOpen) {
    isVisible.value = true
    isAnimating.value = true
    // 要用页面滚动
    document.body.style.overflow = 'hidden'
    // 等待 DOM 更新后触发动画
    nextTick(() => {
      requestAnimationFrame(() => {
        isAnimating.value = false
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