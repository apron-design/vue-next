---
title: Badge 徽标数
group: 数据展示
order: 2
---

# Badge 徽标数

图标右上角的圆形徽标数字。

## 何时使用

- 当需要在图标或文字右上角展示数字或状态时
- 用于展示消息数量、状态提示等

## 代码演示

### 基本用法

最简单的用法，在右上角展示数字。

:::demo
```vue
<template>
  <ad-badge :count="5">
    <div style="width: 50px; height: 50px; border-radius: 8px; background-color: #f0f0f0;" />
  </ad-badge>
</template>

<script setup lang="ts">
import { Badge } from '@apron-design/vue-next'
</script>
```
:::

### 红点

不显示数字，只显示一个小红点。

:::demo
```vue
<template>
  <ad-badge dot>
    <div style="width: 50px; height: 50px; border-radius: 8px; background-color: #f0f0f0;" />
  </ad-badge>
</template>

<script setup lang="ts">
import { Badge } from '@apron-design/vue-next'
</script>
```
:::

### 数字徽标

展示具体的数字，当数字大于 overflowCount 时会显示为 `{overflowCount}+`。

:::demo
```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <ad-badge :count="5">
      <div style="width: 50px; height: 50px; border-radius: 8px; background-color: #f0f0f0;" />
    </ad-badge>
    <ad-badge :count="99">
      <div style="width: 50px; height: 50px; border-radius: 8px; background-color: #f0f0f0;" />
    </ad-badge>
    <ad-badge :count="100">
      <div style="width: 50px; height: 50px; border-radius: 8px; background-color: #f0f0f0;" />
    </ad-badge>
    <ad-badge :count="100" :overflow-count="10">
      <div style="width: 50px; height: 50px; border-radius: 8px; background-color: #f0f0f0;" />
    </ad-badge>
  </div>
</template>

<script setup lang="ts">
import { Badge } from '@apron-design/vue-next'
</script>
```
:::

### 自定义内容

可以自定义徽标内容，比如 "New"、"Hot" 等。

:::demo
```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <ad-badge content="New">
      <div style="width: 50px; height: 50px; border-radius: 8px; background-color: #f0f0f0;" />
    </ad-badge>
    <ad-badge content="Hot">
      <div style="width: 50px; height: 50px; border-radius: 8px; background-color: #f0f0f0;" />
    </ad-badge>
  </div>
</template>

<script setup lang="ts">
import { Badge } from '@apron-design/vue-next'
</script>
```
:::

### 配合其他组件

徽标可以配合头像、按钮等其他组件一起使用。

:::demo
```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <ad-badge dot>
      <div style="width: 40px; height: 40px; border-radius: 50%; background-color: #e0e0e0; display: flex; align-items: center; justify-content: center;">U</div>
    </ad-badge>
    <ad-badge :count="5">
      <ad-button>消息</ad-button>
    </ad-badge>
  </div>
</template>

<script setup lang="ts">
import { Badge, Button } from '@apron-design/vue-next'
</script>
```
:::

## API

### Badge Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dot | 不展示数字，只有一个小红点 | `boolean` | `false` |
| count | 展示的数字 | `number` | - |
| overflowCount | 展示封顶的数字值，超过会显示为 `{overflowCount}+` | `number` | `99` |
| content | 自定义内容 | `string` | - |
| class | 自定义类名 | `string` | - |

### Badge Slots

| 名称 | 说明 |
| --- | --- |
| default | 徽标包裹的子元素 |

## 优先级说明

当同时设置多个属性时，优先级如下：
- `dot` > `content` > `count`

即：当 `dot` 为 true 时，`content` 和 `count` 会被忽略。
