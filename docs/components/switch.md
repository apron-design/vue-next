---
title: Switch 开关
group: 数据录入
order: 1
---

# Switch 开关

Switch 组件用于在两个状态之间进行切换，常用于设置选项的开启或关闭。

## 何时使用

- 需要在两个互斥状态之间切换时
- 表单中需要用户进行布尔值选择时
- 快速开关某个功能或设置时

## 示例

### 基础用法

最简单的 Switch 组件使用方式。使用 `v-model` 进行双向绑定。

:::demo
```vue
<template>
  <ad-switch v-model="checked" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdSwitch } from '@apron-design/vue-next'

const checked = ref(false)
</script>
```
:::

### 尺寸

Switch 组件支持三种尺寸。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start;">
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939;">Default (84 × 40)</h4>
      <div style="display: flex; gap: 24px;">
        <ad-switch size="default" v-model="checked1" />
        <ad-switch size="default" v-model="checked2" />
      </div>
    </div>
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939;">Small (62 × 30)</h4>
      <div style="display: flex; gap: 24px;">
        <ad-switch size="small" v-model="checked3" />
        <ad-switch size="small" v-model="checked4" />
      </div>
    </div>
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939;">Mini (42 × 20)</h4>
      <div style="display: flex; gap: 24px;">
        <ad-switch size="mini" v-model="checked5" />
        <ad-switch size="mini" v-model="checked6" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdSwitch } from '@apron-design/vue-next'

const checked1 = ref(false)
const checked2 = ref(true)
const checked3 = ref(false)
const checked4 = ref(true)
const checked5 = ref(false)
const checked6 = ref(true)
</script>
```
:::

### 变种

Switch 组件支持多种变种样式。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start;">
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939;">Default / Primary</h4>
      <div style="display: flex; gap: 24px;">
        <ad-switch variant="default" v-model="checked1" />
        <ad-switch variant="default" v-model="checked2" />
        <ad-switch variant="primary" v-model="checked3" />
      </div>
    </div>
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939;">Secondary</h4>
      <div style="display: flex; gap: 24px;">
        <ad-switch variant="secondary" v-model="checked4" />
        <ad-switch variant="secondary" v-model="checked5" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdSwitch } from '@apron-design/vue-next'

const checked1 = ref(false)
const checked2 = ref(true)
const checked3 = ref(true)
const checked4 = ref(false)
const checked5 = ref(true)
</script>
```
:::

### 状态

Switch 组件支持多种状态。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start;">
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939;">Off</h4>
      <ad-switch v-model="checked1" />
    </div>
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939;">On</h4>
      <ad-switch v-model="checked2" />
    </div>
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939;">Disabled Off</h4>
      <ad-switch disabled v-model="checked3" />
    </div>
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939;">Disabled On</h4>
      <ad-switch disabled v-model="checked4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdSwitch } from '@apron-design/vue-next'

const checked1 = ref(false)
const checked2 = ref(true)
const checked3 = ref(false)
const checked4 = ref(true)
</script>
```
:::

### 自定义颜色

可以自定义开关的背景颜色。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start;">
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939;">Custom Checked Color (Green)</h4>
      <ad-switch v-model="checked1" checked-color="#22c55e" />
    </div>
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939;">Custom Unchecked Color (Pink)</h4>
      <ad-switch v-model="checked2" unchecked-color="#fce7f3" />
    </div>
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939;">Both Custom Colors</h4>
      <div style="display: flex; gap: 24px;">
        <ad-switch v-model="checked3" unchecked-color="#fce7f3" checked-color="#ec4899" />
        <ad-switch v-model="checked4" unchecked-color="#fce7f3" checked-color="#ec4899" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdSwitch } from '@apron-design/vue-next'

const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)
const checked4 = ref(true)
</script>
```
:::

### 受控模式

