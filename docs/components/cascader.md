# Cascader

级联选择器用于从一组相关联的数据集合中进行选择。

## 基本用法

基础的级联选择器。

:::demo
```vue
<template>
  <div style="width: 300px;">
    <Cascader 
      v-model:value="value" 
      :options="options" 
      placeholder="请选择"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Cascader } from '@apron-design/vue-next'

const value = ref([])

const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          {
            value: 'xihu',
            label: '西湖',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          {
            value: 'zhonghuamen',
            label: '中华门',
          },
        ],
      },
    ],
  },
]

const handleChange = (value, selectedOptions) => {
  console.log('Selected value:', value)
  console.log('Selected options:', selectedOptions)
}
</script>
```
:::

## 禁用状态

通过 `disabled` 属性禁用级联选择器。

:::demo
```vue
<template>
  <div style="width: 300px;">
    <Cascader 
      :options="options" 
      placeholder="禁用状态"
      disabled
    />
  </div>
</template>

<script setup lang="ts">
import { Cascader } from '@apron-design/vue-next'

const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
      },
    ],
  },
]
</script>
```
:::

## 加载状态

通过 `loading` 属性显示加载状态。

:::demo
```vue
<template>
  <div style="width: 300px;">
    <Cascader 
      :options="options" 
      placeholder="加载中..."
      loading
    />
  </div>
</template>

<script setup lang="ts">
import { Cascader } from '@apron-design/vue-next'

const options = []
</script>
```
:::

## 自定义分隔符

通过 `separator` 属性自定义分隔符。

:::demo
```vue
<template>
  <div style="width: 300px;">
    <Cascader 
      v-model:value="value" 
      :options="options" 
      separator=" > "
      placeholder="请选择"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Cascader } from '@apron-design/vue-next'

const value = ref([])

const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          {
            value: 'xihu',
            label: '西湖',
          },
        ],
      },
    ],
  },
]
</script>
```
:::

## API

### Cascader Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选中的值路径 | `CascaderValueType` | - |
| defaultValue | 默认选中的值路径（非受控） | `CascaderValueType` | [] |
| options | 选项列表 | `CascaderOption[]` | [] |
| placeholder | 占位文本 | string | '请选择' |
| disabled | 是否禁用 | boolean | false |
| loading | 是否加载中 | boolean | false |
| inflow | 是否使用 inflow 模式（撑开容器） | boolean | false |
| separator | 值分隔符，用于显示 | string | ' / ' |
| class | 自定义类名 | string | - |

### Cascader Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:value | 值改变时触发 | `(value: CascaderValueType)` |
| change | 选中值改变时触发 | `(value: CascaderValueType, selectedOptions: CascaderOption[])` |

### Cascader Types

```ts
type CascaderValueType = (string | number)[]

interface CascaderOption {
  label: string
  value: string | number
  disabled?: boolean
  children?: CascaderOption[]
}
```
