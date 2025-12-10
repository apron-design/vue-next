<template>
  <span :class="classes" v-bind="$attrs">
    <span class="apron-tag__content">
      <slot />
    </span>
    <button 
      v-if="closable"
      type="button"
      class="apron-tag__close"
      aria-label="关闭"
      @click="handleClose"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_tag_close)">
          <path d="M10.1445 2.04844L6.99709 5.19586L3.85229 2.05105C3.73422 1.93259 3.59397 1.83856 3.43954 1.77434C3.28511 1.71013 3.11954 1.67698 2.95229 1.6768C2.78504 1.67661 2.6194 1.7094 2.46483 1.77328C2.31027 1.83716 2.16981 1.93089 2.05149 2.04909C1.93327 2.16742 1.83955 2.3079 1.77568 2.46248C1.71182 2.61707 1.67906 2.78273 1.67928 2.94999C1.6795 3.11725 1.7127 3.28282 1.77698 3.43724C1.84126 3.59165 1.93536 3.73188 2.05388 3.84989L5.20065 6.99666L2.0517 10.1456C1.81245 10.3847 1.67797 10.7091 1.67785 11.0474C1.67773 11.3857 1.81197 11.7101 2.05105 11.9495C2.16943 12.0685 2.3101 12.163 2.46503 12.2276C2.61996 12.2922 2.7861 12.3256 2.95396 12.326C3.12146 12.3269 3.28748 12.2946 3.44247 12.231C3.59747 12.1675 3.73837 12.074 3.85708 11.9558L7.00843 8.80443L10.1508 11.9468C10.3998 12.1958 10.7241 12.3225 11.0498 12.3221C11.2171 12.3225 11.3827 12.2898 11.5373 12.2259C11.6918 12.162 11.8322 12.0681 11.9503 11.9497C12.0686 11.8314 12.1624 11.6909 12.2263 11.5363C12.2903 11.3817 12.3232 11.2161 12.3231 11.0488C12.323 10.8815 12.29 10.7158 12.2259 10.5613C12.1618 10.4068 12.0678 10.2664 11.9495 10.1482L8.80683 7.0056L11.9543 3.85818C12.452 3.36039 12.4485 2.54971 11.9505 2.05214C11.4528 1.55479 10.6419 1.55109 10.1445 2.04844Z" fill="currentColor" />
        </g>
        <defs>
          <clipPath id="clip0_tag_close">
            <rect width="14" height="14" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type TagVariant = 'primary' | 'default'

export interface TagProps {
  /** 标签变体 */
  variant?: TagVariant
  /** 是否可关闭 */
  closable?: boolean
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<TagProps>(), {
  variant: 'default',
  closable: false,
})

const emit = defineEmits<{
  close: []
}>()

const classes = computed(() => [
  'apron-tag',
  `apron-tag--${props.variant}`,
  props.closable && 'apron-tag--closable',
  props.class,
].filter(Boolean).join(' '))

const handleClose = (e: MouseEvent) => {
  e.stopPropagation()
  emit('close')
}
</script>

<style lang="less">
@import '../../styles/variables.less';
@import '../../styles/mixins.less';

// ============================================
// Tag CSS Variables (Light Mode)
// ============================================
:root {
  // Primary
  --apron-tag-primary-bg: @color-primary-500;
  --apron-tag-primary-text: #ffffff;
  --apron-tag-primary-close-hover-bg: rgba(255, 255, 255, 0.2);

  // Default
  --apron-tag-default-bg: @color-neutral-100;
  --apron-tag-default-text: @color-primary-900;
  --apron-tag-default-border: @color-neutral-300;
  --apron-tag-default-close-hover-bg: @color-neutral-200;
}

// ============================================
// Tag CSS Variables (Dark Mode)
// ============================================
[data-prefers-color='dark'] {
  // Primary
  --apron-tag-primary-bg: @color-primary-200;
  --apron-tag-primary-text: @color-primary-900;
  --apron-tag-primary-close-hover-bg: rgba(0, 0, 0, 0.2);

  // Default
  --apron-tag-default-bg: @color-neutral-800;
  --apron-tag-default-text: @color-primary-100;
  --apron-tag-default-border: @color-neutral-600;
  --apron-tag-default-close-hover-bg: @color-neutral-700;
}

// ============================================
// Tag Base Styles
// ============================================
.apron-tag {
  display: inline-flex;
  align-items: center;
  height: 30px;
  padding: 0 12px;
  font-family: var(--apron-font-family);
  font-size: @font-size-sm;
  font-weight: @font-weight-normal;
  line-height: 1;
  border-radius: 15px;
  white-space: nowrap;
  transition: all @transition-slow;

  // ============================================
  // Primary Variant
  // ============================================
  &--primary {
    background-color: var(--apron-tag-primary-bg);
    color: var(--apron-tag-primary-text);

    .apron-tag__close:hover {
      background-color: var(--apron-tag-primary-close-hover-bg);
    }
  }

  // ============================================
  // Default Variant
  // ============================================
  &--default {
    background-color: var(--apron-tag-default-bg);
    color: var(--apron-tag-default-text);
    border: 1px solid var(--apron-tag-default-border);

    .apron-tag__close:hover {
      background-color: var(--apron-tag-default-close-hover-bg);
    }
  }

  // ============================================
  // Closable
  // ============================================
  &--closable {
    padding-right: 6px;
  }

  // ============================================
  // Content
  // ============================================
  &__content {
    display: inline-flex;
    align-items: center;
  }

  // ============================================
  // Close Button
  // ============================================
  &__close {
    .button-reset();

    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    margin-left: 6px;
    border-radius: 50%;
    transition: all @transition-slow;
    flex-shrink: 0;

    &:focus-visible {
      .focus-ring();
    }

    svg {
      width: 10px;
      height: 10px;
    }
  }
}
</style>
