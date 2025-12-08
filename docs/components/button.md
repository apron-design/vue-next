---
title: Button 按钮
group: 通用组件
order: 0
---

# Button 按钮

按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

## 代码演示

### 基本用法

基础的按钮用法。

:::demo
```vue
<template>
  <Button>Button</Button>
</template>

<script setup lang="ts">
import { Button } from '@apron-design/vue-next'
</script>
```
:::

### 按钮类型

按钮有五种类型：主按钮、次按钮、默认按钮、文字按钮和链接按钮。

:::demo
```vue
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="default">Default</Button>
    <Button variant="text">Text</Button>
    <Button variant="link">Link</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@apron-design/vue-next'
</script>
```
:::

### 按钮尺寸

按钮有两种尺寸：中号（40px）和小号（30px）。

:::demo
```vue
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <Button size="md" variant="primary">Medium (40px)</Button>
    <Button size="sm" variant="primary">Small (30px)</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@apron-design/vue-next'
</script>
```
:::

### 虚线边框

通过 `dashed` 属性设置按钮边框为虚线样式。

:::demo
```vue
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <Button variant="primary" dashed>Primary Dashed</Button>
    <Button variant="secondary" dashed>Secondary Dashed</Button>
    <Button variant="default" dashed>Default Dashed</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@apron-design/vue-next'
</script>
```
:::

### 危险按钮

通过 `danger` 属性设置危险按钮样式，可与其他属性组合使用。

:::demo
```vue
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <Button variant="primary" danger>Primary Danger</Button>
    <Button variant="secondary" danger>Secondary Danger</Button>
    <Button variant="default" danger>Default Danger</Button>
    <Button variant="text" danger>Text Danger</Button>
    <Button variant="link" danger>Link Danger</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@apron-design/vue-next'
</script>
```
:::

### 危险虚线按钮

危险样式与虚线样式的组合。

:::demo
```vue
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <Button variant="primary" danger dashed>Primary</Button>
    <Button variant="secondary" danger dashed>Secondary</Button>
    <Button variant="default" danger dashed>Default</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@apron-design/vue-next'
</script>
```
:::

### 加载中状态

通过 `loading` 属性设置按钮为加载中状态。

:::demo
```vue
<template>
  <Button loading>Loading...</Button>
</template>

<script setup lang="ts">
import { Button } from '@apron-design/vue-next'
</script>
```
:::

### 块级按钮

通过 `block` 属性将按钮宽度调整为其父容器宽度。

:::demo
```vue
<template>
  <div style="width: 300px;">
    <Button block>Block Button</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@apron-design/vue-next'
</script>
```
:::

### 禁用状态

通过 `disabled` 属性禁用按钮。

:::demo
```vue
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <Button variant="primary" disabled>Primary</Button>
    <Button variant="secondary" disabled>Secondary</Button>
    <Button variant="default" disabled>Default</Button>
    <Button variant="text" disabled>Text</Button>
    <Button variant="link" disabled>Link</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@apron-design/vue-next'
</script>
```
:::

### 带图标按钮

通过 `iconLeft` 和 `iconRight` 属性添加图标。

:::demo
```vue
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <Button>
      <template #iconLeft>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </template>
      Search
    </Button>
    <Button>
      <template #iconRight>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </template>
      Next
    </Button>
    <Button>
      <template #iconLeft>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </template>
      <template #iconRight>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </template>
      Both Icons
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@apron-design/vue-next'
</script>
```
:::

## API

通过设置 Button 的属性来产生不同的按钮样式。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 设置按钮类型 | `primary` \| `secondary` \| `default` \| `text` \| `link` | `primary` |
| size | 设置按钮大小 | `md` \| `sm` | `md` |
| dashed | 设置按钮边框为虚线 | boolean | false |
| danger | 设置危险按钮 | boolean | false |
| loading | 设置按钮载入状态 | boolean | false |
| block | 将按钮宽度调整为其父宽度的选项 | boolean | false |
| disabled | 按钮失效状态 | boolean | false |
| iconLeft | 左侧图标 | slot | - |
| iconRight | 右侧图标 | slot | - |
| onClick | 点击按钮时的回调 | (event) => void | - |