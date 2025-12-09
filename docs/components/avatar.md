---
title: Avatar 头像
group: 数据展示
order: 3
---

# Avatar 头像

用来代表用户或事物，支持图片、图标或字符展示。

## 代码演示

### 基本用法

使用 Avatar 展示字符或图标。

:::demo
```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <AdAvatar>M</AdAvatar>
    <AdAvatar>User</AdAvatar>
    <AdAvatar>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </AdAvatar>
  </div>
</template>

<script setup lang="ts">
import { AdAvatar } from '@apron-design/vue-next'
</script>
```
:::

## 头像尺寸

Avatar 组件支持四种尺寸：mini、small、middle、large。

:::demo
```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <AdAvatar size="mini">M</AdAvatar>
    <AdAvatar size="small">S</AdAvatar>
    <AdAvatar size="middle">L</AdAvatar>
    <AdAvatar size="large">XL</AdAvatar>
  </div>
</template>

<script setup lang="ts">
import { AdAvatar } from '@apron-design/vue-next'
</script>
```
:::

## 方形头像

通过 `square` 属性设置为方形头像。

:::demo
```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <AdAvatar square size="small">方</AdAvatar>
    <AdAvatar square size="middle">形</AdAvatar>
    <AdAvatar square size="large">头</AdAvatar>
  </div>
</template>

<script setup lang="ts">
import { AdAvatar } from '@apron-design/vue-next'
</script>
```
:::

## 图片头像

使用 `src` 属性显示图片头像。

:::demo
```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <AdAvatar 
      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
      alt="User 1"
    />
    <AdAvatar 
      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
      alt="User 2"
    />
  </div>
</template>

<script setup lang="ts">
import { AdAvatar } from '@apron-design/vue-next'
</script>
```
:::

## API

### Avatar Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| square | 是否为方形 | boolean | false |
| size | 头像尺寸 | 'mini' \| 'small' \| 'middle' \| 'large' | 'middle' |
| src | 图片地址 | string | - |
| alt | 图片替代文本 | string | '' |
| imgProps | 图片属性 | Record<string, any> | - |

### Avatar Events

Avatar 组件继承所有标准 HTML 元素事件。

### Avatar Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认插槽，用于展示文字或图标 |