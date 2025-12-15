---
title: Pagination 分页
group: 导航组件
order: 4
---

# Pagination 分页

分页组件用于将大量数据分割成多个页面，提升用户体验和页面性能。

## 何时使用

- 当数据量较大，需要分批展示时
- 需要提供数据浏览功能时
- 与表格或其他数据展示组件配合使用时

## 示例

### 基础用法

最基本的分页组件，只需要指定数据总数和每页条数。

:::demo
```vue
<template>
  <ad-pagination :count="100" :page-size="10" />
</template>

<script setup lang="ts">
import { AdPagination } from '@apron-design/vue-next'
</script>
```
:::

### 不同尺寸

分页组件支持三种尺寸：大、默认、小。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">Large (40px)</p>
      <ad-pagination :count="100" :page-size="10" size="large" />
    </div>
    <div>
      <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">Default (30px)</p>
      <ad-pagination :count="100" :page-size="10" />
    </div>
    <div>
      <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">Small (20px)</p>
      <ad-pagination :count="100" :page-size="10" size="small" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AdPagination } from '@apron-design/vue-next'
</script>
```
:::

### 少量页码

当总页数少于7页时，会直接显示所有页码。

:::demo
```vue
<template>
  <ad-pagination :count="50" :page-size="10" />
</template>

<script setup lang="ts">
import { AdPagination } from '@apron-design/vue-next'
</script>
```
:::

### 大量页码

当总页数较多时，分页器会自动折叠中间的页码，只显示必要的页码和省略号。

:::demo
```vue
<template>
  <ad-pagination :count="500" :page-size="10" />
</template>

<script setup lang="ts">
import { AdPagination } from '@apron-design/vue-next'
</script>
```
:::

### 受控模式

通过 `v-model:current` 来控制当前页码。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
    <ad-pagination
      :count="200"
      :page-size="10"
      v-model:current="current"
    />
    <p style="margin: 0; color: #666; font-size: 14px;">
      当前页: {{ current }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdPagination } from '@apron-design/vue-next'

const current = ref(1)
</script>
```
:::

### 不同每页条数

可以根据需要设置不同的每页条数。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">每页 5 条 (100 条数据)</p>
      <ad-pagination :count="100" :page-size="5" />
    </div>
    <div>
      <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">每页 10 条 (100 条数据)</p>
      <ad-pagination :count="100" :page-size="10" />
    </div>
    <div>
      <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">每页 20 条 (100 条数据)</p>
      <ad-pagination :count="100" :page-size="20" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AdPagination } from '@apron-design/vue-next'
</script>
```
:::

### 从中间页开始

可以通过 `defaultCurrent` 设置默认的起始页码。

:::demo
```vue
<template>
  <ad-pagination :count="200" :page-size="10" :default-current="10" />
</template>

<script setup lang="ts">
import { AdPagination } from '@apron-design/vue-next'
</script>
```
:::

### 从末页开始

设置默认页码为最后一页。

:::demo
```vue
<template>
  <ad-pagination :count="200" :page-size="10" :default-current="20" />
</template>

<script setup lang="ts">
import { AdPagination } from '@apron-design/vue-next'
</script>
```
:::

### 单页情况

当数据总量小于等于每页条数时，不会显示分页器。

:::demo
```vue
<template>
  <ad-pagination :count="5" :page-size="10" />
</template>

<script setup lang="ts">
import { AdPagination } from '@apron-design/vue-next'
</script>
```
:::

### 禁用状态

通过 `disabled` 属性禁用分页器的所有操作。

:::demo
```vue
<template>
  <ad-pagination :count="100" :page-size="10" disabled />
</template>

<script setup lang="ts">
import { AdPagination } from '@apron-design/vue-next'
</script>
```
:::

### 与表格配合使用

分页组件常与表格组件一起使用，用于分页展示表格数据。

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
      <ad-pagination
        :count="totalData"
        :page-size="pageSize"
        v-model:current="current"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { AdPagination } from '@apron-design/vue-next'

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
</script>
```
:::

### 深色模式

在深色模式下，分页器会自动适配主题颜色。

:::demo
```vue
<template>
  <div
    data-prefers-color="dark"
    style="padding: 24px; background-color: #18181b; border-radius: 12px;"
  >
    <ad-pagination :count="200" :page-size="10" :default-current="5" />
  </div>
</template>

<script setup lang="ts">
import { AdPagination } from '@apron-design/vue-next'
</script>
```
:::

## API

### Pagination Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| count | 数据总数 | `number` | - |
| pageSize | 每页条数 | `number` | `10` |
| current / v-model:current | 当前页码（受控模式） | `number` | - |
| defaultCurrent | 默认当前页码（非受控模式） | `number` | `1` |
| size | 尺寸 | `'large'` \| `'default'` \| `'small'` | `'default'` |
| disabled | 是否禁用 | `boolean` | `false` |
| class | 自定义类名 | `string` | - |

### Pagination Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:current | 页码改变时触发（v-model） | `(page: number)` |
| change | 页码改变时触发 | `(page: number)` |

## 注意事项

1. 当数据总量小于等于每页条数时，不会显示分页器
2. 分页器会根据当前页码自动折叠中间的页码，保持最多显示7个页码按钮
3. 在受控模式下，使用 `v-model:current` 进行双向绑定是最推荐的方式
4. 在非受控模式下，可以通过 `defaultCurrent` 设置初始页码
5. 分页器支持键盘操作，可以通过 Tab 键聚焦，Enter 或空格键选择页码
6. 在暗色模式下，分页器会自动适配主题颜色
