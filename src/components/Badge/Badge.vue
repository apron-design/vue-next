<template>
  <span :class="classes" v-bind="$attrs">
    <slot />
    <component :is="renderBadgeContent" />
  </span>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'

export interface BadgeProps {
  /** 显示红点 */
  dot?: boolean
  /** 显示数字 */
  count?: number
  /** 数字溢出值，超过则显示 {overflowCount}+ */
  overflowCount?: number
  /** 自定义内容 */
  content?: string
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<BadgeProps>(), {
  dot: false,
  overflowCount: 99,
})

const classes = computed(() => [
  'apron-badge',
  props.class,
].filter(Boolean).join(' '))

const renderBadgeContent = computed(() => {
  // dot 优先级最高
  if (props.dot) {
    return () => h('sup', { class: 'apron-badge__dot' })
  }

  // content 次之
  if (props.content !== undefined) {
    return () => h('sup', { class: 'apron-badge__content' }, props.content)
  }

  // count 最后
  if (props.count !== undefined && props.count > 0) {
    const displayCount = props.count > props.overflowCount ? `${props.overflowCount}+` : props.count
    const isMultiDigit = String(displayCount).length > 1

    return () => h(
      'sup',
      {
        class: [
          'apron-badge__count',
          isMultiDigit && 'apron-badge__count--multi',
        ].filter(Boolean).join(' ')
      },
      displayCount
    )
  }

  return () => null
})
</script>

<style lang="less">
@import '../../styles/variables.less';

// ============================================
// Badge CSS Variables
// ============================================
:root {
  --apron-badge-bg: @color-error-600;
  --apron-badge-color: #ffffff;
  --apron-badge-border-color: #ffffff;
}

.dark,
[data-prefers-color='dark'] {
  --apron-badge-bg: @color-error-600;
  --apron-badge-color: #ffffff;
  --apron-badge-border-color: @color-neutral-900;
}

// ============================================
// Badge Base Styles
// ============================================
.apron-badge {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  transition: all @transition-slow;

  // ============================================
  // Dot 红点样式
  // ============================================
  &__dot {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--apron-badge-bg);
    border: 1px solid var(--apron-badge-border-color);
    box-sizing: border-box;
    transition: all @transition-slow;
  }

  // ============================================
  // Count 数字样式
  // ============================================
  &__count {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    border-radius: 10px;
    background-color: var(--apron-badge-bg);
    color: var(--apron-badge-color);
    font-family: var(--apron-font-family);
    font-size: @font-size-xs;
    font-weight: @font-weight-medium;
    line-height: 1;
    white-space: nowrap;
    box-sizing: border-box;
    transition: all @transition-slow;

    // 单个数字时为正圆
    &:not(&--multi) {
      padding: 0;
      width: 20px;
    }
  }

  // ============================================
  // Content 自定义内容样式
  // ============================================
  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    border-radius: 10px;
    background-color: var(--apron-badge-bg);
    color: var(--apron-badge-color);
    font-family: var(--apron-font-family);
    font-size: @font-size-xs;
    font-weight: @font-weight-medium;
    line-height: 1;
    white-space: nowrap;
    box-sizing: border-box;
    transition: all @transition-slow;
  }
}
</style>
