# DatePicker

日期选择器用于选择年、月、日。

## 基本用法

基础的日期选择器使用方式。

:::demo
```vue
<template>
  <div style="width: 300px;">
    <DatePicker 
      v-model:value="dateValue" 
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DatePicker } from '@apron-design/vue-next'

const dateValue = ref({})

const handleChange = (value) => {
  console.log('Selected date:', value)
}
</script>
```
:::

## 禁用状态

通过 `disabled` 属性禁用日期选择器。

:::demo
```vue
<template>
  <div style="width: 300px;">
    <DatePicker disabled />
  </div>
</template>

<script setup lang="ts">
import { DatePicker } from '@apron-design/vue-next'
</script>
```
:::

## 加载状态

通过 `loading` 属性显示加载状态。

:::demo
```vue
<template>
  <div style="width: 300px;">
    <DatePicker loading />
  </div>
</template>

<script setup lang="ts">
import { DatePicker } from '@apron-design/vue-next'
</script>
```
:::

## 自定义年份范围

通过 `year-start` 和 `year-end` 属性自定义年份范围。

:::demo
```vue
<template>
  <div style="width: 300px;">
    <DatePicker 
      v-model:value="dateValue"
      :year-start="2020"
      :year-end="2025"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DatePicker } from '@apron-design/vue-next'

const dateValue = ref({})
</script>
```
:::

## 自定义标签

通过 `year-label`、`month-label` 和 `day-label` 属性自定义标签。

:::demo
```vue
<template>
  <div style="width: 300px;">
    <DatePicker 
      v-model:value="dateValue"
      year-label="年份"
      month-label="月份"
      day-label="日期"
      :month-labels="['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DatePicker } from '@apron-design/vue-next'

const dateValue = ref({})
</script>
```
:::

## 默认值

通过 `default-value` 属性设置默认值。

:::demo
```vue
<template>
  <div style="width: 300px;">
    <DatePicker 
      :default-value="{ year: 2023, month: 6, day: 15 }"
    />
  </div>
</template>

<script setup lang="ts">
import { DatePicker } from '@apron-design/vue-next'
</script>
```
:::

## API

### DatePicker Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选中的值 | `DatePickerValue` | - |
| defaultValue | 默认选中的值（非受控） | `DatePickerValue` | `{}` |
| disabled | 是否禁用 | boolean | false |
| loading | 是否加载中 | boolean | false |
| inflow | 是否使用 inflow 模式（撑开容器） | boolean | false |
| yearStart | 年份范围起始 | number | 2020 |
| yearEnd | 年份范围结束 | number | 2030 |
| yearLabel | 年标签 | string | '年' |
| monthLabel | 月标签 | string | '月' |
| dayLabel | 日标签 | string | '日' |
| monthLabels | 月份标签列表 | string[] | ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'] |
| class | 自定义类名 | string | - |

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
