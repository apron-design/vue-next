import { createApp, h, ref, type App, type Component } from 'vue'

export type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading'

export interface MessageOptions {
  type?: MessageType
  content: string
  duration?: number
  icon?: Component
}

interface MessageItem {
  id: number
  type: MessageType
  content: string
  visible: boolean
}

let messageContainer: HTMLDivElement | null = null
let messageApp: App | null = null
const messages = ref<MessageItem[]>([])
let messageId = 0

const icons = {
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
  success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  loading: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="31.4 31.4"/></svg>`
}

const createContainer = () => {
  if (messageContainer) return

  messageContainer = document.createElement('div')
  messageContainer.className = 'apron-message-container'
  document.body.appendChild(messageContainer)

  // Add styles
  const style = document.createElement('style')
  style.textContent = `
    .apron-message-container {
      position: fixed;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1100;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      pointer-events: none;
    }
    .apron-message {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-family: var(--apron-font-family, sans-serif);
      font-size: 14px;
      color: #18181b;
      pointer-events: auto;
      animation: apron-message-in 0.2s ease;
    }
    .apron-message--leaving {
      animation: apron-message-out 0.2s ease forwards;
    }
    .apron-message__icon {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }
    .apron-message__icon svg {
      width: 100%;
      height: 100%;
    }
    .apron-message--info .apron-message__icon { color: #06b6d4; }
    .apron-message--success .apron-message__icon { color: #22c55e; }
    .apron-message--warning .apron-message__icon { color: #f59e0b; }
    .apron-message--error .apron-message__icon { color: #ef4444; }
    .apron-message--loading .apron-message__icon { 
      color: #393939;
      animation: apron-message-spin 1s linear infinite;
    }
    @keyframes apron-message-in {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes apron-message-out {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-10px); }
    }
    @keyframes apron-message-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    [data-theme='dark'] .apron-message {
      background: #27272a;
      color: #fafafa;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
    }
    [data-theme='dark'] .apron-message--loading .apron-message__icon {
      color: #fafafa;
    }
  `
  document.head.appendChild(style)

  messageApp = createApp({
    render() {
      return messages.value.map(msg =>
        h('div', {
          key: msg.id,
          class: ['apron-message', `apron-message--${msg.type}`, { 'apron-message--leaving': !msg.visible }]
        }, [
          h('span', { class: 'apron-message__icon', innerHTML: icons[msg.type] }),
          h('span', { class: 'apron-message__content' }, msg.content)
        ])
      )
    }
  })

  messageApp.mount(messageContainer)
}

const show = (options: MessageOptions | string) => {
  createContainer()

  const opts: MessageOptions = typeof options === 'string' ? { content: options } : options
  const { type = 'info', content, duration = 3000 } = opts

  const id = messageId++
  const item: MessageItem = { id, type, content, visible: true }
  messages.value.push(item)

  if (type !== 'loading' && duration > 0) {
    setTimeout(() => {
      close(id)
    }, duration)
  }

  return id
}

const close = (id: number) => {
  const item = messages.value.find(m => m.id === id)
  if (item) {
    item.visible = false
    setTimeout(() => {
      const index = messages.value.findIndex(m => m.id === id)
      if (index !== -1) {
        messages.value.splice(index, 1)
      }
    }, 200)
  }
}

const info = (content: string, duration?: number) => show({ type: 'info', content, duration })
const success = (content: string, duration?: number) => show({ type: 'success', content, duration })
const warning = (content: string, duration?: number) => show({ type: 'warning', content, duration })
const error = (content: string, duration?: number) => show({ type: 'error', content, duration })
const loading = (content: string) => show({ type: 'loading', content, duration: 0 })

export const Message = {
  show,
  close,
  info,
  success,
  warning,
  error,
  loading
}

export default Message

