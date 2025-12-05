# Alert 警告提示

用于展示静态的警告或提示信息。

## 基础用法

共有四种类型：`info`、`success`、`warning` 和 `error`。

```vue
<script setup>
import { Alert } from '@apron-design/vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Alert type="info" message="这是一条信息提示" />
    <Alert type="success" message="这是一条成功提示" />
    <Alert type="warning" message="这是一条警告提示" />
    <Alert type="error" message="这是一条错误提示" />
  </div>
</template>
```

## 使用插槽

可以通过默认插槽自定义消息内容。

```vue
<template>
  <Alert type="info">
    <strong>提示：</strong>你可以使用插槽自定义内容，
    包括 <a href="#">链接</a> 和其他元素。
  </Alert>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 警告类型 | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` |
| message | 警告内容 | `string` | - |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义内容，优先级高于 message |

