<template>
  <div v-if="currentMessage" :class="containerClasses">
    <span class="apron-alert__icon">
      <component :is="iconComponent" />
    </span>
    <span class="apron-alert__message">{{ currentMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { iconMap, type AlertType } from '../Alert/icons'

export interface MessageProps {
  /** 消息类型 */
  type?: AlertType
  /** 消息内容 */
  message?: string
  /** 显示时长（毫秒），设置为 0 则不自动关闭 */
  duration?: number
  /** 是否正在离开 */
  leaving?: boolean
}

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 5000,
  leaving: false
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const isVisible = ref(false)
const isLeaving = ref(false)
const isEntering = ref(false)
const timerId = ref<ReturnType<typeof setTimeout> | null>(null)

const iconComponent = computed(() => iconMap[props.type])
const currentMessage = computed(() => props.message)

const containerClasses = computed(() => [
  'apron-alert',
  `apron-alert--${props.type}`,
  isEntering.value && !isLeaving.value && 'apron-alert--visible',
  isLeaving.value && 'apron-alert--leaving',
].filter(Boolean).join(' '))

// 监听 leaving prop 变化
watch(() => props.leaving, (newVal) => {
  if (newVal) {
    close()
  }
})

// 开始显示动画
const show = () => {
  isVisible.value = true
  isLeaving.value = false
  // 触发进入动画
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      isEntering.value = true
    })
  })
  
  // 设置自动关闭
  if (props.duration > 0) {
    timerId.value = setTimeout(() => {
      close()
    }, props.duration)
  }
}

// 关闭消息
const close = () => {
  if (timerId.value) {
    clearTimeout(timerId.value)
    timerId.value = null
  }
  
  isLeaving.value = true
  isEntering.value = false
  
  setTimeout(() => {
    isVisible.value = false
    emit('close')
  }, 300)
}

// 提供方法给父组件调用
defineExpose({
  show,
  close
})

onMounted(() => {
  show()
})

onUnmounted(() => {
  if (timerId.value) {
    clearTimeout(timerId.value)
  }
})
</script>