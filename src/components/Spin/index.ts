import AdSpin from './Spin.vue'
import type { SpinProps, SpinPlacement } from './types'

export type { SpinProps, SpinPlacement }
export { AdSpin }

// 静态方法：显示全屏 Spin
// 使用全局实例管理，与组件内部的实现保持一致
const show = (options: Omit<SpinProps, 'loading' | 'children'> = {}) => {
  // 确保全局容器存在（组件内部会创建）
  // 设置选项和可见性
  setTimeout(() => {
    if ((window as any).__APRON_SPIN__) {
      ;(window as any).__APRON_SPIN__.setOptions(options)
      ;(window as any).__APRON_SPIN__.setVisible(true)
    } else {
      // 如果全局实例不存在，创建一个简单的实现
      console.warn('Spin.show() 需要先挂载 Spin 组件以初始化全局实例')
    }
  }, 0)
}

// 静态方法：关闭全屏 Spin
const close = () => {
  if ((window as any).__APRON_SPIN__) {
    ;(window as any).__APRON_SPIN__.setVisible(false)
  }
}

// 将静态方法附加到组件上，以保持与 React 版本 API 一致
;(AdSpin as any).show = show
;(AdSpin as any).close = close

export default AdSpin