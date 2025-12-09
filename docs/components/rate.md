---
title: Rate 评分
group: 数据录入
order: 7
---

# Rate 评分

评分组件，用于对事物进行评级操作。

## 何时使用

- 对评价进行展示
- 对事物进行快速评级操作
- 需要半星精度的评分场景

## 代码演示

### 基本用法

最简单的用法，适用于展示评分。

:::demo
```vue
<template>
  <Rate v-model:value="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Rate } from '@apron-design/vue-next'

const value = ref(3)
</script>
```
:::

### 展示模式

纯展示模式，不支持交互操作。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939;">空评分 (0 星)</h4>
      <Rate :value="0" />
    </div>
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939;">满分 (5 星)</h4>
      <Rate :value="5" />
    </div>
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939;">部分评分 (3.7 星)</h4>
      <Rate :value="3.7" show-value />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Rate } from '@apron-design/vue-next'
</script>
```
:::

### 设置模式

支持交互操作的设置模式，分为整星和半星两种精度。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939;">
        步进: 1 (整星)
      </h4>
      <Rate
        v-model:value="wholeValue"
        allow-control
        show-value
      />
    </div>
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939;">
        步进: 0.5 (半星)
      </h4>
      <Rate
        v-model:value="halfValue"
        allow-control
        allow-half
        show-value
      />
    </div>
    <p style="margin: 0; color: #666;">
      当前值: {{ halfValue }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Rate } from '@apron-design/vue-next'

const wholeValue = ref(2)
const halfValue = ref(2.5)
</script>
```
:::

### 非受控模式

使用 `defaultValue` 属性的非受控模式。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939;">
        非受控模式（使用 defaultValue）
      </h4>
      <Rate
        default-value="3"
        allow-control
        @change="val => console.log('Selected:', val)"
        show-value
      />
    </div>
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939;">
        非受控模式（半星）
      </h4>
      <Rate
        default-value="2.5"
        allow-control
        allow-half
        @change="val => console.log('Selected:', val)"
        show-value
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Rate } from '@apron-design/vue-next'
</script>
```
:::

### 禁用状态

禁用状态下的评分组件。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Rate :value="3" allow-control disabled show-value />
    <Rate :value="4.5" allow-control allow-half disabled show-value />
  </div>
</template>

<script setup lang="ts">
import { Rate } from '@apron-design/vue-next'
</script>
```
:::

### 不同星星数量

支持自定义星星数量。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <span style="color: #666; margin-right: 12px;">3 星:</span>
      <Rate :value="2" :count="3" show-value />
    </div>
    <div>
      <span style="color: #666; margin-right: 12px;">5 星:</span>
      <Rate :value="3.5" :count="5" show-value />
    </div>
    <div>
      <span style="color: #666; margin-right: 12px;">10 星:</span>
      <Rate :value="7" :count="10" show-value />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Rate } from '@apron-design/vue-next'
</script>
```
:::

### 交互示例

完整的交互示例，支持重置和设为最大值。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <h4 style="margin: 0; color: #393939;">点击评分:</h4>
    <Rate
      v-model:value="value"
      allow-control
      allow-half
      show-value
    />
    <div style="display: flex; gap: 8px;">
      <button @click="value = 0">重置</button>
      <button @click="value = 5">满分</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Rate, Button } from '@apron-design/vue-next'

const value = ref(0)
</script>
```
:::

### 暗色模式

评分组件支持暗色模式。

:::demo
```vue
<template>
  <div
    data-prefers-color="dark"
    style="padding: 32px; background-color: #18181b; border-radius: 12px; display: flex; flex-direction: column; gap: 24px;"
  >
    <div>
      <h4 style="margin: 0 0 12px 0; color: #a1a1aa;">展示模式</h4>
      <div style="display: flex; gap: 32px;">
        <Rate :value="0" />
        <Rate :value="5" />
        <Rate :value="3.7" show-value />
      </div>
    </div>

    <div>
      <h4 style="margin: 0 0 12px 0; color: #a1a1aa;">设置模式</h4>
      <Rate :value="3" allow-control show-value />
    </div>

    <div>
      <h4 style="margin: 0 0 12px 0; color: #a1a1aa;">禁用状态</h4>
      <Rate :value="4" allow-control disabled show-value />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Rate } from '@apron-design/vue-next'
</script>
```
:::

## API

### Rate Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值（受控模式） | number | - |
| defaultValue | 默认值（非受控模式） | number | `0` |
| count | 星星总数 | number | `5` |
| allowControl | 是否允许交互（设置模式） | boolean | `false` |
| allowHalf | 是否允许半星（仅设置模式有效） | boolean | `false` |
| disabled | 是否禁用 | boolean | `false` |
| showValue | 是否显示数值 | boolean | `false` |
| class | 自定义类名 | string | - |

### Rate Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:value | 值改变时触发（v-model） | `(value: number)` |
| change | 值改变时触发 | `(value: number)` |

## 注意事项

1. 在展示模式下（`allowControl=false`），组件仅用于显示评分
2. 在设置模式下（`allowControl=true`），组件支持用户交互
3. 支持半星精度（`allowHalf=true`），默认为整星
4. 支持自定义星星数量（`count` 属性）
5. 支持暗色模式自动适配
6. 提供了完整的键盘交互支持