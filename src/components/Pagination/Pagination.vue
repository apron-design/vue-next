<template>
  <nav :class="containerClasses" aria-label="分页导航">
    <!-- 上一页按钮 -->
    <button
      type="button"
      :class="[
        'apron-pagination__item',
        'apron-pagination__arrow',
        (currentPage === 1 || disabled) ? 'apron-pagination__item--disabled' : ''
      ]"
      @click="handlePageChange(currentPage - 1)"
      :disabled="disabled || currentPage === 1"
      aria-label="上一页"
    >
      <LeftArrowIcon />
    </button>

    <!-- 页码 -->
    <template v-for="(page, index) in pageNumbers" :key="getPageKey(page, index)">
      <span
        v-if="page === 'ellipsis-left' || page === 'ellipsis-right'"
        class="apron-pagination__item apron-pagination__ellipsis"
      >
        <EllipsisIcon />
      </span>
      <button
        v-else
        type="button"
        :class="[
          'apron-pagination__item',
          page === currentPage ? 'apron-pagination__item--active' : ''
        ]"
        @click="handlePageChange(page)"
        :disabled="disabled"
        :aria-current="page === currentPage ? 'page' : undefined"
      >
        {{ page }}
      </button>
    </template>

    <!-- 下一页按钮 -->
    <button
      type="button"
      :class="[
        'apron-pagination__item',
        'apron-pagination__arrow',
        (currentPage === totalPages || disabled) ? 'apron-pagination__item--disabled' : ''
      ]"
      @click="handlePageChange(currentPage + 1)"
      :disabled="disabled || currentPage === totalPages"
      aria-label="下一页"
    >
      <RightArrowIcon />
    </button>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import './Pagination.less'

export type PaginationSize = 'large' | 'default' | 'small'

export interface PaginationProps {
  /** 数据总数 */
  count: number
  /** 每页条数 */
  pageSize?: number
  /** 当前页码 */
  current?: number
  /** 默认当前页码 */
  defaultCurrent?: number
  /** 尺寸 */
  size?: PaginationSize
  /** 是否禁用 */
  disabled?: boolean
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<PaginationProps>(), {
  pageSize: 10,
  defaultCurrent: 1,
  size: 'default',
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:current', page: number): void
  (e: 'change', page: number): void
}>()

// 受控/非受控模式
const internalCurrent = ref(props.defaultCurrent)
const currentPage = computed(() => props.current ?? internalCurrent.value)

// 计算总页数
const totalPages = computed(() => Math.ceil(props.count / props.pageSize))

// 处理页码变化
const handlePageChange = (page: number) => {
  if (props.disabled) return
  if (page < 1 || page > totalPages.value) return
  if (page === currentPage.value) return

  if (props.current === undefined) {
    internalCurrent.value = page
  }
  emit('update:current', page)
  emit('change', page)
}

// 生成页码列表
const pageNumbers = computed(() => {
  const pages: (number | 'ellipsis-left' | 'ellipsis-right')[] = []

  if (totalPages.value <= 0) return pages

  if (totalPages.value <= 7) {
    // 页码数不超过7，全部显示
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    // 页码数超过7，显示 前3 ... 后3 或根据当前位置调整
    const showLeftEllipsis = currentPage.value > 4
    const showRightEllipsis = currentPage.value < totalPages.value - 3

    if (!showLeftEllipsis && showRightEllipsis) {
      // 当前页靠近开头：1 2 3 4 5 ... 最后
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('ellipsis-right')
      pages.push(totalPages.value)
    } else if (showLeftEllipsis && !showRightEllipsis) {
      // 当前页靠近结尾：1 ... 倒数5 倒数4 倒数3 倒数2 倒数1
      pages.push(1)
      pages.push('ellipsis-left')
      for (let i = totalPages.value - 4; i <= totalPages.value; i++) {
        pages.push(i)
      }
    } else if (showLeftEllipsis && showRightEllipsis) {
      // 当前页在中间：1 ... 前一页 当前页 后一页 ... 最后
      pages.push(1)
      pages.push('ellipsis-left')
      for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) {
        pages.push(i)
      }
      pages.push('ellipsis-right')
      pages.push(totalPages.value)
    }
  }

  return pages
})

const getPageKey = (page: number | 'ellipsis-left' | 'ellipsis-right', index: number) => {
  if (page === 'ellipsis-left' || page === 'ellipsis-right') {
    return `${page}-${index}`
  }
  return page
}

const containerClasses = computed(() => [
  'apron-pagination',
  `apron-pagination--${props.size}`,
  props.disabled && 'apron-pagination--disabled',
  props.class
].filter(Boolean).join(' '))

// 左箭头图标组件
const LeftArrowIcon = {
  name: 'LeftArrowIcon',
  setup() {
    return () => h('svg', {
      width: '12',
      height: '12',
      viewBox: '0 0 12 12',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('path', {
        d: 'M7.5 9L4.5 6L7.5 3',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      })
    ])
  }
}

// 右箭头图标组件
const RightArrowIcon = {
  name: 'RightArrowIcon',
  setup() {
    return () => h('svg', {
      width: '12',
      height: '12',
      viewBox: '0 0 12 12',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('path', {
        d: 'M4.5 3L7.5 6L4.5 9',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      })
    ])
  }
}

// 省略号图标组件
const EllipsisIcon = {
  name: 'EllipsisIcon',
  setup() {
    return () => h('svg', {
      width: '12',
      height: '12',
      viewBox: '0 0 12 12',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('circle', {
        cx: '2',
        cy: '6',
        r: '1',
        fill: 'currentColor'
      }),
      h('circle', {
        cx: '6',
        cy: '6',
        r: '1',
        fill: 'currentColor'
      }),
      h('circle', {
        cx: '10',
        cy: '6',
        r: '1',
        fill: 'currentColor'
      })
    ])
  }
}
</script>