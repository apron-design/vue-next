# Switch 开关

Switch 组件用于在两个状态之间进行切换，常用于设置选项的开启或关闭。

## 何时使用

- 需要在两个互斥状态之间切换时
- 表单中需要用户进行布尔值选择时
- 快速开关某个功能或设置时

## 示例

### 基础用法

最简单的 Switch 组件使用方式。

:::demo
```vue
<template>
  <a-switch />
</template>
```
:::

### 尺寸

Switch 组件支持三种尺寸。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start">
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939">Default (84 × 40)</h4>
      <div style="display: flex; gap: 24px">
        <a-switch size="default" />
        <a-switch size="default" default-checked />
      </div>
    </div>
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939">Small (62 × 30)</h4>
      <div style="display: flex; gap: 24px">
        <a-switch size="small" />
        <a-switch size="small" default-checked />
      </div>
    </div>
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939">Mini (42 × 20)</h4>
      <div style="display: flex; gap: 24px">
        <a-switch size="mini" />
        <a-switch size="mini" default-checked />
      </div>
    </div>
  </div>
</template>
```
:::

### 变种

Switch 组件支持多种变种样式。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start">
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939">Default / Primary</h4>
      <div style="display: flex; gap: 24px">
        <a-switch variant="default" />
        <a-switch variant="default" default-checked />
        <a-switch variant="primary" default-checked />
      </div>
    </div>
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939">Secondary</h4>
      <div style="display: flex; gap: 24px">
        <a-switch variant="secondary" />
        <a-switch variant="secondary" default-checked />
      </div>
    </div>
  </div>
</template>
```
:::

### 状态

Switch 组件支持多种状态。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start">
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939">Off</h4>
      <a-switch />
    </div>
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939">On</h4>
      <a-switch default-checked />
    </div>
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939">Disabled Off</h4>
      <a-switch disabled />
    </div>
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939">Disabled On</h4>
      <a-switch disabled default-checked />
    </div>
  </div>
</template>
```
:::

### 自定义颜色

可以自定义开关的背景颜色。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start">
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939">Custom Checked Color (Green)</h4>
      <a-switch default-checked checked-color="#22c55e" />
    </div>
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939">Custom Unchecked Color (Pink)</h4>
      <a-switch unchecked-color="#fce7f3" />
    </div>
    <div>
      <h4 style="margin: 0 0 12px 0; color: #393939">Both Custom Colors</h4>
      <div style="display: flex; gap: 24px">
        <a-switch unchecked-color="#fce7f3" checked-color="#ec4899" />
        <a-switch unchecked-color="#fce7f3" checked-color="#ec4899" default-checked />
      </div>
    </div>
  </div>
</template>
```
:::

### 交互式示例

Switch 组件支持受控模式。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start">
    <a-switch :checked="checked" @update:checked="setChecked" />
    <p style="margin: 0; color: #666">
      Status: {{ checked ? 'ON' : 'OFF' }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const checked = ref(false)
const setChecked = (val) => {
  checked.value = val
}
</script>
```
:::

### 所有尺寸和变种

展示所有尺寸和变种的组合。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 32px">
    <div v-for="variant in variants" :key="variant">
      <h4 style="margin: 0 0 16px 0; color: #393939; text-transform: capitalize">
        {{ variant }}
      </h4>
      <div style="display: flex; gap: 48px; align-items: center">
        <div v-for="size in sizes" :key="size" style="display: flex; gap: 16px; align-items: center">
          <a-switch :size="size" :variant="variant" />
          <a-switch :size="size" :variant="variant" default-checked />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const variants = ['default', 'primary', 'secondary']
const sizes = ['default', 'small', 'mini']
</script>
```
:::

### 非受控模式

使用 defaultChecked 属性的非受控模式。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start">
    <h4 style="margin: 0; color: #393939">非受控模式（使用 default-checked）</h4>
    <a-switch
      default-checked
      @change="handleChange"
    />
  </div>
</template>

<script setup>
const handleChange = (checked) => {
  console.log('Switch changed:', checked)
}
</script>
```
:::

### 暗色模式

Switch 组件在暗色模式下会自动适配主题颜色。

:::demo
```vue
<template>
  <div
    data-theme="dark"
    style="
      padding: 32px;
      background-color: #18181b;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    "
  >
    <div>
      <h4 style="margin: 0 0 12px 0; color: #a1a1aa">Default / Primary</h4>
      <div style="display: flex; gap: 24px">
        <a-switch />
        <a-switch default-checked />
      </div>
    </div>

    <div>
      <h4 style="margin: 0 0 12px 0; color: #a1a1aa">Secondary</h4>
      <div style="display: flex; gap: 24px">
        <a-switch variant="secondary" />
        <a-switch variant="secondary" default-checked />
      </div>
    </div>

    <div>
      <h4 style="margin: 0 0 12px 0; color: #a1a1aa">Disabled</h4>
      <div style="display: flex; gap: 24px">
        <a-switch disabled />
        <a-switch disabled default-checked />
      </div>
    </div>

    <div>
      <h4 style="margin: 0 0 12px 0; color: #a1a1aa">All Sizes</h4>
      <div style="display: flex; gap: 24px; align-items: center">
        <a-switch size="default" default-checked />
        <a-switch size="small" default-checked />
        <a-switch size="mini" default-checked />
      </div>
    </div>
  </div>
</template>
```
:::

## 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| checked | 是否开启（受控模式） | boolean | — | — |
| defaultChecked | 默认是否开启（非受控模式） | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| size | 尺寸 | string | default / small / mini | default |
| variant | 变种 | string | default / primary / secondary | default |
| checkedColor | 自定义开启时的颜色 | string | — | — |
| uncheckedColor | 自定义关闭时的颜色 | string | — | — |
| className | 自定义类名 | string | — | — |
| id | ID | string | — | — |

## 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:checked | 开关状态改变时触发 | (checked: boolean) |
| change | 开关状态改变时触发 | (checked: boolean, event: Event) |

## 方法

| 方法名 | 说明 |
| --- | --- |
| focus | 使开关获得焦点 |
| blur | 使开关失去焦点 |

## 注意事项

1. Switch 组件用于在两个状态之间进行切换
2. 通过 `checked` 属性控制开关状态（受控模式）
3. 通过 `defaultChecked` 属性设置默认状态（非受控模式）
4. 通过 `size` 属性设置尺寸：
   - `'default'`：默认尺寸（84 × 40）
   - `'small'`：小尺寸（62 × 30）
   - `'mini'`：迷你尺寸（42 × 20）
5. 通过 `variant` 属性设置变种：
   - `'default'`：默认变种
   - `'primary'`：主色调变种
   - `'secondary'`：次色调变种
6. 通过 `checkedColor` 和 `uncheckedColor` 属性可以自定义开关的颜色
7. 在受控模式下，需要同时提供 `checked` 和 `@update:checked` 属性
8. 在非受控模式下，可以使用 `defaultChecked` 属性设置初始状态
9. Switch 组件支持键盘操作（Tab 键聚焦，空格键切换）
10. 在暗色模式下，Switch 组件会自动适配主题颜色