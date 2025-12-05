<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue'

export type AvatarSize = 'mini' | 'small' | 'middle' | 'large'

export interface AvatarProps {
  src?: string
  alt?: string
  size?: AvatarSize
  square?: boolean
}

const props = withDefaults(defineProps<AvatarProps>(), {
  size: 'middle',
  square: false
})

const attrs = useAttrs()
const imgError = ref(false)

const avatarClasses = computed(() => [
  'apron-avatar',
  `apron-avatar--${props.size}`,
  {
    'apron-avatar--square': props.square
  }
])

const showImage = computed(() => props.src && !imgError.value)

const handleError = () => {
  imgError.value = true
}
</script>

<template>
  <span :class="avatarClasses" v-bind="attrs">
    <img
      v-if="showImage"
      :src="src"
      :alt="alt"
      class="apron-avatar__image"
      @error="handleError"
    />
    <span v-else class="apron-avatar__content">
      <slot>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </slot>
    </span>
  </span>
</template>

<style lang="less">
@import './Avatar.less';
</style>

