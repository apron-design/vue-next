# Radio 单选框

在一组可选项中进行单项选择。

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { Radio } from '@apron-design/vue'

const selected = ref('1')
</script>

<template>
  <div class="demo-row">
    <Radio v-model="selected" value="1">选项一</Radio>
    <Radio v-model="selected" value="2">选项二</Radio>
  </div>
</template>
```

## 禁用状态

```vue
<template>
  <div class="demo-row">
    <Radio disabled>禁用未选中</Radio>
    <Radio disabled :model-value="true">禁用已选中</Radio>
  </div>
</template>
```

## 单选框组

使用 `RadioGroup` 组件管理一组单选框。

```vue
<script setup>
import { ref } from 'vue'
import { Radio, RadioGroup } from '@apron-design/vue'

const size = ref('middle')
</script>

<template>
  <RadioGroup v-model="size">
    <Radio value="small">小</Radio>
    <Radio value="middle">中</Radio>
    <Radio value="large">大</Radio>
  </RadioGroup>
  <p>选中: {{ size }}</p>
</template>
```

## 垂直排列

```vue
<script setup>
import { ref } from 'vue'

const plan = ref('free')
</script>

<template>
  <RadioGroup v-model="plan" direction="vertical">
    <Radio value="free">免费版</Radio>
    <Radio value="pro">专业版</Radio>
    <Radio value="enterprise">企业版</Radio>
  </RadioGroup>
</template>
```

## 禁用部分选项

```vue
<script setup>
import { ref } from 'vue'

const value = ref('online')
</script>

<template>
  <RadioGroup v-model="value">
    <Radio value="online">在线</Radio>
    <Radio value="offline" disabled>离线</Radio>
    <Radio value="busy">忙碌</Radio>
  </RadioGroup>
</template>
```

## API

### Radio Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue (v-model) | 是否选中 | `boolean` | `false` |
| value | 选中时的值（用于 RadioGroup） | `string \| number` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| name | 原生 name 属性 | `string` | - |
| labelClickable | 点击文字是否触发选择 | `boolean` | `true` |

### Radio Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 选中状态变化时触发 | `(checked: boolean) => void` |
| change | 选中状态变化时触发 | `(checked: boolean) => void` |

### RadioGroup Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue (v-model) | 选中的值 | `string \| number` | - |
| disabled | 是否禁用所有选项 | `boolean` | `false` |
| direction | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| name | 原生 name 属性 | `string` | - |
| labelClickable | 点击文字是否触发选择 | `boolean` | `true` |

### RadioGroup Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 选中值变化时触发 | `(value: string \| number) => void` |
| change | 选中值变化时触发 | `(value: string \| number) => void` |

