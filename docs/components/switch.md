# Switch 开关

表示两种相互对立的状态间的切换。

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { Switch } from '@apron-design/vue'

const checked = ref(false)
</script>

<template>
  <Switch v-model="checked" />
</template>
```

## 不同尺寸

Switch 有三种尺寸：`default`、`small` 和 `mini`。

```vue
<template>
  <div class="demo-row">
    <Switch size="default" />
    <Switch size="small" />
    <Switch size="mini" />
  </div>
</template>
```

## 禁用状态

```vue
<template>
  <div class="demo-row">
    <Switch disabled />
    <Switch disabled :model-value="true" />
  </div>
</template>
```

## 不同变体

```vue
<template>
  <div class="demo-row">
    <Switch variant="default" :model-value="true" />
    <Switch variant="primary" :model-value="true" />
    <Switch variant="secondary" :model-value="true" />
  </div>
</template>
```

## 自定义颜色

使用 `checkedColor` 和 `uncheckedColor` 自定义开关颜色。

```vue
<template>
  <div class="demo-row">
    <Switch checked-color="#22c55e" />
    <Switch checked-color="#ef4444" />
    <Switch checked-color="#f59e0b" unchecked-color="#d4d4d8" />
  </div>
</template>
```

## 结合文字

```vue
<script setup>
import { ref } from 'vue'

const enabled = ref(true)
</script>

<template>
  <div class="demo-row">
    <span>关闭</span>
    <Switch v-model="enabled" />
    <span>开启</span>
  </div>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue (v-model) | 是否选中 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 尺寸 | `'default' \| 'small' \| 'mini'` | `'default'` |
| variant | 变体 | `'default' \| 'primary' \| 'secondary'` | `'default'` |
| checkedColor | 选中时的颜色 | `string` | - |
| uncheckedColor | 未选中时的颜色 | `string` | - |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 选中状态变化时触发 | `(checked: boolean) => void` |
| change | 选中状态变化时触发 | `(checked: boolean) => void` |

