# Pagination 分页

采用分页的形式分隔长列表。

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { Pagination } from '@apron-design/vue'

const current = ref(1)
</script>

<template>
  <Pagination v-model:current="current" :total="100" />
</template>
```

## 显示总数

```vue
<script setup>
import { ref } from 'vue'

const current = ref(1)
</script>

<template>
  <Pagination v-model:current="current" :total="500" show-total />
</template>
```

## 更多页码

```vue
<script setup>
import { ref } from 'vue'

const current = ref(1)
</script>

<template>
  <Pagination v-model:current="current" :total="1000" />
</template>
```

## 禁用状态

```vue
<template>
  <Pagination :current="3" :total="100" disabled />
</template>
```

## 自定义每页条数

```vue
<script setup>
import { ref } from 'vue'

const current = ref(1)
</script>

<template>
  <Pagination v-model:current="current" :total="200" :page-size="20" />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current (v-model) | 当前页码 | `number` | `1` |
| total | 数据总数 | `number` | `0` |
| pageSize | 每页条数 | `number` | `10` |
| showQuickJumper | 是否显示快速跳转（暂未实现） | `boolean` | `false` |
| showTotal | 是否显示总数 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:current | 页码变化时触发 | `(page: number) => void` |
| change | 页码变化时触发 | `(page: number, pageSize: number) => void` |

