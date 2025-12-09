---
title: Badge 徽章
group: 数据展示
order: 4
---

# Badge 徽章

图标右上角的圆形徽标数字，用于展示重要信息。

## 代码演示

### 红点徽章

使用 `dot` 属性显示红点徽章。

:::demo
```vue
<template>
  <div style="display: flex; gap: 24px; align-items: center;">
    <AdBadge dot>
      <span style="padding: 8px 12px; background: #f5f5f5; border-radius: 4px;">消息</span>
    </AdBadge>
    <AdBadge dot>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
    </AdBadge>
  </div>
</template>

<script setup lang="ts">
import { AdBadge } from '@apron-design/vue-next'
</script>
```
:::

## 数字徽章

使用 `count` 属性显示数字徽章。

:::demo
```vue
<template>
  <div style="display: flex; gap: 24px; align-items: center;">
    <AdBadge :count="5">
      <span style="padding: 8px 12px; background: #f5f5f5; border-radius: 4px;">商品</span>
    </AdBadge>
    <AdBadge :count="99">
      <span style="padding: 8px 12px; background: #f5f5f5; border-radius: 4px;">消息</span>
    </AdBadge>
    <AdBadge :count="100">
      <span style="padding: 8px 12px; background: #f5f5f5; border-radius: 4px;">超出</span>
    </AdBadge>
  </div>
</template>

<script setup lang="ts">
import { AdBadge } from '@apron-design/vue-next'
</script>
```
:::

## 自定义溢出值

通过 `overflowCount` 属性自定义数字溢出值。

:::demo
```vue
<template>
  <div style="display: flex; gap: 24px; align-items: center;">
    <AdBadge :count="99" :overflowCount="99">
      <span style="padding: 8px 12px; background: #f5f5f5; border-radius: 4px;">99</span>
    </AdBadge>
    <AdBadge :count="999" :overflowCount="99">
      <span style="padding: 8px 12px; background: #f5f5f5; border-radius: 4px;">999</span>
    </AdBadge>
  </div>
</template>

<script setup lang="ts">
import { AdBadge } from '@apron-design/vue-next'
</script>
```
:::

## 自定义内容

使用 `content` 属性显示自定义内容。

:::demo
```vue
<template>
  <div style="display: flex; gap: 24px; align-items: center;">
    <AdBadge content="NEW">
      <span style="padding: 8px 12px; background: #f5f5f5; border-radius: 4px;">产品</span>
    </AdBadge>
    <AdBadge content="HOT">
      <span style="padding: 8px 12px; background: #f5f5f5; border-radius: 4px;">热卖</span>
    </AdBadge>
  </div>
</template>

<script setup lang="ts">
import { AdBadge } from '@apron-design/vue-next'
</script>
```
:::

## API

### Badge Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dot | 显示红点 | boolean | false |
| count | 显示数字 | number | - |
| overflowCount | 数字溢出值，超过则显示 {overflowCount}+ | number | 99 |
| content | 自定义内容 | string | - |

### Badge Events

Badge 组件继承所有标准 HTML 元素事件。

### Badge Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认插槽，用于包裹需要显示徽章的元素 |

## 优先级说明

当同时设置多个属性时，优先级如下：
- `dot` > `content` > `count`

即：当 `dot` 为 true 时，`content` 和 `count` 会被忽略。