Switch 组件支持受控模式，使用 `v-model` 进行双向绑定。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
    <ad-switch v-model="checked" />
    <p style="margin: 0; color: #666;">
      Status: {{ checked ? 'ON' : 'OFF' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdSwitch } from '@apron-design/vue-next'

const checked = ref(false)
</script>
```
:::

### 所有尺寸和变种

展示所有尺寸和变种的组合。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 32px;">
    <div v-for="variant in variants" :key="variant">
      <h4 style="margin: 0 0 16px 0; color: #393939; text-transform: capitalize;">
        {{ variant }}
      </h4>
      <div style="display: flex; gap: 48px; align-items: center;">
        <div v-for="size in sizes" :key="size" style="display: flex; gap: 16px; align-items: center;">
          <ad-switch :size="size" :variant="variant" v-model="switchStates[`${variant}-${size}-off`]" />
          <ad-switch :size="size" :variant="variant" v-model="switchStates[`${variant}-${size}-on`]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdSwitch } from '@apron-design/vue-next'

const variants = ['default', 'primary', 'secondary']
const sizes = ['default', 'small', 'mini']

const switchStates = ref<Record<string, boolean>>({
  'default-default-off': false,
  'default-default-on': true,
  'default-small-off': false,
  'default-small-on': true,
  'default-mini-off': false,
  'default-mini-on': true,
  'primary-default-off': false,
  'primary-default-on': true,
  'primary-small-off': false,
  'primary-small-on': true,
  'primary-mini-off': false,
  'primary-mini-on': true,
  'secondary-default-off': false,
  'secondary-default-on': true,
  'secondary-small-off': false,
  'secondary-small-on': true,
  'secondary-mini-off': false,
  'secondary-mini-on': true,
})
</script>
```
:::

### 非受控模式

使用 defaultChecked 属性的非受控模式。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
    <h4 style="margin: 0; color: #393939;">非受控模式（使用 defaultChecked）</h4>
    <ad-switch
      :default-checked="true"
      @change="(checked) => console.log('Switch changed:', checked)"
    />
  </div>
</template>

<script setup lang="ts">
import { AdSwitch } from '@apron-design/vue-next'
</script>
```
:::

## API

### Switch Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 是否开启（受控模式，v-model） | `boolean` | - |
| checked | 是否开启（受控模式，v-model:checked） | `boolean` | - |
| defaultChecked | 默认是否开启（非受控模式） | `boolean` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 尺寸 | `'default' \| 'small' \| 'mini'` | `'default'` |
| variant | 变种 | `'default' \| 'primary' \| 'secondary'` | `'default'` |
| checkedColor | 自定义开启时的颜色 | `string` | - |
| uncheckedColor | 自定义关闭时的颜色 | `string` | - |
| class | 自定义类名 | `string` | - |
| id | 自定义 ID | `string` | - |

### Switch Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 状态改变时触发（v-model） | `(checked: boolean)` |
| update:checked | 状态改变时触发（v-model:checked） | `(checked: boolean)` |
| change | 状态改变时触发 | `(checked: boolean, event: Event)` |

## 注意事项

1. Switch 组件用于在两个状态之间进行切换
2. 推荐使用 `v-model` 进行双向绑定（受控模式）：
   ```vue
   <ad-switch v-model="checked" />
   ```
3. 也可以使用 `v-model:checked` 进行双向绑定：
   ```vue
   <ad-switch v-model:checked="checked" />
   ```
4. 通过 `defaultChecked` 属性设置默认状态（非受控模式）
5. 通过 `size` 属性设置尺寸：
   - `'default'`：默认尺寸（84 × 40）
   - `'small'`：小尺寸（62 × 30）
   - `'mini'`：迷你尺寸（42 × 20）
6. 通过 `variant` 属性设置变种：
   - `'default'`：默认变种
   - `'primary'`：主色调变种
   - `'secondary'`：次色调变种
7. 通过 `checkedColor` 和 `uncheckedColor` 属性可以自定义开关的颜色
8. 在受控模式下，使用 `v-model` 或 `v-model:checked` 进行双向绑定
9. 在非受控模式下，可以使用 `defaultChecked` 属性设置初始状态
10. Switch 组件支持键盘操作（Tab 键聚焦，空格键切换）
