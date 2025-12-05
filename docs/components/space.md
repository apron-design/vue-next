# Space 间距

设置组件之间的间距。

## 基础用法

```vue
<script setup>
import { Space, Button } from '@apron-design/vue'
</script>

<template>
  <Space>
    <Button>按钮一</Button>
    <Button>按钮二</Button>
    <Button>按钮三</Button>
  </Space>
</template>
```

## 间距大小

通过 `size` 设置间距大小，可选值为 `small`、`middle`、`large` 或自定义数字。

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Space size="small">
      <Button>Small</Button>
      <Button>Small</Button>
      <Button>Small</Button>
    </Space>
    <Space size="middle">
      <Button>Middle</Button>
      <Button>Middle</Button>
      <Button>Middle</Button>
    </Space>
    <Space size="large">
      <Button>Large</Button>
      <Button>Large</Button>
      <Button>Large</Button>
    </Space>
    <Space :size="32">
      <Button>Custom</Button>
      <Button>Custom</Button>
      <Button>Custom</Button>
    </Space>
  </div>
</template>
```

## 垂直方向

```vue
<template>
  <Space orientation="vertical">
    <Button block>按钮一</Button>
    <Button block>按钮二</Button>
    <Button block>按钮三</Button>
  </Space>
</template>
```

## 对齐方式

```vue
<template>
  <Space align="center" style="background: #f5f5f5; padding: 16px;">
    <Button>Normal</Button>
    <span style="padding: 32px 16px; background: #4C9EEA; color: white;">Tall</span>
    <Button>Normal</Button>
  </Space>
</template>
```

## 自动换行

```vue
<template>
  <Space wrap style="width: 300px; padding: 16px; background: #f5f5f5;">
    <Button v-for="i in 10" :key="i">按钮 {{ i }}</Button>
  </Space>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | 对齐方式 | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'` | `'center'` |
| orientation | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 间距大小 | `'small' \| 'middle' \| 'large' \| number` | `'middle'` |
| wrap | 是否自动换行（仅水平方向） | `boolean` | `false` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 间距内的元素 |

