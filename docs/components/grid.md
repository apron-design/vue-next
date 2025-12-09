# Grid 栅格

24 栅格系统。

## 设计理念

在多数业务情况下，Apron Design 需要在设计区域内解决大量信息收纳的问题。因此在 12 栅格系统的基础上，我们将整个设计建议区域按照 24 等分的原则进行划分。

划分之后的信息区块我们称之为『盒子』。建议横向排列的盒子数量最多四个，最少一个。『盒子』在整个屏幕上占比见上图。设计部分基于盒子的单位定制盒子内部的排版布局，以保证整体设计的一致性。

## 基础用法

从堆叠到水平排列。

使用单一的一组 Row 和 Col 栅格组件，就可以创建一个基本的栅格系统，所有列（Col）必须放在 Row 内。

:::demo 基础栅格用法。
```vue
<template>
  <Row>
    <Col :span="12">col-12</Col>
    <Col :span="12">col-12</Col>
  </Row>
  <Row>
    <Col :span="8">col-8</Col>
    <Col :span="8">col-8</Col>
    <Col :span="8">col-8</Col>
  </Row>
  <Row>
    <Col :span="6">col-6</Col>
    <Col :span="6">col-6</Col>
    <Col :span="6">col-6</Col>
    <Col :span="6">col-6</Col>
  </Row>
</template>
```
:::

## 区块间隔

栅格常常需要和间隔进行配合，你可以使用 Row 的 gutter 属性，我们推荐使用 (16+8n)px 作为栅格间隔(n 是自然数)。

如果要支持响应式，可以写成 `{ xs: 8, sm: 16, md: 24, lg: 32 }`。

:::demo 栅格间隔用法。
```vue
<template>
  <Row :gutter="16">
    <Col :span="6">
      <div class="grid-demo">col-6</div>
    </Col>
    <Col :span="6">
      <div class="grid-demo">col-6</div>
    </Col>
    <Col :span="6">
      <div class="grid-demo">col-6</div>
    </Col>
    <Col :span="6">
      <div class="grid-demo">col-6</div>
    </Col>
  </Row>
</template>

<style scoped>
.grid-demo {
  background: #f0f0f0;
  border: 1px solid #d9d9d9;
  padding: 16px 0;
  text-align: center;
}
</style>
```
:::

## 左右偏移

使用 offset 可以将列向右侧偏移。

例如，offset={4} 将元素向右偏移了 4 个列（column）的宽度。

:::demo 列偏移用法。
```vue
<template>
  <Row :gutter="16">
    <Col :span="8">
      <div class="grid-demo">col-8</div>
    </Col>
    <Col :span="8" :offset="8">
      <div class="grid-demo">col-8</div>
    </Col>
  </Row>
  <Row :gutter="16">
    <Col :span="6" :offset="6">
      <div class="grid-demo">col-6 col-offset-6</div>
    </Col>
    <Col :span="6" :offset="6">
      <div class="grid-demo">col-6 col-offset-6</div>
    </Col>
  </Row>
</template>

<style scoped>
.grid-demo {
  background: #f0f0f0;
  border: 1px solid #d9d9d9;
  padding: 16px 0;
  text-align: center;
}
</style>
```
:::

## Flex 布局

通过设置 Row 的 justify 属性，可以定义子元素的排布方式。

