<template>
  <div v-if="loading" :class="classes">
    <div class="apron-skeleton__content">
      <SkeletonAvatar :animated="animated" />
      <div class="apron-skeleton__info">
        <SkeletonTitle :animated="animated" />
        <SkeletonParagraph :animated="animated" :rows="3" />
      </div>
    </div>
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SkeletonAvatar from './SkeletonAvatar.vue'
import SkeletonTitle from './SkeletonTitle.vue'
import SkeletonParagraph from './SkeletonParagraph.vue'

export interface SkeletonProps {
  /** 是否显示骨架屏 */
  loading?: boolean
  /** 是否显示动画 */
  animated?: boolean
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  loading: true,
  animated: true,
})

const classes = computed(() => [
  'apron-skeleton',
  props.class,
].filter(Boolean).join(' '))
</script>

<style lang="less">
@import '../../styles/variables.less';

// ============================================
// Skeleton CSS Variables (Light Mode)
// ============================================
:root {
  --apron-skeleton-bg: @color-neutral-200;
  --apron-skeleton-gradient: linear-gradient(
    103.5deg,
    @color-neutral-200 25%,
    @color-neutral-100 50%,
    @color-neutral-200 75%
  );
}

// ============================================
// Skeleton CSS Variables (Dark Mode)
// ============================================
.dark,
[data-prefers-color='dark'] {
  --apron-skeleton-bg: @color-neutral-700;
  --apron-skeleton-gradient: linear-gradient(
    103.5deg,
    @color-neutral-700 25%,
    @color-neutral-600 50%,
    @color-neutral-700 75%
  );
}

// ============================================
// Animation
// ============================================
@keyframes apron-skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

// ============================================
// Base Element Styles
// ============================================
.apron-skeleton__element--animated {
  background: var(--apron-skeleton-gradient);
  background-size: 400% 100%;
  animation: apron-skeleton-loading 1.5s ease infinite;
}

// ============================================
// Skeleton Container
// ============================================
.apron-skeleton {
  width: 100%;

  &__content {
    display: flex;
    gap: @spacing-4;
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: @spacing-3;
  }
}
</style>
