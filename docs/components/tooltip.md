# Tooltip 文字提示

简单的文字提示气泡框。

## 基础用法

鼠标悬停时显示提示。

```vue
<script setup>
import { Tooltip, Button } from '@apron-design/vue'
</script>

<template>
  <Tooltip content="提示文字">
    <Button>悬停显示</Button>
  </Tooltip>
</template>
```

## 使用插槽

通过 `content` 插槽自定义提示内容。

```vue
<template>
  <Tooltip>
    <Button>查看详情</Button>
    <template #content>
      <div>
        <strong>标题</strong>
        <p>这是详细说明文字</p>
      </div>
    </template>
  </Tooltip>
</template>
```

## 禁用状态

```vue
<template>
  <Tooltip content="这个提示不会显示" disabled>
    <Button>禁用的提示</Button>
  </Tooltip>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 提示内容 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 触发提示的元素 |
| content | 自定义提示内容 |

