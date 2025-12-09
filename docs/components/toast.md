# Toast 轻提示

轻量级的全局消息反馈，用于显示操作结果或状态信息。

## 基础用法

通过 `Toast.show()` 方法显示一条提示信息。

```vue
<template>
  <a-button @click="showToast">显示 Toast</a-button>
</template>

<script setup>
import { Toast } from '@apron-design/vue-next'

const showToast = () => {
  Toast.show({ text: '这是一条提示信息' })
}
</script>
```

## 不同类型

支持 success、fail、danger、loading 四种类型。

```vue
<template>
  <a-space>
    <a-button @click="showSuccess">成功</a-button>
    <a-button @click="showFail">失败</a-button>
    <a-button @click="showDanger">危险</a-button>
    <a-button @click="showLoading">加载中</a-button>
  </a-space>
</template>

<script setup>
import { Toast } from '@apron-design/vue-next'

const showSuccess = () => {
  Toast.success('操作成功')
}

const showFail = () => {
  Toast.fail('操作失败')
}

const showDanger = () => {
  Toast.danger('操作有风险')
}

const showLoading = () => {
  Toast.loading('加载中...')
}
</script>
```

## 自定义持续时间

通过 `duration` 属性控制显示时长，默认 2000ms，设置为 0 则不自动关闭。

```vue
<template>
  <a-button @click="showLongToast">显示 5 秒</a-button>
</template>

<script setup>
import { Toast } from '@apron-design/vue-next'

const showLongToast = () => {
  Toast.show({
    text: '这条提示会显示 5 秒钟',
    duration: 5000
  })
}
</script>
```

## 手动关闭

可以通过 `Toast.close()` 方法手动关闭当前显示的 Toast。

```vue
<template>
  <a-space>
    <a-button @click="showAndClose">显示并 2 秒后关闭</a-button>
    <a-button @click="closeToast">立即关闭</a-button>
  </a-space>
</template>

<script setup>
import { Toast } from '@apron-design/vue-next'

let timer = null

const showAndClose = () => {
  Toast.loading('加载中...')
  timer = setTimeout(() => {
    Toast.close()
  }, 2000)
}

const closeToast = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  Toast.close()
}
</script>
```

## API

### Toast 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| `Toast.show(options)` | 显示提示 | `ToastOptions` |
| `Toast.success(content)` | 显示成功提示 | `string \| Omit<ToastOptions, 'type'>` |
| `Toast.fail(content)` | 显示失败提示 | `string \| Omit<ToastOptions, 'type'>` |
| `Toast.danger(content)` | 显示危险提示 | `string \| Omit<ToastOptions, 'type'>` |
| `Toast.loading(content)` | 显示加载提示 | `string \| Omit<ToastOptions, 'type'>` |
| `Toast.close()` | 关闭提示 | - |

### ToastOptions 数据结构

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 提示文字 | `string` | - |
| icon | 自定义图标 | `VNode` | - |
| duration | 显示时长(ms)，设置为 0 则不自动关闭 | `number` | `type` 为 `loading` 时为 0，其他为 2000 |
| type | 提示类型 | `'success' \| 'fail' \| 'danger' \| 'loading'` | `'success'` |