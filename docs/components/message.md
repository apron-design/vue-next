# Message 全局消息

全局展示操作反馈信息，从顶部居中出现。

## 基础用法

```vue
<script setup>
import { Message, Button } from '@apron-design/vue'

const showMessage = () => {
  Message.info('这是一条消息')
}
</script>

<template>
  <Button @click="showMessage">显示消息</Button>
</template>
```

## 不同类型

Message 提供五种类型：`info`、`success`、`warning`、`error`、`loading`。

```vue
<script setup>
import { Message, Button } from '@apron-design/vue'
</script>

<template>
  <div class="demo-row">
    <Button @click="Message.info('普通提示')">Info</Button>
    <Button @click="Message.success('操作成功')">Success</Button>
    <Button @click="Message.warning('警告信息')">Warning</Button>
    <Button @click="Message.error('操作失败')">Error</Button>
    <Button @click="Message.loading('加载中...')">Loading</Button>
  </div>
</template>
```

## 自定义时长

默认 3 秒后自动关闭，可通过第二个参数修改。

```vue
<script setup>
import { Message, Button } from '@apron-design/vue'

const show6s = () => {
  Message.success('6秒后关闭', 6000)
}
</script>

<template>
  <Button @click="show6s">显示6秒</Button>
</template>
```

## 手动关闭

Loading 消息需要手动关闭。

```vue
<script setup>
import { Message, Button } from '@apron-design/vue'

let messageId = null

const showLoading = () => {
  messageId = Message.loading('加载中...')
}

const hideLoading = () => {
  if (messageId !== null) {
    Message.close(messageId)
    Message.success('加载完成')
  }
}
</script>

<template>
  <div class="demo-row">
    <Button @click="showLoading">显示加载</Button>
    <Button @click="hideLoading">关闭加载</Button>
  </div>
</template>
```

## API

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| Message.show | 显示消息 | `(options: MessageOptions \| string) => number` | 消息 ID |
| Message.info | 显示普通消息 | `(content: string, duration?: number) => number` | 消息 ID |
| Message.success | 显示成功消息 | `(content: string, duration?: number) => number` | 消息 ID |
| Message.warning | 显示警告消息 | `(content: string, duration?: number) => number` | 消息 ID |
| Message.error | 显示错误消息 | `(content: string, duration?: number) => number` | 消息 ID |
| Message.loading | 显示加载消息 | `(content: string) => number` | 消息 ID |
| Message.close | 关闭指定消息 | `(id: number) => void` | - |

### MessageOptions

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 消息类型 | `'info' \| 'success' \| 'warning' \| 'error' \| 'loading'` | `'info'` |
| content | 消息内容 | `string` | - |
| duration | 显示时长（毫秒） | `number` | `3000` |
| icon | 自定义图标组件 | `Component` | - |

