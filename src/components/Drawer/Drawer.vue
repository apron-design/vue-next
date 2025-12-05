<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, useAttrs } from 'vue'
import Button from '../Button/Button.vue'
import type { ButtonProps } from '../Button/Button.vue'

export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left'

export interface DrawerProps {
  open?: boolean
  title?: string
  placement?: DrawerPlacement
  closable?: boolean
  closeByOverlay?: boolean
  width?: string | number
  height?: string | number
  okText?: string
  cancelText?: string
  okButtonProps?: Partial<ButtonProps>
  cancelButtonProps?: Partial<ButtonProps>
  showCancel?: boolean
  isMobile?: boolean
}

const props = withDefaults(defineProps<DrawerProps>(), {
  open: false,
  placement: 'right',
  closable: true,
  closeByOverlay: true,
  width: 378,
  height: 378,
  okText: '确定',
  cancelText: '取消',
  showCancel: true,
  isMobile: false
})

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'close'): void
  (e: 'ok'): void
  (e: 'cancel'): void
  (e: 'afterOpenChange', open: boolean): void
}>()

const attrs = useAttrs()

const visible = ref(false)
const animating = ref(false)

watch(() => props.open, (val) => {
  if (val) {
    visible.value = true
    animating.value = true
    document.body.style.overflow = 'hidden'
  } else {
    animating.value = true
  }
})

const handleClose = () => {
  emit('update:open', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeByOverlay) {
    handleClose()
  }
}

const handleOk = () => {
  emit('ok')
}

const handleCancel = () => {
  emit('cancel')
  handleClose()
}

const handleAfterLeave = () => {
  visible.value = false
  animating.value = false
  document.body.style.overflow = ''
  emit('afterOpenChange', false)
}

const handleAfterEnter = () => {
  animating.value = false
  emit('afterOpenChange', true)
}

const isHorizontal = computed(() => props.placement === 'left' || props.placement === 'right')

const drawerStyle = computed(() => {
  if (isHorizontal.value) {
    const w = typeof props.width === 'number' ? `${props.width}px` : props.width
    return { width: w }
  }
  const h = typeof props.height === 'number' ? `${props.height}px` : props.height
  return { height: h }
})

const drawerClasses = computed(() => [
  'apron-drawer',
  `apron-drawer--${props.placement}`,
  {
    'apron-drawer--mobile': props.isMobile
  }
])

onMounted(() => {
  if (props.open) {
    visible.value = true
    document.body.style.overflow = 'hidden'
  }
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" class="apron-drawer-root">
      <Transition name="apron-drawer-overlay">
        <div v-if="open" class="apron-drawer__overlay" @click="handleOverlayClick" />
      </Transition>
      <Transition
        :name="`apron-drawer-${placement}`"
        @after-enter="handleAfterEnter"
        @after-leave="handleAfterLeave"
      >
        <div v-if="open" :class="drawerClasses" :style="drawerStyle" v-bind="attrs">
          <div v-if="title || closable || $slots.header" class="apron-drawer__header">
            <div class="apron-drawer__title">
              <slot name="header">{{ title }}</slot>
            </div>
            <button
              v-if="closable"
              type="button"
              class="apron-drawer__close"
              @click="handleClose"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div class="apron-drawer__body">
            <slot />
          </div>
          <div v-if="$slots.footer || showCancel || okText" class="apron-drawer__footer">
            <slot name="footer">
              <Button
                v-if="showCancel"
                v-bind="cancelButtonProps"
                @click="handleCancel"
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
            </slot>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style lang="less">
@import './Drawer.less';
</style>

