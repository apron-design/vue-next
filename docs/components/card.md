# Card 卡片

通用卡片容器。

## 基础用法

```vue
<script setup>
import { Card, CardBody } from '@apron-design/vue'
</script>

<template>
  <Card style="width: 300px">
    <CardBody>
      这是一段卡片内容。卡片可以用来展示各种信息。
    </CardBody>
  </Card>
</template>
```

## 带标题的卡片

使用 `CardHeader` 添加标题和额外内容。

```vue
<script setup>
import { Card, CardHeader, CardBody } from '@apron-design/vue'
</script>

<template>
  <Card style="width: 300px">
    <CardHeader title="卡片标题" extra="更多" />
    <CardBody>
      这是一段卡片内容。
    </CardBody>
  </Card>
</template>
```

## 带页脚的卡片

```vue
<script setup>
import { Card, CardHeader, CardBody, CardFooter, Button } from '@apron-design/vue'
</script>

<template>
  <Card style="width: 300px">
    <CardHeader title="卡片标题" />
    <CardBody>
      这是卡片内容区域。可以放置各种信息。
    </CardBody>
    <CardFooter>
      <Button>取消</Button>
      <Button variant="primary">确定</Button>
    </CardFooter>
  </Card>
</template>
```

## 无边框卡片

```vue
<template>
  <div style="background: #f5f5f5; padding: 16px;">
    <Card :bordered="false" style="width: 300px">
      <CardBody>
        无边框的卡片，适合放在有背景的容器中。
      </CardBody>
    </Card>
  </div>
</template>
```

## API

### Card Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bordered | 是否显示边框 | `boolean` | `true` |

### CardHeader Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | - |
| extra | 额外内容 | `string` | - |

### CardHeader Slots

| 插槽名 | 说明 |
| --- | --- |
| title | 自定义标题 |
| extra | 自定义额外内容 |

### CardBody Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 卡片内容 |

### CardFooter Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 页脚内容 |

