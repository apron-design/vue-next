import { createApp } from 'vue'
import type { AlertType } from '../Alert/icons'
import MessageManager from './MessageManager.vue'

// 全局状态管理
let messageManagerInstance: any = null
let messageManagerApp: ReturnType<typeof createApp> | null = null
let container: HTMLDivElement | null = null

// SSR 检查
const canUseDOM = typeof window !== 'undefined' && typeof document !== 'undefined'

// 确保容器存在
const ensureContainer = () => {
  if (!canUseDOM) return

  if (!container) {
    container = document.createElement('div')
    container.className = 'apron-alert-root'
    document.body.appendChild(container)
    const app = createApp(MessageManager)
    messageManagerApp = app
    messageManagerInstance = app.mount(container)
  }
}

// 显示 Message
const showMessage = (
  type: AlertType,
  message: string,
  duration: number = 5000
): string => {
  ensureContainer()
  
  if (messageManagerInstance) {
    return messageManagerInstance.addMessage(type, message, duration)
  }
  
  return ''
}

// 移除 Message
const removeMessage = (id: string) => {
  if (messageManagerInstance) {
    messageManagerInstance.handleClose(id)
  }
}

// 清除所有 Messages
const clearAllMessages = () => {
  if (messageManagerInstance) {
    messageManagerInstance.clearAll()
  }
}

// 导出的 message 对象
export const AdMessage = {
  show: (type: AlertType, message: string, duration?: number) =>
    showMessage(type, message, duration),
  info: (message: string, duration?: number) =>
    showMessage('info', message, duration),
  success: (message: string, duration?: number) =>
    showMessage('success', message, duration),
  warning: (message: string, duration?: number) =>
    showMessage('warning', message, duration),
  error: (message: string, duration?: number) =>
    showMessage('error', message, duration),
  remove: removeMessage,
  clear: clearAllMessages,
}

export type { MessageProps } from './Message.vue'
export default AdMessage