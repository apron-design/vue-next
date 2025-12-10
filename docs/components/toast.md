---
title: Toast 轻提示
group: 反馈组件
order: 3
---

# Toast 轻提示

Toast 组件用于向用户提供简短的操作反馈信息，会在一段时间后自动消失。

## 何时使用

- 需要向用户显示操作结果时
- 需要显示简短的提示信息时
- 需要显示加载状态时

## 示例

### 基础用法

Toast 组件提供了四种类型的提示：`success`、`fail`、`danger` 和 `loading`。可以通过调用相应的方法来显示不同类型的消息。

:::demo
```vue
<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <ad-button @click="showSuccess">Success</ad-button>
    <ad-button @click="showFail">Fail</ad-button>
    <ad-button @click="showDanger">Danger</ad-button>
    <ad-button @click="showLoading">Loading</ad-button>
  </div>
</template>

<script setup lang="ts">
import { AdToast, AdButton } from '@apron-design/vue-next'

const showSuccess = () => {
  AdToast.success('操作成功')
}

const showFail = () => {
  AdToast.fail('操作失败')
}

const showDanger = () => {
  AdToast.danger('危险警告')
}

const showLoading = () => {
  AdToast.loading('加载中...')
}
</script>
```
:::

### 成功提示

使用 `Toast.success()` 方法显示成功的反馈信息。

:::demo
```vue
<template>
  <ad-button @click="showSuccess">
    Show Success Toast
  </ad-button>
</template>

<script setup lang="ts">
import { AdToast, AdButton } from '@apron-design/vue-next'

const showSuccess = () => {
  AdToast.success('保存成功')
}
</script>
```
:::

### 失败提示

使用 `Toast.fail()` 方法显示失败的反馈信息。

:::demo
```vue
<template>
  <ad-button @click="showFail">
    Show Fail Toast
  </ad-button>
</template>

<script setup lang="ts">
import { AdToast, AdButton } from '@apron-design/vue-next'

const showFail = () => {
  AdToast.fail('操作失败')
}
</script>
```
:::

### 危险提示

使用 `Toast.danger()` 方法显示危险或严重警告信息。

:::demo
```vue
<template>
  <ad-button @click="showDanger">
    Show Danger Toast
  </ad-button>
</template>

<script setup lang="ts">
import { AdToast, AdButton } from '@apron-design/vue-next'

const showDanger = () => {
  AdToast.danger('危险警告')
}
</script>
```
:::

### 加载提示

使用 `Toast.loading()` 方法显示加载状态的提示。注意，加载提示默认不会自动关闭，需要手动调用 `Toast.close()` 方法关闭。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <p style="margin: 0; color: #666; font-size: 14px;">
      Loading Toast 默认不会自动关闭，需要手动调用 Toast.close()
    </p>
    <div style="display: flex; gap: 8px;">
      <ad-button @click="showLoading">Show Loading (3s)</ad-button>
      <ad-button @click="closeToast">Close</ad-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AdToast, AdButton } from '@apron-design/vue-next'

const showLoading = () => {
  AdToast.loading('加载中...')
  // 3秒后自动关闭
  setTimeout(() => {
    AdToast.close()
  }, 3000)
}

const closeToast = () => {
  AdToast.close()
}
</script>
```
:::

### 自定义配置

可以通过传递对象参数来自定义 Toast 的显示行为，包括持续时间和文本内容。

:::demo
```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <ad-button @click="showCustomDuration">
      Custom Duration (3s)
    </ad-button>
    <ad-button @click="showUsingShow">
      Using Toast.show()
    </ad-button>
  </div>
</template>

<script setup lang="ts">
import { AdToast, AdButton } from '@apron-design/vue-next'

const showCustomDuration = () => {
  AdToast.success({
    text: '保存成功',
    duration: 3000,
  })
}

const showUsingShow = () => {
  AdToast.show({
    type: 'success',
    text: '自定义配置',
    duration: 1500,
  })
}
</script>
```
:::

### 无文本提示

Toast 组件也可以只显示图标，不显示文本内容。

:::demo
```vue
<template>
  <div style="display: flex; gap: 8px;">
    <ad-button @click="showSuccessNoText">Success (No Text)</ad-button>
    <ad-button @click="showFailNoText">Fail (No Text)</ad-button>
  </div>
</template>

<script setup lang="ts">
import { AdToast, AdButton } from '@apron-design/vue-next'

const showSuccessNoText = () => {
  AdToast.success()
}

