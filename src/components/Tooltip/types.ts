import type { HTMLAttributes, VNode } from 'vue'

// ============================================
// Tooltip
// ============================================
export interface TooltipProps extends /* @vue-ignore */ Omit<HTMLAttributes, 'content'> {
  /** 提示内容 */
  content?: string | VNode
  /** 自定义类名 */
  className?: string
}