# Tag

标签组件用于标记和分类内容。

## 基本用法

基础的标签展示。

:::demo
```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <Tag>标签</Tag>
    <Tag variant="primary">主要</Tag>
  </div>
</template>

<script setup lang="ts">
import { Tag } from '@apron-design/vue-next'
</script>
```
:::

## 标签变体

Tag 组件支持两种变体：primary 和 default。

:::demo
```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <Tag variant="default">默认标签</Tag>
    <Tag variant="primary">主要标签</Tag>
  </div>
</template>

<script setup lang="ts">
import { Tag } from '@apron-design/vue-next'
</script>
```
:::

## 可关闭标签

通过 `closable` 属性使标签可关闭，使用 `@close` 事件处理关闭事件。

:::demo
```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <Tag closable @close="handleClose">关闭标签 1</Tag>
    <Tag variant="primary" closable @close="handleClose">关闭标签 2</Tag>
  </div>
</template>

<script setup lang="ts">
import { Tag } from '@apron-design/vue-next'

const handleClose = () => {
  alert('标签已关闭')
}
</script>
```
:::

## 标签列表

使用 v-for 渲染标签列表。

:::demo
```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <Tag 
      v-for="tag in tags" 
      :key="tag"
      closable
      @close="removeTag(tag)"
    >
      {{ tag }}
    </Tag>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Tag } from '@apron-design/vue-next'

const tags = ref(['Vue', 'React', 'Angular', 'Svelte'])

const removeTag = (tag: string) => {
  tags.value = tags.value.filter(t => t !== tag)
}
</script>
```
:::

## API

### Tag Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 标签变体 | 'primary' \| 'default' | 'default' |
| closable | 是否可关闭 | boolean | false |

### Tag Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 关闭标签时触发 | - |

### Tag Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认插槽，标签内容 |