const showFailNoText = () => {
  AdToast.fail()
}
</script>
```
:::

### 自定义图标

可以通过 `icon` 属性自定义 Toast 显示的图标。

:::demo
```vue
<template>
  <ad-button @click="showCustomIcon">
    Custom Icon
  </ad-button>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { AdToast, AdButton } from '@apron-design/vue-next'

const CustomHeartIcon = () => h('svg', {
  width: '64',
  height: '64',
  viewBox: '0 0 64 64',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg'
}, [
  h('path', {
    d: 'M32 56L27.6 52.04C14.4 40.04 6 32.52 6 23.28C6 15.76 12.04 10 19.6 10C23.84 10 27.92 12.04 32 16.04C36.08 12.04 40.16 10 44.4 10C51.96 10 58 15.76 58 23.28C58 32.52 49.6 40.04 36.4 52.04L32 56Z',
    fill: '#ec4899'
  })
])

const showCustomIcon = () => {
  AdToast.show({
    icon: h(CustomHeartIcon),
    text: '已收藏',
    duration: 2000,
  })
}
</script>
```
:::

### 长文本提示

当提示文字较长时，Toast 会自动换行显示。

:::demo
```vue
<template>
  <ad-button @click="showLongText">
    Long Text
  </ad-button>
</template>

<script setup lang="ts">
import { AdToast, AdButton } from '@apron-design/vue-next'

const showLongText = () => {
  AdToast.success('这是一段比较长的提示文字，会自动换行显示')
}
</script>
```
:::

### 序列提示

可以在异步操作中按顺序显示多个 Toast，例如模拟提交流程。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <p style="margin: 0; color: #666; font-size: 14px;">
      模拟提交流程：Loading → Success
    </p>
    <ad-button @click="showSequence">Submit</ad-button>
  </div>
</template>

<script setup lang="ts">
import { AdToast, AdButton } from '@apron-design/vue-next'

const showSequence = async () => {
  AdToast.loading('提交中...')
  await new Promise((resolve) => setTimeout(resolve, 2000))
  AdToast.success('提交成功')
}
</script>
```
:::

### 手动关闭

可以通过设置 `duration: 0` 来阻止 Toast 自动关闭，然后通过 `Toast.close()` 方法手动关闭。

:::demo
```vue
<template>
  <div style="display: flex; gap: 8px;">
    <ad-button @click="showNoAutoClose">Show (No Auto Close)</ad-button>
    <ad-button @click="closeToast">Close</ad-button>
  </div>
</template>

<script setup lang="ts">
import { AdToast, AdButton } from '@apron-design/vue-next'

const showNoAutoClose = () => {
  AdToast.success({ text: '手动关闭', duration: 0 })
}

const closeToast = () => {
  AdToast.close()
}
</script>
```
:::

## API

### Toast 方法

| 方法名 | 描述 | 参数 | 返回值 |
| --- | --- | --- | --- |
| Toast.show(options) | 显示自定义 Toast | `ToastOptions` | `-` |
| Toast.success(text \| options) | 显示成功提示 | `string \| Omit<ToastOptions, 'type'>` | `-` |
| Toast.fail(text \| options) | 显示失败提示 | `string \| Omit<ToastOptions, 'type'>` | `-` |
| Toast.danger(text \| options) | 显示危险提示 | `string \| Omit<ToastOptions, 'type'>` | `-` |
| Toast.loading(text \| options) | 显示加载提示 | `string \| Omit<ToastOptions, 'type'>` | `-` |
| Toast.close() | 关闭当前显示的 Toast | `-` | `-` |

### ToastOptions

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 提示文字 | `string` | `-` |
| icon | 自定义图标 | `VNode` | `-` |
| duration | 显示时长（毫秒），设置为 0 则不自动关闭 | `number` | `2000`（loading 类型默认为 0） |
| type | Toast 类型 | `'success' \| 'fail' \| 'danger' \| 'loading'` | `-` |

## 注意事项

1. Toast 是全局单例，同一时间只能显示一个 Toast
2. `loading` 类型的 Toast 默认不会自动关闭（`duration` 默认为 0），需要手动调用 `Toast.close()` 关闭
3. 其他类型的 Toast 默认会在 2000ms 后自动关闭
4. 可以通过设置 `duration: 0` 来阻止 Toast 自动关闭
5. Toast 会自动挂载到 `body` 元素上
6. 自定义图标需要使用 Vue 的 `h` 函数创建 VNode
