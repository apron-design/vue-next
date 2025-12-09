# Select 选择器

用于从一组选项中选择一个或多个值的下拉选择器。

## 基础用法

基础的选择器用法。

:::demo
```vue
<template>
  <a-select v-model="value" placeholder="请选择">
    <a-option value="option1">选项1</a-option>
    <a-option value="option2">选项2</a-option>
    <a-option value="option3">选项3</a-option>
  </a-select>
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
```
:::

## 禁用状态

选择器不可用状态。

:::demo
```vue
<template>
  <a-select v-model="value" disabled placeholder="请选择">
    <a-option value="option1">选项1</a-option>
    <a-option value="option2">选项2</a-option>
    <a-option value="option3">选项3</a-option>
  </a-select>
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
```
:::

## 可清空

可清空已选择的内容。

:::demo
```vue
<template>
  <a-select v-model="value" clearable placeholder="请选择">
    <a-option value="option1">选项1</a-option>
    <a-option value="option2">选项2</a-option>
    <a-option value="option3">选项3</a-option>
  </a-select>
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
```
:::

## 多选

支持多选操作。

:::demo
```vue
<template>
  <a-select v-model="value" multiple placeholder="请选择">
    <a-option value="option1">选项1</a-option>
    <a-option value="option2">选项2</a-option>
    <a-option value="option3">选项3</a-option>
    <a-option value="option4">选项4</a-option>
  </a-select>
</template>

<script setup>
import { ref } from 'vue'
const value = ref([])
</script>
```
:::

## 自定义尺寸

支持自定义尺寸。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <a-select v-model="value1" size="small" placeholder="小尺寸">
      <a-option value="option1">选项1</a-option>
      <a-option value="option2">选项2</a-option>
    </a-select>
    
    <a-select v-model="value2" size="medium" placeholder="默认尺寸">
      <a-option value="option1">选项1</a-option>
      <a-option value="option2">选项2</a-option>
    </a-select>
    
    <a-select v-model="value3" size="large" placeholder="大尺寸">
      <a-option value="option1">选项1</a-option>
      <a-option value="option2">选项2</a-option>
    </a-select>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>
```
:::

## 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| modelValue / v-model | 绑定值 | string / number / boolean / Array | — | — |
| placeholder | 占位文字 | string | — | 请选择 |
| disabled | 是否禁用 | boolean | — | false |
| clearable | 是否可以清空选项 | boolean | — | false |
| multiple | 是否多选 | boolean | — | false |
| size | 尺寸 | string | small / medium / large | medium |

## 事件

| 事件名 | 说明 | 回调参数 |
| ---- | ---- | ---- |
| change | 选中值发生变化时触发 | 选中项的值 |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | — |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |

## 插槽

| 插槽名 | 说明 |
| ---- | ---- |
| default | 自定义选项内容 |
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |

## Option 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| value | 选项的值 | string / number / boolean | — | — |
| label | 选项标签 | string | — | — |
| disabled | 是否禁用该选项 | boolean | — | false |