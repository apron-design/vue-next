---
title: DatePicker 日期选择器
group: 数据录入
order: 1
---

# DatePicker 日期选择器

用于选择日期的组件，支持年、月、日三级联动选择。

## 何时使用

当需要用户输入一个日期时使用，支持多种交互状态和自定义配置。

## 代码演示

### 基础用法

最简单的用法，适用于大多数场景。

:::demo
```vue
<template>
  <ad-date-picker 
    v-model:value="value" 
    @change="handleChange"
    :year-start="2020"
    :year-end="2030"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdDatePicker } from '@apron-design/vue-next'

const value = ref({})

const handleChange = (val: any) => {
  console.log('Date changed:', val)
}
</script>
```
:::

### 不同选择状态

展示日期选择器的不同选择状态。

:::demo
```vue
<template>
  <div style="display: flex; gap: 24px; flex-wrap: wrap;">
    <div>
      <h4>空状态</h4>
      <ad-date-picker />
    </div>
    <div>
      <h4>仅选择年份</h4>
      <ad-date-picker :default-value="{ year: 2024 }" />
    </div>
    <div>
      <h4>选择年月</h4>
      <ad-date-picker :default-value="{ year: 2024, month: 5 }" />
    </div>
    <div>
      <h4>完整日期</h4>
      <ad-date-picker :default-value="{ year: 2024, month: 3, day: 15 }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AdDatePicker } from '@apron-design/vue-next'
</script>
```
:::

### 加载状态

展示加载中的状态，可以有值或无值。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <h4>加载中（无值）</h4>
      <ad-date-picker loading />
    </div>
    <div>
      <h4>加载中（有值）</h4>
      <ad-date-picker :default-value="{ year: 2024, month: 3, day: 15 }" loading />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AdDatePicker } from '@apron-design/vue-next'
</script>
```
:::

### 禁用状态

禁用日期选择器，用户无法进行操作。

:::demo
```vue
<template>
  <div>
    <h4>禁用状态</h4>
    <ad-date-picker :default-value="{ year: 2024, month: 3, day: 15 }" disabled />
  </div>
</template>

<script setup lang="ts">
import { AdDatePicker } from '@apron-design/vue-next'
</script>
```
:::

### Inflow 模式

使用 inflow 模式，容器会在下拉框打开时自动扩展。

:::demo
```vue
<template>
  <div style="border: 1px solid #e4e4e7; border-radius: 12px; padding: 16px;">
    <p style="margin: 0 0 12px; color: #666;">
      容器将在下拉框打开时扩展
    </p>
    <ad-date-picker
      v-model:value="value"
      @change="handleChange"
      inflow
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdDatePicker } from '@apron-design/vue-next'

const value = ref({})

const handleChange = (val: any) => {
  console.log('Date changed:', val)
}
</script>
```
:::

### 自定义年份范围

可以自定义可选择的年份范围。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <h4>短范围 (2023-2025)</h4>
      <ad-date-picker :year-start="2023" :year-end="2025" />
    </div>
    <div>
      <h4>长范围 (2000-2050)</h4>
      <ad-date-picker :year-start="2000" :year-end="2050" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AdDatePicker } from '@apron-design/vue-next'
</script>
```
:::

### 自定义标签

可以自定义年、月、日的标签文本。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <h4>英文标签</h4>
      <ad-date-picker
        year-label="Year"
        month-label="Month"
        day-label="Day"
        :month-labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
      />
    </div>
    <div>
      <h4>中文标签（默认）</h4>
      <ad-date-picker />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AdDatePicker } from '@apron-design/vue-next'
</script>
```
:::

## API

### DatePicker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选中的值（受控模式） | `{ year?: number; month?: number; day?: number }` | - |
| defaultValue | 默认选中的值（非受控模式） | `{ year?: number; month?: number; day?: number }` | `{}` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| inflow | 是否使用 inflow 模式（撑开容器） | `boolean` | `false` |
| onChange | 选中值改变时的回调 | `(value: { year?: number; month?: number; day?: number }) => void` | - |
| onOpenChange | 下拉框展开/收起回调 | `(open: boolean) => void` | - |
| class | 自定义类名 | `string` | - |
| yearStart | 年份范围起始 | `number` | `2020` |
| yearEnd | 年份范围结束 | `number` | `2030` |
| yearLabel | 年标签 | `string` | `'年'` |
| monthLabel | 月标签 | `string` | `'月'` |
| dayLabel | 日标签 | `string` | `'日'` |
| monthLabels | 月份标签列表 | `string[]` | `['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']` |

### DatePicker Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:value | 值改变时触发（v-model:value） | `(value: DatePickerValue)` |
| change | 选中值改变时触发 | `(value: DatePickerValue)` |
| open-change | 下拉框展开/收起时触发 | `(open: boolean)` |

### DatePicker Types

```ts
interface DatePickerValue {
  year?: number
  month?: number
  day?: number
}
```
