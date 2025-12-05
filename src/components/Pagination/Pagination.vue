<script setup lang="ts">
import { computed, useAttrs } from 'vue'

export interface PaginationProps {
  current?: number
  total?: number
  pageSize?: number
  showQuickJumper?: boolean
  showTotal?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<PaginationProps>(), {
  current: 1,
  total: 0,
  pageSize: 10,
  showQuickJumper: false,
  showTotal: false,
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:current', page: number): void
  (e: 'change', page: number, pageSize: number): void
}>()

const attrs = useAttrs()

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

const displayPages = computed(() => {
  const pages: (number | 'ellipsis-start' | 'ellipsis-end')[] = []
  const current = props.current
  const total = totalPages.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)

    if (current > 4) {
      pages.push('ellipsis-start')
    }

    const start = Math.max(2, current - 2)
    const end = Math.min(total - 1, current + 2)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (current < total - 3) {
      pages.push('ellipsis-end')
    }

    if (total > 1) {
      pages.push(total)
    }
  }

  return pages
})

const canGoPrev = computed(() => props.current > 1)
const canGoNext = computed(() => props.current < totalPages.value)

const changePage = (page: number) => {
  if (props.disabled) return
  if (page < 1 || page > totalPages.value) return
  if (page === props.current) return

  emit('update:current', page)
  emit('change', page, props.pageSize)
}

const goToPrev = () => {
  if (canGoPrev.value) {
    changePage(props.current - 1)
  }
}

const goToNext = () => {
  if (canGoNext.value) {
    changePage(props.current + 1)
  }
}

const jumpFiveBack = () => {
  changePage(Math.max(1, props.current - 5))
}

const jumpFiveForward = () => {
  changePage(Math.min(totalPages.value, props.current + 5))
}

const paginationClasses = computed(() => [
  'apron-pagination',
  {
    'apron-pagination--disabled': props.disabled
  }
])
</script>

<template>
  <nav :class="paginationClasses" aria-label="Pagination" v-bind="attrs">
    <span v-if="showTotal" class="apron-pagination__total">
      共 {{ total }} 条
    </span>
    
    <button
      type="button"
      class="apron-pagination__btn apron-pagination__prev"
      :disabled="!canGoPrev || disabled"
      @click="goToPrev"
      aria-label="Previous page"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>

    <template v-for="(page, index) in displayPages" :key="index">
      <button
        v-if="page === 'ellipsis-start'"
        type="button"
        class="apron-pagination__btn apron-pagination__ellipsis"
        @click="jumpFiveBack"
        aria-label="Jump 5 pages back"
      >
        •••
      </button>
      <button
        v-else-if="page === 'ellipsis-end'"
        type="button"
        class="apron-pagination__btn apron-pagination__ellipsis"
        @click="jumpFiveForward"
        aria-label="Jump 5 pages forward"
      >
        •••
      </button>
      <button
        v-else
        type="button"
        class="apron-pagination__btn apron-pagination__page"
        :class="{ 'apron-pagination__page--active': page === current }"
        :disabled="disabled"
        @click="changePage(page as number)"
        :aria-label="`Page ${page}`"
        :aria-current="page === current ? 'page' : undefined"
      >
        {{ page }}
      </button>
    </template>

    <button
      type="button"
      class="apron-pagination__btn apron-pagination__next"
      :disabled="!canGoNext || disabled"
      @click="goToNext"
      aria-label="Next page"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  </nav>
</template>

<style lang="less">
@import './Pagination.less';
</style>

