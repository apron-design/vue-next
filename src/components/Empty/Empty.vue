<template>
  <div :class="classes" v-bind="$attrs">
    <span class="apron-empty__icon">
      <slot name="icon">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_empty_icon)">
            <path
              d="M33.4219 16.6875H6.58203C6.08594 16.6875 5.62891 16.957 5.38672 17.3906L0.171875 26.7461C0.0585938 26.9492 0 27.1797 0 27.4141V38.6289C0 39.3867 0.613281 40 1.37109 40H38.6328C39.3906 40 40.0039 39.3867 40.0039 38.6289V27.4141C40.0039 27.1797 39.9453 26.9531 39.832 26.7461L34.6172 17.3906C34.375 16.957 33.918 16.6875 33.4219 16.6875ZM26.3047 27.1719C25.6602 27.1719 25.1016 27.6211 24.9648 28.2539C24.4688 30.5391 22.4336 32.25 19.9961 32.25C17.5586 32.25 15.5234 30.5391 15.0273 28.2539C14.8906 27.625 14.332 27.1719 13.6875 27.1719H4.64844C3.61719 27.1719 2.95703 26.0781 3.43359 25.1641L6.625 19.0781C6.86328 18.625 7.32812 18.3438 7.83984 18.3438H32.1523C32.6602 18.3438 33.1289 18.625 33.3672 19.0781L36.5586 25.1641C37.0352 26.0781 36.375 27.1719 35.3438 27.1719H26.3047ZM32.0273 8.18359C31.9883 8.11328 31.9453 8.03906 31.9023 7.96875C31.5195 7.32031 30.6875 7.10156 30.0352 7.47656L25.332 10.1953C24.668 10.5781 24.4453 11.4297 24.8398 12.0859C24.875 12.1406 24.9062 12.1992 24.9375 12.2578C25.3086 12.9219 26.1563 13.1484 26.8125 12.7656L31.5234 10.0508C32.1758 9.67187 32.3984 8.83984 32.0273 8.18359ZM14.6641 10.1992L9.96094 7.48438C9.30859 7.10938 8.47656 7.32812 8.09375 7.97656C8.05078 8.04687 8.01172 8.11719 7.96875 8.19141C7.59766 8.84766 7.82031 9.67969 8.47266 10.0586L13.1758 12.7734C13.8359 13.1523 14.6836 12.9297 15.0508 12.2617C15.082 12.2031 15.1172 12.1484 15.1484 12.0898C15.5469 11.4336 15.3242 10.582 14.6641 10.1992ZM20 9.34766H20.0977C20.8594 9.35938 21.4844 8.74219 21.4844 7.97656V2.54688C21.4844 1.79297 20.875 1.18359 20.125 1.17578H19.875C19.125 1.18359 18.5156 1.79687 18.5156 2.54688V7.97656C18.5156 8.73828 19.1367 9.35938 19.9023 9.34766H20Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_empty_icon">
              <rect width="40" height="40" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </slot>
    </span>
    <span class="apron-empty__text">
      <slot>{{ text }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface EmptyProps {
  /** 提示文字 */
  text?: string
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<EmptyProps>(), {
  text: '暂无数据',
})

const classes = computed(() => [
  'apron-empty',
  props.class,
].filter(Boolean).join(' '))
</script>

<style lang="less">
@import '../../styles/variables.less';

// ============================================
// Empty CSS Variables (Light Mode)
// ============================================
:root {
  --apron-empty-border-color: @color-neutral-200;
  --apron-empty-icon-color: @color-neutral-400;
  --apron-empty-text-color: @color-neutral-500;
}

// ============================================
// Empty CSS Variables (Dark Mode)
// ============================================
.dark,
[data-prefers-color='dark'] {
  --apron-empty-border-color: @color-neutral-700;
  --apron-empty-icon-color: @color-neutral-500;
  --apron-empty-text-color: @color-neutral-400;
}

// ============================================
// Empty Base Styles
// ============================================
.apron-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 200px;
  padding: @spacing-6;
  border: 1px solid var(--apron-empty-border-color);
  border-radius: @radius-lg;
  transition: all @transition-slow;

  // ============================================
  // Icon
  // ============================================
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--apron-empty-icon-color);
    transition: all @transition-slow;

    svg {
      width: 40px;
      height: 40px;
    }
  }

  // ============================================
  // Text
  // ============================================
  &__text {
    font-family: var(--apron-font-family);
    font-size: @font-size-base;
    color: var(--apron-empty-text-color);
    text-align: center;
    line-height: @line-height-normal;
    transition: all @transition-slow;
  }
}
</style>
