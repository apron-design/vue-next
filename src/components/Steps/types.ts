export type StepStatus = 'completed' | 'current' | 'pending'
export type StepLabelPlacement = 'top' | 'bottom' | 'both'

export interface StepItem {
  /** 步骤标题 */
  title: string
  /** 步骤副标题（用于 both 模式） */
  subtitle?: string
  /** 步骤状态 */
  status?: StepStatus
  /** 单独设置宽度 */
  width?: number | string
}

export interface StepsProps {
  /** 步骤数据 */
  items: StepItem[]
  /** 当前步骤索引（从 0 开始） */
  current?: number
  /** 标签位置 */
  labelPlacement?: StepLabelPlacement
  /** 自定义类名 */
  className?: string
}