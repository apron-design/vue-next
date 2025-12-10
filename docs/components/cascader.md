---
title: Cascader 级联选择器
group: 数据录入
order: 6
---

# Cascader 级联选择

级联选择框，用于多级联动选择。

## 何时使用

- 需要从一组相关联的数据集合进行选择，例如省市区、公司部门等
- 支持多级联动选择
- 支持异步加载数据

## 代码演示

### 基本用法

最简单的用法，展示省市区三级联动选择。

:::demo
```vue
<template>
  <div style="width: 300px;">
    <ad-cascader 
      v-model:value="value" 
      :options="options" 
      placeholder="请选择地区"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdCascader } from '@apron-design/vue-next'

const value = ref([])

const options = [
  {
    value: 'zhejiang',
    label: '浙江省',
    children: [
      {
        value: 'hangzhou',
        label: '杭州市',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'yuhang', label: '余杭区' },
        ],
      },
      {
        value: 'ningbo',
        label: '宁波市',
        children: [
          { value: 'haishu', label: '海曙区' },
          { value: 'jiangbei', label: '江北区' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏省',
    children: [
      {
        value: 'nanjing',
        label: '南京市',
        children: [
          { value: 'xuanwu', label: '玄武区' },
          { value: 'qinhuai', label: '秦淮区' },
        ],
      },
    ],
  },
]

const handleChange = (val: any, selectedOptions: any) => {
  console.log('Selected value:', val)
  console.log('Selected options:', selectedOptions)
}
</script>
```
:::

### 禁用状态

通过 `disabled` 属性禁用级联选择器。

:::demo
```vue
<template>
  <div style="width: 300px;">
    <ad-cascader 
      :options="options" 
      :default-value="['option1', 'option1-1']"
      placeholder="禁用状态"
      disabled
    />
  </div>
</template>

<script setup lang="ts">
import { AdCascader } from '@apron-design/vue-next'

const options = [
  {
    value: 'option1',
    label: 'Option 1',
    children: [
      { value: 'option1-1', label: 'Option 1-1' },
      { value: 'option1-2', label: 'Option 1-2' },
    ],
  },
  {
    value: 'option2',
    label: 'Option 2',
    disabled: true,
  },
]
</script>
```
:::

### 加载状态

通过 `loading` 属性显示加载状态。

:::demo
```vue
<template>
  <div style="width: 300px;">
    <ad-cascader 
      :options="options" 
      placeholder="请选择"
      loading
    />
  </div>
</template>

<script setup lang="ts">
import { AdCascader } from '@apron-design/vue-next'

const options = [
  {
    value: 'option1',
    label: 'Option 1',
    children: [
      { value: 'option1-1', label: 'Option 1-1' },
    ],
  },
]
</script>
```
:::

### 选择即改变

通过 `changeOnSelect` 属性设置在选择过程中就触发 `change` 事件，而不是只在选择叶子节点时触发。

:::demo
```vue
<template>
  <div style="width: 300px;">
    <ad-cascader 
      v-model:value="value" 
      :options="options" 
      placeholder="请选择地区"
      change-on-select
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdCascader } from '@apron-design/vue-next'

const value = ref([])

const options = [
  {
    value: 'zhejiang',
    label: '浙江省',
    children: [
      {
        value: 'hangzhou',
        label: '杭州市',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'yuhang', label: '余杭区' },
        ],
      },
    ],
  },
]

const handleChange = (val: any) => {
  console.log('Selected value:', val)
}
</script>
```
:::

### 自定义分隔符

通过 `separator` 属性自定义分隔符。

:::demo
```vue
<template>
  <div style="width: 300px;">
    <ad-cascader 
      v-model:value="value" 
      :options="options" 
      separator=" → "
      placeholder="请选择"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdCascader } from '@apron-design/vue-next'

const value = ref(['zhejiang', 'hangzhou', 'xihu'])

const options = [
  {
    value: 'zhejiang',
    label: '浙江省',
    children: [
      {
        value: 'hangzhou',
        label: '杭州市',
        children: [
          { value: 'xihu', label: '西湖区' },
        ],
      },
    ],
  },
]
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
    <ad-cascader
      v-model:value="value"
      :options="options"
      @change="handleChange"
      inflow
      placeholder="请选择地区"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdCascader } from '@apron-design/vue-next'

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

const handleChange = (val: any) => {
  console.log('Selected value:', val)
}
</script>
```
:::

## API

### Cascader

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选中的值路径（受控） | `(string \| number)[]` | - |
| defaultValue | 默认选中的值路径（非受控） | `(string \| number)[]` | `[]` |
| options | 选项列表 | `CascaderOption[]` | `[]` |
| placeholder | 占位文本 | `string` | `'Placeholder goes here'` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| inflow | 是否使用 inflow 模式（撑开容器） | `boolean` | `false` |
| onChange | 选中值改变时的回调 | `(value: (string \| number)[], selectedOptions: CascaderOption[]) => void` | - |
| onOpenChange | 下拉框展开/收起回调 | `(open: boolean) => void` | - |
| separator | 值分隔符，用于显示 | `string` | `' / '` |
| changeOnSelect | 是否在选择过程中触发 onChange（而非只在选择叶子节点时） | `boolean` | `false` |
| class | 自定义类名 | `string` | - |

### Cascader Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:value | 值改变时触发（v-model） | `(value: CascaderValueType)` |
| change | 选中值改变时触发 | `(value: CascaderValueType, selectedOptions: CascaderOption[])` |
| openChange | 下拉框展开/收起时触发 | `(open: boolean)` |

### CascaderOption

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 选项标签 | `string` | - |
| value | 选项值 | `string \| number` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| children | 子选项 | `CascaderOption[]` | - |