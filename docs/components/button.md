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
  <AdButton>Button</AdButton>
</template>

<script setup lang="ts">
import { AdButton } from '@apron-design/vue-next'
</script>
```
:::

### 按钮类型

按钮有五种类型：主按钮、次按钮、默认按钮、文字按钮和链接按钮。

:::demo
```vue
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <AdButton variant="primary">Primary</AdButton>
    <AdButton variant="secondary">Secondary</AdButton>
    <AdButton variant="default">Default</AdButton>
    <AdButton variant="text">Text</AdButton>
    <AdButton variant="link">Link</AdButton>
  </div>
</template>

<script setup lang="ts">
import { AdButton } from '@apron-design/vue-next'
</script>
```
:::

### 按钮尺寸

按钮有两种尺寸：中号（40px）和小号（30px）。

:::demo
```vue
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <AdButton size="md" variant="primary">Medium (40px)</AdButton>
    <AdButton size="sm" variant="primary">Small (30px)</AdButton>
  </div>
</template>

<script setup lang="ts">
import { AdButton } from '@apron-design/vue-next'
</script>
```
:::

### 虚线边框

通过 `dashed` 属性设置按钮边框为虚线样式。

:::demo
```vue
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <AdButton variant="primary" dashed>Primary Dashed</AdButton>
    <AdButton variant="secondary" dashed>Secondary Dashed</AdButton>
    <AdButton variant="default" dashed>Default Dashed</AdButton>
  </div>
</template>

<script setup lang="ts">
import { AdButton } from '@apron-design/vue-next'
</script>
```
:::

### 危险按钮

通过 `danger` 属性设置危险按钮样式，可与其他属性组合使用。

:::demo
```vue
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <AdButton variant="primary" danger>Primary Danger</AdButton>
    <AdButton variant="secondary" danger>Secondary Danger</AdButton>
    <AdButton variant="default" danger>Default Danger</AdButton>
    <AdButton variant="text" danger>Text Danger</AdButton>
    <AdButton variant="link" danger>Link Danger</AdButton>
  </div>
</template>

<script setup lang="ts">
import { AdButton } from '@apron-design/vue-next'
</script>
```
:::

### 危险虚线按钮

危险样式与虚线样式的组合。

:::demo
```vue
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <AdButton variant="primary" danger dashed>Primary</AdButton>
    <AdButton variant="secondary" danger dashed>Secondary</AdButton>
    <AdButton variant="default" danger dashed>Default</AdButton>
  </div>
</template>

<script setup lang="ts">
import { AdButton } from '@apron-design/vue-next'
</script>
```
:::

### 加载中状态

通过 `loading` 属性设置按钮为加载中状态。

:::demo
```vue
<template>
  <AdButton loading>Loading...</AdButton>
</template>

<script setup lang="ts">
import { AdButton } from '@apron-design/vue-next'
</script>
```
:::

### 块级按钮

通过 `block` 属性将按钮宽度调整为其父容器宽度。

:::demo
```vue
<template>
  <div style="width: 300px;">
    <AdButton block>Block Button</AdButton>
  </div>
</template>

<script setup lang="ts">
import { AdButton } from '@apron-design/vue-next'
</script>
```
:::

### 禁用状态

通过 `disabled` 属性禁用按钮。

:::demo
```vue
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <AdButton variant="primary" disabled>Primary</AdButton>
    <AdButton variant="secondary" disabled>Secondary</AdButton>
    <AdButton variant="default" disabled>Default</AdButton>
    <AdButton variant="text" disabled>Text</AdButton>
    <AdButton variant="link" disabled>Link</AdButton>
  </div>
</template>

<script setup lang="ts">
import { AdButton } from '@apron-design/vue-next'
</script>
```
:::

### 带图标按钮

通过 `iconLeft` 和 `iconRight` 属性添加图标。

:::demo
```vue
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <AdButton>
      <template #iconLeft>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </template>
      Search
    </AdButton>
    <AdButton>
      <template #iconRight>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </template>
      Next
    </AdButton>
    <AdButton>
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
    </AdButton>
  </div>
</template>

<script setup lang="ts">
import { AdButton } from '@apron-design/vue-next'
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