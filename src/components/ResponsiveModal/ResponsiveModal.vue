<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import Modal from '../Modal/Modal.vue'
import Drawer from '../Drawer/Drawer.vue'
import type { ButtonProps } from '../Button/Button.vue'

export interface ResponsiveModalProps {
  open?: boolean
  title?: string
  closable?: boolean
  closeByOverlay?: boolean
  width?: string | number
  okText?: string
  cancelText?: string
  okButtonProps?: Partial<ButtonProps>
  cancelButtonProps?: Partial<ButtonProps>
  showCancel?: boolean
  breakpoint?: number
}

const props = withDefaults(defineProps<ResponsiveModalProps>(), {
  open: false,
  closable: true,
  closeByOverlay: true,
  width: 480,
  okText: '确定',
  cancelText: '取消',
  showCancel: true,
  breakpoint: 768
})

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'close'): void
  (e: 'ok'): void
  (e: 'cancel'): void
  (e: 'afterOpenChange', open: boolean): void
}>()

const attrs = useAttrs()

const isMobile = computed(() => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < props.breakpoint
})

const handleUpdateOpen = (value: boolean) => {
  emit('update:open', value)
}

const handleClose = () => {
  emit('close')
}

const handleOk = () => {
  emit('ok')
}

const handleCancel = () => {
  emit('cancel')
}

const handleAfterOpenChange = (open: boolean) => {
  emit('afterOpenChange', open)
}
</script>

<template>
  <Modal
    v-if="!isMobile"
    :open="open"
    :title="title"
    :closable="closable"
    :closeByOverlay="closeByOverlay"
    :width="width"
    :okText="okText"
    :cancelText="cancelText"
    :okButtonProps="okButtonProps"
    :cancelButtonProps="cancelButtonProps"
    :showCancel="showCancel"
    centered
    @update:open="handleUpdateOpen"
    @close="handleClose"
    @ok="handleOk"
    @cancel="handleCancel"
    @afterOpenChange="handleAfterOpenChange"
    v-bind="attrs"
  >
    <template #header v-if="$slots.header">
      <slot name="header" />
    </template>
    <slot />
    <template #footer v-if="$slots.footer">
      <slot name="footer" />
    </template>
  </Modal>
  <Drawer
    v-else
    :open="open"
    :title="title"
    :closable="closable"
    :closeByOverlay="closeByOverlay"
    placement="bottom"
    height="auto"
    :okText="okText"
    :cancelText="cancelText"
    :okButtonProps="okButtonProps"
    :cancelButtonProps="cancelButtonProps"
    :showCancel="showCancel"
    isMobile
    @update:open="handleUpdateOpen"
    @close="handleClose"
    @ok="handleOk"
    @cancel="handleCancel"
    @afterOpenChange="handleAfterOpenChange"
    v-bind="attrs"
  >
    <template #header v-if="$slots.header">
      <slot name="header" />
    </template>
    <slot />
    <template #footer v-if="$slots.footer">
      <slot name="footer" />
    </template>
  </Drawer>
</template>

