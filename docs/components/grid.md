# Grid 栅格

24 栅格系统，用于快速创建页面布局。

## 基础用法

```vue
<script setup>
import { Row, Col } from '@apron-design/vue'
</script>

<template>
  <Row :gutter="16">
    <Col :span="12">
      <div style="background: #4C9EEA; color: white; padding: 16px; text-align: center;">
        col-12
      </div>
    </Col>
    <Col :span="12">
      <div style="background: #6DAEEF; color: white; padding: 16px; text-align: center;">
        col-12
      </div>
    </Col>
  </Row>
  
  <Row :gutter="16" style="margin-top: 16px;">
    <Col :span="8">
      <div style="background: #4C9EEA; color: white; padding: 16px; text-align: center;">
        col-8
      </div>
    </Col>
    <Col :span="8">
      <div style="background: #6DAEEF; color: white; padding: 16px; text-align: center;">
        col-8
      </div>
    </Col>
    <Col :span="8">
      <div style="background: #4C9EEA; color: white; padding: 16px; text-align: center;">
        col-8
      </div>
    </Col>
  </Row>
</template>
```

## 区块间隔

通过 `gutter` 设置列之间的间隔，支持数组形式 `[水平间隔, 垂直间隔]`。

```vue
<template>
  <Row :gutter="[16, 16]">
    <Col :span="6"><div class="grid-content">col-6</div></Col>
    <Col :span="6"><div class="grid-content">col-6</div></Col>
    <Col :span="6"><div class="grid-content">col-6</div></Col>
    <Col :span="6"><div class="grid-content">col-6</div></Col>
    <Col :span="6"><div class="grid-content">col-6</div></Col>
    <Col :span="6"><div class="grid-content">col-6</div></Col>
    <Col :span="6"><div class="grid-content">col-6</div></Col>
    <Col :span="6"><div class="grid-content">col-6</div></Col>
  </Row>
</template>

<style>
.grid-content {
  background: #4C9EEA;
  color: white;
  padding: 16px;
  text-align: center;
}
</style>
```

## 偏移

使用 `offset` 设置列的偏移。

```vue
<template>
  <Row :gutter="16">
    <Col :span="8"><div class="grid-content">col-8</div></Col>
    <Col :span="8" :offset="8"><div class="grid-content">col-8 offset-8</div></Col>
  </Row>
</template>
```

## 对齐方式

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Row :gutter="16" justify="start">
      <Col :span="4"><div class="grid-content">col-4</div></Col>
      <Col :span="4"><div class="grid-content">col-4</div></Col>
    </Row>
    <Row :gutter="16" justify="center">
      <Col :span="4"><div class="grid-content">col-4</div></Col>
      <Col :span="4"><div class="grid-content">col-4</div></Col>
    </Row>
    <Row :gutter="16" justify="end">
      <Col :span="4"><div class="grid-content">col-4</div></Col>
      <Col :span="4"><div class="grid-content">col-4</div></Col>
    </Row>
    <Row :gutter="16" justify="space-between">
      <Col :span="4"><div class="grid-content">col-4</div></Col>
      <Col :span="4"><div class="grid-content">col-4</div></Col>
    </Row>
  </div>
</template>
```

## 响应式布局

参照 Bootstrap 的响应式设计，预设了五个响应尺寸：`xs`、`sm`、`md`、`lg`、`xl`、`xxl`。

```vue
<template>
  <Row :gutter="16">
    <Col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
      <div class="grid-content">responsive</div>
    </Col>
    <Col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
      <div class="grid-content">responsive</div>
    </Col>
    <Col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
      <div class="grid-content">responsive</div>
    </Col>
    <Col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
      <div class="grid-content">responsive</div>
    </Col>
  </Row>
</template>
```

## API

### Row Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gutter | 栅格间隔 | `number \| [number, number]` | `0` |
| justify | 水平对齐方式 | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `'start'` |
| align | 垂直对齐方式 | `'top' \| 'middle' \| 'bottom' \| 'stretch'` | `'top'` |
| wrap | 是否自动换行 | `boolean` | `true` |

### Col Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| span | 栅格占位格数 | `number` | - |
| offset | 栅格左侧偏移格数 | `number` | - |
| push | 栅格向右移动格数 | `number` | - |
| pull | 栅格向左移动格数 | `number` | - |
| order | 排列顺序 | `number` | - |
| flex | flex 布局属性 | `string \| number` | - |
| xs | `<576px` 响应式栅格 | `number \| ColSize` | - |
| sm | `≥576px` 响应式栅格 | `number \| ColSize` | - |
| md | `≥768px` 响应式栅格 | `number \| ColSize` | - |
| lg | `≥992px` 响应式栅格 | `number \| ColSize` | - |
| xl | `≥1200px` 响应式栅格 | `number \| ColSize` | - |
| xxl | `≥1600px` 响应式栅格 | `number \| ColSize` | - |

### ColSize

```ts
interface ColSize {
  span?: number
  offset?: number
  order?: number
  push?: number
  pull?: number
}
```

