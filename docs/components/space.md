---
title: Space 间距
group: 通用组件
order: 0
---

# Space 间距

Space 组件用于在组件之间添加统一的间距，简化布局代码。

## 何时使用

- 需要在多个组件之间添加统一间距时
- 希望简化布局代码，避免手动设置 margin 或 gap 时
- 需要灵活控制间距方向和大小时

## 示例

### 基础用法

最简单的 Space 组件使用方式。

:::demo
```vue
<template>
  <ad-space>
    <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">Item 1</div>
    <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">Item 2</div>
    <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">Item 3</div>
  </ad-space>
</template>

<script setup lang="ts">
import { Space } from '@apron-design/vue-next'
</script>
```
:::

### 间距方向

Space 组件支持水平和垂直两种方向。

#### 水平方向（默认）

:::demo
```vue
<template>
  <ad-space orientation="horizontal">
    <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">Item 1</div>
    <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">Item 2</div>
    <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">Item 3</div>
  </ad-space>
</template>

<script setup lang="ts">
import { Space } from '@apron-design/vue-next'
</script>
```
:::

#### 垂直方向

:::demo
```vue
<template>
  <ad-space orientation="vertical">
    <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">Item 1</div>
    <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">Item 2</div>
    <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">Item 3</div>
  </ad-space>
</template>

<script setup lang="ts">
import { Space } from '@apron-design/vue-next'
</script>
```
:::

### 间距大小

Space 组件提供多种预设间距大小，也支持自定义数值。

#### 间距大小对比

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <p style="margin: 0 0 8px 0; color: #71717a; font-size: 14px;">Small (8px)</p>
      <ad-space size="small">
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">A</div>
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">B</div>
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">C</div>
      </ad-space>
    </div>
    <div>
      <p style="margin: 0 0 8px 0; color: #71717a; font-size: 14px;">Middle (16px) - 默认</p>
      <ad-space size="middle">
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">A</div>
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">B</div>
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">C</div>
      </ad-space>
    </div>
    <div>
      <p style="margin: 0 0 8px 0; color: #71717a; font-size: 14px;">Large (24px)</p>
      <ad-space size="large">
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">A</div>
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">B</div>
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">C</div>
      </ad-space>
    </div>
    <div>
      <p style="margin: 0 0 8px 0; color: #71717a; font-size: 14px;">Custom (40px)</p>
      <ad-space :size="40">
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">A</div>
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">B</div>
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">C</div>
      </ad-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Space } from '@apron-design/vue-next'
</script>
```
:::

### 对齐方式

Space 组件支持多种对齐方式。

#### 对齐方式对比

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <p style="margin: 0 0 8px 0; color: #71717a; font-size: 14px;">Start</p>
      <ad-space align="start">
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px; height: 40px;">A</div>
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px; height: 60px;">B</div>
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px; height: 80px;">C</div>
      </ad-space>
    </div>
    <div>
      <p style="margin: 0 0 8px 0; color: #71717a; font-size: 14px;">Center</p>
      <ad-space align="center">
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px; height: 40px;">A</div>
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px; height: 60px;">B</div>
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px; height: 80px;">C</div>
      </ad-space>
    </div>
    <div>
      <p style="margin: 0 0 8px 0; color: #71717a; font-size: 14px;">End</p>
      <ad-space align="end">
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px; height: 40px;">A</div>
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px; height: 60px;">B</div>
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px; height: 80px;">C</div>
      </ad-space>
    </div>
    <div>
      <p style="margin: 0 0 8px 0; color: #71717a; font-size: 14px;">Baseline</p>
      <ad-space align="baseline">
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px; font-size: 12px;">12px</div>
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px; font-size: 16px;">16px</div>
        <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px; font-size: 24px;">24px</div>
      </ad-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Space } from '@apron-design/vue-next'
</script>
```
:::

### 自动换行

Space 组件支持自动换行功能。

:::demo
```vue
<template>
  <div style="width: 300px; border: 1px dashed #d4d4d8; padding: 16px;">
    <ad-space wrap>
      <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">Item 1</div>
      <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">Item 2</div>
      <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">Item 3</div>
      <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">Item 4</div>
      <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">Item 5</div>
      <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">Item 6</div>
      <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">Item 7</div>
      <div style="padding: 8px 16px; background-color: #4C9EEA; color: #fff; border-radius: 4px;">Item 8</div>
    </ad-space>
  </div>
</template>

<script setup lang="ts">
import { Space } from '@apron-design/vue-next'
</script>
```
:::

### 使用场景

#### 按钮组

:::demo
```vue
<template>
  <ad-space>
    <ad-button variant="primary">确认</ad-button>
    <ad-button variant="secondary">取消</ad-button>
    <ad-button variant="text">重置</ad-button>
  </ad-space>
</template>

<script setup lang="ts">
import { Space, Button } from '@apron-design/vue-next'
</script>
```
:::

#### 垂直表单布局

:::demo
```vue
<template>
  <ad-space orientation="vertical" size="large" align="start">
    <div>
      <label style="display: block; margin-bottom: 4px; color: #393939;">用户名</label>
      <input
        type="text"
        placeholder="请输入用户名"
        style="padding: 8px 12px; border: 1px solid #d4d4d8; border-radius: 4px; width: 200px;"
      />
    </div>
    <div>
      <label style="display: block; margin-bottom: 4px; color: #393939;">密码</label>
      <input
        type="password"
        placeholder="请输入密码"
        style="padding: 8px 12px; border: 1px solid #d4d4d8; border-radius: 4px; width: 200px;"
      />
    </div>
    <ad-space>
      <ad-button variant="primary">登录</ad-button>
      <ad-button variant="secondary">注册</ad-button>
    </ad-space>
  </ad-space>
</template>

<script setup lang="ts">
import { Space, Button } from '@apron-design/vue-next'
</script>
```
:::

## API

### Space Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | 对齐方式 | `'start' \| 'end' \| 'center' \| 'baseline'` | - |
| orientation | 间距方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 间距大小 | `'small' \| 'middle' \| 'large' \| number` | `'middle'` |
| wrap | 是否自动换行（仅 horizontal 时有效） | `boolean` | `false` |
| class | 自定义类名 | `string` | - |

### Space Slots

| 名称 | 说明 |
| --- | --- |
| default | 子元素 |

## 注意事项

1. Space 组件主要用于在组件之间添加统一的间距，简化布局代码
2. 通过 `orientation` 属性可以设置间距方向：
   - `horizontal`（默认）：水平方向添加间距
   - `vertical`：垂直方向添加间距
3. 通过 `size` 属性可以设置间距大小：
   - 预设值：`'small'`（8px）、`'middle'`（16px，默认）、`'large'`（24px）
   - 自定义数值：可以直接传入数字作为间距值（单位：px）
4. 通过 `align` 属性可以设置对齐方式：
   - `'start'`：顶部对齐
   - `'center'`：居中对齐
   - `'end'`：底部对齐
   - `'baseline'`：基线对齐
5. 通过 `wrap` 属性可以控制是否自动换行（仅在水平方向时有效）
6. Space 组件会自动过滤掉空的子元素（如 null、undefined 等）
7. Space 组件使用 CSS Flexbox 实现，具有良好的浏览器兼容性
