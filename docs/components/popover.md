---
title: Popover 气泡卡片
group: 反馈
order: 6
---

# Popover 气泡卡片

点击/鼠标移入元素，弹出气泡式的卡片浮层。

## 何时使用

- 当目标元素有进一步的描述和相关操作时
- 替代系统 `Tooltip`，用于承载更复杂的操作和信息展示
- 需要用户确认某些操作时

## 代码演示

### 基本用法

最简单的用法，支持点击和悬停两种触发方式。

:::demo
```vue
<template>
  <Popover title="提示标题" content="这是 Popover 的内容区域，可以放置任何文本信息。">
    <template #trigger="{ open }">
      <Button @click="open">点击显示</Button>
    </template>
  </Popover>
</template>

<script setup lang="ts">
import { Popover, Button } from '@apron-design/vue-next'
</script>
```
:::

### 触发方式

支持 `click` 和 `hover` 两种触发方式。

:::demo
```vue
<template>
  <div style="display: flex; gap: 16px;">
    <Popover mode="click" title="点击触发" content="点击按钮或外部区域关闭。">
      <template #trigger="{ open }">
        <Button @click="open">点击显示</Button>
      </template>
    </Popover>
    <Popover mode="hover" title="悬停触发" content="鼠标移出后自动关闭。">
      <template #trigger="{ open }">
        <Button @mouseenter="open">悬停显示</Button>
      </template>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover, Button } from '@apron-design/vue-next'
</script>
```
:::

### 搭配不同元素

Popover 可以搭配不同的元素使用，如链接、文本等。

:::demo
```vue
<template>
  <div style="display: flex; align-items: center; gap: 24px;">
    <Popover mode="hover" title="链接提示" content="这是链接的详细说明。">
      <template #trigger="{ open }">
        <Link @mouseenter="open">悬停查看详情</Link>
      </template>
    </Popover>
    <Popover mode="hover" content="这是一段说明文字">
      <template #trigger="{ open }">
        <span 
          @mouseenter="open"
          style="cursor: pointer; text-decoration: underline; color: #4C9EEA;"
        >
          帮助信息
        </span>
      </template>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover, Link } from '@apron-design/vue-next'
</script>
```
:::

### 内容变化

支持只显示标题、只显示内容或同时显示标题和内容。

:::demo
```vue
<template>
  <div style="display: flex; gap: 16px;">
    <Popover title="只有标题">
      <template #trigger="{ open }">
        <Button variant="secondary" @click="open">只有标题</Button>
      </template>
    </Popover>
    <Popover content="只有内容，没有标题。">
      <template #trigger="{ open }">
        <Button variant="secondary" @click="open">只有内容</Button>
      </template>
    </Popover>
    <Popover 
      title="详细说明" 
      content="这是一段很长的内容，用来测试 Popover 的最大宽度限制。当内容超过 300px 宽度时，会自动换行显示，确保内容可读性良好。"
    >
      <template #trigger="{ open }">
        <Button @click="open">长内容</Button>
      </template>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover, Button } from '@apron-design/vue-next'
</script>
```
:::

### 富文本内容

Popover 支持富文本内容，可以嵌套其他组件。

:::demo
```vue
<template>
  <Popover title="用户信息">
    <template #default>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div>用户名：admin</div>
        <div>邮箱：admin@example.com</div>
        <div>角色：管理员</div>
      </div>
    </template>
    <template #trigger="{ open }">
      <Button @click="open">查看用户信息</Button>
    </template>
  </Popover>
</template>

<script setup lang="ts">
import { Popover, Button } from '@apron-design/vue-next'
</script>
```
:::

### 控制显示状态

可以通过 `v-model:visible` 控制 Popover 的显示状态。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
    <Popover 
      v-model:visible="visible" 
      title="受控显示" 
      content="通过 v-model:visible 控制显示状态"
    >
      <template #trigger>
        <Button>受控显示</Button>
      </template>
    </Popover>
    <Button @click="toggleVisible">切换显示状态</Button>
    <p style="margin: 0; color: #666;">当前状态：{{ visible ? '显示' : '隐藏' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Popover, Button } from '@apron-design/vue-next'

const visible = ref(false)

const toggleVisible = () => {
  visible.value = !visible.value
}
</script>
```
:::

### 多个 Popover（互斥）

同一时间只能显示一个 Popover，点击新的会关闭旧的。

:::demo
```vue
<template>
  <div style="display: flex; gap: 16px;">
    <Popover title="Popover 1" content="这是第一个 Popover">
      <template #trigger="{ open }">
        <Button @click="open">Popover 1</Button>
      </template>
    </Popover>
    <Popover title="Popover 2" content="这是第二个 Popover">
      <template #trigger="{ open }">
        <Button @click="open">Popover 2</Button>
      </template>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover, Button } from '@apron-design/vue-next'
</script>
```
:::

### 暗色模式

Popover 支持暗色模式。

:::demo
```vue
<template>
  <div
    data-prefers-color="dark"
    style="padding: 100px 32px; background-color: #18181b; border-radius: 12px; display: flex; gap: 24px; justify-content: center;"
  >
    <Popover title="暗色模式" content="Popover 支持暗色模式。">
      <template #trigger="{ open }">
        <Button @click="open">Popover</Button>
      </template>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover, Button } from '@apron-design/vue-next'
</script>
```
:::

## API

### Popover Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 触发方式 | `'click' \| 'hover'` | `'click'` |
| title | 标题 | string | - |
| content | 内容 | string | - |
| class | 自定义类名 | string | - |
| visible | 显示状态（受控模式） | boolean | `false` |

### Popover Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:visible | 显示状态改变时触发 | `(visible: boolean)` |
| open | 打开时触发 | - |
| close | 关闭时触发 | - |

### Popover Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义内容（替代 content 属性） |
| trigger | 触发元素，提供 open、close、visible 参数 |

## 注意事项

1. Popover 使用 `Teleport` 挂载到 `body` 上，确保层级正确
2. 同一时间只能显示一个 Popover，点击新的会关闭旧的
3. 支持受控和非受控两种模式
4. 支持暗色模式自动适配
5. 提供了完整的键盘交互支持