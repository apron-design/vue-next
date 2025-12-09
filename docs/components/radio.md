# Radio

单选框用于在多个选项中选择一个。

## 基本用法

基础的单选框使用方式。

:::demo
```vue
<template>
  <Radio v-model:checked="checked">单选框</Radio>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Radio } from '@apron-design/vue-next'

const checked = ref(false)
</script>
```
:::

## 禁用状态

通过 `disabled` 属性禁用单选框。

:::demo
```vue
<template>
  <div>
    <Radio disabled>禁用选项</Radio>
    <br /><br />
    <Radio checked disabled>选中且禁用</Radio>
  </div>
</template>

<script setup lang="ts">
import { Radio } from '@apron-design/vue-next'
</script>
```
:::

## 可点击标签

通过 `labelClickable` 属性使标签可点击。

:::demo
```vue
<template>
  <div>
    <Radio label-clickable>标签可点击（默认不可点击）</Radio>
    <br /><br />
    <Radio label-clickable>
      标签中有链接：<a href="https://example.com" target="_blank">点击这里</a>
    </Radio>
  </div>
</template>

<script setup lang="ts">
import { Radio } from '@apron-design/vue-next'
</script>
```
:::

## 单选框组

通过 `RadioGroup` 组件管理一组单选框。

:::demo
```vue
<template>
  <div>
    <p>当前选中值：{{ groupValue }}</p>
    <RadioGroup v-model:value="groupValue" name="fruit">
      <Radio value="apple">苹果</Radio>
      <Radio value="banana">香蕉</Radio>
      <Radio value="orange">橙子</Radio>
    </RadioGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Radio, RadioGroup } from '@apron-design/vue-next'

const groupValue = ref('apple')
</script>
```
:::

## 垂直排列

通过 `direction` 属性设置垂直排列。

:::demo
```vue
<template>
  <RadioGroup v-model:value="groupValue" direction="vertical">
    <Radio value="option1">选项1</Radio>
    <Radio value="option2">选项2</Radio>
    <Radio value="option3">选项3</Radio>
  </RadioGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Radio, RadioGroup } from '@apron-design/vue-next'

const groupValue = ref('option1')
</script>
```
:::

## 选项配置

通过 `options` 属性配置选项。

:::demo
```vue
<template>
  <div>
    <p>当前选中值：{{ groupValue }}</p>
    <RadioGroup 
      v-model:value="groupValue" 
      :options="options"
      direction="vertical"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup } from '@apron-design/vue-next'

const groupValue = ref('apple')

const options = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange', disabled: true },
  { label: '葡萄', value: 'grape' }
]
</script>
```
:::

## API

### Radio Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 是否选中（受控模式） | boolean | - |
| defaultChecked | 默认是否选中（非受控模式） | boolean | false |
| disabled | 是否禁用 | boolean | false |
| value | 单选框的值 | string \| number | - |
| labelClickable | 点击文字部分是否可以激活单选框 | boolean | false |
| name | name 属性 | string | - |
| class | 自定义类名 | string | - |

### Radio Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:checked | 选中状态改变时触发（v-model:checked） | `(checked: boolean)` |
| change | 选中状态改变时触发 | `(checked: boolean, event: Event)` |

### Radio Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| focus | 使单选框获得焦点 | - |
| blur | 使单选框失去焦点 | - |

### RadioGroup Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选中的值 | RadioValueType | - |
| defaultValue | 默认选中的值（非受控模式） | RadioValueType | - |
| options | 选项配置 | (RadioOptionType \| string \| number)[] | - |
| disabled | 是否禁用整组 | boolean | false |
| direction | 排列方向 | 'horizontal' \| 'vertical' | 'horizontal' |
| name | RadioGroup 的 name 属性 | string | - |
| labelClickable | 点击文字部分是否可以激活单选框 | boolean | true |
| class | 自定义类名 | string | - |

### RadioGroup Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:value | 选中值改变时触发（v-model:value） | `(value: RadioValueType)` |
| change | 选中值改变时触发 | `(value: RadioValueType)` |

### Radio Types

```ts
type RadioValueType = string | number

interface RadioOptionType {
  label: string
  value: RadioValueType
  disabled?: boolean
}
```
