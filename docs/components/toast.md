# Toast 轻提示

全局展示操作反馈信息。

## 基础用法

```vue
<script setup>
import { Toast, Button } from '@apron-design/vue'

const showToast = () => {
  Toast.show({ text: '这是一条提示' })
}
</script>

<template>
  <Button @click="showToast">显示提示</Button>
</template>
```

## 不同类型

Toast 提供四种类型：`success`、`fail`、`danger`、`loading`。

```vue
<script setup>
import { Toast, Button } from '@apron-design/vue'
</script>

<template>
  <div class="demo-row">
    <Button @click="Toast.success('操作成功')">成功</Button>
    <Button @click="Toast.fail('操作失败')">失败</Button>
    <Button @click="Toast.danger('警告信息')">警告</Button>
    <Button @click="Toast.loading('加载中...')">加载</Button>
  </div>
</template>
```

## 自定义时长

默认显示 2 秒后自动关闭，可通过 `duration` 参数修改。

```vue
<script setup>
import { Toast, Button } from '@apron-design/vue'

const show5s = () => {
  Toast.success('5秒后关闭', 5000)
}
</script>

<template>
  <Button @click="show5s">显示5秒</Button>
</template>
```

## 加载提示

Loading 类型不会自动关闭，需要手动调用 `close` 方法。

```vue
<script setup>
import { Toast, Button } from '@apron-design/vue'

const showLoading = () => {
  Toast.loading('加载中...')
  
  // 模拟异步操作
  setTimeout(() => {
    Toast.close()
    Toast.success('加载完成')
  }, 2000)
}
</script>

<template>
  <Button @click="showLoading">显示加载</Button>
</template>
```

## API

### 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| Toast.show | 显示提示 | `(options: ToastOptions \| string) => void` |
| Toast.success | 显示成功提示 | `(text: string, duration?: number) => void` |
| Toast.fail | 显示失败提示 | `(text: string, duration?: number) => void` |
| Toast.danger | 显示警告提示 | `(text: string, duration?: number) => void` |
| Toast.loading | 显示加载提示 | `(text?: string) => void` |
| Toast.close | 关闭提示 | `() => void` |

### ToastOptions

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 提示类型 | `'success' \| 'fail' \| 'danger' \| 'loading'` | `'success'` |
| text | 提示文字 | `string` | - |
| duration | 显示时长（毫秒） | `number` | `2000` |
| icon | 自定义图标组件 | `Component` | - |

