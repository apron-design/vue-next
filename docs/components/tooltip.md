---
title: Tooltip 文字提示
group: 反馈组件
order: 3
---

# Tooltip 文字提示

Tooltip 组件用于在用户将鼠标悬停在元素上时显示简短的提示信息。

## 何时使用

- 需要为元素提供额外的说明信息时
- 需要在不占用页面空间的情况下展示提示内容时
- 需要为图标、按钮等元素提供功能说明时

## 示例

### 基础用法

Tooltip 组件需要包裹一个触发元素，并通过 `content` 属性设置提示内容。

:::demo
```vue
<template>
  <ad-tooltip content="这是一个提示信息">
    <button style="padding: 8px 16px; cursor: pointer;">悬停显示提示</button>
  </ad-tooltip>
</template>

<script setup lang="ts">
import { AdTooltip } from '@apron-design/vue-next'
</script>
```
:::

### 不同内容

Tooltip 支持不同长度和类型的提示内容。

:::demo
```vue
<template>
  <div style="display: flex; gap: 24px; align-items: center;">
    <ad-tooltip content="简短提示">
      <span style="cursor: pointer; text-decoration: underline;">短文本</span>
    </ad-tooltip>
    <ad-tooltip content="这是一段较长的提示信息，用于说明某个功能的具体用途">
      <span style="cursor: pointer; text-decoration: underline;">长文本</span>
    </ad-tooltip>
    <ad-tooltip content="🎉 支持 Emoji">
      <span style="cursor: pointer; text-decoration: underline;">Emoji</span>
    </ad-tooltip>
  </div>
</template>

<script setup lang="ts">
import { AdTooltip } from '@apron-design/vue-next'
</script>
```
:::

### 在按钮上使用

Tooltip 常用于为按钮提供额外的说明信息。

:::demo
```vue
<template>
  <div style="display: flex; gap: 16px;">
    <ad-tooltip content="保存当前内容">
      <button style="padding: 8px 16px; cursor: pointer;">保存</button>
    </ad-tooltip>
    <ad-tooltip content="删除此项目">
      <button style="padding: 8px 16px; cursor: pointer; color: #ef4444;">删除</button>
    </ad-tooltip>
    <ad-tooltip content="此操作不可用">
      <button style="padding: 8px 16px; cursor: not-allowed; opacity: 0.5;" disabled>
        禁用
      </button>
    </ad-tooltip>
  </div>
</template>

<script setup lang="ts">
import { AdTooltip } from '@apron-design/vue-next'
</script>
```
:::

### 在图标上使用

Tooltip 也常用于为图标提供说明信息。

:::demo
```vue
<template>
  <div style="display: flex; gap: 24px; align-items: center;">
    <ad-tooltip content="设置">
      <span style="font-size: 20px; cursor: pointer;">⚙️</span>
    </ad-tooltip>
    <ad-tooltip content="帮助">
      <span style="font-size: 20px; cursor: pointer;">❓</span>
    </ad-tooltip>
    <ad-tooltip content="通知">
      <span style="font-size: 20px; cursor: pointer;">🔔</span>
    </ad-tooltip>
    <ad-tooltip content="用户">
      <span style="font-size: 20px; cursor: pointer;">👤</span>
    </ad-tooltip>
  </div>
</template>

<script setup lang="ts">
import { AdTooltip } from '@apron-design/vue-next'
</script>
```
:::

### 富文本内容

Tooltip 的内容可以通过 `content` 插槽自定义，支持富文本格式。

:::demo
```vue
<template>
  <ad-tooltip>
    <button style="padding: 8px 16px; cursor: pointer;">查看快捷键</button>
    <template #content>
      <div style="text-align: center;">
        <strong>快捷键</strong>
        <br />
        <code style="font-size: 12px;">Ctrl + S</code>
      </div>
    </template>
  </ad-tooltip>
</template>

<script setup lang="ts">
import { AdTooltip } from '@apron-design/vue-next'
</script>
```
:::

### 配合其他组件使用

Tooltip 可以配合其他组件使用，如 Link、Button 等。

:::demo
```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <ad-tooltip content="这是一个链接">
      <ad-link href="https://example.com" target="_blank">链接</ad-link>
    </ad-tooltip>
    <ad-tooltip content="点击保存">
      <ad-button variant="primary">保存</ad-button>
    </ad-tooltip>
  </div>
</template>

<script setup lang="ts">
import { AdTooltip, AdLink, AdButton } from '@apron-design/vue-next'
</script>
```
:::

### 暗色模式

Tooltip 在暗色模式下会自动适配主题颜色。

:::demo
```vue
<template>
  <div
    data-prefers-color="dark"
    style="padding: 32px; background-color: #18181b; border-radius: 12px; display: flex; gap: 16px; align-items: center;"
  >
    <ad-tooltip content="暗色模式下的提示">
      <button style="padding: 8px 16px; cursor: pointer;">悬停查看</button>
    </ad-tooltip>
  </div>
</template>

<script setup lang="ts">
import { AdTooltip } from '@apron-design/vue-next'
</script>
```
:::

## API

### Tooltip Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 提示内容 | `string \| VNode` | - |
| className | 自定义类名 | `string` | - |

### Tooltip Slots

| 名称 | 说明 |
| --- | --- |
| default | 触发元素 |
| content | 提示内容（替代 content 属性） |

### Tooltip Methods

通过 ref 可以获取到 Tooltip 实例并调用实例方法。

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开提示 | - |
| close | 关闭提示 | - |

## 注意事项

1. Tooltip 使用 `Teleport` 挂载到 `body` 上，确保层级正确
2. Tooltip 会在触发元素上方显示，箭头指向触发元素
3. 当鼠标移入触发元素或 Tooltip 时，Tooltip 会保持显示
4. 当鼠标移出触发元素和 Tooltip 时，Tooltip 会在 100ms 后自动关闭
5. Tooltip 会自动计算位置，确保完全显示在视口内
6. 当窗口大小改变或滚动时，Tooltip 会重新计算位置
7. 支持通过 `content` 插槽自定义提示内容，可以包含任意 HTML 元素
