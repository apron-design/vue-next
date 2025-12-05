# Divider 分割线

区隔内容的分割线。

## 基础用法

默认为水平分割线。

```vue
<script setup>
import { Divider } from '@apron-design/vue'
</script>

<template>
  <div>
    <p>上方内容</p>
    <Divider />
    <p>下方内容</p>
  </div>
</template>
```

## 虚线

添加 `dashed` 属性显示虚线。

```vue
<template>
  <div>
    <p>上方内容</p>
    <Divider dashed />
    <p>下方内容</p>
  </div>
</template>
```

## 带文字的分割线

分割线中可以添加文字内容。

```vue
<template>
  <div>
    <p>内容一</p>
    <Divider>分割文字</Divider>
    <p>内容二</p>
    <Divider dashed>虚线分割</Divider>
    <p>内容三</p>
  </div>
</template>
```

## 文字位置

通过 `align` 属性设置文字位置。

```vue
<template>
  <div>
    <Divider align="left">左对齐</Divider>
    <Divider align="center">居中</Divider>
    <Divider align="right">右对齐</Divider>
  </div>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dashed | 是否为虚线 | `boolean` | `false` |
| align | 文字位置 | `'left' \| 'center' \| 'right'` | `'center'` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 分割线中的文字内容 |

