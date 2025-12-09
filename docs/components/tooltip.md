# Tooltip 文字提示

简单的文字提示气泡框，在鼠标悬停时显示。

## 基础用法

使用默认插槽作为触发元素，使用 `content` 属性或 `content` 插槽设置提示内容。

```vue
<template>
  <a-tooltip content="这是提示文字">
    <a-button>悬浮显示提示</a-button>
  </a-tooltip>
</template>
```

## 不同位置

Tooltip 总是在触发元素上方显示，并带有向下的箭头指向触发元素。

```vue
<template>
  <a-space>
    <a-tooltip content="提示文字">
      <a-button>上边</a-button>
    </a-tooltip>
  </a-space>
</template>
```

## 自定义内容

可以通过 `content` 插槽自定义提示内容。

```vue
<template>
  <a-tooltip>
    <a-button>自定义内容</a-button>
    <template #content>
      <div>这是自定义内容</div>
      <div>可以包含任意 HTML</div>
    </template>
  </a-tooltip>
</template>
```

## API

### Tooltip 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 提示内容 | `string \| VNode` | `''` |
| className | 自定义类名 | `string` | `''` |

### Tooltip 插槽

| 名称 | 说明 |
| --- | --- |
| default | 触发元素 |
| content | 提示内容 |

### Tooltip 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开提示 | - |
| close | 关闭提示 | - |