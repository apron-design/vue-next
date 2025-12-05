# Select 选择器

下拉选择器。

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { Select } from '@apron-design/vue'

const value = ref('')

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]
</script>

<template>
  <Select v-model="value" :options="options" placeholder="请选择" />
</template>
```

## 禁用状态

```vue
<script setup>
const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
]
</script>

<template>
  <Select :options="options" disabled placeholder="禁用状态" />
</template>
```

## 禁用选项

通过 `disabled` 属性禁用某些选项。

```vue
<script setup>
import { ref } from 'vue'

const value = ref('')

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二（禁用）', value: '2', disabled: true },
  { label: '选项三', value: '3' },
]
</script>

<template>
  <Select v-model="value" :options="options" placeholder="请选择" />
</template>
```

## 加载状态

```vue
<template>
  <Select :options="[]" loading placeholder="加载中..." />
</template>
```

## 内联模式

使用 `inflow` 模式去除边框样式。

```vue
<script setup>
import { ref } from 'vue'

const value = ref('1')

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
]
</script>

<template>
  <span>当前选择：</span>
  <Select v-model="value" :options="options" inflow />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue (v-model) | 选中的值 | `string \| number` | - |
| options | 选项列表 | `SelectOption[]` | `[]` |
| placeholder | 占位文本 | `string` | `'请选择'` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| inflow | 内联模式（去除边框） | `boolean` | `false` |

### SelectOption

| 属性 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| label | 选项显示文本 | `string` | 是 |
| value | 选项值 | `string \| number` | 是 |
| disabled | 是否禁用 | `boolean` | 否 |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 选中值变化时触发 | `(value: string \| number) => void` |
| change | 选中值变化时触发 | `(value: string \| number) => void` |
| openChange | 下拉框展开/收起时触发 | `(open: boolean) => void` |

