# Collapse

折叠面板用于将内容分组并可折叠展示。

## 基本用法

基础的折叠面板使用方式。

:::demo
```vue
<template>
  <Collapse>
    <CollapseItem item-key="1" title="折叠面板标题 1">
      <p>这是折叠面板 1 的内容。</p>
      <p>可以放置任何内容。</p>
    </CollapseItem>
    <CollapseItem item-key="2" title="折叠面板标题 2">
      <p>这是折叠面板 2 的内容。</p>
    </CollapseItem>
    <CollapseItem item-key="3" title="折叠面板标题 3">
      <p>这是折叠面板 3 的内容。</p>
    </CollapseItem>
  </Collapse>
</template>

<script setup lang="ts">
import { Collapse, CollapseItem } from '@apron-design/vue-next'
</script>
```
:::

## 手风琴模式

通过 `accordion` 属性开启手风琴模式，每次只能展开一个面板。

:::demo
```vue
<template>
  <Collapse accordion>
    <CollapseItem item-key="1" title="手风琴面板 1">
      <p>这是手风琴面板 1 的内容。</p>
    </CollapseItem>
    <CollapseItem item-key="2" title="手风琴面板 2">
      <p>这是手风琴面板 2 的内容。</p>
    </CollapseItem>
    <CollapseItem item-key="3" title="手风琴面板 3">
      <p>这是手风琴面板 3 的内容。</p>
    </CollapseItem>
  </Collapse>
</template>

<script setup lang="ts">
import { Collapse, CollapseItem } from '@apron-design/vue-next'
</script>
```
:::

## 默认展开

通过 `default-active-keys` 属性设置默认展开的面板。

:::demo
```vue
<template>
  <Collapse :default-active-keys="['1', '3']">
    <CollapseItem item-key="1" title="默认展开面板 1">
      <p>这是默认展开的面板 1。</p>
    </CollapseItem>
    <CollapseItem item-key="2" title="默认收起面板 2">
      <p>这是默认收起的面板 2。</p>
    </CollapseItem>
    <CollapseItem item-key="3" title="默认展开面板 3">
      <p>这是默认展开的面板 3。</p>
    </CollapseItem>
  </Collapse>
</template>

<script setup lang="ts">
import { Collapse, CollapseItem } from '@apron-design/vue-next'
</script>
```
:::

## 禁用状态

通过 `disabled` 属性禁用某个面板。

:::demo
```vue
<template>
  <Collapse>
    <CollapseItem item-key="1" title="正常面板">
      <p>这是一个正常的面板。</p>
    </CollapseItem>
    <CollapseItem item-key="2" title="禁用面板" disabled>
      <p>这是一个被禁用的面板。</p>
    </CollapseItem>
    <CollapseItem item-key="3" title="正常面板">
      <p>这也是一个正常的面板。</p>
    </CollapseItem>
  </Collapse>
</template>

<script setup lang="ts">
import { Collapse, CollapseItem } from '@apron-design/vue-next'
</script>
```
:::

## 自定义标题

通过 `title` 插槽自定义面板标题。

:::demo
```vue
<template>
  <Collapse>
    <CollapseItem item-key="1">
      <template #title>
        <strong>自定义标题</strong>
        <span style="margin-left: 10px; font-size: 12px; color: #999;">副标题</span>
      </template>
      <p>这是带有自定义标题的面板。</p>
    </CollapseItem>
    <CollapseItem item-key="2" title="普通标题">
      <p>这是普通标题的面板。</p>
    </CollapseItem>
  </Collapse>
</template>

<script setup lang="ts">
import { Collapse, CollapseItem } from '@apron-design/vue-next'
</script>
```
:::

## API

### Collapse Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| accordion | 是否为手风琴模式（每次只能展开一个） | boolean | false |
| defaultActiveKeys | 默认展开的项目 key 数组 | string[] | [] |
| class | 自定义类名 | string | - |

### CollapseItem Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| itemKey | 唯一标识 | string | - |
| title | 标题 | string | - |
| disabled | 是否禁用 | boolean | false |
| class | 自定义类名 | string | - |

### Collapse Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认插槽，用于放置 CollapseItem |

### CollapseItem Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认插槽，面板内容 |
| title | 标题插槽，用于自定义标题 |
