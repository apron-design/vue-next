---
title: Message 全局提示
group: 反馈组件
order: 3
---

# Message 全局提示

全局展示操作反馈信息，常用于通知用户操作结果。Message 组件提供了一种轻量级的反馈机制，不会打断用户的操作流程。

## 何时使用

- 需要向用户显示操作反馈时
- 需要全局性的简短通知时
- 不希望打断用户操作流程的通知场景
- 表单提交、数据删除等操作的结果反馈
- 系统状态变更通知

## 代码演示

### 基础用法

最简单的用法，通过不同方法显示不同类型的消息。

:::demo
```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <ad-button @click="() => message.info('This is an info message')">Info</ad-button>
    <ad-button @click="() => message.success('Operation successful!')" variant="primary">Success</ad-button>
    <ad-button @click="() => message.warning('Please be careful!')" variant="warning">Warning</ad-button>
    <ad-button @click="() => message.error('Something went wrong!')" variant="danger">Error</ad-button>
  </div>
</template>

<script setup lang="ts">
import { AdMessage as message } from '@apron-design/vue-next'
import { AdButton } from '@apron-design/vue-next'
</script>
```
:::

### 使用 message.show() 方法

可以通过 message.show() 方法动态指定提示类型。

:::demo
```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <ad-button @click="() => message.show('info', 'Info message via show()')">Show Info</ad-button>
    <ad-button @click="() => message.show('success', 'Success message via show()')" variant="primary">Show Success</ad-button>
    <ad-button @click="() => message.show('warning', 'Warning message via show()')" variant="warning">Show Warning</ad-button>
    <ad-button @click="() => message.show('error', 'Error message via show()')" variant="danger">Show Error</ad-button>
  </div>
</template>

<script setup lang="ts">
import { AdMessage as message } from '@apron-design/vue-next'
import { AdButton } from '@apron-design/vue-next'
</script>
```
:::

### 多个提示排列

多个提示会按顺序向下排列，先进先出。

:::demo
```vue
<template>
  <ad-button @click="showMultiple">Show Multiple Messages</ad-button>
</template>

<script setup lang="ts">
import { AdMessage as message } from '@apron-design/vue-next'
import { AdButton } from '@apron-design/vue-next'

const showMultiple = () => {
  message.info('First message')
  setTimeout(() => message.success('Second message'), 500)
  setTimeout(() => message.warning('Third message'), 1000)
  setTimeout(() => message.error('Fourth message'), 1500)
}
</script>
```
:::

### 自定义显示时长

可以自定义消息显示时长，设置为 0 则不自动关闭。

:::demo
```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <ad-button @click="() => message.info('2 seconds', 2000)">2s Duration</ad-button>
    <ad-button @click="() => message.success('10 seconds', 10000)" variant="primary">10s Duration</ad-button>
    <ad-button @click="() => message.warning('Will not auto close', 0)" variant="warning">No Auto Close</ad-button>
  </div>
</template>

<script setup lang="ts">
import { AdMessage as message } from '@apron-design/vue-next'
import { AdButton } from '@apron-design/vue-next'
</script>
```
:::

### 富文本内容

支持字符串类型的内容，可以显示富文本。

:::demo
```vue
<template>
  <ad-button @click="showRichContent">Show Rich Content</ad-button>
</template>

<script setup lang="ts">
import { AdMessage as message } from '@apron-design/vue-next'
import { AdButton } from '@apron-design/vue-next'

const showRichContent = () => {
  message.success('Your file report.pdf has been uploaded successfully!')
}
</script>
```
:::

### 移除单个消息

可以通过 message.remove(id) 方法移除指定的消息。

:::demo
```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <ad-button @click="showMessage">Show Message</ad-button>
    <ad-button @click="removeMessage" :disabled="!messageId">Remove Message</ad-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdMessage as message } from '@apron-design/vue-next'
import { AdButton } from '@apron-design/vue-next'

const messageId = ref<string | null>(null)

const showMessage = () => {
  const id = message.info('This message can be removed manually', 0)
  messageId.value = id
}

const removeMessage = () => {
  if (messageId.value) {
    message.remove(messageId.value)
    messageId.value = null
  }
}
</script>
```
:::

