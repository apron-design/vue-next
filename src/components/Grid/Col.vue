<template>
  <div ref="colRef" :class="classes" :style="colStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue'

type ColSpanType = number | string

interface ColSize {
  span?: ColSpanType
  offset?: number
  order?: number
  push?: number
  pull?: number
}

export interface ColProps {
  /** 栅格占位格数，为 0 时相当于 display: none */
  span?: ColSpanType
  /** 栅格左侧的间隔格数 */
  offset?: number
  /** 栅格顺序 */
  order?: number
  /** 栅格向右移动格数 */
  push?: number
  /** 栅格向左移动格数 */
  pull?: number
  /** flex 布局属性 */
  flex?: string | number
  /** xs 屏幕 < 576px */
  xs?: ColSpanType | ColSize
  /** sm 屏幕 ≥ 576px */
  sm?: ColSpanType | ColSize
  /** md 屏幕 ≥ 768px */
  md?: ColSpanType | ColSize
  /** lg 屏幕 ≥ 992px */
  lg?: ColSpanType | ColSize
  /** xl 屏幕 ≥ 1200px */
  xl?: ColSpanType | ColSize
  /** xxl 屏幕 ≥ 1600px */
  xxl?: ColSpanType | ColSize
  /** 自定义类名 */
  class?: string
  /** 自定义样式 */
  style?: Record<string, any>
}

const props = withDefaults(defineProps<ColProps>(), {
  span: undefined,
  offset: undefined,
  order: undefined,
  push: undefined,
  pull: undefined,
  flex: undefined
})

const colRef = ref<HTMLDivElement | null>(null)

// 获取 Row 上下文
const rowContext = inject<{ gutter: [number, number] }>('rowContext', { gutter: [0, 0] })
const [horizontalGutter] = rowContext.gutter

// 解析 flex 属性
const parseFlex = (flex: string | number): string => {
  if (typeof flex === 'number') {
    return `${flex} ${flex} auto`
  }

  if (/^\d+(\.\d+)?(px|em|rem|%|vw|vh)?$/.test(flex)) {
    return `0 0 ${flex}`
  }

  return flex
}

// 生成响应式类名
const sizeClassNames = computed(() => {
  const classNames: string[] = []
  
  const sizes = { xs: props.xs, sm: props.sm, md: props.md, lg: props.lg, xl: props.xl, xxl: props.xxl }
  
  Object.entries(sizes).forEach(([size, value]) => {
    if (value === undefined) return
    
    if (typeof value === 'number' || typeof value === 'string') {
      if (Number(value) > 0) {
        classNames.push(`apron-col-${size}-${value}`)
      } else if (Number(value) === 0) {
        classNames.push(`apron-col-${size}-0`)
      }
    } else if (typeof value === 'object') {
      const sizeProps = value as ColSize
      if (sizeProps.span !== undefined) {
        classNames.push(`apron-col-${size}-${sizeProps.span}`)
      }
      if (sizeProps.offset !== undefined) {
        classNames.push(`apron-col-${size}-offset-${sizeProps.offset}`)
      }
      if (sizeProps.order !== undefined) {
        classNames.push(`apron-col-${size}-order-${sizeProps.order}`)
      }
      if (sizeProps.push !== undefined) {
        classNames.push(`apron-col-${size}-push-${sizeProps.push}`)
      }
      if (sizeProps.pull !== undefined) {
        classNames.push(`apron-col-${size}-pull-${sizeProps.pull}`)
      }
    }
  })
  
  return classNames
})

const classes = computed(() => [
  'apron-col',
  props.span !== undefined && `apron-col-${props.span}`,
  props.offset !== undefined && `apron-col-offset-${props.offset}`,
  props.order !== undefined && `apron-col-order-${props.order}`,
  props.push !== undefined && `apron-col-push-${props.push}`,
  props.pull !== undefined && `apron-col-pull-${props.pull}`,
  ...sizeClassNames.value,
  props.class,
].filter(Boolean).join(' '))

const colStyle = computed(() => {
  const style: Record<string, any> = { ...props.style }
  
  if (horizontalGutter > 0) {
    style.paddingLeft = horizontalGutter / 2
    style.paddingRight = horizontalGutter / 2
  }
  
  if (props.flex) {
    style.flex = parseFlex(props.flex)
  }
  
  return style
})
</script>

<style lang="less">
@import '../../styles/variables.less';

// Col 基础样式
.apron-col {
  position: relative;
  max-width: 100%;
  min-height: 1px;
  box-sizing: border-box;
}

// 生成栅格类
.generate-grid-columns(@breakpoint: ~'') {
  @prefix: if(@breakpoint = '', ~'apron-col', ~'apron-col-@{breakpoint}');
  
  .loop-grid-columns(@index) when (@index >= 0) {
    // span
    .@{prefix}-@{index} {
      & when (@index = 0) {
        display: none;
      }
      & when not (@index = 0) {
        display: block;
        flex: 0 0 percentage((@index / 24));
        max-width: percentage((@index / 24));
      }
    }
    
    // offset
    .@{prefix}-offset-@{index} {
      margin-left: percentage((@index / 24));
    }
    
    // order
    .@{prefix}-order-@{index} {
      order: @index;
    }
    
    // push
    .@{prefix}-push-@{index} {
      & when (@index = 0) {
        left: auto;
      }
      & when not (@index = 0) {
        left: percentage((@index / 24));
      }
    }
    
    // pull
    .@{prefix}-pull-@{index} {
      & when (@index = 0) {
        right: auto;
      }
      & when not (@index = 0) {
        right: percentage((@index / 24));
      }
    }
    
    .loop-grid-columns(@index - 1);
  }
  
  .loop-grid-columns(24);
}

// 生成默认栅格（无断点）
.generate-grid-columns();

// 响应式断点
@grid-breakpoints: {
  xs: 0;
  sm: 576px;
  md: 768px;
  lg: 992px;
  xl: 1200px;
  xxl: 1600px;
};

// 生成响应式栅格
@media (min-width: 576px) {
  .generate-grid-columns(sm);
}

@media (min-width: 768px) {
  .generate-grid-columns(md);
}

@media (min-width: 992px) {
  .generate-grid-columns(lg);
}

@media (min-width: 1200px) {
  .generate-grid-columns(xl);
}

@media (min-width: 1600px) {
  .generate-grid-columns(xxl);
}
</style>