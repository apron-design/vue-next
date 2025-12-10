---
title: Popover 气泡卡片
group: 反馈组件
order: 3
---

# Popover 气泡卡片

气泡卡片是一种轻量级的弹出框，用于显示额外的信息或确认操作。

## 何时使用

- 需要显示简短的提示信息时
- 需要用户确认某个操作时
- 不想打断用户主要流程但又需要提供额外信息时

## 示例

### 基础用法

最简单的气泡卡片，在点击触发元素时显示内容。

:::demo
```vue
<template>
  <ad-popover title="提示标题" content="这是 Popover 的内容区域，可以放置任何文本信息。">
    <template #trigger="{ handleClick, triggerRef }">
      <ad-button :ref="triggerRef" @click="handleClick">点击显示</ad-button>
    </template>
  </ad-popover>
</template>

<script setup lang="ts">
import { AdPopover, AdButton } from '@apron-design/vue-next'
</script>
```
:::

### 触发方式

Popover 支持两种触发方式：点击和悬停。

#### 点击触发

:::demo
```vue
<template>
  <ad-popover mode="click" title="点击触发" content="点击按钮或外部区域关闭。">
    <template #trigger="{ open }">
      <ad-button @click="open">点击显示</ad-button>
    </template>
  </ad-popover>
</template>

<script setup lang="ts">
import { AdPopover, AdButton } from '@apron-design/vue-next'
</script>
```
:::

#### 悬停触发

:::demo
```vue
<template>
  <ad-popover mode="hover" title="悬停触发" content="鼠标移出后自动关闭。">
    <template #trigger="{ open }">
      <ad-button @mouseenter="open">悬停显示</ad-button>
    </template>
  </ad-popover>
</template>

<script setup lang="ts">
import { AdPopover, AdButton } from '@apron-design/vue-next'
</script>
```
:::

### 搭配不同元素

Popover 可以与多种元素搭配使用。

#### 搭配链接

:::demo
```vue
<template>
  <ad-popover mode="hover" title="链接提示" content="这是链接的详细说明。">
    <template #trigger="{ open }">
      <ad-link @mouseenter="open">悬停查看详情</ad-link>
    </template>
  </ad-popover>
</template>

<script setup lang="ts">
import { AdPopover, AdLink } from '@apron-design/vue-next'
</script>
```
:::

#### 搭配文本

:::demo
```vue
<template>
  <ad-popover mode="hover" content="这是一段说明文字">
    <template #trigger="{ open }">
      <span 
        @mouseenter="open"
        style="cursor: pointer; text-decoration: underline; color: #4C9EEA;"
      >
        帮助信息
      </span>
    </template>
  </ad-popover>
</template>

<script setup lang="ts">
import { AdPopover } from '@apron-design/vue-next'
</script>
```
:::

### 内容变化

Popover 支持不同的内容组合。

#### 只有标题

:::demo
```vue
<template>
  <ad-popover title="只有标题">
    <template #trigger="{ open }">
      <ad-button variant="secondary" @click="open">只有标题</ad-button>
    </template>
  </ad-popover>
</template>

<script setup lang="ts">
import { AdPopover, AdButton } from '@apron-design/vue-next'
</script>
```
:::

#### 只有内容

:::demo
```vue
<template>
  <ad-popover content="只有内容，没有标题。">
    <template #trigger="{ open }">
      <ad-button variant="secondary" @click="open">只有内容</ad-button>
    </template>
  </ad-popover>
</template>

<script setup lang="ts">
import { AdPopover, AdButton } from '@apron-design/vue-next'
</script>
```
:::

#### 长内容

:::demo
```vue
<template>
  <ad-popover
    title="详细说明"
    content="这是一段很长的内容，用来测试 Popover 的最大宽度限制。当内容超过 300px 宽度时，会自动换行显示，确保内容可读性良好。"
  >
    <template #trigger="{ open }">
      <ad-button @click="open">长内容</ad-button>
    </template>
  </ad-popover>
</template>

<script setup lang="ts">
import { AdPopover, AdButton } from '@apron-design/vue-next'
</script>
```
:::

#### 富文本内容

:::demo
```vue
<template>
  <ad-popover title="用户信息">
    <template #default>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div>用户名：admin</div>
        <div>邮箱：admin@example.com</div>
        <div>角色：管理员</div>
      </div>
    </template>
    <template #trigger="{ open }">
      <ad-button @click="open">查看用户信息</ad-button>
    </template>
  </ad-popover>
</template>

<script setup lang="ts">
import { AdPopover, AdButton } from '@apron-design/vue-next'
</script>
```
:::

### PopoverConfirm 确认框

专门用于确认操作的气泡卡片。

