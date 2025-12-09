---
title: Card 卡片
group: 数据展示
order: 5
---

# Card 卡片

卡片组件用于组织和展示相关内容。

## 代码演示

### 基本用法

基础的卡片展示。

:::demo
```vue
<template>
  <AdCard style="width: 300px;">
    <AdCardHeader title="卡片标题" />
    <AdCardBody>
      <p>这是卡片的内容区域。</p>
      <p>可以放置任意内容。</p>
    </AdCardBody>
    <AdCardFooter>
      <AdButton variant="primary">操作按钮</AdButton>
    </AdCardFooter>
  </AdCard>
</template>

<script setup lang="ts">
import { AdCard, AdCardHeader, AdCardBody, AdCardFooter } from '@apron-design/vue-next'
import { AdButton } from '@apron-design/vue-next'
</script>
```
:::

## 无边框卡片

通过自定义样式实现无边框卡片。

:::demo
```vue
<template>
  <AdCard style="width: 300px; border: none; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <AdCardHeader title="无边框卡片" />
    <AdCardBody>
      <p>这是一个无边框的卡片示例。</p>
    </AdCardBody>
  </AdCard>
</template>

<script setup lang="ts">
import { AdCard, AdCardHeader, AdCardBody } from '@apron-design/vue-next'
</script>
```
:::

## 自定义头部

通过 `extra` 属性在头部添加额外内容。

:::demo
```vue
<template>
  <AdCard style="width: 300px;">
    <AdCardHeader 
      title="自定义头部" 
      extra="额外内容"
    />
    <AdCardBody>
      <p>头部右侧可以放置额外的操作按钮或状态信息。</p>
    </AdCardBody>
  </AdCard>
</template>

<script setup lang="ts">
import { AdCard, AdCardHeader, AdCardBody } from '@apron-design/vue-next'
</script>
```
:::

## 仅内容区域

只使用内容区域的卡片。

:::demo
```vue
<template>
  <AdCard style="width: 300px;">
    <AdCardBody>
      <p>只使用内容区域的卡片。</p>
      <p>适合展示简单的信息。</p>
    </AdCardBody>
  </AdCard>
</template>

<script setup lang="ts">
import { AdCard, AdCardBody } from '@apron-design/vue-next'
</script>
```
:::

## API

### Card Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| class | 自定义类名 | string | - |

### CardHeader Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | string | - |
| extra | 右侧额外内容 | string | - |
| class | 自定义类名 | string | - |

### CardBody Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| class | 自定义类名 | string | - |

### CardFooter Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| class | 自定义类名 | string | - |

### Card Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认插槽，用于放置 CardHeader、CardBody、CardFooter |

### CardHeader Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认插槽，用于自定义标题内容 |

### CardBody Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认插槽，卡片内容 |

### CardFooter Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认插槽，卡片底部内容 |