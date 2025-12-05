# DatePicker 日期选择

用于选择年、月、日。

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { DatePicker } from '@apron-design/vue'

const date = ref({})

const handleChange = (value) => {
  console.log('选中日期:', value)
}
</script>

<template>
  <DatePicker v-model="date" @change="handleChange" />
</template>
```

## 默认值

```vue
<script setup>
import { ref } from 'vue'

const date = ref({
  year: 2024,
  month: 6,
  day: 15
})
</script>

<template>
  <DatePicker v-model="date" />
</template>
```

## 自定义标签

```vue
<template>
  <DatePicker 
    year-label="Year" 
    month-label="Month" 
    day-label="Day"
    :month-labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
  />
</template>
```

## 自定义年份范围

```vue
<template>
  <DatePicker :year-start="2020" :year-end="2030" />
</template>
```

## 禁用状态

```vue
<template>
  <DatePicker disabled :model-value="{ year: 2024, month: 1, day: 1 }" />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue (v-model) | 选中的日期 | `DateValue` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| inflow | 内联模式 | `boolean` | `false` |
| yearStart | 年份起始值 | `number` | `1900` |
| yearEnd | 年份结束值 | `number` | `2100` |
| yearLabel | 年标签 | `string` | `'年'` |
| monthLabel | 月标签 | `string` | `'月'` |
| dayLabel | 日标签 | `string` | `'日'` |
| monthLabels | 月份显示文本 | `string[]` | `['1月', '2月', ...]` |

### DateValue

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| year | 年 | `number` |
| month | 月 | `number` |
| day | 日 | `number` |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 值变化时触发 | `(value: DateValue) => void` |
| change | 值变化时触发 | `(value: DateValue) => void` |
| openChange | 下拉框展开/收起时触发 | `(open: boolean) => void` |

