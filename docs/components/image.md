# Image 图片

图片容器，支持加载状态、加载失败、预览等功能。

## 基础用法

```vue
<script setup>
import { Image } from '@apron-design/vue'
</script>

<template>
  <Image 
    src="https://picsum.photos/200/200" 
    alt="示例图片"
    width="200"
    height="200"
  />
</template>
```

## 填充模式

通过 `fit` 属性设置图片如何适应容器。

```vue
<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <div v-for="fit in ['fill', 'contain', 'cover', 'none', 'scale-down']" :key="fit">
      <p>{{ fit }}</p>
      <Image 
        src="https://picsum.photos/300/200" 
        :fit="fit"
        width="150"
        height="150"
        style="border: 1px solid #eee;"
      />
    </div>
  </div>
</template>
```

## 加载失败

图片加载失败时显示占位内容。

```vue
<template>
  <div style="display: flex; gap: 16px;">
    <Image 
      src="https://invalid-url.jpg" 
      width="200"
      height="200"
    />
    <Image 
      src="https://invalid-url.jpg" 
      fallback="https://picsum.photos/200/200"
      width="200"
      height="200"
    />
  </div>
</template>
```

## 图片预览

设置 `preview` 后，点击图片可以预览大图。

```vue
<template>
  <Image 
    src="https://picsum.photos/800/600" 
    width="200"
    height="150"
    preview
  />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址 | `string` | - |
| alt | 图片描述 | `string` | - |
| fit | 填充模式 | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'cover'` |
| fallback | 加载失败时的替代图片 | `string` | - |
| preview | 是否支持预览 | `boolean` | `false` |
| width | 宽度 | `string \| number` | - |
| height | 高度 | `string \| number` | - |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| load | 图片加载成功时触发 | `(event: Event) => void` |
| error | 图片加载失败时触发 | `(event: Event) => void` |

