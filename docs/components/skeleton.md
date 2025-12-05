# Skeleton 骨架屏

在需要等待加载内容的位置提供占位图形。

## 基础用法

```vue
<script setup>
import { Skeleton } from '@apron-design/vue'
</script>

<template>
  <Skeleton />
</template>
```

## 加载完成

通过 `loading` 属性控制是否显示骨架屏。

```vue
<script setup>
import { ref } from 'vue'
import { Skeleton, Button } from '@apron-design/vue'

const loading = ref(true)
</script>

<template>
  <Button @click="loading = !loading" style="margin-bottom: 16px">
    切换加载状态
  </Button>
  
  <Skeleton :loading="loading">
    <div>
      <h3>真实内容标题</h3>
      <p>这是加载完成后显示的真实内容。</p>
    </div>
  </Skeleton>
</template>
```

## 自定义骨架

使用 `SkeletonElement` 创建自定义骨架形状。

```vue
<script setup>
import { Skeleton, SkeletonElement } from '@apron-design/vue'
</script>

<template>
  <Skeleton :loading="true">
    <template #template>
      <div style="display: flex; align-items: center; gap: 16px;">
        <SkeletonElement variant="circular" width="64" height="64" />
        <div style="flex: 1;">
          <SkeletonElement variant="text" width="120" height="20" />
          <SkeletonElement variant="text" style="margin-top: 8px;" />
          <SkeletonElement variant="text" width="80%" style="margin-top: 8px;" />
        </div>
      </div>
    </template>
  </Skeleton>
</template>
```

## 不同形状

```vue
<template>
  <div style="display: flex; gap: 24px; flex-wrap: wrap;">
    <div>
      <p>text</p>
      <SkeletonElement variant="text" width="200" />
    </div>
    <div>
      <p>circular</p>
      <SkeletonElement variant="circular" width="48" height="48" />
    </div>
    <div>
      <p>rectangular</p>
      <SkeletonElement variant="rectangular" width="100" height="60" />
    </div>
    <div>
      <p>rounded</p>
      <SkeletonElement variant="rounded" width="100" height="60" />
    </div>
  </div>
</template>
```

## 不带动画

```vue
<template>
  <Skeleton :loading="true" :animated="false" />
</template>
```

## API

### Skeleton Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 是否显示骨架屏 | `boolean` | `true` |
| animated | 是否显示动画 | `boolean` | `true` |

### Skeleton Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 加载完成后显示的内容 |
| template | 自定义骨架模板 |

### SkeletonElement Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 形状变体 | `'text' \| 'circular' \| 'rectangular' \| 'rounded'` | `'text'` |
| width | 宽度 | `string \| number` | - |
| height | 高度 | `string \| number` | - |
| animated | 是否显示动画 | `boolean` | `true` |

