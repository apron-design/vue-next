# Popover 气泡卡片

点击/鼠标移入元素，弹出气泡式的卡片浮层。

## 基础用法

```vue
<script setup>
import { Popover, Button } from '@apron-design/vue'
</script>

<template>
  <Popover title="标题" content="这是一段内容">
    <Button>点击显示</Button>
  </Popover>
</template>
```

## 悬停触发

设置 `mode="hover"` 可以通过鼠标悬停触发。

```vue
<template>
  <Popover title="标题" content="鼠标悬停显示的内容" mode="hover">
    <Button>悬停显示</Button>
  </Popover>
</template>
```

## 使用插槽

```vue
<template>
  <Popover>
    <Button>查看详情</Button>
    <template #title>
      <strong style="color: var(--apron-color-primary)">自定义标题</strong>
    </template>
    <template #content>
      <p>这是自定义的内容</p>
      <p>可以包含任意元素</p>
    </template>
  </Popover>
</template>
```

## 确认弹窗

使用 `PopoverConfirm` 组件实现确认提示。

```vue
<script setup>
import { PopoverConfirm, Button, Message } from '@apron-design/vue'

const handleConfirm = () => {
  Message.success('确认操作')
}

const handleCancel = () => {
  Message.info('取消操作')
}
</script>

<template>
  <PopoverConfirm 
    title="确认删除？" 
    content="删除后无法恢复"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <Button danger>删除</Button>
  </PopoverConfirm>
</template>
```

## 自定义按钮文字

```vue
<template>
  <PopoverConfirm 
    title="Are you sure?" 
    ok-text="Yes" 
    cancel-text="No"
  >
    <Button>English</Button>
  </PopoverConfirm>
</template>
```

## API

### Popover Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | - |
| content | 内容 | `string` | - |
| mode | 触发方式 | `'click' \| 'hover'` | `'click'` |
| disabled | 是否禁用 | `boolean` | `false` |

### Popover Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| openChange | 显示状态变化时触发 | `(open: boolean) => void` |

### Popover Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 触发元素 |
| title | 自定义标题 |
| content | 自定义内容 |

### PopoverConfirm Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | - |
| content | 内容 | `string` | - |
| okText | 确认按钮文字 | `string` | `'确定'` |
| cancelText | 取消按钮文字 | `string` | `'取消'` |
| disabled | 是否禁用 | `boolean` | `false` |

### PopoverConfirm Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| confirm | 点击确认时触发 | `() => void` |
| cancel | 点击取消时触发 | `() => void` |
| openChange | 显示状态变化时触发 | `(open: boolean) => void` |

