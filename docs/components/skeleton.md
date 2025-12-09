# Skeleton

骨架屏组件用于在内容加载时提供视觉反馈。

## 基本用法

基础的骨架屏使用方式。

:::demo
```vue
<template>
  <Skeleton />
</template>

<script setup lang="ts">
import { Skeleton } from '@apron-design/vue-next'
</script>
```
:::

## 显示内容

通过 `loading` 属性控制是否显示骨架屏，加载完成后显示内容。

:::demo
```vue
<template>
  <div>
    <Skeleton :loading="loading">
      <div>
        <h3>加载完成的内容</h3>
        <p>这是实际加载完成的内容区域。</p>
      </div>
    </Skeleton>
    
    <br />
    
    <Button @click="toggleLoading">
      {{ loading ? '显示内容' : '显示骨架屏' }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Skeleton, Button } from '@apron-design/vue-next'

const loading = ref(true)

const toggleLoading = () => {
  loading.value = !loading.value
}
</script>
```
:::

## 自定义内容

通过组合不同的骨架元素创建自定义骨架屏。

:::demo
```vue
<template>
  <div>
    <!-- 自定义头像和标题 -->
    <div style="display: flex; align-items: center; margin-bottom: 20px;">
      <SkeletonElement variant="circular" :width="40" :height="40" />
      <div style="margin-left: 16px; flex: 1;">
        <SkeletonElement variant="text" :width="'40%'" />
      </div>
    </div>
    
    <!-- 自定义段落 -->
    <div>
      <SkeletonElement variant="text" :width="'100%'" style="margin-bottom: 10px;" />
      <SkeletonElement variant="text" :width="'80%'" style="margin-bottom: 10px;" />
      <SkeletonElement variant="text" :width="'60%'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SkeletonElement } from '@apron-design/vue-next'
</script>
```
:::

## 不同形状

通过 `variant` 属性设置不同的形状。

:::demo
```vue
<template>
  <div style="display: flex; gap: 20px; flex-wrap: wrap;">
    <div>
      <SkeletonElement variant="text" :width="120" :height="20" />
      <div style="margin-top: 8px;">Text</div>
    </div>
    
    <div>
      <SkeletonElement variant="circular" :width="40" :height="40" />
      <div style="margin-top: 8px;">Circular</div>
    </div>
    
    <div>
      <SkeletonElement variant="rectangular" :width="120" :height="60" />
      <div style="margin-top: 8px;">Rectangular</div>
    </div>
    
    <div>
      <SkeletonElement variant="rounded" :width="120" :height="60" />
      <div style="margin-top: 8px;">Rounded</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SkeletonElement } from '@apron-design/vue-next'
</script>
```
:::

## 头像骨架

专门用于头像的骨架组件。

:::demo
```vue
<template>
  <div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: center;">
    <SkeletonAvatar size="sm" shape="circle" />
    <SkeletonAvatar size="md" shape="circle" />
    <SkeletonAvatar size="lg" shape="circle" />
    <SkeletonAvatar :size="64" shape="square" />
  </div>
</template>

<script setup lang="ts">
import { SkeletonAvatar } from '@apron-design/vue-next'
</script>
```
:::

## 按钮骨架

专门用于按钮的骨架组件。

:::demo
```vue
<template>
  <div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: center;">
    <SkeletonButton size="sm" />
    <SkeletonButton size="md" />
    <SkeletonButton size="lg" />
    <SkeletonButton shape="circle" />
    <SkeletonButton shape="round" />
  </div>
</template>

<script setup lang="ts">
import { SkeletonButton } from '@apron-design/vue-next'
</script>
```
:::

## 图片骨架

专门用于图片的骨架组件。

:::demo
```vue
<template>
  <div style="display: flex; gap: 20px; flex-wrap: wrap;">
    <SkeletonImage :width="200" :height="150" />
    <SkeletonImage :width="150" :height="200" />
  </div>
</template>

<script setup lang="ts">
import { SkeletonImage } from '@apron-design/vue-next'
</script>
```
:::

## API

### Skeleton Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 是否显示骨架屏 | boolean | true |
| animated | 是否显示动画 | boolean | true |
| class | 自定义类名 | string | - |

### SkeletonElement Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 形状 | `'text' \| 'circular' \| 'rectangular' \| 'rounded'` | 'text' |
| width | 宽度 | number \| string | - |
| height | 高度 | number \| string | - |
| animated | 是否显示动画 | boolean | true |
| class | 自定义类名 | string | - |
| style | 自定义样式 | Record<string, string \| number> | - |

### SkeletonAvatar Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 尺寸 | number \| 'sm' \| 'md' \| 'lg' | 'md' |
| shape | 形状 | 'circle' \| 'square' | 'circle' |
| animated | 是否显示动画 | boolean | true |
| class | 自定义类名 | string | - |

### SkeletonTitle Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 宽度 | number \| string | '40%' |
| animated | 是否显示动画 | boolean | true |
| class | 自定义类名 | string | - |

### SkeletonParagraph Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rows | 行数 | number | 3 |
| width | 每行宽度，可以是数组 | number \| string \| (number \| string)[] | - |
| animated | 是否显示动画 | boolean | true |
| class | 自定义类名 | string | - |

### SkeletonButton Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 尺寸 | 'sm' \| 'md' \| 'lg' | 'md' |
| shape | 形状 | 'default' \| 'circle' \| 'round' | 'default' |
| block | 是否块级 | boolean | false |
| animated | 是否显示动画 | boolean | true |
| class | 自定义类名 | string | - |

### SkeletonImage Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 宽度 | number \| string | 200 |
| height | 高度 | number \| string | 200 |
| animated | 是否显示动画 | boolean | true |
| class | 自定义类名 | string | - |
