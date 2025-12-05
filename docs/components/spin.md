# Spin 加载中

用于页面和区块的加载状态。

## 基础用法

```vue
<script setup>
import { Spin } from '@apron-design/vue'
</script>

<template>
  <Spin />
</template>
```

## 带文字

```vue
<template>
  <Spin text="加载中..." />
</template>
```

## 包裹内容

将 Spin 作为容器，包裹需要显示加载状态的内容。

```vue
<script setup>
import { ref } from 'vue'
import { Spin, Button } from '@apron-design/vue'

const loading = ref(true)
</script>

<template>
  <Button @click="loading = !loading" style="margin-bottom: 16px">
    切换加载状态
  </Button>
  
  <Spin :loading="loading">
    <div style="padding: 24px; background: var(--apron-color-bg-secondary);">
      <p>这是被包裹的内容</p>
      <p>当 loading 为 true 时会显示加载遮罩</p>
    </div>
  </Spin>
</template>
```

## 全屏加载

设置 `fullscreen` 显示全屏加载。

```vue
<script setup>
import { ref } from 'vue'
import { Spin, Button } from '@apron-design/vue'

const loading = ref(false)

const showFullscreen = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 3000)
}
</script>

<template>
  <Button @click="showFullscreen">显示全屏加载（3秒）</Button>
  <Spin :loading="loading" fullscreen text="加载中..." />
</template>
```

## 静态方法

使用静态方法控制全屏加载。

```vue
<script setup>
import { Spin, Button } from '@apron-design/vue'

const showLoading = () => {
  Spin.show('加载数据中...')
  setTimeout(() => {
    Spin.close()
  }, 2000)
}
</script>

<template>
  <Button @click="showLoading">显示加载</Button>
</template>
```

## 不同位置

通过 `placement` 设置加载指示器在容器中的位置。

```vue
<template>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
    <Spin :loading="true" placement="top">
      <div style="height: 80px; background: #f5f5f5;"></div>
    </Spin>
    <Spin :loading="true" placement="center">
      <div style="height: 80px; background: #f5f5f5;"></div>
    </Spin>
    <Spin :loading="true" placement="bottom">
      <div style="height: 80px; background: #f5f5f5;"></div>
    </Spin>
  </div>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 是否显示加载 | `boolean` | `true` |
| text | 加载文字 | `string` | - |
| icon | 自定义图标组件 | `Component` | - |
| placement | 指示器位置 | `'top' \| 'center' \| 'bottom' \| 'left' \| 'right'` | `'center'` |
| fullscreen | 是否全屏显示 | `boolean` | `false` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 被包裹的内容 |
| icon | 自定义加载图标 |

### 静态方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| Spin.show | 显示全屏加载 | `(text?: string \| SpinOptions) => void` |
| Spin.close | 关闭全屏加载 | `() => void` |

