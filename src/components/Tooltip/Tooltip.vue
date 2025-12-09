<template>
  <div>
    <slot 
      :ref="(el: any) => triggerRef = el as HTMLElement"
      @mouseenter="open"
      @mouseleave="close"
    ></slot>
    <Teleport to="body" v-if="visible">
      <div
        ref="tooltipRef"
        :class="['apron-tooltip', props.className]"
        :style="{ top: position.top + 'px', left: position.left + 'px' }"
        @mouseenter="handleTooltipMouseEnter"
        @mouseleave="handleTooltipMouseLeave"
        role="tooltip"
      >
        <div class="apron-tooltip__arrow"></div>
        <div class="apron-tooltip__content">
          <slot name="content">{{ content }}</slot>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, useSlots } from 'vue'
import type { TooltipProps } from './types'

// 默认属性
const props = withDefaults(defineProps<TooltipProps>(), {
  content: '',
  className: ''
})

// 定义 emits
const emit = defineEmits(['update:visible'])

// 引用
const triggerRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLDivElement | null>(null)
const hoverTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

// 状态
const visible = ref(false)
const position = ref({ top: 0, left: 0 })

// 插槽
const slots = useSlots()

// 计算位置（Tooltip 在触发元素上方，箭头指向下方）
const updatePosition = () => {
  if (!triggerRef.value || !tooltipRef.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const tooltipRect = tooltipRef.value.getBoundingClientRect()

  const top = triggerRect.top - tooltipRect.height - 8 + window.scrollY
  let left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2 + window.scrollX

  // 边界检测
  if (left < 8) left = 8
  if (left + tooltipRect.width > window.innerWidth - 8) {
    left = window.innerWidth - tooltipRect.width - 8
  }

  position.value = { top, left }
}

// 打开 Tooltip
const open = () => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
    hoverTimeout.value = null
  }
  visible.value = true
  
  // 延迟计算以确保 DOM 已渲染
  nextTick(() => {
    updatePosition()
  })
}

// 关闭 Tooltip
const close = () => {
  hoverTimeout.value = setTimeout(() => {
    visible.value = false
  }, 100)
}

// Tooltip 的 hover 事件（保持打开）
const handleTooltipMouseEnter = () => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
    hoverTimeout.value = null
  }
}

const handleTooltipMouseLeave = () => {
  close()
}

// 更新位置
const handleResize = () => {
  if (visible.value) {
    updatePosition()
  }
}

const handleScroll = () => {
  if (visible.value) {
    updatePosition()
  }
}

// 生命周期钩子
onMounted(() => {
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll, true)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll, true)
  
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
  }
})

// 暴露方法
defineExpose({
  open,
  close
})
</script>