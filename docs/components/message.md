---
title: Message 全局提示
group: 反馈组件
order: 3
---

# Message 全局提示

全局展示操作反馈信息，常用于通知用户操作结果。

## 何时使用

- 需要向用户显示操作反馈时
- 需要全局性的简短通知时
- 不希望打断用户操作流程的通知场景

## 代码演示

### 基础用法

最简单的用法，通过不同方法显示不同类型的消息。

:::demo
```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <Button @click="() => message.info('This is an info message')">Info</Button>
    <Button @click="() => message.success('Operation successful!')" variant="primary">Success</Button>
    <Button @click="() => message.warning('Please be careful!')" variant="warning">Warning</Button>
    <Button @click="() => message.error('Something went wrong!')" variant="danger">Error</Button>
  </div>
</template>

<script setup lang="ts">
import { message } from '@apron-design/vue-next'
import { Button } from '@apron-design/vue-next'
</script>
```
:::

### 使用 message.show() 方法

可以通过 message.show() 方法动态指定提示类型。

:::demo
```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <Button @click="() => message.show('info', 'Info message via show()')">Show Info</Button>
    <Button @click="() => message.show('success', 'Success message via show()')" variant="primary">Show Success</Button>
    <Button @click="() => message.show('warning', 'Warning message via show()')" variant="warning">Show Warning</Button>
    <Button @click="() => message.show('error', 'Error message via show()')" variant="danger">Show Error</Button>
  </div>
</template>

<script setup lang="ts">
import { message } from '@apron-design/vue-next'
import { Button } from '@apron-design/vue-next'
</script>
```
:::

### 多个提示排列

多个提示会按顺序向下排列，先进先出。

:::demo
```vue
<template>
  <Button @click="showMultiple">Show Multiple Messages</Button>
</template>

<script setup lang="ts">
import { message } from '@apron-design/vue-next'
import { Button } from '@apron-design/vue-next'

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
    <Button @click="() => message.info('2 seconds', 2000)">2s Duration</Button>
    <Button @click="() => message.success('10 seconds', 10000)" variant="primary">10s Duration</Button>
    <Button @click="() => message.warning('Will not auto close', 0)" variant="warning">No Auto Close</Button>
  </div>
</template>

<script setup lang="ts">
import { message } from '@apron-design/vue-next'
import { Button } from '@apron-design/vue-next'
</script>
```
:::

### 富文本内容

支持字符串类型的内容，可以显示富文本。

:::demo
```vue
<template>
  <Button @click="showRichContent">Show Rich Content</Button>
</template>

<script setup lang="ts">
import { message } from '@apron-design/vue-next'
import { Button } from '@apron-design/vue-next'

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
    <Button @click="showMessage">Show Message</Button>
    <Button @click="removeMessage" :disabled="!messageId">Remove Message</Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { message } from '@apron-design/vue-next'
import { Button } from '@apron-design/vue-next'

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
    <Button @click="showMultipleMessages">Show Multiple Messages</Button>
    <Button @click="() => message.clear()" variant="danger">Clear All</Button>
  </div>
</template>

<script setup lang="ts">
import { message } from '@apron-design/vue-next'
import { Button } from '@apron-design/vue-next'

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
      <Button @click="handleSuccess" variant="primary">成功操作</Button>
      <Button @click="handleError" variant="default">错误操作</Button>
      <Button @click="handleWarning" variant="warning">警告提示</Button>
      <Button @click="handleInfo" variant="default">信息提示</Button>
    </div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <Button @click="handleCustom">自定义时长</Button>
      <Button @click="() => message.clear()" variant="danger">清除所有</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { message } from '@apron-design/vue-next'
import { Button } from '@apron-design/vue-next'

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

### 参数说明

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 消息类型 | `'info' \| 'success' \| 'warning' \| 'error'` | - |
| message | 消息内容 | `string` | - |
| duration | 显示时长（毫秒），设置为 0 则不自动关闭 | `number` | `5000` |
| id | 消息唯一标识符，用于移除消息 | `string` | - |