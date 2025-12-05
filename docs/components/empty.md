# Empty 空状态

空状态时的占位提示。

## 基础用法

```vue
<script setup>
import { Empty } from '@apron-design/vue'
</script>

<template>
  <Empty />
</template>
```

## 自定义描述

```vue
<template>
  <Empty description="没有找到相关内容" />
</template>
```

## 自定义图标

```vue
<script setup>
import { h } from 'vue'

const CustomIcon = () => h('svg', {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2'
}, [
  h('path', { d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' })
])
</script>

<template>
  <Empty :icon="CustomIcon" description="搜索无结果" />
</template>
```

## 使用插槽

```vue
<script setup>
import { Empty, Button } from '@apron-design/vue'
</script>

<template>
  <Empty>
    <template #icon>
      <div style="font-size: 48px;">📭</div>
    </template>
    <p>暂无消息</p>
    <Button variant="primary" style="margin-top: 16px">刷新</Button>
  </Empty>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| description | 描述文字 | `string` | `'暂无数据'` |
| icon | 自定义图标组件 | `Component` | - |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义内容 |
| icon | 自定义图标 |

