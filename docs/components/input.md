# Input 输入框

通过键盘输入内容，是最基础的表单域包装。

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { Input } from '@apron-design/vue'

const value = ref('')
</script>

<template>
  <Input v-model="value" placeholder="请输入内容" />
</template>
```

## 可清除

添加 `clearable` 属性即可得到一个可清除的输入框。

```vue
<script setup>
import { ref } from 'vue'

const value = ref('可清除的内容')
</script>

<template>
  <Input v-model="value" clearable placeholder="请输入内容" />
</template>
```

## 密码框

使用 `type="password"` 得到一个密码输入框，会自动显示切换密码可见性的图标。

```vue
<script setup>
import { ref } from 'vue'

const password = ref('')
</script>

<template>
  <Input v-model="password" type="password" placeholder="请输入密码" />
</template>
```

## 前置/后置内容

使用 `prepend` 和 `append` 属性添加前置和后置内容。

```vue
<script setup>
import { ref } from 'vue'

const url = ref('')
const email = ref('')
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Input v-model="url" prepend="https://" placeholder="请输入网址" />
    <Input v-model="email" append="@gmail.com" placeholder="请输入邮箱" />
  </div>
</template>
```

## 禁用状态

```vue
<template>
  <Input disabled placeholder="禁用状态" value="禁用的内容" />
</template>
```

## Textarea 多行文本

使用 `Textarea` 组件获取多行文本输入。

```vue
<script setup>
import { ref } from 'vue'
import { Textarea } from '@apron-design/vue'

const content = ref('')
</script>

<template>
  <Textarea v-model="content" :rows="4" placeholder="请输入多行内容" />
</template>
```

## 字数限制

为 `Textarea` 添加 `max` 属性设置最大字数限制。

```vue
<script setup>
import { ref } from 'vue'

const bio = ref('')
</script>

<template>
  <Textarea v-model="bio" :max="200" :rows="3" placeholder="个人简介（200字以内）" />
</template>
```

## API

### Input Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue (v-model) | 绑定值 | `string` | - |
| type | 输入框类型 | `'text' \| 'password' \| 'email' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'` |
| placeholder | 占位符 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否可清除 | `boolean` | `false` |
| prepend | 前置内容 | `string` | - |
| append | 后置内容 | `string` | - |

### Input Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 值改变时触发 | `(value: string) => void` |
| change | 值改变且失焦时触发 | `(value: string) => void` |
| focus | 获取焦点时触发 | `(event: FocusEvent) => void` |
| blur | 失去焦点时触发 | `(event: FocusEvent) => void` |
| clear | 点击清除按钮时触发 | `() => void` |

### Textarea Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue (v-model) | 绑定值 | `string` | - |
| placeholder | 占位符 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| rows | 行数 | `number` | `3` |
| clearable | 是否可清除 | `boolean` | `false` |
| max | 最大字数限制 | `number` | - |

### Textarea Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 值改变时触发 | `(value: string) => void` |
| change | 值改变且失焦时触发 | `(value: string) => void` |
| focus | 获取焦点时触发 | `(event: FocusEvent) => void` |
| blur | 失去焦点时触发 | `(event: FocusEvent) => void` |
| clear | 点击清除按钮时触发 | `() => void` |

### Input/Textarea Exposes

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| focus | 使输入框获取焦点 | `() => void` |
| blur | 使输入框失去焦点 | `() => void` |
| select | 选中输入框中的文字 | `() => void` |

