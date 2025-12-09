export type SwitchSize = 'default' | 'small' | 'mini'
export type SwitchVariant = 'default' | 'primary' | 'secondary'

export interface SwitchProps {
  /** 是否开启 */
  checked?: boolean
  /** 默认是否开启（非受控） */
  defaultChecked?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 尺寸 */
  size?: SwitchSize
  /** 变种 */
  variant?: SwitchVariant
  /** 自定义开启时的颜色 */
  checkedColor?: string
  /** 自定义关闭时的颜色 */
  uncheckedColor?: string
  /** 自定义类名 */
  className?: string
  /** ID */
  id?: string
}