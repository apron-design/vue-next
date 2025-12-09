# Empty

空状态组件用于在没有数据时展示提示信息。

## 基本用法

基础的空状态展示。

:::demo
```vue
<template>
  <Empty />
</template>

<script setup lang="ts">
import { Empty } from '@apron-design/vue-next'
</script>
```
:::

## 自定义文字

通过 `text` 属性或默认插槽自定义提示文字。

:::demo
```vue
<template>
  <div style="display: flex; gap: 24px;">
    <Empty text="这里什么都没有" />
    <Empty>自定义内容</Empty>
  </div>
</template>

<script setup lang="ts">
import { Empty } from '@apron-design/vue-next'
</script>
```
:::

## 自定义图标

通过 `icon` 插槽自定义图标。

:::demo
```vue
<template>
  <div style="display: flex; gap: 24px;">
    <Empty>
      <template #icon>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </template>
      没有找到相关内容
    </Empty>
    
    <Empty>
      <template #icon>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 9v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
          <path d="M9 22V12h6v10M2 10.6L4 8l2-4h12l2 4 2 2.6" />
        </svg>
      </template>
      购物车为空
    </Empty>
  </div>
</template>

<script setup lang="ts">
import { Empty } from '@apron-design/vue-next'
</script>
```
:::

## API

### Empty Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 提示文字 | string | '暂无数据' |

### Empty Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认插槽，用于自定义提示文字 |
| icon | 图标插槽，用于自定义图标 |
