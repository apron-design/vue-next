# Input 输入框

通过鼠标或键盘输入字符。

## 基础用法

:::demo 基础的输入框用法。
```vue
<template>
  <Input v-model:value="value" placeholder="请输入内容" />
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
```
:::

## 禁用状态

使用 `disabled` 属性禁用输入框。

:::demo 禁用输入框。
```vue
<template>
  <Input v-model:value="value" placeholder="请输入内容" disabled />
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
```
:::

## 可清空

使用 `clearable` 属性即可得到一个可清空的输入框。

:::demo 显示清除按钮。
```vue
<template>
  <Input v-model:value="value" placeholder="请输入内容" clearable />
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
```
:::

## 密码框

使用 `type="password"` 来创建密码输入框，并可以切换可见状态。

:::demo 密码输入框。
```vue
<template>
  <Input v-model:value="value" type="password" placeholder="请输入密码" />
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
```
:::

## 前缀和后缀

在输入框上添加前缀或后缀图标。

:::demo 使用 prepend 和 append 属性添加前后缀内容。
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Input v-model:value="value1" placeholder="请输入内容" prepend="https://" />
    <Input v-model:value="value2" placeholder="请输入内容" append=".com" />
    <Input v-model:value="value3" placeholder="请输入内容" prepend="用户名：" />
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

## 插槽前缀和后缀

使用插槽来自定义前缀和后缀内容。

:::demo 使用 prepend 和 append 插槽自定义前后缀。
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Input v-model:value="value1" placeholder="请输入内容">
      <template #prepend>
        <span>https://</span>
      </template>
    </Input>
    <Input v-model:value="value2" placeholder="请输入内容">
      <template #append>
        <span>.com</span>
      </template>
    </Input>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const value1 = ref('')
const value2 = ref('')
</script>
```
:::

## API

### Input Props

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 输入框类型 | `'text' \| 'password' \| 'email' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'` |
| value | 当前值 (v-model) | `string \| number` | `-` |
| defaultValue | 默认值 | `string \| number` | `-` |
| clearable | 是否显示清除按钮 | `boolean` | `false` |
| prepend | 输入框前置内容 | `string` | `-` |
| append | 输入框后置内容 | `string` | `-` |
| disabled | 是否禁用 | `boolean` | `false` |
| class | 自定义类名 | `string` | `-` |

### Input Slots

| 名称 | 描述 |
| --- | --- |
| prepend | 前置内容 |
| append | 后置内容 |

### Input Events

| 事件名 | 描述 | 参数 |
| --- | --- | --- |
| update:value | 值改变时触发 | `(value: string \| number)` |
| change | 输入框内容变化时触发 | `(event: Event)` |
| focus | 输入框获得焦点时触发 | `(event: FocusEvent)` |
| blur | 输入框失去焦点时触发 | `(event: FocusEvent)` |
| clear | 点击清空按钮时触发 | `-` |

### Input Methods

通过 ref 可以获取到 Input 实例并调用实例方法。

| 方法名 | 描述 | 参数 |
| --- | --- | --- |
| focus | 使 input 获取焦点 | `-` |
| blur | 使 input 失去焦点 | `-` |
| select | 选中 input 中的文字 | `-` |