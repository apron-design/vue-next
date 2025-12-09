# Image 图片

增强版的 img 标签，提供多种图片填充方式、加载状态和错误状态。

## 基础用法

基础的图片展示用法。

:::demo 基础图片展示。
```vue
<template>
  <Image 
    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" 
    alt="风景图片" 
    style="width: 200px; height: 200px;" 
  />
</template>
```
:::

## 填充方式

通过 objectFit 属性设置图片的填充方式。

:::demo 不同的图片填充方式。
```vue
<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <div>
      <Image 
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" 
        alt="风景图片" 
        objectFit="cover"
        style="width: 200px; height: 200px;"
      />
      <div style="text-align: center; margin-top: 8px;">cover</div>
    </div>
    
    <div>
      <Image 
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" 
        alt="风景图片" 
        objectFit="contain"
        style="width: 200px; height: 200px;"
      />
      <div style="text-align: center; margin-top: 8px;">contain</div>
    </div>
    
    <div>
      <Image 
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" 
        alt="风景图片" 
        objectFit="fill"
        style="width: 200px; height: 200px;"
      />
      <div style="text-align: center; margin-top: 8px;">fill</div>
    </div>
  </div>
</template>
```
:::

## 加载状态

图片加载过程中会显示加载状态。

:::demo 图片加载状态。
```vue
<template>
  <Image 
    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
    alt="大图加载" 
    style="width: 300px; height: 300px;"
  />
</template>
```
:::

## 错误状态

图片加载失败时会显示错误状态。

:::demo 图片加载失败状态。
```vue
<template>
  <Image 
    src="https://invalid-url-that-does-not-exist.com/image.jpg" 
    alt="无效图片" 
    style="width: 200px; height: 200px;"
  />
</template>
```
:::

## 无图片

未提供 src 时会显示占位符。

:::demo 无图片时的占位符状态。
```vue
<template>
  <Image style="width: 200px; height: 200px;" />
</template>
```
:::

## API

### Image Props

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址 | `string` | `-` |
| alt | 图片替代文本 | `string` | `-` |
| objectFit | 图片填充方式 | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` |
| class | 自定义类名 | `string` | `-` |
| style | 自定义样式 | `object` | `-` |

### Image Events

| 事件名 | 描述 | 参数 |
| --- | --- | --- |
| load | 图片加载成功时触发 | `(event: Event)` |
| error | 图片加载失败时触发 | `(event: Event)` |

### Image Slots

Image 组件不支持插槽。