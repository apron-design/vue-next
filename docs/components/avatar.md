# Avatar

头像组件用于展示用户的个人资料图片或初始字符。

## 基本用法

基础的头像展示。

:::demo
```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <Avatar src="https://avatars.githubusercontent.com/u/1234567?s=40&v=4" />
    <Avatar>U</Avatar>
    <Avatar>用户</Avatar>
  </div>
</template>

<script setup lang="ts">
import { Avatar } from '@apron-design/vue-next'
</script>
```
:::

## 头像尺寸

Avatar 组件支持四种尺寸：mini、small、middle、large。

:::demo
```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <Avatar size="mini">M</Avatar>
    <Avatar size="small">S</Avatar>
    <Avatar size="middle">L</Avatar>
    <Avatar size="large">XL</Avatar>
  </div>
</template>

<script setup lang="ts">
import { Avatar } from '@apron-design/vue-next'
</script>
```
:::

## 方形头像

通过 `square` 属性设置为方形头像。

:::demo
```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <Avatar square size="small">方</Avatar>
    <Avatar square size="middle">形</Avatar>
    <Avatar square size="large">头</Avatar>
  </div>
</template>

<script setup lang="ts">
import { Avatar } from '@apron-design/vue-next'
</script>
```
:::

## 图片头像

使用 `src` 属性显示图片头像。

:::demo
```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <Avatar 
      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
      alt="User 1"
    />
    <Avatar 
      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
      alt="User 2"
    />
  </div>
</template>

<script setup lang="ts">
import { Avatar } from '@apron-design/vue-next'
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
