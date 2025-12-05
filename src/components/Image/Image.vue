<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue'

export type ImageFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

export interface ImageProps {
  src?: string
  alt?: string
  fit?: ImageFit
  fallback?: string
  preview?: boolean
  width?: string | number
  height?: string | number
}

const props = withDefaults(defineProps<ImageProps>(), {
  fit: 'cover',
  preview: false
})

const emit = defineEmits<{
  (e: 'load', event: Event): void
  (e: 'error', event: Event): void
}>()

const attrs = useAttrs()
const isLoading = ref(true)
const hasError = ref(false)
const isPreviewOpen = ref(false)

const imageStyle = computed(() => {
  const style: Record<string, string> = {
    objectFit: props.fit
  }
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return style
})

const imageClasses = computed(() => [
  'apron-image',
  {
    'apron-image--loading': isLoading.value,
    'apron-image--error': hasError.value,
    'apron-image--preview': props.preview
  }
])

const handleLoad = (event: Event) => {
  isLoading.value = false
  hasError.value = false
  emit('load', event)
}

const handleError = (event: Event) => {
  isLoading.value = false
  hasError.value = true
  emit('error', event)
}

const handleClick = () => {
  if (props.preview && !hasError.value) {
    isPreviewOpen.value = true
  }
}

const closePreview = () => {
  isPreviewOpen.value = false
}

const fallbackIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
  <circle cx="8.5" cy="8.5" r="1.5"/>
  <polyline points="21 15 16 10 5 21"/>
</svg>`
</script>

<template>
  <div :class="imageClasses" :style="imageStyle" v-bind="attrs">
    <img
      v-if="src && !hasError"
      :src="src"
      :alt="alt"
      class="apron-image__img"
      @load="handleLoad"
      @error="handleError"
      @click="handleClick"
    />
    <div v-else-if="hasError && fallback" class="apron-image__fallback">
      <img :src="fallback" :alt="alt" class="apron-image__img" />
    </div>
    <div v-else-if="hasError" class="apron-image__error">
      <span v-html="fallbackIcon" />
    </div>
    <div v-if="isLoading" class="apron-image__placeholder">
      <div class="apron-image__loading" />
    </div>
    
    <!-- Preview Modal -->
    <Teleport v-if="isPreviewOpen" to="body">
      <div class="apron-image-preview" @click="closePreview">
        <div class="apron-image-preview__mask" />
        <img :src="src" :alt="alt" class="apron-image-preview__img" />
        <button type="button" class="apron-image-preview__close" @click="closePreview">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </Teleport>
  </div>
</template>

<style lang="less">
@import './Image.less';
</style>

