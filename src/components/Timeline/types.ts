// ============================================
// Types
// ============================================
export type TimelineSide = 'left' | 'right' | 'both'
export type TimelineDotColor = 'default' | 'primary' | 'main' | 'success' | 'warning' | 'danger'

// ============================================
// Timeline Context
// ============================================
export interface TimelineContextValue {
  side: TimelineSide
}

// ============================================
// Timeline
// ============================================
export interface TimelineProps {
  /** 内容显示位置 */
  side?: TimelineSide
  /** 自定义类名 */
  className?: string
}

// ============================================
// TimelineItem
// ============================================
export interface TimelineItemProps {
  /** 标题 */
  title?: string
  /** 内容 */
  content?: string
  /** 日期 */
  date?: string
  /** 点颜色 */
  dotColor?: TimelineDotColor
}