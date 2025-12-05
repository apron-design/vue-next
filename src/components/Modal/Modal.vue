<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, useAttrs } from 'vue'
import Button from '../Button/Button.vue'
import type { ButtonProps } from '../Button/Button.vue'

export interface ModalProps {
  open?: boolean
  title?: string
  closable?: boolean
  closeByOverlay?: boolean
  width?: string | number
  centered?: boolean
  okText?: string
  cancelText?: string
  okButtonProps?: Partial<ButtonProps>
  cancelButtonProps?: Partial<ButtonProps>
  showCancel?: boolean
}

const props = withDefaults(defineProps<ModalProps>(), {
  open: false,
  closable: true,
  closeByOverlay: true,
  width: 480,
  centered: false,
  okText: '确定',
  cancelText: '取消',
  showCancel: true
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

const modalWidth = computed(() => {
  return typeof props.width === 'number' ? `${props.width}px` : props.width
})

const modalClasses = computed(() => [
  'apron-modal',
  {
    'apron-modal--centered': props.centered
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
    <div v-if="visible" class="apron-modal-root">
      <Transition name="apron-modal-overlay">
        <div v-if="open" class="apron-modal__overlay" @click="handleOverlayClick" />
      </Transition>
      <div :class="modalClasses">
        <Transition
          name="apron-modal"
          @after-enter="handleAfterEnter"
          @after-leave="handleAfterLeave"
        >
          <div v-if="open" class="apron-modal__wrapper" :style="{ width: modalWidth }" v-bind="attrs">
            <div v-if="title || closable || $slots.header" class="apron-modal__header">
              <div class="apron-modal__title">
                <slot name="header">{{ title }}</slot>
              </div>
              <button
                v-if="closable"
                type="button"
                class="apron-modal__close"
                @click="handleClose"
                aria-label="Close"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div class="apron-modal__body">
              <slot />
            </div>
            <div v-if="$slots.footer || showCancel || okText" class="apron-modal__footer">
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
    </div>
  </Teleport>
</template>

<style lang="less">
@import './Modal.less';
</style>

