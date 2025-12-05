# Tag 标签

用于标记和分类的小标签。

## 基础用法

标签有两种样式：`default` 和 `primary`。

```vue
<script setup>
import { Tag } from '@apron-design/vue'
</script>

<template>
  <div class="demo-row">
    <Tag>默认标签</Tag>
    <Tag variant="primary">主要标签</Tag>
  </div>
</template>
```

## 可关闭标签

添加 `closable` 属性可以让标签变为可关闭状态。

```vue
<script setup>
import { ref } from 'vue'

const tags = ref(['标签一', '标签二', '标签三'])

const handleClose = (index) => {
  tags.value.splice(index, 1)
}
</script>

<template>
  <div class="demo-row">
    <Tag 
      v-for="(tag, index) in tags" 
      :key="tag" 
      closable 
      @close="handleClose(index)"
    >
      {{ tag }}
    </Tag>
  </div>
</template>
```

## 不同类型

通过组合 `variant` 和 CSS 自定义样式，可以实现不同类型的标签。

```vue
<template>
  <div class="demo-row">
    <Tag>默认</Tag>
    <Tag variant="primary">主要</Tag>
    <Tag style="--tag-default-bg: #dcfce7; --tag-default-text: #166534;">成功</Tag>
    <Tag style="--tag-default-bg: #fef3c7; --tag-default-text: #92400e;">警告</Tag>
    <Tag style="--tag-default-bg: #fee2e2; --tag-default-text: #991b1b;">错误</Tag>
  </div>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 标签类型 | `'default' \| 'primary'` | `'default'` |
| closable | 是否可关闭 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| close | 点击关闭按钮时触发 | `(event: MouseEvent) => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 标签内容 |

