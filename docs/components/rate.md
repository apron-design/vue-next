# Rate 评分

评分组件。

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { Rate } from '@apron-design/vue'

const value = ref(3)
</script>

<template>
  <Rate v-model="value" />
</template>
```

## 半星

设置 `allowHalf` 支持选择半星。

```vue
<script setup>
import { ref } from 'vue'

const value = ref(2.5)
</script>

<template>
  <Rate v-model="value" allow-half />
</template>
```

## 自定义数量

通过 `count` 设置星星数量。

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Rate :count="3" :model-value="2" />
    <Rate :count="10" :model-value="7" />
  </div>
</template>
```

## 只读

```vue
<template>
  <Rate :model-value="4" disabled />
</template>
```

## 允许清除

默认情况下，再次点击相同的星数会清除。设置 `allowClear` 为 `false` 可禁用此行为。

```vue
<template>
  <Rate :model-value="3" :allow-clear="false" />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue (v-model) | 当前分数 | `number` | `0` |
| count | 星星数量 | `number` | `5` |
| disabled | 是否禁用 | `boolean` | `false` |
| allowHalf | 是否允许半星 | `boolean` | `false` |
| allowClear | 是否允许清除 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 分数变化时触发 | `(value: number) => void` |
| change | 分数变化时触发 | `(value: number) => void` |

