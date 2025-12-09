<template>
  <span :class="classes" v-bind="$attrs">
    <img 
      v-if="src"
      :src="src"
      :alt="alt"
      class="apron-avatar__image"
      v-bind="imgProps"
    />
    <span v-else class="apron-avatar__content">
      <slot />
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'

export type AvatarSize = 'mini' | 'small' | 'middle' | 'large'

export interface AvatarProps {
  /** 是否为方形 */
  square?: boolean
  /** 头像尺寸 */
  size?: AvatarSize
  /** 图片地址 */
  src?: string
  /** 图片替代文本 */
  alt?: string
  /** 图片属性 */
  imgProps?: Record<string, any>
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<AvatarProps>(), {
  square: false,
  size: 'middle',
  alt: '',
})

const classes = computed(() => [
  'apron-avatar',
  `apron-avatar--${props.size}`,
  props.square && 'apron-avatar--square',
  props.class,
].filter(Boolean).join(' '))
</script>

<style lang="less">
@import '../../styles/variables.less';
@import '../../styles/mixins.less';

// ============================================
// Avatar CSS Variables (Light Mode)
// ============================================
:root {
  --apron-avatar-bg: @color-neutral-200;
  --apron-avatar-color: @color-neutral-600;
  --apron-avatar-border-color: #ffffff;
}

// ============================================
// Avatar CSS Variables (Dark Mode)
// ============================================
.dark,
[data-prefers-color='dark'] {
  --apron-avatar-bg: @color-neutral-700;
  --apron-avatar-color: @color-neutral-300;
  --apron-avatar-border-color: @color-neutral-900;
}

// ============================================
// Avatar Base Styles
// ============================================
.apron-avatar {
  .flex-center();

  position: relative;
  display: inline-flex;
  overflow: hidden;
  background-color: var(--apron-avatar-bg);
  color: var(--apron-avatar-color);
  font-family: var(--apron-font-family);
  font-weight: @font-weight-medium;
  vertical-align: middle;
  white-space: nowrap;
  border-radius: 50%;
  transition: all @transition-slow;

  // ============================================
  // Sizes
  // ============================================
  &--mini {
    width: 28px;
    height: 28px;
    font-size: @font-size-xs;
  }

  &--small {
    width: 34px;
    height: 34px;
    font-size: @font-size-sm;
  }

  &--middle {
    width: 40px;
    height: 40px;
    font-size: @font-size-base;
  }

  &--large {
    width: 64px;
    height: 64px;
    font-size: @font-size-xl;
  }

  // ============================================
  // Square Shape
  // ============================================
  &--square {
    border-radius: @radius-lg;
  }

  // ============================================
  // Image
  // ============================================
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  // ============================================
  // Content (文字/图标)
  // ============================================
  &__content {
    .flex-center();

    width: 100%;
    height: 100%;
    overflow: hidden;

    svg {
      width: 60%;
      height: 60%;
    }
  }
}

// ============================================
// Avatar Group
// ============================================
.apron-avatar-group {
  display: inline-flex;
  flex-direction: row-reverse;
  align-items: center;
  transition: all @transition-slow;

  .apron-avatar {
    box-sizing: content-box;
    border: 2px solid var(--apron-avatar-border-color);

    &:not(:last-child) {
      margin-left: -12px;
    }
  }
}
</style>
