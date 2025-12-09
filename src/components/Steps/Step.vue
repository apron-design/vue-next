<template>
  <div :class="classNames" :style="stepStyle">
    <!-- 顶部标签 -->
    <div
      v-if="labelPlacement === 'top' || labelPlacement === 'both'"
      class="apron-step__label apron-step__label--top"
    >
      {{ renderLabel('top') }}
    </div>

    <!-- 图标和连接线 -->
    <div class="apron-step__content">
      <div class="apron-step__icon">
        <component :is="iconComponent" />
      </div>
      <div
        v-if="!isLast"
        :class="['apron-step__line', lineClass]"
      />
    </div>

    <!-- 底部标签 -->
    <div
      v-if="labelPlacement === 'bottom' || labelPlacement === 'both'"
      class="apron-step__label apron-step__label--bottom"
    >
      {{ renderLabel('bottom') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h } from 'vue'
import type { StepItem, StepStatus, StepLabelPlacement } from './types'

// 定义组件属性
interface StepProps {
  item: StepItem
  status: StepStatus
  isFirst: boolean
  isLast: boolean
  nextStatus?: StepStatus
  labelPlacement: StepLabelPlacement
}

const props = defineProps<StepProps>()

// 计算步骤类名
const classNames = computed(() => [
  'apron-step',
  `apron-step--${props.status}`
].filter(Boolean).join(' '))

// 计算步骤样式
const stepStyle = computed(() => {
  if (props.item.width) {
    return {
      width: typeof props.item.width === 'number' ? `${props.item.width}px` : props.item.width,
      flex: 'none'
    }
  }
  return {}
})

// 已完成图标（勾号）
const CompletedIcon = defineComponent({
  name: 'CompletedIcon',
  setup() {
    return () => h(
      'svg',
      {
        width: '20',
        height: '20',
        viewBox: '0 0 20 20',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg'
      },
      [
        h('circle', {
          cx: '10',
          cy: '10',
          r: '10',
          fill: 'currentColor'
        }),
        h('path', {
          d: 'M6 10L9 13L14 7',
          stroke: 'white',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round'
        })
      ]
    )
  }
})

// 当前步骤图标（圆圈带点）
const CurrentIcon = defineComponent({
  name: 'CurrentIcon',
  setup() {
    return () => h(
      'svg',
      {
        width: '24',
        height: '24',
        viewBox: '0 0 24 24',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg'
      },
      [
        h('circle', {
          cx: '12',
          cy: '12',
          r: '10',
          stroke: 'currentColor',
          'stroke-width': '2',
          fill: 'white'
        }),
        h('circle', {
          cx: '12',
          cy: '12',
          r: '4',
          fill: 'currentColor'
        }),
        h('circle', {
          cx: '12',
          cy: '6',
          r: '1.5',
          fill: 'currentColor'
        }),
        h('circle', {
          cx: '12',
          cy: '18',
          r: '1.5',
          fill: 'currentColor'
        }),
        h('circle', {
          cx: '6',
          cy: '12',
          r: '1.5',
          fill: 'currentColor'
        }),
        h('circle', {
          cx: '18',
          cy: '12',
          r: '1.5',
          fill: 'currentColor'
        })
      ]
    )
  }
})

// 待处理图标（灰色圆点）
const PendingIcon = defineComponent({
  name: 'PendingIcon',
  setup() {
    return () => h(
      'svg',
      {
        width: '24',
        height: '24',
        viewBox: '0 0 24 24',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg'
      },
      [
        h('circle', {
          cx: '12',
          cy: '12',
          r: '10',
          stroke: 'currentColor',
          'stroke-width': '2',
          fill: 'white'
        }),
        h('circle', {
          cx: '12',
          cy: '12',
          r: '5',
          fill: 'currentColor'
        })
      ]
    )
  }
})

// 获取图标组件
const iconComponent = computed(() => {
  switch (props.status) {
    case 'completed':
      return CompletedIcon
    case 'current':
      return CurrentIcon
    case 'pending':
    default:
      return PendingIcon
  }
})

// 获取连接线的类名
const lineClass = computed(() => {
  if (props.status === 'completed' && props.nextStatus === 'completed') {
    return 'apron-step__line--completed'
  }
  if (props.status === 'completed' && props.nextStatus === 'current') {
    return 'apron-step__line--completed-to-current'
  }
  if (props.status === 'current' && props.nextStatus === 'pending') {
    return 'apron-step__line--current-to-pending'
  }
  return 'apron-step__line--pending'
})

// 渲染标签
const renderLabel = (position: 'top' | 'bottom') => {
  if (props.labelPlacement === 'both') {
    if (position === 'top') {
      return props.item.title
    }
    return props.item.subtitle || ''
  }
  if (props.labelPlacement === position) {
    return props.item.title
  }
  return null
}
</script>