### 清除所有消息

可以通过 message.clear() 方法一次性清除所有消息。

:::demo
```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <ad-button @click="showMultipleMessages">Show Multiple Messages</ad-button>
    <ad-button @click="() => message.clear()" variant="danger">Clear All</ad-button>
  </div>
</template>

<script setup lang="ts">
import { AdMessage as message } from '@apron-design/vue-next'
import { AdButton } from '@apron-design/vue-next'

const showMultipleMessages = () => {
  message.info('Message 1', 0)
  message.success('Message 2', 0)
  message.warning('Message 3', 0)
  message.error('Message 4', 0)
}
</script>
```
:::

### 完整示例

展示 Message 组件的各种使用场景。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <ad-button @click="handleSuccess" variant="primary">成功操作</ad-button>
      <ad-button @click="handleError" variant="default">错误操作</ad-button>
      <ad-button @click="handleWarning" variant="warning">警告提示</ad-button>
      <ad-button @click="handleInfo" variant="default">信息提示</ad-button>
    </div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <ad-button @click="handleCustom">自定义时长</ad-button>
      <ad-button @click="() => message.clear()" variant="danger">清除所有</ad-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AdMessage as message } from '@apron-design/vue-next'
import { AdButton } from '@apron-design/vue-next'

const handleSuccess = () => {
  message.success('操作成功！')
}

const handleError = () => {
  message.error('操作失败，请重试')
}

const handleWarning = () => {
  message.warning('请注意：此操作不可撤销')
}

const handleInfo = () => {
  message.info('提示：请检查您的输入')
}

const handleCustom = () => {
  const id = message.show('info', '自定义消息，3秒后关闭', 3000)
  setTimeout(() => {
    message.remove(id)
  }, 2000)
}
</script>
```
:::

## API

### message

| 方法 | 说明 | 类型 |
| --- | --- | --- |
| message.show | 显示消息 | `(type: 'info' \| 'success' \| 'warning' \| 'error', message: string, duration?: number) => string` |
| message.info | 显示信息消息 | `(message: string, duration?: number) => string` |
| message.success | 显示成功消息 | `(message: string, duration?: number) => string` |
| message.warning | 显示警告消息 | `(message: string, duration?: number) => string` |
| message.error | 显示错误消息 | `(message: string, duration?: number) => string` |
| message.remove | 移除指定消息 | `(id: string) => void` |
| message.clear | 清除所有消息 | `() => void` |

### MessageManager

MessageManager 是一个内部组件，负责管理所有消息的显示、排序和移除。它通过 Teleport 将消息挂载到 body 元素下，确保消息始终显示在页面顶层。通常情况下，开发者无需直接与 MessageManager 交互，而是通过暴露的 message API 进行操作。

### Message Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 消息类型 | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` |
| message | 消息内容 | `string` | `''` |
| duration | 显示时长（毫秒），设置为 0 则不自动关闭 | `number` | `5000` |
| leaving | 是否正在离开动画状态 | `boolean` | `false` |

### Message Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 消息关闭时触发 | `() => void` |

### message Methods

| 方法 | 说明 | 类型 |
| --- | --- | --- |
| message.show | 显示消息 | `(type: 'info' \| 'success' \| 'warning' \| 'error', message: string, duration?: number) => string` |
| message.info | 显示信息消息 | `(message: string, duration?: number) => string` |
| message.success | 显示成功消息 | `(message: string, duration?: number) => string` |
| message.warning | 显示警告消息 | `(message: string, duration?: number) => string` |
| message.error | 显示错误消息 | `(message: string, duration?: number) => string` |
| message.remove | 移除指定消息 | `(id: string) => void` |
| message.clear | 清除所有消息 | `() => void` |