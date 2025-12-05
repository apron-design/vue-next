# Badge 徽标

在图标或文字右上角展示数字或小红点。

## 基础用法

```vue
<script setup>
import { Badge, Button } from '@apron-design/vue'
</script>

<template>
  <div class="demo-row">
    <Badge :count="5">
      <Button>消息</Button>
    </Badge>
    <Badge :count="25">
      <Button>通知</Button>
    </Badge>
    <Badge :count="100" :overflow-count="99">
      <Button>更多</Button>
    </Badge>
  </div>
</template>
```

## 小红点

使用 `dot` 属性展示不含数字的小红点。

```vue
<template>
  <div class="demo-row">
    <Badge dot>
      <Button>消息</Button>
    </Badge>
    <Badge dot>
      <span style="width: 24px; height: 24px; background: #ddd; display: inline-block; border-radius: 4px;"></span>
    </Badge>
  </div>
</template>
```

## 自定义内容

使用 `content` 属性或具名插槽自定义徽标内容。

```vue
<template>
  <div class="demo-row">
    <Badge content="NEW">
      <Button>新功能</Button>
    </Badge>
    <Badge content="Hot">
      <Button>热门</Button>
    </Badge>
  </div>
</template>
```

## 独立使用

不包裹子元素时，Badge 将独立展示。

```vue
<template>
  <div class="demo-row">
    <Badge :count="10" />
    <Badge dot />
    <Badge content="99+" />
  </div>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| count | 展示的数字 | `number` | - |
| overflowCount | 展示封顶的数字值 | `number` | `99` |
| dot | 是否展示小红点 | `boolean` | `false` |
| content | 自定义显示内容 | `string \| VNode` | - |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 包裹的内容 |
| content | 自定义徽标内容 |

