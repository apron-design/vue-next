# Space

间距组件用于在组件之间添加水平或垂直间距。

## 基本用法

基础的间距组件使用方式。

:::demo
```vue
<template>
  <Space>
    <Button>按钮1</Button>
    <Button>按钮2</Button>
    <Button>按钮3</Button>
  </Space>
</template>

<script setup lang="ts">
import { Space, Button } from '@apron-design/vue-next'
</script>
```
:::

## 垂直间距

通过 `orientation` 属性设置为 `vertical` 来创建垂直间距。

:::demo
```vue
<template>
  <Space orientation="vertical">
    <div style="padding: 10px; background: #f0f0f0;">内容块1</div>
    <div style="padding: 10px; background: #f0f0f0;">内容块2</div>
    <div style="padding: 10px; background: #f0f0f0;">内容块3</div>
  </Space>
</template>

<script setup lang="ts">
import { Space } from '@apron-design/vue-next'
</script>
```
:::

## 不同大小

通过 `size` 属性设置不同的间距大小。

:::demo
```vue
<template>
  <div>
    <div style="margin-bottom: 20px;">
      <Space size="small">
        <Button>小间距</Button>
        <Button>小间距</Button>
        <Button>小间距</Button>
      </Space>
    </div>
    
    <div style="margin-bottom: 20px;">
      <Space size="middle">
        <Button>中等间距</Button>
        <Button>中等间距</Button>
        <Button>中等间距</Button>
      </Space>
    </div>
    
    <div style="margin-bottom: 20px;">
      <Space size="large">
        <Button>大间距</Button>
        <Button>大间距</Button>
        <Button>大间距</Button>
      </Space>
    </div>
    
    <div>
      <Space :size="40">
        <Button>自定义间距</Button>
        <Button>自定义间距</Button>
        <Button>自定义间距</Button>
      </Space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Space, Button } from '@apron-design/vue-next'
</script>
```
:::

## 对齐方式

通过 `align` 属性设置不同的对齐方式。

:::demo
```vue
<template>
  <div>
    <div style="margin-bottom: 20px;">
      <Space align="start">
        <Button>顶部对齐</Button>
        <div style="padding: 20px; background: #f0f0f0;">较高的内容块</div>
        <Button>顶部对齐</Button>
      </Space>
    </div>
    
    <div style="margin-bottom: 20px;">
      <Space align="center">
        <Button>居中对齐</Button>
        <div style="padding: 20px; background: #f0f0f0;">较高的内容块</div>
        <Button>居中对齐</Button>
      </Space>
    </div>
    
    <div style="margin-bottom: 20px;">
      <Space align="end">
        <Button>底部对齐</Button>
        <div style="padding: 20px; background: #f0f0f0;">较高的内容块</div>
        <Button>底部对齐</Button>
      </Space>
    </div>
    
    <div>
      <Space align="baseline">
        <span style="font-size: 14px;">基线对齐</span>
        <span style="font-size: 20px; background: #f0f0f0;">不同字体大小</span>
        <span style="font-size: 16px;">基线对齐</span>
      </Space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Space, Button } from '@apron-design/vue-next'
</script>
```
:::

## 自动换行

通过 `wrap` 属性启用自动换行（仅在水平模式下有效）。

:::demo
```vue
<template>
  <Space wrap :size="[8, 16]" style="max-width: 300px;">
    <Button>按钮1</Button>
    <Button>按钮2</Button>
    <Button>按钮3</Button>
    <Button>按钮4</Button>
    <Button>按钮5</Button>
    <Button>按钮6</Button>
    <Button>按钮7</Button>
    <Button>按钮8</Button>
  </Space>
</template>

<script setup lang="ts">
import { Space, Button } from '@apron-design/vue-next'
</script>
```
:::

## API

### Space Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | 对齐方式 | `'start' \| 'end' \| 'center' \| 'baseline'` | - |
| orientation | 间距方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 间距大小 | `'small' \| 'middle' \| 'large' \| number` | `'middle'` |
| wrap | 是否自动换行（仅 horizontal 时有效） | boolean | `false` |
| class | 自定义类名 | string | - |

### Space Types

```ts
type SpaceAlign = 'start' | 'end' | 'center' | 'baseline'
type SpaceOrientation = 'horizontal' | 'vertical'
type SpaceSize = 'small' | 'middle' | 'large' | number
```
