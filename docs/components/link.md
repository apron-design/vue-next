# Link 链接

超链接组件，用于页面跳转。

## 基础用法

:::demo 基础的链接用法。
```vue
<template>
  <Link href="#">默认链接</Link>
</template>
```
:::

## 不同变种

使用 `variant` 属性来定义链接的样式变种。

:::demo 支持 `primary` 和 `secondary` 两种变种。
```vue
<template>
  <div style="display: flex; gap: 16px;">
    <Link href="#" variant="primary">Primary 链接</Link>
    <Link href="#" variant="secondary">Secondary 链接</Link>
  </div>
</template>
```
:::

## 下划线样式

使用 `underline` 属性控制下划线的显示方式。

:::demo 支持 `always`、`hover` 和 `never` 三种下划线样式。
```vue
<template>
  <div style="display: flex; gap: 16px;">
    <Link href="#" underline="always">始终有下划线</Link>
    <Link href="#" underline="hover">悬停时有下划线</Link>
    <Link href="#" underline="never">从不显示下划线</Link>
  </div>
</template>
```
:::

## 危险链接

使用 `danger` 属性将链接标记为危险操作。

:::demo 危险链接会以红色高亮显示。
```vue
<template>
  <div style="display: flex; gap: 16px;">
    <Link href="#" danger>危险链接</Link>
    <Link href="#" danger underline="always">危险链接 (带下划线)</Link>
  </div>
</template>
```
:::

## 在新窗口中打开

通过设置 `target="_blank"` 属性在新窗口中打开链接。

:::demo 在新窗口中打开链接，并添加安全相关的 `rel` 属性。
```vue
<template>
  <Link href="https://example.com" target="_blank" rel="noopener noreferrer">
    新窗口打开
  </Link>
</template>
```
:::

## 内联文本中的链接

链接可以很好地融入到普通文本中。

:::demo 链接在文本中的使用效果。
```vue
<template>
  <div>
    <span>
      这是一段包含
      <Link href="#" variant="primary">Primary 链接</Link>
      和
      <Link href="#" variant="secondary">Secondary 链接</Link>
      的文本。
    </span>
  </div>
</template>
```
:::

## API

### Link Props

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 链接变种 | `'primary' \| 'secondary'` | `'secondary'` |
| underline | 下划线显示方式 | `'always' \| 'hover' \| 'never'` | `'never'` |
| danger | 是否为危险链接（红色） | `boolean` | `false` |
| children | 子元素 | `string` | `-` |
| class | 自定义类名 | `string` | `-` |

### Link Slots

| 名称 | 描述 |
| --- | --- |
| default | 链接内容 |

### Link Events

支持所有原生 `<a>` 标签的事件。