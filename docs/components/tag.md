---
title: Tag 标签
group: 数据展示
order: 2
---

# Tag 标签

Tag 组件用于标记和分类内容，可以作为关键词或小型状态指示器使用。

## 基础用法

最简单的用法是直接使用 Tag 组件包裹文本内容。

:::demo
```vue
<template>
  <ad-tag>标签</ad-tag>
</template>

<script setup lang="ts">
import { Tag } from '@apron-design/vue-next'
</script>
```
:::

## 变体

Tag 组件提供两种变体：`primary` 和 `default`。

:::demo
```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <ad-tag variant="primary">Primary 标签</ad-tag>
    <ad-tag variant="default">Default 标签</ad-tag>
  </div>
</template>

<script setup lang="ts">
import { Tag } from '@apron-design/vue-next'
</script>
```
:::

## 可关闭标签

通过设置 `closable` 属性，可以让标签变成可关闭的状态。当用户点击关闭按钮时会触发 `@close` 事件。

:::demo
```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <ad-tag variant="primary" closable @close="handleClose1">
      Primary 可关闭
    </ad-tag>
    <ad-tag variant="default" closable @close="handleClose2">
      Default 可关闭
    </ad-tag>
  </div>
</template>

<script setup lang="ts">
import { Tag } from '@apron-design/vue-next'

const handleClose1 = () => {
  console.log('Primary closed')
}

const handleClose2 = () => {
  console.log('Default closed')
}
</script>
```
:::

## 交互示例

以下是一个更复杂的交互示例，展示了如何动态管理标签：

:::demo
```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <ad-tag
      v-for="tag in tags"
      :key="tag"
      closable
      @close="handleClose(tag)"
    >
      {{ tag }}
    </ad-tag>
    <span v-if="tags.length === 0" style="color: #a1a1aa;">
      所有标签已删除
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Tag } from '@apron-design/vue-next'

const tags = ref(['标签1', '标签2', '标签3', '标签4'])

const handleClose = (tagToRemove: string) => {
  tags.value = tags.value.filter((tag) => tag !== tagToRemove)
}
</script>
```
:::

## 使用场景

### 标签组

在实际应用中，Tag 组件通常以组的形式出现，用于表示技术栈、分类等信息。

:::demo
```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <ad-tag variant="primary">React</ad-tag>
    <ad-tag variant="primary">TypeScript</ad-tag>
    <ad-tag variant="primary">Vue</ad-tag>
    <ad-tag variant="default">JavaScript</ad-tag>
    <ad-tag variant="default">CSS</ad-tag>
  </div>
</template>

<script setup lang="ts">
import { Tag } from '@apron-design/vue-next'
</script>
```
:::

### 状态标签

Tag 组件也常用于表示不同的状态。

:::demo
```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <ad-tag variant="primary">进行中</ad-tag>
    <ad-tag variant="default">已完成</ad-tag>
    <ad-tag variant="default">待处理</ad-tag>
  </div>
</template>

<script setup lang="ts">
import { Tag } from '@apron-design/vue-next'
</script>
```
:::

### 可编辑标签

结合状态管理，可以创建可编辑的标签系统。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="color: #71717a; font-size: 14px;">点击 X 删除标签</div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <ad-tag
        v-for="tag in tags"
        :key="tag"
        variant="default"
        closable
        @close="removeTag(tag)"
      >
        {{ tag }}
      </ad-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Tag } from '@apron-design/vue-next'

const tags = ref(['前端', '后端', '设计'])

const removeTag = (tag: string) => {
  tags.value = tags.value.filter((t) => t !== tag)
}
</script>
```
:::

## 暗色模式

Tag 组件支持暗色模式，在暗色主题下会自动应用合适的样式。

:::demo
```vue
<template>
  <div
    class="dark"
    style="
      padding: 32px;
      background-color: #18181b;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    "
  >
    <div>
      <h4 style="margin: 0 0 12px 0; color: #a1a1aa;">变体</h4>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <ad-tag variant="primary">Primary</ad-tag>
        <ad-tag variant="default">Default</ad-tag>
      </div>
    </div>
    <div>
      <h4 style="margin: 0 0 12px 0; color: #a1a1aa;">可关闭</h4>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <ad-tag variant="primary" closable>Primary</ad-tag>
        <ad-tag variant="default" closable>Default</ad-tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tag } from '@apron-design/vue-next'
</script>
```
:::

## API

### Tag Props

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 标签变体 | `'primary' \| 'default'` | `'default'` |
| closable | 是否可关闭 | `boolean` | `false` |

### Tag Events

| 事件名 | 描述 | 回调参数 |
| --- | --- | --- |
| close | 关闭回调 | `() => void` |

### Tag Slots

| 名称 | 描述 |
| --- | --- |
| default | 标签内容 |
