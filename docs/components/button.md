# Button 按钮

按钮用于触发一个操作，如提交表单、打开对话框等。

## 基础用法

按钮有五种类型：`primary`、`secondary`、`default`、`text` 和 `link`。

```vue
<script setup>
import { Button } from '@apron-design/vue'
</script>

<template>
  <div class="demo-row">
    <Button variant="primary">主要按钮</Button>
    <Button variant="secondary">次要按钮</Button>
    <Button>默认按钮</Button>
    <Button variant="text">文字按钮</Button>
    <Button variant="link">链接按钮</Button>
  </div>
</template>
```

## 按钮尺寸

提供三种尺寸：`large`、`middle`（默认）和 `small`。

```vue
<template>
  <div class="demo-row">
    <Button variant="primary" size="large">大按钮</Button>
    <Button variant="primary" size="middle">中按钮</Button>
    <Button variant="primary" size="small">小按钮</Button>
  </div>
</template>
```

## 危险按钮

用于危险操作，如删除。

```vue
<template>
  <div class="demo-row">
    <Button variant="primary" danger>危险主按钮</Button>
    <Button danger>危险默认按钮</Button>
    <Button variant="text" danger>危险文字按钮</Button>
  </div>
</template>
```

## 虚线按钮

虚线边框样式的按钮。

```vue
<template>
  <div class="demo-row">
    <Button dashed>虚线按钮</Button>
    <Button dashed danger>虚线危险按钮</Button>
  </div>
</template>
```

## 加载状态

添加 `loading` 属性即可让按钮处于加载状态。

```vue
<script setup>
import { ref } from 'vue'

const loading = ref(false)

const handleClick = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <div class="demo-row">
    <Button variant="primary" loading>加载中</Button>
    <Button variant="primary" :loading="loading" @click="handleClick">
      点击加载
    </Button>
  </div>
</template>
```

## 禁用状态

添加 `disabled` 属性即可让按钮处于不可用状态。

```vue
<template>
  <div class="demo-row">
    <Button variant="primary" disabled>禁用主按钮</Button>
    <Button disabled>禁用默认按钮</Button>
    <Button variant="text" disabled>禁用文字按钮</Button>
  </div>
</template>
```

## 块级按钮

`block` 属性将使按钮占满父容器宽度。

```vue
<template>
  <div style="width: 300px">
    <Button variant="primary" block>块级按钮</Button>
  </div>
</template>
```

## 图标按钮

可以通过 `icon-left` 和 `icon-right` 插槽添加图标。

```vue
<script setup>
import { h } from 'vue'

const SearchIcon = () => h('svg', { 
  viewBox: '0 0 24 24', 
  fill: 'none', 
  stroke: 'currentColor', 
  'stroke-width': '2' 
}, [
  h('circle', { cx: '11', cy: '11', r: '8' }),
  h('path', { d: 'M21 21l-4.35-4.35' })
])
</script>

<template>
  <div class="demo-row">
    <Button variant="primary" :icon-left="SearchIcon">搜索</Button>
  </div>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 按钮类型 | `'primary' \| 'secondary' \| 'default' \| 'text' \| 'link'` | `'default'` |
| size | 按钮尺寸 | `'small' \| 'middle' \| 'large'` | `'middle'` |
| type | 原生 button 的 type 属性 | `'button' \| 'submit' \| 'reset'` | `'button'` |
| loading | 加载状态 | `boolean` | `false` |
| disabled | 禁用状态 | `boolean` | `false` |
| danger | 危险按钮 | `boolean` | `false` |
| dashed | 虚线边框 | `boolean` | `false` |
| block | 块级按钮 | `boolean` | `false` |
| iconLeft | 左侧图标组件 | `Component` | - |
| iconRight | 右侧图标组件 | `Component` | - |
| disableRipple | 禁用点击波纹效果 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击按钮时触发 | `(event: MouseEvent) => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 按钮内容 |

