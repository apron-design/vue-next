export type ToastType = 'success' | 'fail' | 'danger' | 'loading'

export interface ToastOptions {
  /** 提示文字 */
  text?: string
  /** 自定义图标 */
  icon?: any
  /** 显示时长（毫秒），设置为 0 则不自动关闭 */
  duration?: number
  /** Toast 类型 */
  type?: ToastType
}