:::demo Flex 布局用法。
```vue
<template>
  <p>sub-element align left</p>
  <Row justify="start">
    <Col :span="4">
      <div class="grid-demo">col-4</div>
    </Col>
    <Col :span="4">
      <div class="grid-demo">col-4</div>
    </Col>
    <Col :span="4">
      <div class="grid-demo">col-4</div>
    </Col>
    <Col :span="4">
      <div class="grid-demo">col-4</div>
    </Col>
  </Row>

  <p>sub-element align center</p>
  <Row justify="center">
    <Col :span="4">
      <div class="grid-demo">col-4</div>
    </Col>
    <Col :span="4">
      <div class="grid-demo">col-4</div>
    </Col>
    <Col :span="4">
      <div class="grid-demo">col-4</div>
    </Col>
    <Col :span="4">
      <div class="grid-demo">col-4</div>
    </Col>
  </Row>

  <p>sub-element align right</p>
  <Row justify="end">
    <Col :span="4">
      <div class="grid-demo">col-4</div>
    </Col>
    <Col :span="4">
      <div class="grid-demo">col-4</div>
    </Col>
    <Col :span="4">
      <div class="grid-demo">col-4</div>
    </Col>
    <Col :span="4">
      <div class="grid-demo">col-4</div>
    </Col>
  </Row>

  <p>sub-element monospaced arrangement</p>
  <Row justify="space-between">
    <Col :span="4">
      <div class="grid-demo">col-4</div>
    </Col>
    <Col :span="4">
      <div class="grid-demo">col-4</div>
    </Col>
    <Col :span="4">
      <div class="grid-demo">col-4</div>
    </Col>
    <Col :span="4">
      <div class="grid-demo">col-4</div>
    </Col>
  </Row>

  <p>sub-element align full</p>
  <Row justify="space-around">
    <Col :span="4">
      <div class="grid-demo">col-4</div>
    </Col>
    <Col :span="4">
      <div class="grid-demo">col-4</div>
    </Col>
    <Col :span="4">
      <div class="grid-demo">col-4</div>
    </Col>
    <Col :span="4">
      <div class="grid-demo">col-4</div>
    </Col>
  </Row>
</template>

<style scoped>
.grid-demo {
  background: #f0f0f0;
  border: 1px solid #d9d9d9;
  padding: 16px 0;
  text-align: center;
}
</style>
```
:::

## 响应式布局

参照 Bootstrap 的 [响应式设计](http://getbootstrap.com/css/#grid-media-queries)，预设六个响应尺寸：xs sm md lg xl xxl。

:::demo 响应式布局用法。
```vue
<template>
  <Row>
    <Col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">
      <div class="grid-demo">Col</div>
    </Col>
    <Col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">
      <div class="grid-demo">Col</div>
    </Col>
    <Col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">
      <div class="grid-demo">Col</div>
    </Col>
  </Row>
</template>

<style scoped>
.grid-demo {
  background: #f0f0f0;
  border: 1px solid #d9d9d9;
  padding: 16px 0;
  text-align: center;
}
</style>
```
:::

## API

### Row Props

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gutter | 栅格间隔，可以是数字或数组 [水平间距, 垂直间距] | `number \| [number, number] \| { xs?: number \| [number, number]; sm?: number \| [number, number]; md?: number \| [number, number]; lg?: number \| [number, number]; xl?: number \| [number, number]; xxl?: number \| [number, number]; }` | `0` |
| justify | 水平排列方式 | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `'start'` |
| align | 垂直对齐方式 | `'top' \| 'middle' \| 'bottom' \| 'stretch'` | `'top'` |
| wrap | 是否自动换行 | `boolean` | `true` |
| class | 自定义类名 | `string` | `-` |
| style | 自定义样式 | `object` | `-` |

### Col Props

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| span | 栅格占位格数，为 0 时相当于 display: none | `number \| string` | `-` |
| offset | 栅格左侧的间隔格数 | `number` | `-` |
| order | 栅格顺序 | `number` | `-` |
| push | 栅格向右移动格数 | `number` | `-` |
| pull | 栅格向左移动格数 | `number` | `-` |
| flex | flex 布局属性 | `string \| number` | `-` |
| xs | xs 屏幕 < 576px | `number \| string \| { span?: number \| string; offset?: number; order?: number; push?: number; pull?: number; }` | `-` |
| sm | sm 屏幕 ≥ 576px | `number \| string \| { span?: number \| string; offset?: number; order?: number; push?: number; pull?: number; }` | `-` |
| md | md 屏幕 ≥ 768px | `number \| string \| { span?: number \| string; offset?: number; order?: number; push?: number; pull?: number; }` | `-` |
| lg | lg 屏幕 ≥ 992px | `number \| string \| { span?: number \| string; offset?: number; order?: number; push?: number; pull?: number; }` | `-` |
| xl | xl 屏幕 ≥ 1200px | `number \| string \| { span?: number \| string; offset?: number; order?: number; push?: number; pull?: number; }` | `-` |
| xxl | xxl 屏幕 ≥ 1600px | `number \| string \| { span?: number \| string; offset?: number; order?: number; push?: number; pull?: number; }` | `-` |
| class | 自定义类名 | `string` | `-` |
| style | 自定义样式 | `object` | `-` |