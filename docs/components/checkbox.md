---
title: Checkbox 复选框
group: 数据录入
order: 1
---

# Checkbox 复选框

复选框用于在一组可选项中进行多项选择。

## 何时使用

- 需要在多个选项中选择一个或多个选项时
- 支持单独使用或组合使用
- 支持全选/反选等复杂交互

## 代码演示

### 基本用法

最简单的用法，展示可用、选中、禁用等状态。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <ad-checkbox>未选中状态</ad-checkbox>
    <ad-checkbox :checked="true" @change="() => {}">已选中状态</ad-checkbox>
    <ad-checkbox disabled>禁用状态</ad-checkbox>
    <ad-checkbox :checked="true" disabled @change="() => {}">选中且禁用状态</ad-checkbox>
  </div>
</template>

<script setup lang="ts">
import { AdCheckbox } from '@apron-design/vue-next'
</script>
```
:::

### 半选状态

通过 `indeterminate` 属性设置半选状态，常用于实现全选效果。

:::demo
```vue
<template>
  <ad-checkbox indeterminate @change="() => {}">
    半选状态
  </ad-checkbox>
</template>

<script setup lang="ts">
import { AdCheckbox } from '@apron-design/vue-next'
</script>
```
:::

### 受控组件

通过 `checked` 和 `@change` 实现受控组件。

:::demo
```vue
<template>
  <ad-checkbox :checked="checked" @change="setChecked">
    点击切换状态: {{ checked ? '已选中' : '未选中' }}
  </ad-checkbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdCheckbox } from '@apron-design/vue-next'

const checked = ref(false)

const setChecked = (value: boolean) => {
  checked.value = value
}
</script>
```
:::

### 文字点击

通过 `labelClickable` 属性控制点击文字是否可以激活复选框。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <ad-checkbox v-model:checked="checked1">
      默认状态（只能点击方框）
    </ad-checkbox>
    <ad-checkbox v-model:checked="checked2" label-clickable>
      可点击文字（点击文字也可以激活）
    </ad-checkbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdCheckbox } from '@apron-design/vue-next'

const checked1 = ref(false)
const checked2 = ref(false)
</script>
```
:::

## API

### Checkbox

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 是否选中（受控） | `boolean` | - |
| defaultChecked | 默认是否选中（非受控） | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| indeterminate | 是否为半选状态 | `boolean` | `false` |
| value | 复选框的值 | `string \| number` | - |
| onChange | 选中状态改变时的回调 | `(checked: boolean, e: Event) => void` | - |
| labelClickable | 点击文字部分是否可以激活复选框 | `boolean` | `false` |
| class | 自定义类名 | `string` | - |

### Checkbox Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:checked | 选中状态改变时触发（v-model:checked） | `(checked: boolean)` |
| change | 选中状态改变时触发 | `(checked: boolean, event: Event)` |

### Checkbox Slots

| 名称 | 说明 |
| --- | --- |
| default | 复选框标签内容 |