:::demo
```vue
<template>
  <ad-popover-confirm
    title="确认删除"
    content="删除后将无法恢复，确定要删除吗？"
    @cancel="handleCancel"
    @confirm="handleConfirm"
  >
    <template #trigger="{ open }">
      <ad-button variant="primary" danger @click="open">删除</ad-button>
    </template>
  </ad-popover-confirm>
</template>

<script setup lang="ts">
import { AdPopoverConfirm, AdButton } from '@apron-design/vue-next'

const handleCancel = () => {
  console.log('取消')
}

const handleConfirm = () => {
  console.log('确认')
}
</script>
```
:::

### PopoverConfirm 自定义文字

可以自定义确认框中的按钮文字。

:::demo
```vue
<template>
  <ad-popover-confirm
    title="提交确认"
    content="确定要提交此表单吗？"
    cancel-text="返回修改"
    confirm-text="确定提交"
    @cancel="handleCancel"
    @confirm="handleConfirm"
  >
    <template #trigger="{ open }">
      <ad-button variant="primary" @click="open">提交</ad-button>
    </template>
  </ad-popover-confirm>
</template>

<script setup lang="ts">
import { AdPopoverConfirm, AdButton } from '@apron-design/vue-next'

const handleCancel = () => {
  console.log('返回修改')
}

const handleConfirm = () => {
  console.log('确定提交')
}
</script>
```
:::

### PopoverConfirm 自定义按钮样式

可以自定义确认框中按钮的样式。

:::demo
```vue
<template>
  <ad-popover-confirm
    title="危险操作"
    content="此操作不可逆，请谨慎操作。"
    cancel-text="取消"
    confirm-text="确认删除"
    cancel-variant="text"
    confirm-variant="primary"
    @cancel="handleCancel"
    @confirm="handleConfirm"
  >
    <template #trigger="{ open }">
      <ad-button danger @click="open">危险操作</ad-button>
    </template>
  </ad-popover-confirm>
</template>

<script setup lang="ts">
import { AdPopoverConfirm, AdButton } from '@apron-design/vue-next'

const handleCancel = () => {
  console.log('取消')
}

const handleConfirm = () => {
  console.log('确认删除')
}
</script>
```
:::

### PopoverConfirm 搭配链接

确认框也可以与链接搭配使用。

:::demo
```vue
<template>
  <ad-popover-confirm
    title="退出登录"
    content="确定要退出登录吗？"
    @cancel="handleCancel"
    @confirm="handleConfirm"
  >
    <template #trigger="{ open }">
      <ad-link @click="open">退出登录</ad-link>
    </template>
  </ad-popover-confirm>
</template>

<script setup lang="ts">
import { AdPopoverConfirm, AdLink } from '@apron-design/vue-next'

const handleCancel = () => {
  console.log('取消')
}

const handleConfirm = () => {
  console.log('退出登录')
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
    <ad-popover title="Popover 1" content="这是第一个 Popover">
      <template #trigger="{ open }">
        <ad-button @click="open">Popover 1</ad-button>
      </template>
    </ad-popover>
    <ad-popover title="Popover 2" content="这是第二个 Popover">
      <template #trigger="{ open }">
        <ad-button @click="open">Popover 2</ad-button>
      </template>
    </ad-popover>
    <ad-popover-confirm
      title="确认"
      content="这是一个确认框"
      @confirm="handleConfirm"
    >
      <template #trigger="{ open }">
        <ad-button variant="primary" @click="open">PopoverConfirm</ad-button>
      </template>
    </ad-popover-confirm>
  </div>
</template>

<script setup lang="ts">
import { AdPopover, AdPopoverConfirm, AdButton } from '@apron-design/vue-next'

const handleConfirm = () => {
  console.log('确认')
}
</script>
```
:::

### 暗色模式

Popover 在暗色模式下会自动适配主题颜色。

:::demo
```vue
<template>
  <div
    data-prefers-color="dark"
    style="padding: 100px 32px; background-color: #18181b; border-radius: 12px; display: flex; gap: 24px; justify-content: center;"
  >
    <ad-popover title="暗色模式" content="Popover 支持暗色模式。">
      <template #trigger="{ open }">
        <ad-button @click="open">Popover</ad-button>
      </template>
    </ad-popover>
    <ad-popover-confirm
      title="确认操作"
      content="在暗色模式下的确认框。"
      @confirm="handleConfirm"
    >
      <template #trigger="{ open }">
        <ad-button variant="primary" @click="open">PopoverConfirm</ad-button>
      </template>
    </ad-popover-confirm>
  </div>
</template>

<script setup lang="ts">
import { AdPopover, AdPopoverConfirm, AdButton } from '@apron-design/vue-next'

const handleConfirm = () => {
  console.log('确认')
}
</script>
```
:::

### 完整概览

