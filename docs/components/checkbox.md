---
title: Checkbox 复选框
group: 数据录入
order: 7
---

# Checkbox 复选框

复选框用于在一组选项中进行多项选择。

## 代码演示

### 基本用法

基础的复选框使用方法。

:::demo
```vue
<template>
  <div>
    <AdCheckbox v-model:checked="checked1">选项一</AdCheckbox>
    <br /><br />
    <AdCheckbox v-model:checked="checked2">选项二（默认选中）</AdCheckbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdCheckbox } from '@apron-design/vue-next'

const checked1 = ref(false)
const checked2 = ref(true)
</script>
```
:::

## 要用状态

通过 `disabled` 属性禁用复选框。

:::demo
```vue
<template>
  <div>
    <AdCheckbox disabled>禁用选项</AdCheckbox>
    <br /><br />
    <AdCheckbox checked disabled>选中且禁用</AdCheckbox>
  </div>
</template>

<script setup lang="ts">
import { AdCheckbox } from '@apron-design/vue-next'
</script>
```
:::

## 半选状态

通过 `indeterminate` 属性设置半选状态。

:::demo
```vue
<template>
  <div>
    <AdCheckbox indeterminate>半选状态</AdCheckbox>
    <br /><br />
    <AdCheckbox indeterminate disabled>半选且禁用</AdCheckbox>
  </div>
</template>

<script setup lang="ts">
import { AdCheckbox } from '@apron-design/vue-next'
</script>
```
:::

## 可点击标签

通过 `labelClickable` 属性使标签可点击。

:::demo
```vue
<template>
  <div>
    <AdCheckbox label-clickable>标签可点击（默认不可点击）</AdCheckbox>
    <br /><br />
    <AdCheckbox label-clickable>
      标签中有链接：<a href="https://example.com" target="_blank">点击这里</a>
    </AdCheckbox>
  </div>
</template>

<script setup lang="ts">
import { AdCheckbox } from '@apron-design/vue-next'
</script>
```
:::

## 受控与非受控模式

支持受控和非受控两种模式。

:::demo
```vue
<template>
  <div>
    <p>受控模式：</p>
    <AdCheckbox :checked="controlledChecked" @change="handleControlledChange">
      受控选项
    </AdCheckbox>
    <p>当前状态：{{ controlledChecked ? '选中' : '未选中' }}</p>
    
    <br />
    
    <p>非受控模式：</p>
    <AdCheckbox default-checked @change="handleUncontrolledChange">
      非受控选项
    </AdCheckbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdCheckbox } from '@apron-design/vue-next'

const controlledChecked = ref(true)

const handleControlledChange = (checked: boolean) => {
  controlledChecked.value = checked
  console.log('受控模式变化:', checked)
}

const handleUncontrolledChange = (checked: boolean) => {
  console.log('非受控模式变化:', checked)
}
</script>
```
:::

## API

### Checkbox Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 是否选中（受控模式） | boolean | - |
| defaultChecked | 默认是否选中（非受控模式） | boolean | false |
| disabled | 是否禁用 | boolean | false |
| indeterminate | 是否为半选状态 | boolean | false |
| value | 复选框的值 | string \| number | - |
| labelClickable | 点击文字部分是否可以激活复选框 | boolean | false |
| class | 自定义类名 | string | - |

### Checkbox Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:checked | 选中状态改变时触发（v-model:checked） | `(checked: boolean)` |
| change | 选中状态改变时触发 | `(checked: boolean, event: Event)` |

### Checkbox Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| focus | 使复选框获得焦点 | - |
| blur | 使复选框失去焦点 | - |

### Checkbox Slots

| 名称 | 说明 |
| --- | --- |
| default | 复选框标签内容 |