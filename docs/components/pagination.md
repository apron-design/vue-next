# Pagination 分页

分页组件用于将大量数据分批展示，提升用户体验和页面性能。

## 何时使用

- 当数据量较大，需要分批展示时
- 需要提供快速跳转到指定页面的功能时
- 需要在不同页面间导航时

## 示例

### 基础用法

最简单的分页组件，适用于大多数场景。

:::demo
```vue
<template>
  <Pagination :count="100" :page-size="10" />
</template>

<script setup>
import { Pagination } from '@apron-design/vue-next'
</script>
```
:::

### 不同尺寸

通过 `size` 属性设置不同的尺寸：`large` (40px)、`default` (30px)、`small` (20px)。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">Large (40px)</p>
      <Pagination :count="100" :page-size="10" size="large" />
    </div>
    <div>
      <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">Default (30px)</p>
      <Pagination :count="100" :page-size="10" />
    </div>
    <div>
      <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">Small (20px)</p>
      <Pagination :count="100" :page-size="10" size="small" />
    </div>
  </div>
</template>

<script setup>
import { Pagination } from '@apron-design/vue-next'
</script>
```
:::

### 少量页面

当总页数少于 7 页时，会直接显示所有页码。

:::demo
```vue
<template>
  <Pagination :count="50" :page-size="10" />
</template>

<script setup>
import { Pagination } from '@apron-design/vue-next'
</script>
```
:::

### 大量页面

当总页数较多时，会自动折叠中间的页码，只显示关键页码。

:::demo
```vue
<template>
  <Pagination :count="500" :page-size="10" />
</template>

<script setup>
import { Pagination } from '@apron-design/vue-next'
</script>
```
:::

### 受控模式

通过 `current` 属性控制当前页码，并通过 `change` 事件监听页码变化。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
    <Pagination
      :count="200"
      :page-size="10"
      :current="current"
      @change="setCurrent"
    />
    <p style="margin: 0; color: #666; font-size: 14px;">
      当前页: {{ current }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Pagination } from '@apron-design/vue-next'

const current = ref(1)

const setCurrent = (page) => {
  current.value = page
}
</script>
```
:::

### 不同每页条数

通过 `pageSize` 属性设置每页显示的数据条数。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">每页 5 条 (100 条数据)</p>
      <Pagination :count="100" :page-size="5" />
    </div>
    <div>
      <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">每页 10 条 (100 条数据)</p>
      <Pagination :count="100" :page-size="10" />
    </div>
    <div>
      <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">每页 20 条 (100 条数据)</p>
      <Pagination :count="100" :page-size="20" />
    </div>
  </div>
</template>

<script setup>
import { Pagination } from '@apron-design/vue-next'
</script>
```
:::

### 从中间开始

通过 `defaultCurrent` 属性设置初始页码。

:::demo
```vue
<template>
  <Pagination :count="200" :page-size="10" :default-current="10" />
</template>

<script setup>
import { Pagination } from '@apron-design/vue-next'
</script>
```
:::

### 从末尾开始

设置初始页码为最后一页。

:::demo
```vue
<template>
  <Pagination :count="200" :page-size="10" :default-current="20" />
</template>

<script setup>
import { Pagination } from '@apron-design/vue-next'
</script>
```
:::

### 单页

当只有一页数据时，分页组件不会显示。

:::demo
```vue
<template>
  <Pagination :count="5" :page-size="10" />
</template>

<script setup>
import { Pagination } from '@apron-design/vue-next'
</script>
```
:::

### 禁用状态

通过 `disabled` 属性禁用分页组件。

:::demo
```vue
<template>
  <Pagination :count="100" :page-size="10" disabled />
</template>

<script setup>
import { Pagination } from '@apron-design/vue-next'
</script>
```
:::

### 配合表格使用

分页组件常与表格配合使用，实现数据的分页展示。

:::demo
```vue
<template>
  <div style="width: 500px;">
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
      <thead>
        <tr style="background: #f5f5f5;">
          <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e0e0e0;">ID</th>
          <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e0e0e0;">名称</th>
          <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e0e0e0;">状态</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in currentData" :key="item.id">
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">{{ item.id }}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">{{ item.name }}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">{{ item.status }}</td>
        </tr>
      </tbody>
    </table>
    <div style="display: flex; justify-content: flex-end;">
      <Pagination
        :count="totalData"
        :page-size="pageSize"
        :current="current"
        @change="setCurrent"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Pagination } from '@apron-design/vue-next'

const current = ref(1)
const pageSize = 5
const totalData = 23

const data = Array.from({ length: totalData }, (_, i) => ({
  id: i + 1,
  name: `项目 ${i + 1}`,
  status: ['进行中', '已完成', '待审核'][i % 3],
}))

const currentData = computed(() => {
  const start = (current.value - 1) * pageSize
  const end = current.value * pageSize
  return data.slice(start, end)
})

const setCurrent = (page) => {
  current.value = page
}
</script>
```
:::

### 深色模式

在深色模式下，分页组件会自动适配主题颜色。

:::demo
```vue
<template>
  <div
    data-prefers-color="dark"
    style="padding: 24px; background-color: #18181b; border-radius: 12px;"
  >
    <Pagination :count="200" :page-size="10" :default-current="5" />
  </div>
</template>

<script setup>
import { Pagination } from '@apron-design/vue-next'
</script>
```
:::

## API

### Pagination Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| count | 数据总数 | number | - |
| pageSize | 每页条数 | number | `10` |
| current | 当前页码（受控模式） | number | - |
| defaultCurrent | 默认当前页码（非受控模式） | number | `1` |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| disabled | 是否禁用 | boolean | `false` |
| class | 自定义类名 | string | - |

### Pagination Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:current | 页码改变时触发 | `(page: number)` |
| change | 页码改变时触发 | `(page: number)` |

## 注意事项

1. 当总页数小于等于 0 时，分页组件不会显示
2. 当总页数小于等于 7 时，会显示所有页码
3. 当总页数大于 7 时，会自动折叠中间的页码，只显示关键页码
4. 组件支持受控和非受控两种模式
5. 支持深色模式自动适配