展示 Popover 和 PopoverConfirm 的各种用法。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 48px; padding: 50px 0;">
    <div>
      <h3 style="margin: 0 0 16px 0; color: #393939;">Popover 触发方式</h3>
      <div style="display: flex; gap: 16px;">
        <ad-popover mode="click" title="点击触发" content="点击按钮或外部关闭">
          <template #trigger="{ open }">
            <ad-button @click="open">Click</ad-button>
          </template>
        </ad-popover>
        <ad-popover mode="hover" title="悬停触发" content="鼠标移出后关闭">
          <template #trigger="{ open }">
            <ad-button variant="secondary" @mouseenter="open">Hover</ad-button>
          </template>
        </ad-popover>
      </div>
    </div>

    <div>
      <h3 style="margin: 0 0 16px 0; color: #393939;">PopoverConfirm</h3>
      <div style="display: flex; gap: 16px;">
        <ad-popover-confirm
          title="删除确认"
          content="确定要删除吗？"
          @confirm="handleDelete"
        >
          <template #trigger="{ open }">
            <ad-button danger @click="open">删除</ad-button>
          </template>
        </ad-popover-confirm>
        <ad-popover-confirm
          title="提交确认"
          content="确定要提交吗？"
          cancel-text="返回"
          confirm-text="提交"
          @confirm="handleSubmit"
        >
          <template #trigger="{ open }">
            <ad-button variant="primary" @click="open">提交</ad-button>
          </template>
        </ad-popover-confirm>
      </div>
    </div>

    <div>
      <h3 style="margin: 0 0 16px 0; color: #393939;">互斥展示</h3>
      <p style="margin: 0 0 12px 0; color: #71717a; font-size: 14px;">
        同一时间只能显示一个 Popover，点击新的会关闭旧的
      </p>
      <div style="display: flex; gap: 16px;">
        <ad-popover title="Popover A" content="内容 A">
          <template #trigger="{ open }">
            <ad-button variant="text" @click="open">A</ad-button>
          </template>
        </ad-popover>
        <ad-popover title="Popover B" content="内容 B">
          <template #trigger="{ open }">
            <ad-button variant="text" @click="open">B</ad-button>
          </template>
        </ad-popover>
        <ad-popover title="Popover C" content="内容 C">
          <template #trigger="{ open }">
            <ad-button variant="text" @click="open">C</ad-button>
          </template>
        </ad-popover>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AdPopover, AdPopoverConfirm, AdButton } from '@apron-design/vue-next'

const handleDelete = () => {
  console.log('删除')
}

const handleSubmit = () => {
  console.log('提交')
}
</script>
```
:::

## API

### Popover Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 触发方式 | `'click'` \| `'hover'` | `'click'` |
| title | 标题 | `string \| VNode \| (() => VNode)` | - |
| content | 内容 | `string \| VNode \| (() => VNode)` | - |
| class | 自定义类名 | `string` | - |
| visible | 显示状态（受控模式） | `boolean` | `false` |

### Popover Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:visible | 显示状态改变时触发 | `(visible: boolean)` |
| open | 打开时触发 | - |
| close | 关闭时触发 | - |

### Popover Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义内容（替代 content 属性） |
| trigger | 触发元素，提供 open、close、visible 参数 |

### PopoverConfirm Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string \| VNode \| (() => VNode)` | - |
| content | 内容 | `string \| VNode \| (() => VNode)` | - |
| cancelText | 取消按钮文字 | `string` | `'取消'` |
| confirmText | 确定按钮文字 | `string` | `'确定'` |
| cancelVariant | 取消按钮变种 | `'primary' \| 'secondary' \| 'default' \| 'text' \| 'link'` | `'default'` |
| confirmVariant | 确定按钮变种 | `'primary' \| 'secondary' \| 'default' \| 'text' \| 'link'` | `'primary'` |
| onCancel | 取消回调 | `() => void` | - |
| onConfirm | 确定回调 | `() => void` | - |
| class | 自定义类名 | `string` | - |
| visible | 显示状态（受控模式） | `boolean` | `false` |

### PopoverConfirm Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:visible | 显示状态改变时触发 | `(visible: boolean)` |
| open | 打开时触发 | - |
| close | 关闭时触发 | - |
| cancel | 取消时触发 | - |
| confirm | 确认时触发 | - |

### PopoverConfirm Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义内容（替代 content 属性） |
| trigger | 触发元素，提供 open、close、visible 参数 |

## 注意事项

1. Popover 和 PopoverConfirm 都是通过 Teleport 渲染到 body 上的，确保层级高于其他元素
2. 同一时间只能显示一个 Popover，点击新的会自动关闭旧的
3. 点击模式下，点击外部区域会关闭 Popover
4. 悬停模式下，鼠标移出触发元素或 Popover 会延迟关闭
5. Popover 会自动计算位置，确保完全显示在视口内
6. 当窗口大小改变或滚动时，Popover 会重新计算位置
7. PopoverConfirm 专门用于确认操作，提供了取消和确定两个按钮
