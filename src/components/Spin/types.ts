export type SpinPlacement =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

export interface SpinProps {
  /** 是否显示加载中 */
  loading?: boolean
  /** 自定义图标 */
  icon?: any
  /** 提示文字 */
  text?: string
  /** 位置 */
  placement?: SpinPlacement
  /** 子元素 */
  children?: any
  /** 自定义类名 */
  className?: string
  /** 是否全屏 */
  fullscreen?: boolean
}